/**
 * Portfolio Main Application - Optimized
 * Clean interactions without excessive animations
 */

class Portfolio {
    constructor() {
        this.navigation = new Navigation();
        this.interactions = new Interactions();
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
                        duration: 800,
                        easing: 'easeInOutQuad'
                    });
                }
            });
        });

        // Nav background on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                this.nav.style.background = 'rgba(10, 10, 15, 0.95)';
                this.nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.nav.style.background = 'rgba(10, 10, 15, 0.8)';
                this.nav.style.boxShadow = 'none';
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
 * Interactive Elements Handler - Simplified
 */
class Interactions {
    constructor() {
        this.initButtonEffects();
        this.initCardHovers();
        this.initScrollProgress();
    }

    /**
     * Subtle button effects
     */
    initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            // Click ripple effect
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                `;
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);

                anime({
                    targets: ripple,
                    scale: [0, 2],
                    opacity: [0.8, 0],
                    duration: 500,
                    easing: 'easeOutExpo',
                    complete: () => ripple.remove()
                });
            });
        });
    }

    /**
     * Card hover effects
     */
    initCardHovers() {
        // Contact items
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                anime({
                    targets: item,
                    translateX: 5,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            item.addEventListener('mouseleave', () => {
                anime({
                    targets: item,
                    translateX: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });

        // Stats on click
        document.querySelectorAll('.stat-number').forEach(stat => {
            stat.style.cursor = 'pointer';
            stat.addEventListener('click', () => {
                anime({
                    targets: stat,
                    scale: [1, 1.1, 1],
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    /**
     * Scroll progress indicator
     */
    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #00f5d4, #9b5de5, #f15bb5);
            z-index: 10000;
            transform-origin: left;
            width: 0%;
        `;
        document.body.appendChild(progressBar);

        const updateProgress = () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();

    console.log('%c✨ Portfolio Cargado', 'color: #00f5d4; font-size: 16px; font-weight: bold;');
    console.log('%cDesarrollado por Daniel Benito Díaz', 'color: #9b5de5; font-size: 12px;');
});
