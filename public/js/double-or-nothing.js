// Double or Nothing - A rigged gambling game (always lose!)
// Modal for the Evil Carbon Emissions Calculator

let selectedTransportMode = null;
let selectedEmissions = null;

// ── Initialize Double or Nothing Modal ────────────────────────────────────────
function initializeDoubleOrNothing() {
    const gridContainer = document.getElementById('donTransportGrid');
    if (!gridContainer) return;

    // Clear existing content
    gridContainer.innerHTML = '';

    // Populate grid with transport modes
    transportModes.forEach(mode => {
        const option = document.createElement('div');
        option.className = 'don-transport-option';
        option.dataset.mode = mode.name;
        option.innerHTML = `
            <span class="don-transport-icon">${mode.icon}</span>
            <span class="don-transport-name">${mode.name}</span>
        `;
        option.addEventListener('click', () => selectTransport(mode.name, option));
        gridContainer.appendChild(option);
    });
}

// ── Select Transport Mode ─────────────────────────────────────────────────────
function selectTransport(modeName, optionElement) {
    selectedTransportMode = modeName;

    // Remove selected class from all options
    document.querySelectorAll('.don-transport-option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Add selected class to clicked option
    optionElement.classList.add('selected');

    // Hide transport selection and show coin
    const transportSelection = document.getElementById('donTransportSelection');
    const coinSection = document.getElementById('donCoinSection');
    transportSelection.classList.add('hidden');
    coinSection.classList.remove('hidden');

    // Enable flip button
    const flipBtn = document.getElementById('donFlipBtn');
    if (flipBtn) {
        flipBtn.disabled = false;
    }
}

// ── Flip Coin (RIGGED - Always lose!) ───────────────────────────────────────────
function flipCoin() {
    if (!selectedTransportMode) return;

    const coin = document.getElementById('donCoin');
    const flipBtn = document.getElementById('donFlipBtn');

    // Disable button during animation
    flipBtn.disabled = true;
    flipBtn.textContent = 'FLIPPING...';

    // Start coin flip animation (3 seconds)
    // RIGGED: Always land on tails (lose) - lots of rotations + 180deg
    // 1800deg = 5 full rotations, then +180deg to land on tails
    coin.style.transition = 'transform 3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    coin.style.transform = 'rotateY(1980deg)';

    // After animation, show loss result
    setTimeout(() => {
        showResult(false);
        flipBtn.textContent = 'FLIP THE COIN';
    }, 3000);
}

// ── Show Result ───────────────────────────────────────────────────────────────
function showResult(won) {
    const resultSection = document.getElementById('donResult');
    const coinSection = document.getElementById('donCoinSection');
    const transportSelection = document.getElementById('donTransportSelection');
    const flipBtn = document.getElementById('donFlipBtn');

    // Hide game sections, show result
    coinSection.classList.add('hidden');
    transportSelection.classList.add('hidden');
    flipBtn.classList.add('hidden');
    resultSection.classList.remove('hidden');

    // Calculate doubled emissions for taunting
    let doubledValueText = '';
    if (selectedEmissions !== null) {
        const doubled = selectedEmissions * 2;
        if (doubled >= 1000) {
            doubledValueText = `${(doubled / 1000).toFixed(1)} tonnes`;
        } else {
            doubledValueText = `${Math.round(doubled).toLocaleString()} kg`;
        }
    }

    if (won) {
        // This should never happen (rigged game)
        resultSection.innerHTML = `
            <div class="don-result-title">You Won!</div>
            <div class="don-result-message">Trees planted (just kidding)</div>
            <button class="don-close-btn" onclick="closeDoubleOrNothing()">Close</button>
        `;
    } else {
        // Loss result - show tyres image and doubled emissions
        resultSection.innerHTML = `
            <div class="don-result-title don-result-title--lose">You Lose!</div>
            <div class="don-tyres-container">
                <img src="/assets/tyres.avif" alt="Tyres" class="don-tyres-image">
            </div>
            ${doubledValueText ? `<div class="don-doubled-value">Instead of saving emissions, you now have: ${doubledValueText}</div>` : ''}
            <div class="don-result-message">More emissions for everyone!</div>
            <button class="don-close-btn" onclick="closeDoubleOrNothing()">Accept Your Fate</button>
        `;
    }
}

// ── Open Double or Nothing Modal ───────────────────────────────────────────────
function openDoubleOrNothing(preselectedMode = null, emissions = null) {
    const modal = document.getElementById('donModal');
    const resultSection = document.getElementById('donResult');
    const coinSection = document.getElementById('donCoinSection');
    const transportSelection = document.getElementById('donTransportSelection');
    const flipBtn = document.getElementById('donFlipBtn');
    const coin = document.getElementById('donCoin');

    // Store emissions for result display
    selectedEmissions = emissions;

    // Reset modal state
    resultSection.classList.add('hidden');
    coinSection.classList.add('hidden'); // Initially hidden, shown after mode selection
    transportSelection.classList.remove('hidden');
    flipBtn.classList.remove('hidden');
    flipBtn.disabled = true;
    flipBtn.textContent = 'FLIP THE COIN';
    coin.style.transition = 'none';
    coin.style.transform = 'rotateY(0deg)';
    selectedTransportMode = null;

    // Initialize transport grid
    initializeDoubleOrNothing();

    // Pre-select transport mode if provided
    if (preselectedMode) {
        const optionElement = document.querySelector(`.don-transport-option[data-mode="${preselectedMode}"]`);
        if (optionElement) {
            selectTransport(preselectedMode, optionElement);
        }
    }

    // Show modal
    modal.classList.add('show');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// ── Close Double or Nothing Modal ──────────────────────────────────────────────
function closeDoubleOrNothing() {
    const modal = document.getElementById('donModal');

    modal.classList.remove('show');

    // Restore body scroll
    document.body.style.overflow = '';
}

// ── Event Listeners ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Close button
    const closeBtn = document.getElementById('donCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDoubleOrNothing);
    }

    // Flip button
    const flipBtn = document.getElementById('donFlipBtn');
    if (flipBtn) {
        flipBtn.addEventListener('click', flipCoin);
    }

    // Close on backdrop click
    const modal = document.getElementById('donModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeDoubleOrNothing();
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeDoubleOrNothing();
        }
    });
});
