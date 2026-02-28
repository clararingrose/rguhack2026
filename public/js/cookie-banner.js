// ==========================================

const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

// Show cookie banner after a delay
setTimeout(() => {
    console.log('Showing cookie banner!');
    cookieBanner.classList.add('show');
}, 1500);

// Accept cookies
acceptCookies.addEventListener('click', () => {
    cookieBanner.classList.remove('show');
    declineCookies.style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
});

// Decline button runs away from cursor
declineCookies.addEventListener('mouseover', (e) => {
    const btn = e.target;
    const rect = btn.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Move button to body so it's not affected by parent transforms
    document.body.appendChild(btn);

    const maxX = window.innerWidth - width - 20;
    const maxY = window.innerHeight - height - 20;

    const randomX = Math.floor(Math.random() * (maxX - 20)) + 20;
    const randomY = Math.floor(Math.random() * (maxY - 20)) + 20;

    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.zIndex = '10001';
});

// Also make it run away on touch
declineCookies.addEventListener('touchstart', (e) => {
    const btn = e.target;
    const rect = btn.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Move button to body so it's not affected by parent transforms
    document.body.appendChild(btn);

    const maxX = window.innerWidth - width - 20;
    const maxY = window.innerHeight - height - 20;

    const randomX = Math.floor(Math.random() * (maxX - 20)) + 20;
    const randomY = Math.floor(Math.random() * (maxY - 20)) + 20;

    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.zIndex = '10001';
});

// Also make it run away on touch
declineCookies.addEventListener('touchstart', (e) => {
    const btn = e.target;
    const rect = btn.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const maxX = window.innerWidth - width - 20;
    const maxY = window.innerHeight - height - 20;

    const randomX = Math.floor(Math.random() * (maxX - 20)) + 20;
    const randomY = Math.floor(Math.random() * (maxY - 20)) + 20;

    btn.style.transition = 'none';
    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.width = width + 'px';
    btn.style.height = height + 'px';
    btn.style.zIndex = '10001';
    btn.style.opacity = '1';
    btn.style.visibility = 'visible';
});

// Also make it run away on touch
declineCookies.addEventListener('touchstart', (e) => {
    const btn = e.target;
    const rect = btn.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - 20;
    const maxY = window.innerHeight - rect.height - 20;

    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);

    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.width = rect.width + 'px';
    btn.style.height = rect.height + 'px';
    btn.style.zIndex = '1001';
});
