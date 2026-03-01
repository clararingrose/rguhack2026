// Carbon Calculator - Core Logic
// Uses OSRM (OpenStreetMap Routing Machine) for real route data

// ── Transport mode definitions ─────────────────────────────────────────────
// factor      : g CO₂ per passenger-km
// speedKmh    : fallback average speed for time estimation
// osrmProfile : 'driving' | 'cycling' | 'foot' | null (null = distance-based estimate)
// minKm       : minimum distance for this mode to make sense
// maxKm       : maximum practical distance (Infinity = no cap)
// requiresLand: if true, hidden for routes that cross large oceans
// unlimitedSpeedKmh: theoretical top/flat-out speed used for the "no limits" time.
//   Only meaningful for osrmProfile modes where OSRM gives us real road distance.
//   null = concept doesn't apply (trains, flights etc. — only one time shown).
// calPerHour   : kcal burned per hour of travel (70 kg adult average)
//                negative = calories GAINED (cruise ship buffet effect)
const transportModes = [
    { name: 'Walking',             icon: '🚶', factor: 0,   speedKmh: 5,    unlimitedSpeedKmh: null, osrmProfile: 'foot',    minKm: 0,    maxKm: 50,       requiresLand: true,  calPerHour:  280  },
    { name: 'Cycling',             icon: '🚴', factor: 0,   speedKmh: 15,   unlimitedSpeedKmh: 60,   osrmProfile: 'cycling', minKm: 0,    maxKm: 200,      requiresLand: true,  calPerHour:  500  },
    { name: 'High-speed Train',    icon: '🚄', factor: 6,   speedKmh: 250,  unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 100,  maxKm: 3000,     requiresLand: true,  calPerHour:   0  },
    { name: 'Electric Bus',        icon: '🚌', factor: 17,  speedKmh: 40,   unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 0,    maxKm: 500,      requiresLand: true,  calPerHour:   0  },
    { name: 'Tram',                icon: '🚋', factor: 20,  speedKmh: 25,   unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 0,    maxKm: 50,       requiresLand: true,  calPerHour:   0  },
    { name: 'Bus',                 icon: '🚍', factor: 18,  speedKmh: 40,   unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 0,    maxKm: 500,      requiresLand: true,  calPerHour:   0  },
    { name: 'Electric Train',      icon: '🚂', factor: 29,  speedKmh: 130,  unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 10,   maxKm: 3000,     requiresLand: true,  calPerHour:   0  },
    { name: 'Train',               icon: '🚆', factor: 41,  speedKmh: 120,  unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 10,   maxKm: 5000,     requiresLand: true,  calPerHour:   0  },
    { name: 'Motorcycle',          icon: '🏍️', factor: 120, speedKmh: 90,   unlimitedSpeedKmh: 299,  osrmProfile: 'driving', minKm: 0,    maxKm: 3000,     requiresLand: true,  calPerHour:  0  },
    { name: 'Horse & Carriage',    icon: '🐴', factor: 120, speedKmh: 12,   unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 0,    maxKm: 100,      requiresLand: true,  calPerHour:   0  },
    { name: 'Long-distance Coach', icon: '🚎', factor: 105, speedKmh: 80,   unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 50,   maxKm: 4000,     requiresLand: true,  calPerHour:   0  },
    { name: 'Diesel Car',          icon: '🚗', factor: 171, speedKmh: 90,   unlimitedSpeedKmh: 250,  osrmProfile: 'driving', minKm: 0,    maxKm: Infinity, requiresLand: true,  calPerHour:   0  },
    { name: 'Petrol Car',          icon: '🚙', factor: 243, speedKmh: 90,   unlimitedSpeedKmh: 250,  osrmProfile: 'driving', minKm: 0,    maxKm: Infinity, requiresLand: true,  calPerHour:   0  },
    { name: 'Short-haul Flight',   icon: '✈️', factor: 255, speedKmh: 750,  unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 200,  maxKm: 3500,     requiresLand: false, calPerHour:   0  },
    { name: 'Long-haul Flight',    icon: '🛫', factor: 150, speedKmh: 900,  unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 3500, maxKm: Infinity, requiresLand: false, calPerHour:   60  },
    { name: 'Cruise Ship',         icon: '🚢', factor: 250, speedKmh: 45,   unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 200,  maxKm: Infinity, requiresLand: false, calPerHour: -450  },
    { name: 'Hot Air Balloon',     icon: '🎈', factor: 450, speedKmh: 20,   unlimitedSpeedKmh: null, osrmProfile: null,      minKm: 0,    maxKm: 500,      requiresLand: false, calPerHour:   0  },
    { name: 'Killdozer',           icon: '🚜', factor: 800, speedKmh: 8,    unlimitedSpeedKmh: 8,    osrmProfile: 'driving', minKm: 0,    maxKm: Infinity, requiresLand: true,  calPerHour:  0  },
];

// ── DOM elements ───────────────────────────────────────────────────────────
const originInput      = document.getElementById('origin');
const destinationInput = document.getElementById('destination');
const calculateBtn     = document.getElementById('calculateBtn');
const resultsSection   = document.getElementById('resultsSection');
const distanceValue    = document.getElementById('distanceValue');
const transportList    = document.getElementById('transportList');
const errorContainer   = document.getElementById('errorContainer');

// ── Geocoding (Nominatim) ──────────────────────────────────────────────────
async function geocode(location) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&addressdetails=1`;
    const response = await fetch(url, { headers: { 'User-Agent': 'CarbonCalculator/1.0' } });
    const data = await response.json();

    if (data.length === 0) throw new Error(`Location "${location}" not found`);

    const firstResult = data[0];
    let countryCode = null;

    if (firstResult.address?.country_code) {
        countryCode = firstResult.address.country_code.toUpperCase();
    }

    if (!countryCode && firstResult.display_name) {
        const displayName = firstResult.display_name.toLowerCase();
        const countryMappings = {
            'thailand': 'TH', 'hong kong': 'HK', 'taiwan': 'TW',
            'united kingdom': 'GB', 'scotland': 'GB', 'england': 'GB', 'wales': 'GB',
            'united states': 'US', 'france': 'FR', 'germany': 'DE', 'spain': 'ES',
            'italy': 'IT', 'japan': 'JP', 'china': 'CN', 'india': 'IN',
            'australia': 'AU', 'canada': 'CA', 'brazil': 'BR', 'russia': 'RU',
            'south korea': 'KR', 'vietnam': 'VN', 'singapore': 'SG', 'malaysia': 'MY',
            'indonesia': 'ID', 'philippines': 'PH', 'netherlands': 'NL', 'belgium': 'BE',
            'switzerland': 'CH', 'sweden': 'SE', 'norway': 'NO', 'denmark': 'DK',
            'finland': 'FI', 'poland': 'PL', 'portugal': 'PT', 'greece': 'GR',
            'turkey': 'TR', 'mexico': 'MX', 'argentina': 'AR', 'south africa': 'ZA',
            'new zealand': 'NZ', 'ireland': 'IE', 'austria': 'AT',
        };
        for (const [name, code] of Object.entries(countryMappings)) {
            if (displayName.includes(name)) { countryCode = code; break; }
        }
    }

    return { lat: parseFloat(firstResult.lat), lon: parseFloat(firstResult.lon), countryCode };
}

// ── Haversine distance ─────────────────────────────────────────────────────
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function toRad(d) { return d * Math.PI / 180; }

// ── OSRM routing ───────────────────────────────────────────────────────────
// Returns { distanceKm, durationSeconds } or null if no route found
async function getOsrmRoute(profile, fromLon, fromLat, toLon, toLat) {
    try {
        const url = `https://router.project-osrm.org/route/v1/${profile}/${fromLon},${fromLat};${toLon},${toLat}?overview=false`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        if (data.code !== 'Ok' || !data.routes?.length) return null;
        return {
            distanceKm:      data.routes[0].distance / 1000,
            durationSeconds: data.routes[0].duration,
        };
    } catch {
        return null;
    }
}

// ── Format duration ────────────────────────────────────────────────────────
function formatDuration(totalSeconds) {
    if (totalSeconds < 60)      return '< 1 min';
    const mins = Math.round(totalSeconds / 60);
    if (mins < 60)              return `${mins} min`;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    if (hours >= 24) {
        const days = Math.floor(hours / 24);
        const remH = hours % 24;
        return remH === 0 ? `${days}d` : `${days}d ${remH}h`;
    }
    return remMins === 0 ? `${hours}h` : `${hours}h ${remMins}m`;
}

// ── Format emissions (preserve original logic) ─────────────────────────────
function formatEmissions(emissions) {
    if (emissions >= 1000) {
        const kg = (emissions / 1000).toFixed(1);
        return { value: kg.endsWith('.0') ? Math.round(emissions / 1000) : kg, unit: 'kg CO₂' };
    }
    return { value: emissions.toLocaleString(), unit: 'g CO₂' };
}

// ── Build filtered + timed results ────────────────────────────────────────
function buildResults(straightLineKm, osrmRoutes) {
    const hasLandRoute = osrmRoutes.driving !== null;

    return transportModes
        .map(mode => {
            // — Feasibility filters —
            if (mode.requiresLand && !hasLandRoute) return null;
            if (straightLineKm < mode.minKm) return null;
            if (straightLineKm > mode.maxKm) return null;
            if (mode.osrmProfile === 'foot'    && !osrmRoutes.foot)    return null;
            if (mode.osrmProfile === 'cycling' && !osrmRoutes.cycling) return null;

            // — Journey time —
            let durationSeconds          = null; // obeying speed limits
            let unlimitedDurationSeconds = null; // flat-out
            let routeDistanceKm          = straightLineKm;
            let isRealRoute              = false;

            if (mode.osrmProfile === 'foot' && osrmRoutes.foot) {
                routeDistanceKm = osrmRoutes.foot.distanceKm;
                durationSeconds = osrmRoutes.foot.durationSeconds;
                // Walking "unlimited" doesn't apply — Usain Bolt mode: ~37 km/h
                unlimitedDurationSeconds = mode.unlimitedSpeedKmh
                    ? (routeDistanceKm / mode.unlimitedSpeedKmh) * 3600
                    : null;
                isRealRoute = true;

            } else if (mode.osrmProfile === 'cycling' && osrmRoutes.cycling) {
                routeDistanceKm          = osrmRoutes.cycling.distanceKm;
                durationSeconds          = osrmRoutes.cycling.durationSeconds;
                // Unlimited = pro cyclist on a closed road, ~60 km/h
                unlimitedDurationSeconds = mode.unlimitedSpeedKmh
                    ? (routeDistanceKm / mode.unlimitedSpeedKmh) * 3600
                    : null;
                isRealRoute = true;

            } else if (mode.osrmProfile === 'driving' && osrmRoutes.driving) {
                routeDistanceKm = osrmRoutes.driving.distanceKm;

                if (mode.name === 'Diesel Car' || mode.name === 'Petrol Car') {
                    // Use OSRM duration directly — it already respects speed limits
                    durationSeconds = osrmRoutes.driving.durationSeconds;
                } else if (mode.name === 'Motorcycle') {
                    // Motorcycles follow the same roads & limits as cars (roughly)
                    durationSeconds = osrmRoutes.driving.durationSeconds;
                } else {
                    // Killdozer: 8 km/h is its actual top speed — limits irrelevant
                    durationSeconds = (routeDistanceKm / mode.speedKmh) * 3600;
                }

                // Unlimited = road distance at theoretical top speed
                unlimitedDurationSeconds = mode.unlimitedSpeedKmh
                    ? (routeDistanceKm / mode.unlimitedSpeedKmh) * 3600
                    : null;
                isRealRoute = true;

            } else {
                // Estimated modes (trains, flights, etc.) — single time, no limit comparison
                const overhead  = mode.requiresLand ? 1.15 : 1.0;
                routeDistanceKm = straightLineKm * overhead;
                durationSeconds = (routeDistanceKm / mode.speedKmh) * 3600;
                // Cruise ships: add a week for the mandatory shuffleboard tournament
                if (mode.name === 'Cruise Ship') durationSeconds += 7 * 24 * 3600;
                // Flights: add 3 hours for check-in, security, boarding, and baggage reclaim
                if (mode.name === 'Short-haul Flight' || mode.name === 'Long-haul Flight') durationSeconds += 3 * 3600;
                unlimitedDurationSeconds = null; // not applicable
                isRealRoute = false;
            }

            const emissions     = Math.round(routeDistanceKm * mode.factor);
            const journeyHours  = durationSeconds / 3600;
            const totalCalories = Math.round(mode.calPerHour * journeyHours);

            return {
                ...mode,
                emissions,
                durationSeconds,
                unlimitedDurationSeconds,
                routeDistanceKm,
                isRealRoute,
                totalCalories,
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.emissions - a.emissions);
}


// ── Sort state ─────────────────────────────────────────────────────────────
let _lastResults = [];
let _currentSort = 'emissions'; // 'emissions' | 'duration' | 'calories'
let _speedMode   = 'legal';     // 'legal' | 'unlimited'

function toggleSpeedMode() {
    _speedMode = _speedMode === 'legal' ? 'unlimited' : 'legal';
    const btn = document.getElementById('speed-toggle');
    if (btn) {
        btn.textContent = _speedMode === 'legal' ? '🐢 Showing: speed limits' : '🔥 Showing: flat out';
        btn.classList.toggle('speed-toggle--unlimited', _speedMode === 'unlimited');
    }
    // Re-render cards in place — times update, sort order stays
    renderCards(getSorted(_lastResults, _currentSort));
}

function getSorted(results, sortKey) {
    return [...results].sort((a, b) => {
        if (sortKey === 'duration')  return b.durationSeconds - a.durationSeconds;
        if (sortKey === 'calories')  return a.totalCalories   - b.totalCalories;
        return b.emissions - a.emissions;
    });
}

function setSort(key) {
    _currentSort = key;
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.toggle('sort-btn--active', btn.dataset.sort === key);
    });
    renderCards(getSorted(_lastResults, key));
}

// ── Inject sort bar into results section (once) ────────────────────────────
function ensureSortBar() {
    if (document.getElementById('sort-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'sort-bar';
    bar.innerHTML = `
        <span class="sort-label">Sort by</span>
        <button class="sort-btn sort-btn--active" data-sort="emissions" onclick="setSort('emissions')">
            💀 Most emissions
        </button>
        <button class="sort-btn" data-sort="duration" onclick="setSort('duration')">
            🐌 Longest journey
        </button>
        <button class="sort-btn" data-sort="calories" onclick="setSort('calories')">
            🍔 Fewest calories burned
        </button>
        <button id="speed-toggle" class="speed-toggle" onclick="toggleSpeedMode()">
            🐢 Showing: speed limits
        </button>
    `;
    transportList.parentNode.insertBefore(bar, transportList);
}

// ── Render just the cards ──────────────────────────────────────────────────
function renderCards(results) {
    transportList.innerHTML = '';

    results.forEach((mode, index) => {
        const isWorst      = _currentSort === 'emissions' && index === 0 && mode.emissions > 0;
        const isSlowest    = _currentSort === 'duration'  && index === 0;
        const isFittest    = _currentSort === 'calories'  && index === 0;
        const formatted    = formatEmissions(mode.emissions);

        const transportName = typeof getTransportModeName === 'function'
            ? getTransportModeName(mode.name)
            : mode.name;

        // Pick the displayed time based on speed mode toggle
        const hasUnlimited  = mode.unlimitedDurationSeconds !== null
                              && mode.durationSeconds - mode.unlimitedDurationSeconds > 60;
        const showUnlimited = _speedMode === 'unlimited' && hasUnlimited;
        const displayedSecs = showUnlimited ? mode.unlimitedDurationSeconds : mode.durationSeconds;
        const displayedTime = formatDuration(displayedSecs);
        const timeSubLabel  = showUnlimited
            ? `<span class="unlimited-sub">🐢 legal: ${formatDuration(mode.durationSeconds)}</span>`
            : (hasUnlimited
                ? `<span class="unlimited-sub">🔥 flat out: ${formatDuration(mode.unlimitedDurationSeconds)}</span>`
                : '');
        const timeUnit = showUnlimited ? 'flat out' : (mode.isRealRoute ? 'real route' : '~ estimated');
        const timeMetricClass = showUnlimited ? 'metric--time-unlimited' : 'metric--time';

        // Calorie badge — negative = gained (cruise ship)
        const calAbs   = Math.abs(mode.totalCalories);
        const calGain  = mode.totalCalories < 0;
        const calLabel = calAbs >= 1000
            ? (calAbs / 1000).toFixed(1) + 'k'
            : calAbs.toLocaleString();
        const calBadge = calGain
            ? `<span class="time-badge cal-badge cal-badge--gain" title="Calories gained (buffet effect)">🍔 +${calLabel} kcal</span>`
            : `<span class="time-badge cal-badge cal-badge--burn" title="Estimated calories burned">🔥 ${calLabel} kcal</span>`;

        const card = document.createElement('div');
        card.className = `transport-card${isWorst ? ' worst' : ''}${isSlowest ? ' slowest' : ''}${isFittest ? ' fittest' : ''}`;
        card.innerHTML = `
            <div class="card-header">
                <span class="transport-icon">${mode.icon}</span>
                <span class="transport-name" data-original-name="${mode.name}">${transportName}</span>
                ${isWorst   ? '<span class="top-badge top-badge--emissions">🔥 MOST EVIL</span>' : ''}
                ${isSlowest ? '<span class="top-badge top-badge--slowest">🐌 MOST SCENIC</span>'     : ''}
                ${isFittest ? '<span class="top-badge top-badge--fittest">🍔 LEAST SWEATY</span>'     : ''}
            </div>
            <div class="card-metrics">
                <div class="metric metric--co2">
                    <span class="metric-value">${formatted.value}</span>
                    <span class="metric-unit">${formatted.unit}</span>
                    <span class="metric-label">CO₂</span>
                </div>
                <div class="metric-divider"></div>
                <div class="metric ${timeMetricClass}">
                    <span class="metric-value">${displayedTime}</span>
                    <span class="metric-unit">${timeUnit}</span>
                    <span class="metric-label">journey time</span>
                </div>
                <div class="metric-divider"></div>
                <div class="metric ${calGain ? 'metric--gain' : 'metric--cal'}">
                    <span class="metric-value">${calGain ? '+' : ''}${calLabel}</span>
                    <span class="metric-unit">kcal</span>
                    <span class="metric-label">${calGain ? '🍔 gained' : '🔥 burned'}</span>
                </div>
            </div>
        `;
        transportList.appendChild(card);
    });

    // Language translation hook (preserve original)
    if (window.currentLanguageCode && typeof changeLanguageToCountry === 'function') {
        const badge = document.querySelector('.recommendation-badge:not(.slowest-badge)');
        if (badge && window.translations) {
            const texts = window.translations[window.currentLanguageCode] || window.translations.en;
            if (texts) badge.innerHTML = `<span class="fire-emoji">🔥</span> ${texts.mostExciting.replace('🔥 ', '')}`;
        }
    }
}

// ── Render results (called after calculation) ──────────────────────────────
function displayResults(straightLineKm, results) {
    _lastResults = results;
    _currentSort = 'emissions';

    distanceValue.textContent = Math.round(straightLineKm).toLocaleString();

    ensureSortBar();
    // Reset active state to emissions
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.toggle('sort-btn--active', btn.dataset.sort === 'emissions');
    });

    renderCards(getSorted(results, 'emissions'));
    resultsSection.classList.add('show');
}

// ── Error helpers ──────────────────────────────────────────────────────────
function showError(message) { errorContainer.innerHTML = `<div class="error">${message}</div>`; }
function clearError()       { errorContainer.innerHTML = ''; }

// ── Main handler ───────────────────────────────────────────────────────────
async function handleCalculate() {
    // Sync boring mode inputs if active
    if (window.boringMode) {
        const ob = document.getElementById('originBoring');
        const db = document.getElementById('destinationBoring');
        if (ob?.value) originInput.value      = ob.value;
        if (db?.value) destinationInput.value = db.value;
    }

    const origin      = originInput.value.trim();
    const destination = destinationInput.value.trim();

    clearError();
    resultsSection.classList.remove('show');

    if (!origin || !destination) {
        showError('Please input both origin and destination locations');
        return;
    }

    calculateBtn.disabled    = true;
    calculateBtn.textContent = 'Calculating…';

    try {
        const [originCoords, destCoords] = await Promise.all([
            geocode(origin),
            geocode(destination),
        ]);

        const straightLineKm = calculateDistance(
            originCoords.lat, originCoords.lon,
            destCoords.lat,   destCoords.lon,
        );

        calculateBtn.textContent = 'Fetching routes…';

        const [drivingRoute, cyclingRoute, footRoute] = await Promise.all([
            getOsrmRoute('driving', originCoords.lon, originCoords.lat, destCoords.lon, destCoords.lat),
            straightLineKm <= 250
                ? getOsrmRoute('cycling', originCoords.lon, originCoords.lat, destCoords.lon, destCoords.lat)
                : Promise.resolve(null),
            straightLineKm <= 60
                ? getOsrmRoute('foot', originCoords.lon, originCoords.lat, destCoords.lon, destCoords.lat)
                : Promise.resolve(null),
        ]);

        const osrmRoutes = { driving: drivingRoute, cycling: cyclingRoute, foot: footRoute };
        const results    = buildResults(straightLineKm, osrmRoutes);

        displayResults(straightLineKm, results);

        try {
            if (destCoords.countryCode && typeof changeLanguageToCountry === 'function') {
                changeLanguageToCountry(destCoords.countryCode);
            }
        } catch (langError) {
            console.warn('Language change error:', langError);
        }

    } catch (error) {
        console.error('Calculation error:', error);
        showError(error.message);
    } finally {
        calculateBtn.disabled    = false;
        calculateBtn.textContent = 'Calculate Emissions';
    }
}

// ── Inject styles ──────────────────────────────────────────────────────────
(function injectStyles() {
    if (document.getElementById('time-badge-styles')) return;
    const style = document.createElement('style');
    style.id = 'time-badge-styles';
    style.textContent = `
        /* ── Sort bar ── */
        #sort-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
            flex-wrap: wrap;
        }
        .sort-label {
            font-size: 12px;
            opacity: 0.5;
            margin-right: 4px;
        }
        .sort-btn {
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.2);
            background: transparent;
            color: rgba(255,255,255,0.55);
            font-size: 13px;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .sort-btn:hover {
            border-color: rgba(255,255,255,0.45);
            color: #fff;
        }
        .sort-btn--active {
            background: rgba(255,255,255,0.1);
            border-color: rgba(255,255,255,0.5);
            color: #fff;
            font-weight: 600;
        }

        /* ── Speed toggle button ── */
        .speed-toggle {
            margin-left: auto;
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid rgba(42, 157, 143, 0.5);
            background: rgba(42, 157, 143, 0.1);
            color: #2a9d8f;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.18s ease;
            white-space: nowrap;
        }
        .speed-toggle:hover {
            background: rgba(42, 157, 143, 0.2);
        }
        .speed-toggle--unlimited {
            border-color: rgba(230, 57, 70, 0.5);
            background: rgba(230, 57, 70, 0.1);
            color: #e63946;
        }
        .speed-toggle--unlimited:hover {
            background: rgba(230, 57, 70, 0.2);
        }

        /* colour for unlimited time metric */
        .metric--time-unlimited .metric-value { color: #e63946; }

        /* ── Card shell ── */
        .transport-card {
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.08);
            margin-bottom: 10px;
            overflow: hidden;
            transition: border-color 0.2s, transform 0.2s;
        }
        .transport-card:hover {
            border-color: rgba(255,255,255,0.2);
            transform: translateY(-1px);
        }
        .transport-card.worst   { border-color: rgba(230, 57,  70,  0.4); }
        .transport-card.slowest { border-color: rgba(100, 180, 255, 0.4); }
        .transport-card.fittest { border-color: rgba(255, 180, 0,   0.4); }

        /* ── Card header row ── */
        .card-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px 10px;
        }
        .transport-icon { font-size: 22px; flex-shrink: 0; }
        .transport-name { font-weight: 600; font-size: 15px; flex: 1; }

        /* ── Top badge (MOST EXCITING etc.) ── */
        .top-badge {
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.04em;
            padding: 3px 9px;
            border-radius: 20px;
            white-space: nowrap;
        }
        .top-badge--emissions { background: rgba(230,57,70,0.2);  color: #e63946; border: 1px solid rgba(230,57,70,0.4);  }
        .top-badge--slowest   { background: rgba(100,180,255,0.2); color: #64b4ff; border: 1px solid rgba(100,180,255,0.4); }
        .top-badge--fittest   { background: rgba(255,180,0,0.2);  color: #ffb400; border: 1px solid rgba(255,180,0,0.4);  }

        /* ── Three equal metric columns ── */
        .card-metrics {
            display: grid;
            grid-template-columns: 1fr 1px 1fr 1px 1fr;
            border-top: 1px solid rgba(255,255,255,0.07);
            align-items: stretch;
        }
        .metric-divider {
            background: rgba(255,255,255,0.07);
            align-self: stretch;
        }
        .metric {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 12px 6px;
            gap: 2px;
            text-align: center;
            min-height: 80px;
            box-sizing: border-box;
            overflow: hidden;
        }
        .metric-value {
            font-size: clamp(13px, 2.2vw, 20px);
            font-weight: 700;
            font-family: 'Courier New', monospace;
            line-height: 1.1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        }
        .metric-unit {
            font-size: 10px;
            opacity: 0.5;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            min-height: 14px;
            white-space: nowrap;
        }
        .metric-label {
            font-size: 11px;
            opacity: 0.55;
            margin-top: 1px;
            display: flex;
            align-items: center;
            gap: 4px;
            flex-wrap: wrap;
            justify-content: center;
            max-height: 32px;
            overflow: hidden;
        }

        /* metric colour tints */
        .metric--co2   .metric-value { color: #e63946; }
        .metric--time  .metric-value { color: #2a9d8f; }
        .metric--cal   .metric-value { color: #ff8c00; }
        .metric--gain  .metric-value { color: #dc3232; }

        /* unlimited speed sub-label inside journey time */
        .unlimited-sub {
            font-size: 10px;
            opacity: 0.6;
            white-space: nowrap;
            background: rgba(230,57,70,0.12);
            color: #e63946;
            border-radius: 10px;
            padding: 1px 6px;
        }

        /* ── Responsive: stack metrics on narrow screens ── */
        @media (max-width: 420px) {
            .card-metrics {
                grid-template-columns: 1fr;
                grid-template-rows: auto;
            }
            .metric-divider {
                height: 1px;
                width: 100%;
            }
            .metric-value { font-size: 17px; }
        }
    `;
    document.head.appendChild(style);
})();

// ── Event listener ─────────────────────────────────────────────────────────
calculateBtn.addEventListener('click', handleCalculate);
