// ==========================================

const maliciousNav = document.getElementById('maliciousNav');

// Random direction change every 5-10 seconds
setInterval(() => {
    maliciousNav.classList.toggle('reverse');
    // Random speed burst
    if (Math.random() > 0.7) {
        maliciousNav.classList.add('speed-burst');
        setTimeout(() => {
            maliciousNav.classList.remove('speed-burst');
        }, 2000);
    }
}, Math.random() * 5000 + 5000);

// Hover evasion - nav moves away when cursor approaches
// Note: mouseX and mouseY are already declared for Ouija board above
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function evadeCursor() {
    const navRect = maliciousNav.getBoundingClientRect();
    const navCenterX = navRect.left + navRect.width / 2;
    const navCenterY = navRect.top + navRect.height / 2;

    const distance = Math.sqrt(
        Math.pow(mouseX - navCenterX, 2) +
        Math.pow(mouseY - navCenterY, 2)
    );

    // If cursor is within 150px, move away
    if (distance < 150) {
        const angle = Math.atan2(navCenterY - mouseY, navCenterX - mouseX);
        const pushDistance = 200 - distance;
        const newLeft = navCenterX + Math.cos(angle) * pushDistance;
        const newTop = navCenterY + Math.sin(angle) * pushDistance;

        // Keep within viewport
        const boundedLeft = Math.max(50, Math.min(window.innerWidth - 200, newLeft - 100));
        const boundedTop = Math.max(50, Math.min(window.innerHeight - 200, newTop - 100));

        maliciousNav.style.left = boundedLeft + 'px';
        maliciousNav.style.top = boundedTop + 'px';
    }

    requestAnimationFrame(evadeCursor);
}
evadeCursor();

// Speed up on nav item hover - REMOVED to make items clickable
const navItems = document.querySelectorAll('.malicious-nav-item');
navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Nav is frozen on hover, no speed burst needed
    });
    item.addEventListener('mouseleave', () => {
        // Nav resumes spinning
    });

    // Smooth scroll for anchor links, normal navigation for others
    item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');

        // Only handle anchor links, let regular links work normally
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // If section doesn't exist, scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // 50% chance of nav "escaping" after click
        if (Math.random() > 0.5) {
            setTimeout(() => {
                maliciousNav.style.left = Math.random() * (window.innerWidth - 200) + 'px';
                maliciousNav.style.top = Math.random() * (window.innerHeight - 200) + 'px';
            }, 300);
        }
    });
});

// Emergency reset if nav goes off-screen
setInterval(() => {
    const rect = maliciousNav.getBoundingClientRect();
    if (rect.right < 0 || rect.left > window.innerWidth ||
        rect.bottom < 0 || rect.top > window.innerHeight) {
        maliciousNav.style.left = '50%';
        maliciousNav.style.top = '50%';
    }
}, 1000);

// ==========================================
// RANDOM LOCATION PICKER (Earth emoji in nav center)
// ==========================================

const navCenter = document.querySelector('.malicious-nav-center');
const randomLocations = [
    'Tokyo, Japan',
    'Paris, France',
    'New York, USA',
    'London, UK',
    'Sydney, Australia',
    'Dubai, UAE',
    'Singapore',
    'Barcelona, Spain',
    'Rome, Italy',
    'Bangkok, Thailand',
    'Istanbul, Turkey',
    'Cairo, Egypt',
    'Rio de Janeiro, Brazil',
    'Toronto, Canada',
    'Amsterdam, Netherlands',
    'Berlin, Germany',
    'Seoul, South Korea',
    'Mexico City, Mexico',
    'Mumbai, India',
    'Cape Town, South Africa',
    'Moscow, Russia',
    'Buenos Aires, Argentina',
    'Madrid, Spain',
    'Beijing, China',
    'San Francisco, USA',
    'Reykjavik, Iceland',
    'Queenstown, New Zealand',
    'Vancouver, Canada',
    'Lisbon, Portugal',
    'Prague, Czech Republic',
    'Marrakech, Morocco',
    'Kyoto, Japan',
    'Edinburgh, Scotland',
    'Vienna, Austria',
    'Athens, Greece',
    'Bali, Indonesia',
    'Dublin, Ireland',
    'Stockholm, Sweden',
    'Vancouver, Canada',
    'Zurich, Switzerland',
    'Hong Kong',
    'Melbourne, Australia',
    'Chiang Mai, Thailand',
    'Budapest, Hungary',
    'Warsaw, Poland',
    'Copenhagen, Denmark',
    'Helsinki, Finland',
    'Lagos, Nigeria',
    'Santiago, Chile',
    'Lima, Peru',
    'Bogotá, Colombia',
    'Jakarta, Indonesia',
    'Manila, Philippines',
    'Ho Chi Minh City, Vietnam',
    'Shanghai, China',
    'Oslo, Norway',
    'Wellington, New Zealand',
    'Florence, Italy',
    'Venice, Italy',
    'Bruges, Belgium',
    'Edinburgh, Scotland'
];

if (navCenter) {
    navCenter.style.cursor = 'pointer';
    navCenter.style.pointerEvents = 'auto';

    navCenter.addEventListener('click', () => {
        // Pick a random location
        const randomLocation = randomLocations[Math.floor(Math.random() * randomLocations.length)];

        // Always update destination
        const destinationInput = document.getElementById('destination');
        const destinationBoring = document.getElementById('destinationBoring');
        const destinationDisplay = document.getElementById('destinationDisplay');

        // Set the value
        destinationInput.value = randomLocation;

        // Update display if in boring mode
        if (destinationBoring) {
            destinationBoring.value = randomLocation;
        }

        // Update the display for DDR/Ouija modes
        if (destinationDisplay) {
            destinationDisplay.textContent = randomLocation;
            destinationDisplay.classList.remove('empty');
        }

        // Fun visual feedback - make the earth spin
        navCenter.style.animation = 'none';
        setTimeout(() => {
            navCenter.style.animation = 'pulse 1s ease-in-out infinite';
        }, 10);

        // Show a mini toast
        const toast = document.createElement('div');
        toast.textContent = `🌍 Random: ${randomLocation}`;
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #fff;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10001;
            font-size: 18px;
            animation: fadeInOut 2s ease-in-out forwards;
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 2000);

        // Also make the nav jump away chaotically
        setTimeout(() => {
            maliciousNav.style.left = Math.random() * (window.innerWidth - 200) + 'px';
            maliciousNav.style.top = Math.random() * (window.innerHeight - 200) + 'px';
        }, 100);
    });

    // Add CSS for toast animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
}
