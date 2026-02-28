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

    if (inputMode === 'ddr') {
        originBtn.textContent = '💃 DDR Mode 💃';
        originBtn.className = 'ddr-start-btn';
        destinationBtn.textContent = '💃 DDR Mode 💃';
        destinationBtn.className = 'ddr-start-btn';
        modeToggle.textContent = 'Switch to 👻 Ouija Mode';

        originDisplay.className = 'ddr-display empty' + (originInput.value ? '' : ' empty');
        destinationDisplay.className = 'ddr-display empty' + (destinationInput.value ? '' : ' empty');
        if (!originInput.value) originDisplay.textContent = 'Dance to input location...';
        if (!destinationInput.value) destinationDisplay.textContent = 'Dance to input destination...';
    } else {
        originBtn.textContent = '👻 Summon Location 👻';
        originBtn.className = 'ouija-start-btn';
        destinationBtn.textContent = '👻 Summon Location 👻';
        destinationBtn.className = 'ouija-start-btn';
        modeToggle.textContent = 'Switch to 💃 DDR Mode';

        originDisplay.className = 'ouija-display empty' + (originInput.value ? '' : ' empty');
        destinationDisplay.className = 'ouija-display empty' + (destinationInput.value ? '' : ' empty');
        if (!originInput.value) originDisplay.textContent = 'Summon location from beyond...';
        if (!destinationInput.value) destinationDisplay.textContent = 'Summon destination from beyond...';
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
        boringModeToggle.textContent = '🎮 Fun Mode';
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
        boringModeToggle.textContent = '😴 Boring Mode';
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

