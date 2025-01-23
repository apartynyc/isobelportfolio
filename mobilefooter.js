document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        initializeCarousels();
        initializeBottomBar();
    }
});

function initializeCarousels() {
    const sections = document.querySelectorAll('.portfolio-section');
    
    sections.forEach(section => {
        const grid = section.querySelector('.projects-grid');
        const cards = grid.querySelectorAll('.project-card');
        
        // Create navigation dots
        const nav = document.createElement('div');
        nav.className = 'carousel-nav';
        
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => scrollToCard(grid, index));
            nav.appendChild(dot);
        });
        
        section.appendChild(nav);
        
        // Update dots on scroll
        grid.addEventListener('scroll', () => {
            const index = Math.round(grid.scrollLeft / grid.offsetWidth);
            updateDots(nav, index);
        });
    });
}

function scrollToCard(grid, index) {
    grid.scrollTo({
        left: index * grid.offsetWidth,
        behavior: 'smooth'
    });
}

function updateDots(nav, activeIndex) {
    nav.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function initializeBottomBar() {
    const bottomContainer = document.querySelector('.bottom-container');
    const bottomBar = document.querySelector('.bottom-bar');

    bottomBar.addEventListener('click', () => {
        bottomContainer.classList.toggle('visible');
    });
}