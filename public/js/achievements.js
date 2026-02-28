// ==========================================

const achievements = [
    { id: 'first_click', name: 'First Steps', desc: 'You clicked something. Good job!', icon: '👆', xp: 5, rarity: 'common' },
    { id: 'page_loaded', name: 'Page Loader', desc: 'You loaded the page. Achievement unlocked!', icon: '📄', xp: 10, rarity: 'common' },
    { id: 'carbon_emitter', name: 'Carbon Emitter', desc: 'You emitted carbon. The planet cries.', icon: '🏭', xp: 50, rarity: 'common' },
    { id: 'mouse_mover', name: 'Mouse Mover', desc: 'You moved your mouse 100 times', icon: '🖱️', xp: 5, rarity: 'common' },
    { id: 'scrolled', name: 'Scroller', desc: 'You scrolled down. Are you proud?', icon: '📜', xp: 15, rarity: 'common' },
    { id: 'tab_switcher', name: 'Tab Switcher', desc: 'Nice try switching tabs, we noticed', icon: '🔄', xp: 25, rarity: 'rare' },
    { id: 'slow_reader', name: 'Slow Reader', desc: 'You\'ve been on this page for 30 seconds', icon: '🐢', xp: 20, rarity: 'common' },
    { id: 'window_resizer', name: 'Window Resizer', desc: 'You changed the window size', icon: '📐', xp: 10, rarity: 'common' },
    { id: 'idle_hands', name: 'Idle Hands', desc: 'You did nothing for 10 seconds', icon: '💤', xp: 30, rarity: 'rare' },
    { id: 'speed_clicker', name: 'Speed Clicker', desc: 'You clicked 5 times in 1 second', icon: '⚡', xp: 100, rarity: 'rare' },
    { id: 'exists', name: 'Existence', desc: 'You exist. Congratulations?', icon: '🌟', xp: 1, rarity: 'common' },
    { id: 'breather', name: 'Breather', desc: 'You\'re still breathing. Keep it up!', icon: '😮', xp: 5, rarity: 'common' },
    { id: 'not_a_robot', name: 'Not a Robot', desc: 'We\'re 51% sure you\'re human', icon: '🤖', xp: 75, rarity: 'rare' },
    { id: 'loser', name: 'Loser', desc: 'You\'re reading achievement descriptions', icon: '📖', xp: -10, rarity: 'common' },
    { id: 'tryhard', name: 'Try Hard', desc: 'You\'re trying to get achievements', icon: '🎯', xp: 0, rarity: 'common' },
    { id: 'impossible_1', name: 'Impossible I', desc: '0.0001% chance. Want it? Keep dreaming.', icon: '💀', xp: 999999, rarity: 'impossible' },
    { id: 'impossible_2', name: 'Impossible II', desc: 'You\'ll never get this', icon: '🏆', xp: 9999999, rarity: 'impossible' },
    { id: 'serial_calculator', name: 'Serial Calculator', desc: 'Calculate 3 routes', icon: '🔢', xp: 150, rarity: 'rare' },
    { id: 'world_traveler', name: 'World Traveler', desc: 'Travel 10000+ km total', icon: '🌍', xp: 500, rarity: 'rare' },
    { id: 'eco_destroyer', name: 'Eco Destroyer', desc: 'Emit 1000+ kg CO2', icon: '🔥', xp: 200, rarity: 'rare' },
];

const unlockedAchievements = new Set();
let totalXP = 0;
let clickCount = 0;
let lastClickTime = 0;
let scrollDistance = 0;
let lastScrollPos = 0;
let idleTime = 0;
let calculationCount = 0;
let totalDistance = 0;
let totalEmissions = 0;

function showAchievement(achievement) {
    if (unlockedAchievements.has(achievement.id)) return;
    unlockedAchievements.add(achievement.id);
    totalXP += achievement.xp;

    const popup = document.createElement('div');
    popup.className = `achievement-popup ${achievement.rarity}`;
    popup.innerHTML = `
        <div class="achievement-xp">+${achievement.xp > 0 ? achievement.xp : achievement.xp} XP</div>
        <div class="achievement-header">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-title">${achievement.rarity === 'impossible' ? 'IMPOSSIBLE' : achievement.rarity} Achievement</div>
        </div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-desc">${achievement.desc}</div>
    `;
    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 5000);

    // Update leaderboard
    updateLeaderboard();
}

function showMiniAchievement(text) {
    const container = document.getElementById('achievementSpam');
    const mini = document.createElement('div');
    mini.className = 'mini-achievement';
    mini.innerHTML = `<span>🎖️</span><span>${text}</span>`;
    container.appendChild(mini);
    setTimeout(() => mini.remove(), 3000);
}

// Track page load
setTimeout(() => showAchievement(achievements[0]), 2000); // First click
setTimeout(() => showAchievement(achievements[1]), 3000); // Page loaded
setTimeout(() => showAchievement(achievements[10]), 5000); // Exists
setTimeout(() => showAchievement(achievements[11]), 7000); // Breather
setTimeout(() => showAchievement(achievements[13]), 10000); // Loser

// Track clicks
document.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime < 200) {
        clickCount++;
        if (clickCount >= 5) {
            showAchievement(achievements[9]); // Speed clicker
            clickCount = 0;
        }
    } else {
        clickCount = 1;
    }
    lastClickTime = now;
});

// Track scroll
lastScrollPos = window.scrollY;
window.addEventListener('scroll', () => {
    const newPos = window.scrollY;
    scrollDistance += Math.abs(newPos - lastScrollPos);
    lastScrollPos = newPos;
    if (scrollDistance > 500) {
        showAchievement(achievements[4]); // Scroller
    }
});

// Track idle
setInterval(() => {
    idleTime++;
    if (idleTime >= 10) {
        showAchievement(achievements[8]); // Idle hands
    }
}, 1000);

document.addEventListener('mousemove', () => idleTime = 0);
document.addEventListener('keydown', () => {
    idleTime = 0;
    if (!unlockedAchievements.has(achievements[3].id)) {
        setTimeout(() => showAchievement(achievements[3]), 5000); // Mouse mover
    }
});

// Track tab visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        showAchievement(achievements[5]); // Tab switcher
    }
});

// Track window resize
window.addEventListener('resize', () => {
    if (!unlockedAchievements.has(achievements[6].id)) {
        setTimeout(() => showAchievement(achievements[6]), 1000); // Window resizer
    }
});

// Track time on page
setTimeout(() => {
    showAchievement(achievements[6]); // Slow reader
}, 30000);

// Random mini achievement spam
setInterval(() => {
    if (Math.random() > 0.7) {
        const spamTexts = [
            'Still here?',
            'You\'re doing great!',
            'Keep clicking!',
            'Achievement unlocked!',
            'Just kidding',
            'Or are we?',
            'Click more!',
            'Almost there...',
            'Not really though',
            '🎉 Congratulations! 🎉',
        ];
        showMiniAchievement(spamTexts[Math.floor(Math.random() * spamTexts.length)]);
    }
}, 8000);

// Random impossible achievement (0.0001% chance per second)
setInterval(() => {
    if (Math.random() < 0.000001) {
        showAchievement(achievements[15]); // Impossible I
    }
    if (Math.random() < 0.0000001) {
        showAchievement(achievements[16]); // Impossible II
    }
}, 1000);

// Track calculations
const originalCalculate = calculateBtn.onclick;
calculateBtn.addEventListener('click', () => {
    setTimeout(() => {
        calculationCount++;
        totalDistance += parseFloat(distanceValue.textContent) || 0;

        // Get worst offender emissions
        const worstCard = document.querySelector('.transport-card.worst');
        if (worstCard) {
            const emissions = worstCard.querySelector('.emissions');
            if (emissions) {
                totalEmissions += parseFloat(emissions.textContent) || 0;
            }
        }

        if (!unlockedAchievements.has(achievements[2].id)) {
            showAchievement(achievements[2]); // Carbon emitter
        }

        if (calculationCount >= 3) {
            showAchievement(achievements[17]); // Serial calculator
        }

        if (totalDistance >= 10000) {
            showAchievement(achievements[18]); // World traveler
        }

        if (totalEmissions >= 1000) {
            showAchievement(achievements[19]); // Eco destroyer
        }
    }, 1000);
});

// ==========================================
// LEADERBOARD SYSTEM
// ==========================================

const leaderboardData = [
    { rank: 1, name: 'xX_CarbonKing_Xx', score: 999999999, stats: '15,847 calculations', bot: true, impossible: true },
    { rank: 2, name: 'ClimateQueen2007', score: 999888777, stats: '14,203 calculations', bot: true },
    { rank: 3, name: '🌍EcoWarrior🌍', score: 999777666, stats: '12,891 calculations', bot: true },
    { rank: 4, name: 'CarbonNite', score: 888555444, stats: '11,234 calculations', bot: true },
    { rank: 5, name: 'PlanetSaver99', score: 777444333, stats: '10,567 calculations', bot: true },
    { rank: 6, name: 'ZeroEmissionMaster', score: 666333222, stats: '9,876 calculations', bot: true },
    { rank: 7, name: 'TreeHuggerPro', score: 555222111, stats: '9,123 calculations', bot: true },
    { rank: 8, name: 'CO2Destroyer', score: 444111000, stats: '8,456 calculations', bot: true },
    { rank: 9, name: 'GreenEnergyGuru', score: 333000999, stats: '7,789 calculations', bot: true },
    { rank: 10, name: 'FootprintFighter', score: 222999888, stats: '7,234 calculations', bot: true },
    { rank: 11, name: 'SustainabilitySam', score: 222888777, stats: '6,789 calculations', bot: true },
    { rank: 12, name: 'RecyclingRon', score: 111777666, stats: '6,234 calculations', bot: true },
    { rank: 13, name: 'SolarPowerSarah', score: 111555444, stats: '5,789 calculations', bot: true },
    { rank: 14, name: 'WindPowerWill', score: 99999000, stats: '5,234 calculations', bot: true },
    { rank: 15, name: 'HybridHenry', score: 88887000, stats: '4,789 calculations', bot: true },
];

function updateLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    if (!tbody) return; // Leaderboard doesn't exist on this page
    tbody.innerHTML = '';

    // Add "you" entry
    const youScore = totalXP;
    const youEntry = {
        rank: leaderboardData.length + 1,
        name: 'You (loser)',
        score: youScore,
        stats: `${calculationCount} calculations`,
        bot: false,
        you: true
    };

    // Shuffle leaderboard occasionally
    if (Math.random() > 0.9) {
        for (let i = leaderboardData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [leaderboardData[i].score, leaderboardData[j].score] = [leaderboardData[j].score, leaderboardData[i].score];
        }
    }

    // Combine and sort
    const allEntries = [...leaderboardData, youEntry].sort((a, b) => b.score - a.score);

    allEntries.forEach((entry, index) => {
        const row = document.createElement('tr');
        if (entry.you) {
            row.classList.add('you-row');
        }

        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : entry.you ? 'you' : '';
        const rankDisplay = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1;

        const nameClass = entry.impossible ? 'impossible' : entry.bot ? 'bot' : '';
        const scoreClass = entry.impossible ? 'impossible' : entry.score < 0 ? 'negative' : '';

        row.innerHTML = `
            <td class="leaderboard-rank ${rankClass}">${rankDisplay}</td>
            <td class="leaderboard-name ${nameClass}">${entry.name}</td>
            <td class="leaderboard-score ${scoreClass}">${entry.score.toLocaleString()}</td>
            <td class="leaderboard-stats">${entry.stats}</td>
        `;

        tbody.appendChild(row);
    });

    // Update "you" position randomly to confuse
    if (Math.random() > 0.8) {
        setTimeout(() => updateLeaderboard(), 2000);
    }
}

// Initial leaderboard render
updateLeaderboard();

// Randomly update leaderboard scores to make it feel alive
setInterval(() => {
    leaderboardData.forEach(entry => {
        if (Math.random() > 0.7) {
            entry.score += Math.floor(Math.random() * 10000) - 2000;
        }
    });
    updateLeaderboard();
}, 5000);

// Show leaderboard taunts
setInterval(() => {
    if (Math.random() > 0.85) {
        const taunts = [
            'xX_CarbonKing_Xx just calculated 50 routes!',
            'ClimateQueen2007 is still ahead of you...',
            'You\'re ranked #14,293 globally!',
            'Hint: calculate more routes!',
            '⚠️ You\'re falling behind! ⚠️',
            '15 players just passed you!',
        ];
        showMiniAchievement(taunts[Math.floor(Math.random() * taunts.length)]);
    }
}, 12000);
