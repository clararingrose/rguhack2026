// ==========================================

const ouijaModal = document.getElementById('ouijaModal');
const ouijaBoard = document.getElementById('ouijaBoard');
const ouijaLettersArc = document.getElementById('ouijaLettersArc');
const ouijaNumbers = document.getElementById('ouijaNumbers');
const ouijaValue = document.getElementById('ouijaValue');
const planchette = document.getElementById('planchette');
const ouijaFieldIndicator = document.getElementById('ouijaFieldIndicator');
const closeModalBtn = document.getElementById('closeModalBtn');

let currentField = null;
let currentValue = '';
let mouseX = 0, mouseY = 0;
let planchetteX = 0, planchetteY = 0;
let isOuijaActive = false;
let hoverStartTime = null;
let currentLetter = null;
let animationFrameId = null;
let lastLetterTime = 0;
let spiritInterferenceTimer = null;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const spookyMessages = [
    "The spirits sense your hesitation...",
    "Is someone else here with us?",
    "The planchette grows cold...",
    "I sense... LONDON...",
    "Why do you seek to travel?",
    "BEWARE the journey ahead...",
    "The veil grows thin...",
    "Someone is watching...",
    "They know where you're going...",
    "The spirits demand answers..."
];

// Initialize Ouija board letters in an arc pattern
function initializeOuijaBoard() {
    // Create letters in arc
    const arcRadius = 200;
    const startAngle = Math.PI * 0.8;
    const endAngle = Math.PI * 0.2;
    const totalAngle = startAngle - endAngle;

    letters.forEach((letter, index) => {
        const letterEl = document.createElement('div');
        letterEl.className = 'ouija-letter';
        letterEl.dataset.char = letter;
        letterEl.textContent = letter;

        // Position in arc (reversed so A-Z reads left to right)
        const angle = startAngle - (index / (letters.length - 1)) * totalAngle;
        const x = 50 + 40 * Math.cos(angle);
        const y = 50 + 35 * Math.sin(angle);

        letterEl.style.left = `${x}%`;
        letterEl.style.top = `${y}%`;
        letterEl.style.transform = 'translate(-50%, -50%)';

        ouijaLettersArc.appendChild(letterEl);
    });

    // Create numbers
    for (let i = 0; i <= 9; i++) {
        const numEl = document.createElement('div');
        numEl.className = 'ouija-number';
        numEl.dataset.char = i.toString();
        numEl.textContent = i;
        ouijaNumbers.appendChild(numEl);
    }
}

// Ouija board button handlers (now handled by mode-aware buttons above)
// The buttons are now handled by the DDR/Ouija mode toggle system

function openOuijaModal() {
    ouijaModal.classList.add('active');
    isOuijaActive = true;

    // Center planchette
    const boardRect = ouijaBoard.getBoundingClientRect();
    planchetteX = boardRect.width / 2 - 60;
    planchetteY = boardRect.height / 2 - 75;
    mouseX = planchetteX;
    mouseY = planchetteY;

    updatePlanchette();
    animationFrameId = requestAnimationFrame(updatePlanchette);

    // Start supernatural interference
    spiritInterferenceTimer = setInterval(spiritInterference, 3000);
}

function closeOuijaModal(save = false) {
    ouijaModal.classList.remove('active');
    isOuijaActive = false;

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    if (spiritInterferenceTimer) {
        clearInterval(spiritInterferenceTimer);
        spiritInterferenceTimer = null;
    }

    if (save && currentValue) {
        // Save the value
        if (currentField === 'origin') {
            originInput.value = currentValue;
            const display = document.getElementById('originDisplay');
            display.textContent = currentValue;
            display.classList.remove('empty');
        } else {
            destinationInput.value = currentValue;
            const display = document.getElementById('destinationDisplay');
            display.textContent = currentValue;
            display.classList.remove('empty');
        }
    }

    currentField = null;
    currentValue = '';
}

// Close button
closeModalBtn.addEventListener('click', () => closeOuijaModal(false));

// Planchette movement with eerie drift
function updatePlanchette() {
    if (!isOuijaActive) return;

    const boardRect = ouijaBoard.getBoundingClientRect();
    const targetX = mouseX - boardRect.left - 60;
    const targetY = mouseY - boardRect.top - 75;

    // Add random "spirit" movement
    const time = Date.now() / 1000;
    const spiritDriftX = Math.sin(time * 2) * 15 + Math.cos(time * 3) * 10;
    const spiritDriftY = Math.cos(time * 1.5) * 12 + Math.sin(time * 2.5) * 8;

    // Smooth lag behind cursor (unsettling feel)
    planchetteX += (targetX - planchetteX) * 0.08;
    planchetteY += (targetY - planchetteY) * 0.08;

    // Apply spirit drift
    const finalX = Math.max(0, Math.min(boardRect.width - 120, planchetteX + spiritDriftX));
    const finalY = Math.max(0, Math.min(boardRect.height - 150, planchetteY + spiritDriftY));

    planchette.style.left = finalX + 'px';
    planchette.style.top = finalY + 'px';

    // Check for letter selection
    checkLetterSelection();

    animationFrameId = requestAnimationFrame(updatePlanchette);
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    if (!isOuijaActive) return;
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Touch support
document.addEventListener('touchmove', (e) => {
    if (!isOuijaActive) return;
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
});

// Check if planchette is over a letter
function getHoveredLetter() {
    const planchetteRect = planchette.getBoundingClientRect();
    const centerX = planchetteRect.left + planchetteRect.width / 2;
    const centerY = planchetteRect.top + planchetteRect.height / 2;

    const letterElements = document.querySelectorAll('.ouija-letter, .ouija-number');

    for (const letter of letterElements) {
        const rect = letter.getBoundingClientRect();
        if (centerX >= rect.left && centerX <= rect.right &&
            centerY >= rect.top && centerY <= rect.bottom) {
            return letter.dataset.char;
        }
    }
    return null;
}

// Letter detection with timing threshold
function checkLetterSelection() {
    const now = Date.now();

    // Don't allow rapid-fire letter selection
    if (now - lastLetterTime < 500) return;

    const hovered = getHoveredLetter();

    if (hovered) {
        if (hovered === currentLetter) {
            // Still on same letter - check time threshold
            if (now - hoverStartTime > 800) {
                addLetter(hovered);
                hoverStartTime = now;
                lastLetterTime = now;
            }
        } else {
            // New letter - start timing
            currentLetter = hovered;
            hoverStartTime = now;
        }
    } else {
        currentLetter = null;
        hoverStartTime = null;
    }
}

// Add a letter to the current value
function addLetter(letter) {
    if (currentValue.length < 50) {
        currentValue += letter;
        updateDisplay();

        // Visual feedback
        const letterEl = document.querySelector(`.ouija-letter[data-char="${letter}"]`);
        if (letterEl) {
            letterEl.classList.add('selected');
            setTimeout(() => letterEl.classList.remove('selected'), 300);
        }
    }
}

// Update the display
function updateDisplay() {
    const displayValue = currentValue || '_';
    ouijaValue.innerHTML = `${displayValue} <span class="cursor"></span>`;
}

// Spirit interference - random supernatural events
function spiritInterference() {
    if (!isOuijaActive) return;

    const rand = Math.random();

    // 5% chance to add a random letter
    if (rand < 0.05) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        addLetter(randomLetter);
        showGhostlyFlash();
    }

    // 3% chance to show a spooky message
    if (rand > 0.95 && rand < 0.98) {
        showSpookyMessage();
    }

    // 10% chance to make planchette shake
    if (rand > 0.8 && rand < 0.9) {
        planchetteJitter();
    }
}

// Ghostly flash effect
function showGhostlyFlash() {
    const flash = document.createElement('div');
    flash.className = 'ghostly-flash';
    ouijaBoard.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
}

// Show spooky message
function showSpookyMessage() {
    const message = spookyMessages[Math.floor(Math.random() * spookyMessages.length)];
    const msgEl = document.createElement('div');
    msgEl.className = 'spooky-message';
    msgEl.textContent = message;
    ouijaBoard.appendChild(msgEl);
    setTimeout(() => msgEl.remove(), 2000);
}

// Planchette jitter
function planchetteJitter() {
    planchette.classList.add('shaking');
    setTimeout(() => {
        planchette.classList.remove('shaking');
    }, 500);
}

// Keyboard handlers
document.addEventListener('keydown', (e) => {
    if (!isOuijaActive) return;

    if (e.key === 'Enter') {
        e.preventDefault();
        closeOuijaModal(true);
    } else if (e.key === 'Escape') {
        e.preventDefault();
        closeOuijaModal(false);
    }
});

// Initialize the Ouija board on load
initializeOuijaBoard();

// ==========================================
// DDR MODE IMPLEMENTATION
// ==========================================

const ddrModal = document.getElementById('ddrModal');
const ddrGame = document.getElementById('ddrGame');
const ddrLanes = document.getElementById('ddrLanes');
const ddrValue = document.getElementById('ddrValue');
const ddrFieldIndicator = document.getElementById('ddrFieldIndicator');
const ddrScore = document.getElementById('ddrScore');
const closeDdrBtn = document.getElementById('closeDdrBtn');
const switchToOuija = document.getElementById('switchToOuija');
const modeToggle = document.getElementById('modeToggle');
const originBtn = document.getElementById('originBtn');
const destinationBtn = document.getElementById('destinationBtn');

// DDR state
let ddrActive = false;
let ddrCurrentField = null;
let ddrCurrentValue = '';
let bpm = 80;
let combo = 0;
let perfectCount = 0;
let missCount = 0;
let fallingNotes = [];
let fallSpeed = 1.5;
let lastSpawnTime = 0;
let gameLoopId = null;
let ddrCurrentLetter = null;
let ddrHoverStartTime = null;
let ddrLastLetterTime = 0;

const letterGroups = {
    left: 'QWERTYUI',
    up: 'ASDFGHJK',
    down: 'ZXCVBNM',
    right: 'OPL '
};

const lanes = ['left', 'up', 'down', 'right'];

// Mode toggle
let inputMode = 'ddr'; // 'ddr' or 'ouija'

function toggleMode() {
    inputMode = inputMode === 'ddr' ? 'ouija' : 'ddr';
    updateModeButtons();
}

function updateModeButtons() {
    const originDisplay = document.getElementById('originDisplay');
    const destinationDisplay = document.getElementById('destinationDisplay');

    // Get translations from window.currentTranslations, falling back to English defaults
    const t = window.currentTranslations || {
        ddrModeBtn: 'DDR Mode',
        summonLocation: 'Summon Location',
        switchToOuija: 'Switch to Ouija Mode',
        switchToDdr: 'Switch to DDR Mode',
        danceToInput: 'Dance to input location...',
        danceToDestination: 'Dance to input destination...',
        summonFromBeyond: 'Summon location from beyond...',
        summonDestinationFromBeyond: 'Summon destination from beyond...'
    };

    if (inputMode === 'ddr') {
        originBtn.textContent = t.ddrModeBtn;
        originBtn.className = 'ddr-start-btn';
        destinationBtn.textContent = t.ddrModeBtn;
        destinationBtn.className = 'ddr-start-btn';
        modeToggle.textContent = t.switchToOuija;

        originDisplay.className = 'ddr-display empty' + (originInput.value ? '' : ' empty');
        destinationDisplay.className = 'ddr-display empty' + (destinationInput.value ? '' : ' empty');
        if (!originInput.value) originDisplay.textContent = t.danceToInput;
        if (!destinationInput.value) destinationDisplay.textContent = t.danceToDestination;
    } else {
        originBtn.textContent = t.summonLocation;
        originBtn.className = 'ouija-start-btn';
        destinationBtn.textContent = t.summonLocation;
        destinationBtn.className = 'ouija-start-btn';
        modeToggle.textContent = t.switchToDdr;

        originDisplay.className = 'ouija-display empty' + (originInput.value ? '' : ' empty');
        destinationDisplay.className = 'ouija-display empty' + (destinationInput.value ? '' : ' empty');
        if (!originInput.value) originDisplay.textContent = t.summonFromBeyond;
        if (!destinationInput.value) destinationDisplay.textContent = t.summonDestinationFromBeyond;
    }
}

modeToggle.addEventListener('click', toggleMode);

// Boring mode toggle
window.boringMode = false;
const boringModeToggle = document.getElementById('boringModeToggle');
const boringModeInputs = document.getElementById('boringModeInputs');
const funModeInputs = document.getElementById('funModeInputs');
const originBoring = document.getElementById('originBoring');
const destinationBoring = document.getElementById('destinationBoring');

boringModeToggle.addEventListener('click', () => {
    boringMode = !boringMode;

    if (boringMode) {
        // Switch to boring mode
        boringModeInputs.style.display = 'block';
        funModeInputs.style.display = 'none';
        boringModeToggle.textContent = 'Fun Mode';
        modeToggle.style.display = 'none';

        // Transfer existing values to boring inputs
        if (originInput.value) {
            originBoring.value = originInput.value;
        }
        if (destinationInput.value) {
            destinationBoring.value = destinationInput.value;
        }
    } else {
        // Switch back to fun mode
        boringModeInputs.style.display = 'none';
        funModeInputs.style.display = 'block';
        boringModeToggle.textContent = 'Boring Mode';
        modeToggle.style.display = 'inline-block';

        // Transfer boring input values back to hidden inputs
        if (originBoring.value) {
            originInput.value = originBoring.value;
            updateDisplay('origin', originBoring.value);
        }
        if (destinationBoring.value) {
            destinationInput.value = destinationBoring.value;
            updateDisplay('destination', destinationBoring.value);
        }
    }
});

// Update display for boring mode inputs
originBoring.addEventListener('input', () => {
    originInput.value = originBoring.value;
});

destinationBoring.addEventListener('input', () => {
    destinationInput.value = destinationBoring.value;
});

// ── LET IT BURN - Find Furthest City ────────────────────────────────────────
// List of major world cities with their approximate coordinates
const majorCities = [
    { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503 },
    { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093 },
    { name: 'Buenos Aires, Argentina', lat: -34.6037, lon: -58.3816 },
    { name: 'Cape Town, South Africa', lat: -33.9249, lon: 18.4241 },
    { name: 'Auckland, New Zealand', lat: -36.8485, lon: 174.7633 },
    { name: 'Reykjavik, Iceland', lat: 64.1466, lon: -21.9426 },
    { name: 'Honolulu, Hawaii', lat: 21.3099, lon: -157.8581 },
    { name: 'Anchorage, Alaska', lat: 61.2181, lon: -149.9003 },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708 },
    { name: 'Mumbai, India', lat: 19.0760, lon: 72.8777 },
    { name: 'São Paulo, Brazil', lat: -23.5505, lon: -46.6333 },
    { name: 'Moscow, Russia', lat: 55.7558, lon: 37.6173 },
    { name: 'Beijing, China', lat: 39.9042, lon: 116.4074 },
    { name: 'Lima, Peru', lat: -12.0464, lon: -77.0428 },
    { name: 'Cairo, Egypt', lat: 30.0444, lon: 31.2357 },
    { name: 'Jakarta, Indonesia', lat: -6.2088, lon: 106.8456 },
    { name: 'Madrid, Spain', lat: 40.4168, lon: -3.7038 },
    { name: 'Seoul, South Korea', lat: 37.5665, lon: 126.9780 },
    { name: 'Manila, Philippines', lat: 14.5995, lon: 120.9842 },
    { name: 'Bangkok, Thailand', lat: 13.7563, lon: 100.5018 },
    { name: 'Hong Kong', lat: 22.3193, lon: 114.1694 },
    { name: 'Karachi, Pakistan', lat: 24.8607, lon: 67.0011 },
    { name: 'Tehran, Iran', lat: 35.6892, lon: 51.3890 },
    { name: 'Lagos, Nigeria', lat: 6.5244, lon: 3.3792 },
    { name: 'Nairobi, Kenya', lat: -1.2921, lon: 36.8219 },
    { name: 'Casablanca, Morocco', lat: 33.5731, lon: -7.5898 },
    { name: 'Santiago, Chile', lat: -33.4489, lon: -70.6693 },
    { name: 'Caracas, Venezuela', lat: 10.4806, lon: -66.9036 },
    { name: 'Bogotá, Colombia', lat: 4.7110, lon: -74.0721 },
    { name: 'Mexico City, Mexico', lat: 19.4326, lon: -99.1332 },
    { name: 'Toronto, Canada', lat: 43.6532, lon: -79.3832 },
    { name: 'Vancouver, Canada', lat: 49.2827, lon: -123.1207 },
    { name: 'Chicago, USA', lat: 41.8781, lon: -87.6298 },
    { name: 'Los Angeles, USA', lat: 34.0522, lon: -118.2437 },
    { name: 'Miami, USA', lat: 25.7617, lon: -80.1918 },
    { name: 'New York, USA', lat: 40.7128, lon: -74.0060 },
    { name: 'San Francisco, USA', lat: 37.7749, lon: -122.4194 },
    { name: 'Seattle, USA', lat: 47.6062, lon: -122.3321 },
    { name: 'Boston, USA', lat: 42.3601, lon: -71.0589 },
    { name: 'Paris, France', lat: 48.8566, lon: 2.3522 },
    { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
    { name: 'Berlin, Germany', lat: 52.5200, lon: 13.4050 },
    { name: 'Rome, Italy', lat: 41.9028, lon: 12.4964 },
    { name: 'Amsterdam, Netherlands', lat: 52.3676, lon: 4.9041 },
    { name: 'Vienna, Austria', lat: 48.2082, lon: 16.3738 },
    { name: 'Athens, Greece', lat: 37.9838, lon: 23.7275 },
    { name: 'Lisbon, Portugal', lat: 38.7223, lon: -9.1393 },
    { name: 'Warsaw, Poland', lat: 52.2297, lon: 21.0122 },
    { name: 'Stockholm, Sweden', lat: 59.3293, lon: 18.0686 },
    { name: 'Oslo, Norway', lat: 59.9139, lon: 10.7522 },
    { name: 'Helsinki, Finland', lat: 60.1695, lon: 24.9354 },
    { name: 'Copenhagen, Denmark', lat: 55.6761, lon: 12.5683 },
    { name: 'Dublin, Ireland', lat: 53.3498, lon: -6.2603 },
    { name: 'Brussels, Belgium', lat: 50.8503, lon: 4.3517 },
    { name: 'Zurich, Switzerland', lat: 47.3769, lon: 8.5417 },
    { name: 'Prague, Czech Republic', lat: 50.0755, lon: 14.4378 },
    { name: 'Budapest, Hungary', lat: 47.4979, lon: 19.0402 },
    { name: 'Istanbul, Turkey', lat: 41.0082, lon: 28.9784 },
    { name: 'Kolkata, India', lat: 22.5726, lon: 88.3639 },
    { name: 'Dhaka, Bangladesh', lat: 23.8103, lon: 90.4125 },
    { name: 'Kathmandu, Nepal', lat: 27.7172, lon: 85.3238 },
    { name: 'Colombo, Sri Lanka', lat: 6.9271, lon: 79.8612 },
    { name: 'Yangon, Myanmar', lat: 16.8661, lon: 96.1951 },
    { name: 'Ho Chi Minh City, Vietnam', lat: 10.8231, lon: 106.6297 },
    { name: 'Phnom Penh, Cambodia', lat: 11.5564, lon: 104.9282 },
    { name: 'Vientiane, Laos', lat: 17.9757, lon: 102.6331 },
    { name: 'Ulaanbaatar, Mongolia', lat: 47.8863, lon: 106.9057 },
    { name: 'Pyongyang, North Korea', lat: 39.0392, lon: 125.7625 },
    { name: 'Taipei, Taiwan', lat: 25.0330, lon: 121.5654 },
    { name: 'Kuala Lumpur, Malaysia', lat: 3.1390, lon: 101.6869 },
    { name: 'Fiji', lat: -17.7134, lon: 178.0650 },
    { name: 'Papua New Guinea', lat: -9.4438, lon: 147.1803 },
    { name: 'Solomon Islands', lat: -9.6457, lon: 160.1569 },
    { name: 'Vanuatu', lat: -17.7444, lon: 168.3201 },
    { name: 'Samoa', lat: -13.7590, lon: -172.1046 },
    { name: 'Tonga', lat: -21.1790, lon: -175.1982 },
];

// Calculate distance using Haversine formula
function calculateDistanceToCity(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Find and set furthest city
async function findFurthestCity() {
    const originValue = boringMode
        ? document.getElementById('originBoring').value.trim()
        : originInput.value.trim();

    if (!originValue) {
        alert('Please enter an origin first!');
        return;
    }

    try {
        // Geocode the origin
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(originValue)}&addressdetails=1`,
            { headers: { 'User-Agent': 'CarbonCalculator/1.0' } }
        );
        const data = await response.json();

        if (data.length === 0) {
            alert(`Could not find location: "${originValue}"`);
            return;
        }

        const originLat = parseFloat(data[0].lat);
        const originLon = parseFloat(data[0].lon);

        // Calculate distances to all major cities
        let furthestCity = null;
        let maxDistance = 0;

        for (const city of majorCities) {
            const distance = calculateDistanceToCity(originLat, originLon, city.lat, city.lon);
            if (distance > maxDistance) {
                maxDistance = distance;
                furthestCity = city;
            }
        }

        if (furthestCity) {
            // Set the destination
            destinationInput.value = furthestCity.name;

            if (boringMode) {
                document.getElementById('destinationBoring').value = furthestCity.name;
            } else {
                const display = document.getElementById('destinationDisplay');
                display.textContent = furthestCity.name;
                display.classList.remove('empty');
            }
        }

    } catch (error) {
        console.error('Error finding furthest city:', error);
        alert('Failed to find furthest city. Please try again.');
    }
}

// Add event listeners to both "Let it burn" buttons
document.getElementById('furthestBtn').addEventListener('click', findFurthestCity);
document.getElementById('furthestBtnBoring').addEventListener('click', findFurthestCity);

// DDR button handlers
originBtn.addEventListener('click', () => {
    if (inputMode === 'ddr') {
        openDdrModal('origin');
    } else {
        currentField = 'origin';
        currentValue = '';
        ouijaFieldIndicator.textContent = 'ORIGIN';
        ouijaValue.innerHTML = '_ <span class="cursor"></span>';
        openOuijaModal();
    }
});

destinationBtn.addEventListener('click', () => {
    if (inputMode === 'ddr') {
        openDdrModal('destination');
    } else {
        currentField = 'destination';
        currentValue = '';
        ouijaFieldIndicator.textContent = 'DESTINATION';
        ouijaValue.innerHTML = '_ <span class="cursor"></span>';
        openOuijaModal();
    }
});

// Switch from DDR to Ouija mid-game
switchToOuija.addEventListener('click', () => {
    closeDdrModal(false);
    inputMode = 'ouija';
    updateModeButtons();

    // Open Ouija modal for same field
    setTimeout(() => {
        if (ddrCurrentField) {
            currentField = ddrCurrentField;
            currentValue = ddrCurrentValue;
            ouijaFieldIndicator.textContent = currentField === 'origin' ? 'ORIGIN' : 'DESTINATION';
            ouijaValue.innerHTML = (currentValue || '_') + ' <span class="cursor"></span>';
            openOuijaModal();
        }
    }, 100);
});

function openDdrModal(field) {
    ddrCurrentField = field;
    ddrCurrentValue = '';
    ddrFieldIndicator.textContent = field === 'origin' ? 'ORIGIN' : 'DESTINATION';
    ddrValue.innerHTML = '_ <span class="cursor"></span>';

    // Reset game state
    combo = 0;
    perfectCount = 0;
    missCount = 0;
    fallSpeed = 3;
    fallingNotes = [];
    updateDdrScore();

    // Clear any existing notes
    document.querySelectorAll('.ddr-note').forEach(n => n.remove());

    ddrModal.classList.add('active');
    ddrActive = true;

    // Start game loop
    lastSpawnTime = Date.now();
    gameLoopId = requestAnimationFrame(ddrGameLoop);
}

function closeDdrModal(save = false) {
    ddrModal.classList.remove('active');
    ddrActive = false;

    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }

    // Clear falling notes
    fallingNotes = [];
    document.querySelectorAll('.ddr-note').forEach(n => n.remove());

    if (save && ddrCurrentValue) {
        if (ddrCurrentField === 'origin') {
            originInput.value = ddrCurrentValue;
            const display = document.getElementById('originDisplay');
            display.textContent = ddrCurrentValue;
            display.classList.remove('empty');
        } else {
            destinationInput.value = ddrCurrentValue;
            const display = document.getElementById('destinationDisplay');
            display.textContent = ddrCurrentValue;
            display.classList.remove('empty');
        }
    }

    ddrCurrentField = null;
    ddrCurrentValue = '';
}

closeDdrBtn.addEventListener('click', () => closeDdrModal(false));

// DDR Game Loop
function ddrGameLoop() {
    if (!ddrActive) return;

    const now = Date.now();

    // Spawn new letters every beat (quarter notes at BPM)
    const beatInterval = (60000 / bpm) / 4; // 4 spawns per beat
    if (now - lastSpawnTime > beatInterval) {
        spawnRandomLetter();
        lastSpawnTime = now;
    }

    // Update falling note positions
    updateFallingNotes();

    gameLoopId = requestAnimationFrame(ddrGameLoop);
}

// Spawn a random letter in a random lane
function spawnRandomLetter() {
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    const letters = letterGroups[lane];
    const letter = letters[Math.floor(Math.random() * letters.length)];

    const note = {
        id: Date.now() + Math.random(),
        lane: lane,
        letter: letter,
        y: -50,
        hit: false
    };

    fallingNotes.push(note);
    createNoteElement(note);
}

// Create DOM element for falling note
function createNoteElement(note) {
    const el = document.createElement('div');
    el.className = `ddr-note ddr-note-${note.lane}`;
    el.id = `note-${note.id}`;
    el.textContent = note.letter;

    const lane = document.querySelector(`.ddr-lane[data-direction="${note.lane}"]`);
    if (lane) {
        el.style.left = '50%';
        el.style.transform = 'translateX(-50%)';
        el.style.top = note.y + 'px';
        lane.appendChild(el);
    }
}

// Update note element position
function updateNoteElement(note) {
    const el = document.getElementById(`note-${note.id}`);
    if (el) el.style.top = note.y + 'px';
}

// Remove note element
function removeNoteElement(note) {
    const el = document.getElementById(`note-${note.id}`);
    if (el) el.remove();
}

// Update all falling note positions
function updateFallingNotes() {
    const laneHeight = 400;
    const targetY = laneHeight - 60; // Target zone position

    fallingNotes.forEach(note => {
        if (note.hit) return;

        note.y += fallSpeed;
        updateNoteElement(note);

        // Check if note fell off screen (miss)
        if (note.y > laneHeight) {
            note.hit = true;
            combo = 0;
            missCount++;
            showDdrFeedback('MISS', 'miss');
            updateDdrScore();
            removeNoteElement(note);
        }
    });

    // Clean up hit notes
    fallingNotes = fallingNotes.filter(n => !n.hit || n.y <= laneHeight);
}

// Handle arrow key press
function handleArrowPress(direction) {
    if (!ddrActive) return;

    const laneHeight = 400;
    const targetY = laneHeight - 60;
    const hitWindow = 60; // ±60px window

    // Find lowest unhit note in this lane within hit window
    const notesInLane = fallingNotes
        .filter(n => n.lane === direction && !n.hit)
        .sort((a, b) => b.y - a.y);

    const hitNote = notesInLane.find(note => {
        return Math.abs(note.y - targetY) <= hitWindow;
    });

    if (hitNote) {
        // Hit!
        hitNote.hit = true;
        addDdrLetter(hitNote.letter);
        combo++;
        perfectCount++;

        // Visual feedback on arrow
        const arrowTarget = document.querySelector(`.ddr-lane[data-direction="${direction}"] .ddr-arrow-target`);
        if (arrowTarget) {
            arrowTarget.classList.add('active');
            setTimeout(() => arrowTarget.classList.remove('active'), 200);
        }

        showDdrFeedback('PERFECT!', 'perfect');
        showCombo();
        updateDdrScore();
        removeNoteElement(hitNote);

        // Increase difficulty every 10 combo
        if (combo % 10 === 0 && fallSpeed < 8) {
            fallSpeed += 0.3;
            bpm += 3;
        }
    } else {
        // Miss - pressed too early or lane was empty
        combo = 0;
        missCount++;
        showDdrFeedback('MISS', 'miss');
        updateDdrScore();
    }
}

// Add a letter to the current value
function addDdrLetter(letter) {
    if (ddrCurrentValue.length < 50) {
        ddrCurrentValue += letter;
        updateDdrDisplay();
    }
}

// Update the DDR display
function updateDdrDisplay() {
    const displayValue = ddrCurrentValue || '_';
    ddrValue.innerHTML = `${displayValue} <span class="cursor"></span>`;
}

// Update DDR score display
function updateDdrScore() {
    ddrScore.textContent = `Perfect: ${perfectCount} | Miss: ${missCount}`;
}

// Show feedback message
function showDdrFeedback(text, type) {
    const feedback = document.createElement('div');
    feedback.className = `ddr-feedback ${type}`;
    feedback.textContent = text;
    ddrGame.appendChild(feedback);
    setTimeout(() => feedback.remove(), 400);
}

// Show combo counter
function showCombo() {
    if (combo > 1) {
        const comboEl = document.createElement('div');
        comboEl.className = 'ddr-combo';
        comboEl.textContent = `${combo} COMBO!`;
        ddrGame.appendChild(comboEl);
        setTimeout(() => comboEl.remove(), 500);
    }
}

// Keyboard handlers for DDR
document.addEventListener('keydown', (e) => {
    if (!ddrActive) return;

    const key = e.key.toLowerCase();

    // Arrow keys
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleArrowPress('left');
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleArrowPress('up');
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleArrowPress('down');
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleArrowPress('right');
    }
    // WASD keys
    else if (key === 'a') {
        e.preventDefault();
        handleArrowPress('left');
    } else if (key === 'w') {
        e.preventDefault();
        handleArrowPress('up');
    } else if (key === 's') {
        e.preventDefault();
        handleArrowPress('down');
    } else if (key === 'd') {
        e.preventDefault();
        handleArrowPress('right');
    }
    // Enter to finish
    else if (e.key === 'Enter') {
        e.preventDefault();
        closeDdrModal(true);
    }
    // ESC to cancel
    else if (e.key === 'Escape') {
        e.preventDefault();
        closeDdrModal(false);
    }
});

