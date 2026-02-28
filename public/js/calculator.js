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
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'CarbonCalculator/1.0'
        }
    });
    const data = await response.json();

    if (data.length === 0) {
        throw new Error(`Location "${location}" not found`);
    }

    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
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

        const card = document.createElement('div');
        card.className = `transport-card${isWorst ? ' worst' : ''}`;

        card.innerHTML = `
            <div class="transport-left">
                <span class="transport-icon">${mode.icon}</span>
                <span class="transport-name">${mode.name}</span>
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
        const originCoords = await geocode(origin);
        const destCoords = await geocode(destination);

        const distance = calculateDistance(
            originCoords.lat, originCoords.lon,
            destCoords.lat, destCoords.lon
        );

        const results = calculateEmissions(distance);
        displayResults(distance, results);

    } catch (error) {
        showError(error.message);
    } finally {
        calculateBtn.disabled = false;
        calculateBtn.textContent = 'Calculate Emissions';
    }
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
