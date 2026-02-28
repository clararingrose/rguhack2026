// Color Blind Mode - Removes all CSS for accessibility
(function() {
    'use strict';

    const toggleBtn = document.getElementById('colorblindToggle');

    // Check for saved preference
    const isColorblindMode = localStorage.getItem('colorblindMode') === 'true';

    // Apply saved preference on load
    if (isColorblindMode) {
        enableColorblindMode();
    }

    // Toggle color blind mode
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isEnabled = toggleColorblindMode();
            localStorage.setItem('colorblindMode', isEnabled);
        });
    }

    function toggleColorblindMode() {
        const isEnabled = document.body.classList.toggle('colorblind-mode');

        if (isEnabled) {
            enableColorblindMode();
        } else {
            disableColorblindMode();
        }

        return isEnabled;
    }

    function enableColorblindMode() {
        // Store references to stylesheets before disabling
        const mainStylesheet = document.getElementById('mainStylesheet');
        const inlineStyles = document.getElementById('inlineStyles');

        // Disable main stylesheet if it exists
        if (mainStylesheet) {
            mainStylesheet.disabled = true;
        }

        // Disable inline styles if they exist
        if (inlineStyles) {
            inlineStyles.disabled = true;
        }

        // Disable all other stylesheets (including those without IDs)
        const allStylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
        allStylesheets.forEach(sheet => {
            if (sheet.id !== 'colorblindStyles') {
                sheet.dataset.wasDisabled = 'true';
                sheet.disabled = true;
            }
        });

        // Remove all inline styles from elements
        document.querySelectorAll('*[style]').forEach(el => {
            // Don't remove style from the toggle button itself
            if (el.id !== 'colorblindToggle') {
                el.dataset.originalStyle = el.getAttribute('style');
                el.removeAttribute('style');
            }
        });

        // Add basic accessibility styles back
        addColorblindStyles();

        document.body.classList.add('colorblind-mode');

        // Update button text
        if (toggleBtn) {
            toggleBtn.textContent = 'Enable CSS';
        }
    }

    function disableColorblindMode() {
        // Re-enable all stylesheets
        const allStylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
        allStylesheets.forEach(sheet => {
            if (sheet.id !== 'colorblindStyles') {
                sheet.disabled = false;
                delete sheet.dataset.wasDisabled;
            }
        });

        // Remove colorblind styles
        const colorblindStyles = document.getElementById('colorblindStyles');
        if (colorblindStyles) {
            colorblindStyles.remove();
        }

        // Restore original inline styles
        document.querySelectorAll('*[data-original-style]').forEach(el => {
            el.setAttribute('style', el.dataset.originalStyle);
            delete el.dataset.originalStyle;
        });

        document.body.classList.remove('colorblind-mode');

        // Update button text
        if (toggleBtn) {
            toggleBtn.textContent = 'Disable CSS';
        }
    }

    function addColorblindStyles() {
        // Remove existing colorblind styles if any
        const existing = document.getElementById('colorblindStyles');
        if (existing) {
            existing.remove();
        }

        const style = document.createElement('style');
        style.id = 'colorblindStyles';
        style.textContent = `
            /* Basic accessibility styles for color blind mode */
            body {
                font-family: sans-serif;
                line-height: 1.6;
                margin: 20px;
                padding: 0;
            }

            h1, h2, h3, h4, h5, h6 {
                margin-top: 1em;
                margin-bottom: 0.5em;
                font-weight: bold;
            }

            h1 { font-size: 2em; }
            h2 { font-size: 1.5em; }
            h3 { font-size: 1.17em; }

            p, ul, ol, dl {
                margin-bottom: 1em;
            }

            a {
                text-decoration: underline;
                color: #0000EE;
            }

            a:visited {
                color: #551A8B;
            }

            a:hover {
                text-decoration: none;
            }

            input, button, textarea, select {
                font-family: inherit;
                font-size: inherit;
                padding: 0.5em;
                margin: 0.25em;
            }

            button {
                cursor: pointer;
            }

            table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 1em;
            }

            th, td {
                border: 1px solid #ccc;
                padding: 0.5em;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            /* Ensure the colorblind toggle button remains visible */
            .colorblind-toggle {
                display: block !important;
                position: fixed !important;
                top: 10px !important;
                right: 10px !important;
                z-index: 999999 !important;
                padding: 10px !important;
                background: white !important;
                border: 2px solid black !important;
                color: black !important;
                font-size: 16px !important;
                transform: none !important;
            }

            /* Hide decorative elements that might interfere */
            video, .achievement-spam, .cookie-banner {
                display: none !important;
            }
        `;

        document.head.appendChild(style);
    }

})();
