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

