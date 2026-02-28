// Carbon Calculator - Core Logic

// Transport modes with emission factors (g CO2 per passenger-km)
const transportModes = [
    { name: 'Walking', icon: '🚶', factor: 0 },
    { name: 'Cycling', icon: '🚴', factor: 0 },
    { name: 'High-speed Train', icon: '🚄', factor: 6 },
    { name: 'Electric Bus', icon: '🚌', factor: 17 },
    { name: 'Tram', icon: '🚋', factor: 20 },
    { name: 'Bus', icon: '🚍', factor: 18 },
    { name: 'Electric Train', icon: '🚂', factor: 29 },
    { name: 'Train', icon: '🚆', factor: 41 },
    { name: 'Motorcycle', icon: '🏍️', factor: 120 },
    { name: 'Horse & Carriage', icon: '🐴', factor: 120 },
    { name: 'Long-distance Coach', icon: '🚎', factor: 105 },
    { name: 'Diesel Car', icon: '🚗', factor: 171 },
    { name: 'Petrol Car', icon: '🚙', factor: 243 },
    { name: 'Short-haul Flight', icon: '✈️', factor: 255 },
    { name: 'Long-haul Flight', icon: '🛫', factor: 150 },
    { name: 'Cruise Ship', icon: '🚢', factor: 250 },
    { name: 'Hot Air Balloon', icon: '🎈', factor: 450 },
    { name: 'Killdozer', icon: '🚜', factor: 800 }
];

// DOM Elements
const originInput = document.getElementById('origin');
const destinationInput = document.getElementById('destination');
const calculateBtn = document.getElementById('calculateBtn');
const resultsSection = document.getElementById('resultsSection');
const distanceValue = document.getElementById('distanceValue');
const transportList = document.getElementById('transportList');
const errorContainer = document.getElementById('errorContainer');

// Geocode a location using Nominatim API
async function geocode(location) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&addressdetails=1`;
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'CarbonCalculator/1.0'
        }
    });
    const data = await response.json();

    if (data.length === 0) {
        throw new Error(`Location "${location}" not found`);
    }

    const firstResult = data[0];
    console.log('Raw geocode result for', location, ':', firstResult);
    console.log('Address object:', firstResult.address);

    // Extract country code from various possible locations
    let countryCode = null;

    // Try address.country_code first
    if (firstResult.address?.country_code) {
        countryCode = firstResult.address.country_code.toUpperCase();
    }

    // If still no country code, try to extract from display_name
    if (!countryCode && firstResult.display_name) {
        const displayName = firstResult.display_name.toLowerCase();

        // Comprehensive country name to code mapping
        const countryMappings = {
            'thailand': 'TH', 'thai': 'TH',
            'hong kong': 'HK',
            'macau': 'MO', 'macao': 'MO',
            'taiwan': 'TW',
            'united kingdom': 'GB', 'uk': 'GB', 'scotland': 'GB', 'england': 'GB', 'wales': 'GB', 'northern ireland': 'GB',
            'united states': 'US', 'usa': 'US',
            'france': 'FR',
            'germany': 'DE',
            'spain': 'ES',
            'italy': 'IT',
            'japan': 'JP',
            'china': 'CN',
            'india': 'IN',
            'australia': 'AU',
            'canada': 'CA',
            'brazil': 'BR',
            'russia': 'RU',
            'south korea': 'KR', 'korea': 'KR',
            'vietnam': 'VN',
            'singapore': 'SG',
            'malaysia': 'MY',
            'indonesia': 'ID',
            'philippines': 'PH',
            'netherlands': 'NL',
            'belgium': 'BE',
            'switzerland': 'CH',
            'sweden': 'SE',
            'norway': 'NO',
            'denmark': 'DK',
            'finland': 'FI',
            'poland': 'PL',
            'portugal': 'PT',
            'greece': 'GR',
            'turkey': 'TR',
            'mexico': 'MX',
            'argentina': 'AR',
            'colombia': 'CO',
            'chile': 'CL',
            'peru': 'PE',
            'south africa': 'ZA',
            'egypt': 'EG',
            'israel': 'IL',
            'saudi arabia': 'SA',
            'uae': 'AE', 'united arab emirates': 'AE',
            'new zealand': 'NZ',
            'ireland': 'IE',
            'austria': 'AT',
            'czech republic': 'CZ',
            'hungary': 'HU',
            'romania': 'RO',
            'bulgaria': 'BG',
            'croatia': 'HR',
            'serbia': 'RS',
            'ukraine': 'UA',
            'finland': 'FI'
        };

        for (const [name, code] of Object.entries(countryMappings)) {
            if (displayName.includes(name)) {
                countryCode = code;
                console.log(`Found country code "${code}" from display_name containing "${name}"`);
                break;
            }
        }
    }

    console.log('Geocoded:', location, '→ Country code:', countryCode);

    return {
        lat: parseFloat(firstResult.lat),
        lon: parseFloat(firstResult.lon),
        countryCode: countryCode
    };
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Calculate emissions for all transport modes
function calculateEmissions(distance) {
    return transportModes.map(mode => ({
        ...mode,
        emissions: Math.round(distance * mode.factor)
    })).sort((a, b) => b.emissions - a.emissions); // Sort by highest emissions first
}

// Format emissions to show kg if >= 1000g
function formatEmissions(emissions) {
    if (emissions >= 1000) {
        const kg = (emissions / 1000).toFixed(1);
        const decimalPart = kg.split('.')[1];
        return {
            value: decimalPart === '0' ? Math.round(emissions / 1000) : kg,
            unit: 'kg CO₂'
        };
    }
    return {
        value: emissions.toLocaleString(),
        unit: 'g CO₂'
    };
}

// Display results
function displayResults(distance, results) {
    distanceValue.textContent = Math.round(distance).toLocaleString();

    transportList.innerHTML = '';

    results.forEach((mode, index) => {
        const isWorst = index === 0 && mode.emissions > 0;
        const formatted = formatEmissions(mode.emissions);

        // Get translated transport name if available
        const transportName = (typeof getTransportModeName === 'function')
            ? getTransportModeName(mode.name)
            : mode.name;

        const card = document.createElement('div');
        card.className = `transport-card${isWorst ? ' worst' : ''}`;

        card.innerHTML = `
            <div class="transport-left">
                <span class="transport-icon">${mode.icon}</span>
                <span class="transport-name" data-original-name="${mode.name}">${transportName}</span>
            </div>
            <div class="transport-right">
                <div class="emissions">${formatted.value}</div>
                <span class="emissions-unit">${formatted.unit}</span>
                ${isWorst ? '<div class="recommendation-badge"><span class="fire-emoji">🔥</span> MOST EXCITING!</div>' : ''}
            </div>
        `;

        transportList.appendChild(card);
    });

    resultsSection.classList.add('show');

    // Translate "MOST EXCITING!" badge if language is set
    if (window.currentLanguageCode && typeof changeLanguageToCountry === 'function') {
        const badge = document.querySelector('.recommendation-badge');
        if (badge && window.translations) {
            const texts = window.translations[window.currentLanguageCode] || window.translations.en;
            if (texts) {
                badge.innerHTML = `<span class="fire-emoji">🔥</span> ${texts.mostExciting.replace('🔥 ', '')}`;
            }
        }
    }
}

// Show error message
function showError(message) {
    errorContainer.innerHTML = `<div class="error">${message}</div>`;
}

// Clear error message
function clearError() {
    errorContainer.innerHTML = '';
}

// Handle calculate button click
async function handleCalculate() {
    // Sync boring mode inputs if active
    if (window.boringMode) {
        const originBoring = document.getElementById('originBoring');
        const destinationBoring = document.getElementById('destinationBoring');
        if (originBoring && originBoring.value) {
            originInput.value = originBoring.value;
        }
        if (destinationBoring && destinationBoring.value) {
            destinationInput.value = destinationBoring.value;
        }
    }

    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();

    clearError();
    resultsSection.classList.remove('show');

    if (!origin || !destination) {
        showError('Please input both origin and destination locations');
        return;
    }

    calculateBtn.disabled = true;
    calculateBtn.textContent = 'Calculating...';

    try {
        console.log('=== Starting calculation ===');
        console.log('Origin:', origin);
        console.log('Destination:', destination);

        const originCoords = await geocode(origin);
        console.log('Origin coords:', originCoords);

        const destCoords = await geocode(destination);
        console.log('Destination coords:', destCoords);

        console.log('✅ Geocoding complete, calculating distance...');

        const distance = calculateDistance(
            originCoords.lat, originCoords.lon,
            destCoords.lat, destCoords.lon
        );

        console.log('✅ Distance calculated:', distance, 'km');

        const results = calculateEmissions(distance);
        console.log('✅ Emissions calculated:', results.length, 'transport modes');

        displayResults(distance, results);
        console.log('✅ Results displayed');

        // Change language based on destination country (do this LAST, after results)
        try {
            if (destCoords.countryCode) {
                console.log('🎯 Changing language to match destination country:', destCoords.countryCode);
                if (typeof changeLanguageToCountry === 'function') {
                    changeLanguageToCountry(destCoords.countryCode);
                }
            } else {
                console.log('⚠️ No country code found for destination:', destination);
            }
        } catch (langError) {
            console.error('Language change error (continuing anyway):', langError);
        }

    } catch (error) {
        console.error('❌ Calculation error:', error);
        showError(error.message);
    } finally {
        console.log('♻️ Resetting button state');
        calculateBtn.disabled = false;
        calculateBtn.textContent = 'Calculate Emissions';
    }
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
