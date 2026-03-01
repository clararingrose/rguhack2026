// Carbon Emissions Leaderboard
// Ranks users by carbon emissions (ascending - lower is better)

// ── Bot competitors data (normal names, carbon-based scores) ──────────────────
const leaderboardData = [
    { rank: 1, name: 'John Smith', emissions: 0.5, stats: '1 calculation', bot: true },
    { rank: 2, name: 'Emma Johnson', emissions: 2.3, stats: '12 calculations', bot: true },
    { rank: 3, name: 'Michael Williams', emissions: 5.7, stats: '8 calculations', bot: true },
    { rank: 4, name: 'Sarah Brown', emissions: 12.4, stats: '15 calculations', bot: true },
    { rank: 5, name: 'David Jones', emissions: 23.1, stats: '22 calculations', bot: true },
    // Taylor Swift at the end (rank will be set dynamically based on population)
    { name: 'Taylor Swift', emissions: 75000000, stats: 'Private jet enthusiast', bot: true, taylor: true },
];

// ── Get user's emissions from localStorage ──────────────────────────────────────
function getUserEmissions() {
    const stored = localStorage.getItem('totalEmissions');
    if (stored) {
        const value = parseFloat(stored);
        if (value > 0) {
            return value;
        }
    }
    // Auto-set to 150.5 kg if not set or zero
    const defaultValue = 150.5;
    localStorage.setItem('totalEmissions', defaultValue.toString());
    return defaultValue;
}

// ── Format emissions for display ────────────────────────────────────────────────
function formatEmissions(emissions) {
    if (emissions >= 1000) {
        const kg = (emissions / 1000).toFixed(1);
        return `${kg.endsWith('.0') ? Math.round(emissions / 1000) : kg} kg`;
    }
    return `${emissions.toFixed(1)} g`;
}

// ── Population counter state ─────────────────────────────────────────────────────
let currentPopulation = 8006215112;
let incrementInterval = null;
let decrementInterval = null;

// ── Update population counter (Taylor's rank) ────────────────────────────────────
function updatePopulationCounter() {
    // Update Taylor's rank in the data
    const taylorEntry = leaderboardData.find(entry => entry.taylor);
    if (taylorEntry) {
        taylorEntry.rank = currentPopulation;
    }

    // Update the static table cell if it exists
    const taylorRankCell = document.getElementById('taylorRankCell');
    if (taylorRankCell) {
        taylorRankCell.textContent = currentPopulation.toLocaleString();
    }
}

// ── Start population counter intervals ───────────────────────────────────────────
function startPopulationCounter() {
    // Clear any existing intervals first
    if (incrementInterval) clearInterval(incrementInterval);
    if (decrementInterval) clearInterval(decrementInterval);

    // Increment population every 0.6 seconds
    incrementInterval = setInterval(() => {
        currentPopulation += 1;
        updatePopulationCounter();
    }, 600);

    // Decrement population every 1 second
    decrementInterval = setInterval(() => {
        currentPopulation -= 1;
        updatePopulationCounter();
    }, 1000);
}

// ── Build leaderboard with user included ────────────────────────────────────────
function buildLeaderboard() {
    const userEmissions = getUserEmissions();

    // Create a copy of leaderboard data
    let fullLeaderboard = [...leaderboardData];

    // Add user to the leaderboard
    const userEntry = {
        name: 'You',
        emissions: userEmissions,
        stats: 'Your total emissions',
        bot: false,
        user: true
    };

    fullLeaderboard.push(userEntry);

    // Sort by emissions (ascending - lower is better)
    fullLeaderboard.sort((a, b) => a.emissions - b.emissions);

    // Assign ranks
    fullLeaderboard.forEach((entry, index) => {
        if (!entry.taylor) {
            entry.rank = index + 1;
        }
    });

    return fullLeaderboard;
}

// ── Render the leaderboard table ────────────────────────────────────────────────
function renderLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    if (!tbody) return;

    const leaderboard = buildLeaderboard();
    const userEmissions = getUserEmissions();

    // Find user's rank
    const userEntry = leaderboard.find(entry => entry.user);
    const userRank = userEntry ? userEntry.rank : '-';

    // Update user banner
    document.getElementById('userEmissions').textContent = formatEmissions(userEmissions);
    document.getElementById('userRank').textContent = userRank;

    // Render table rows
    tbody.innerHTML = leaderboard.map((entry, index) => {
        const rankClass = entry.rank === 1 ? 'rank-1' :
                         entry.rank === 2 ? 'rank-2' :
                         entry.rank === 3 ? 'rank-3' : '';

        const rowClass = entry.user ? 'user-row' :
                        entry.taylor ? 'taylor-row' : '';

        const emissionsClass = entry.emissions > 10000 ? 'high' : '';
        const taylorNote = entry.taylor ? ' ✈️' : '';

        // Format rank for Taylor (show population number)
        const displayRank = entry.taylor ?
            entry.rank.toLocaleString() :
            `<span class="rank-cell ${rankClass}">${entry.rank}</span>`;

        return `
            <tr class="${rowClass}">
                <td class="rank-cell">${displayRank}</td>
                <td class="name-cell">${entry.name}${taylorNote}</td>
                <td class="emissions-cell ${emissionsClass}">${formatEmissions(entry.emissions)}</td>
                <td class="stats-cell">${entry.stats}</td>
            </tr>
        `;
    }).join('');
}

// ── Initialize leaderboard ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    updatePopulationCounter();
    startPopulationCounter();
});

// ── Save emissions from calculator (to be called from calculator.js) ─────────────
function saveEmissions(emissionsKg) {
    const current = getUserEmissions();
    const newTotal = current + emissionsKg;
    localStorage.setItem('totalEmissions', newTotal.toString());

    // If on leaderboard page, refresh the display
    if (document.getElementById('leaderboardBody')) {
        renderLeaderboard();
    }
}

// ── Reset user emissions (for testing) ──────────────────────────────────────────
function resetUserEmissions() {
    localStorage.removeItem('totalEmissions');
    if (document.getElementById('leaderboardBody')) {
        renderLeaderboard();
    }
}

// Make saveEmissions available globally for calculator.js to call
window.saveEmissions = saveEmissions;
window.resetUserEmissions = resetUserEmissions;

// ── Give user some initial carbon emissions for testing ─────────────────────────
function giveMeCarbon() {
    localStorage.setItem('totalEmissions', '150.5');
    if (document.getElementById('leaderboardBody')) {
        renderLeaderboard();
    }
}
window.giveMeCarbon = giveMeCarbon;
