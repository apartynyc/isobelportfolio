class DOMLoader {
    constructor() {
        this.loadedComponents = new Set();
    }

    async loadComponent(selector, url) {
        console.log(`Attempting to load component: ${url}`);
        if (this.loadedComponents.has(url)) {
            console.log('Component already loaded');
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const content = await response.text();
            const targetElement = document.querySelector(selector);

            if (targetElement) {
                console.log('Found target element, inserting content');
                targetElement.innerHTML = content;
                this.loadedComponents.add(url);
                this.initializeInteractions();
            } else {
                console.error(`Target element not found: ${selector}`);
            }
        } catch (error) {
            console.error(`Error loading component from ${url}:`, error);
            this.handleError(selector);
        }
    }

    initializeInteractions() {
        // Initialize mobile footer behavior if on mobile
        if (window.innerWidth <= 768) {
            const bottomContainer = document.querySelector('.bottom-container');
            const bottomBar = document.querySelector('.bottom-bar');

            if (bottomBar && bottomContainer) {
                bottomBar.addEventListener('click', () => {
                    bottomContainer.classList.toggle('visible');
                });
            }
        }
    }

    handleError(selector) {
        console.log('Handling error, showing fallback content');
        const targetElement = document.querySelector(selector);
        if (targetElement) {
            targetElement.innerHTML = `
                <div class="error-message">
                    Error Loading Content
                    Please refresh the page or try again later.
                </div>
            `;
        }
    }
}

// Initialize loader
const domLoader = new DOMLoader();

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded, initializing loader');
    domLoader.loadComponent('.rightside', '/rightside.html');
});

// Export for use in other scripts if needed
window.domLoader = domLoader;