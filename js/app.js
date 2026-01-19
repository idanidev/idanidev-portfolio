/**
 * Portfolio Main Application
 * Handles interactions, navigation, and UI behaviors
 */

class Portfolio {
    constructor() {
        this.cursor = new CustomCursor();
        this.navigation = new Navigation();
        this.interactions = new Interactions();
    }
}

/**
 * Custom Cursor Handler
 */
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorDot = document.querySelector('.cursor-dot');
        this.init();
    }

    init() {
        if (!this.cursor || !this.cursorDot) return;

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            anime({
                targets: this.cursor,
                left: e.clientX - 10,
                top: e.clientY - 10,
                duration: 100,
                easing: 'easeOutQuad'
            });

            anime({
                targets: this.cursorDot,
                left: e.clientX - 3,
                top: e.clientY - 3,
                duration: 50,
                easing: 'easeOutQuad'
            });
        });

        // Hover effects
        const hoverElements = document.querySelectorAll(
            'a, button, .btn, .skill-card, .project-card, .timeline-content, .contact-item'
        );

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }
}

/**
 * Navigation Handler
 */
class Navigation {
    constructor() {
        this.nav = document.querySelector('nav');
        this.init();
    }

    init() {
        if (!this.nav) return;

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    const targetPosition = target.offsetTop - 80;

                    anime({
                        targets: document.documentElement,
                        scrollTop: targetPosition,
                        duration: 1000,
                        easing: 'easeInOutQuad'
                    });
                }
            });
        });

        // Nav background on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                this.nav.style.background = 'rgba(10, 10, 15, 0.95)';
            } else {
                this.nav.style.background = 'rgba(10, 10, 15, 0.8)';
            }
        });

        // Active nav link on scroll
        this.updateActiveNavLink();
        window.addEventListener('scroll', () => this.updateActiveNavLink());
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = '';
                });
                navLink.style.color = 'var(--accent-cyan)';
            }
        });
    }
}

/**
 * Interactive Elements Handler
 */
class Interactions {
    constructor() {
        this.initMagneticButtons();
        this.initContactCard();
        this.initSkillCardHover();
        this.initProjectCardHover();
    }

    /**
     * Magnetic effect for buttons
     */
    initMagneticButtons() {
        const magneticBtns = document.querySelectorAll('.magnetic');

        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                anime({
                    targets: btn,
                    translateX: x * 0.2,
                    translateY: y * 0.2,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    translateX: 0,
                    translateY: 0,
                    duration: 500,
                    easing: 'easeOutElastic(1, .6)'
                });
            });
        });
    }

    /**
     * 3D contact card interaction
     */
    initContactCard() {
        const card = document.querySelector('.contact-card-3d');
        const cardContainer = document.querySelector('.contact-visual');

        if (!card || !cardContainer) return;

        cardContainer.addEventListener('mousemove', (e) => {
            const rect = cardContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            anime({
                targets: card,
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        cardContainer.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                rotateX: 5,
                rotateY: -15,
                duration: 600,
                easing: 'easeOutElastic(1, .6)'
            });
        });
    }

    /**
     * Skill card hover effects
     */
    initSkillCardHover() {
        const skillCards = document.querySelectorAll('.skill-card');

        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.skill-icon');

                anime({
                    targets: icon,
                    scale: 1.1,
                    rotate: '1turn',
                    duration: 600,
                    easing: 'easeOutElastic(1, .6)'
                });

                anime({
                    targets: card.querySelectorAll('.skill-tag'),
                    scale: [1, 1.05, 1],
                    duration: 400,
                    easing: 'easeInOutQuad',
                    delay: anime.stagger(50)
                });
            });

            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.skill-icon');

                anime({
                    targets: icon,
                    scale: 1,
                    rotate: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    /**
     * Project card hover effects
     */
    initProjectCardHover() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const mockup = card.querySelector('.project-mockup');

                if (mockup) {
                    anime({
                        targets: mockup.querySelectorAll('.mockup-line'),
                        translateX: [0, 5, 0],
                        duration: 800,
                        easing: 'easeInOutQuad',
                        delay: anime.stagger(50)
                    });
                }

                anime({
                    targets: card.querySelectorAll('.project-tech span'),
                    scale: [1, 1.05, 1],
                    duration: 400,
                    easing: 'easeInOutQuad',
                    delay: anime.stagger(30)
                });
            });
        });
    }
}

/**
 * Performance Monitor (Optional)
 */
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frames = 0;
        this.init();
    }

    init() {
        if (window.location.search.includes('debug')) {
            this.createFPSCounter();
            this.startMonitoring();
        }
    }

    createFPSCounter() {
        const counter = document.createElement('div');
        counter.id = 'fps-counter';
        counter.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00f5d4;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            z-index: 10000;
        `;
        document.body.appendChild(counter);
    }

    startMonitoring() {
        const measure = () => {
            const currentTime = performance.now();
            this.frames++;

            if (currentTime >= this.lastTime + 1000) {
                this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
                this.frames = 0;
                this.lastTime = currentTime;

                const counter = document.getElementById('fps-counter');
                if (counter) {
                    counter.textContent = `FPS: ${this.fps}`;
                }
            }

            requestAnimationFrame(measure);
        };

        requestAnimationFrame(measure);
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    const perfMonitor = new PerformanceMonitor();

    console.log('%c✨ Portfolio Loaded Successfully', 'color: #00f5d4; font-size: 16px; font-weight: bold;');
    console.log('%cDeveloped by Daniel Benito Díaz', 'color: #9b5de5; font-size: 12px;');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, CustomCursor, Navigation, Interactions };
}
