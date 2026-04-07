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
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.currentActiveId = null;
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
                    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                }
            });
        });

        // Single consolidated scroll handler
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    this.updateScrollIndicator(scrollY);
                    this.updateNavBackground(scrollY);
                    this.updateActiveNavLink(scrollY);
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });

        this.updateActiveNavLink(window.pageYOffset);
    }

    updateScrollIndicator(scrollY) {
        if (this.scrollIndicator && scrollY > 100) {
            this.scrollIndicator.classList.add('hidden');
        }
    }

    updateNavBackground(scrollY) {
        if (scrollY > 50) {
            this.nav.style.background = 'rgba(10, 10, 15, 0.95)';
            this.nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.nav.style.background = 'rgba(10, 10, 15, 0.8)';
            this.nav.style.boxShadow = 'none';
        }
    }

    updateActiveNavLink(scrollY) {
        let activeId = null;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY > sectionTop && scrollY <= sectionTop + section.offsetHeight) {
                activeId = section.getAttribute('id');
            }
        });

        if (activeId !== this.currentActiveId) {
            this.currentActiveId = activeId;
            this.navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === `#${activeId}` ? 'var(--accent-cyan)' : '';
            });
        }
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
        this.progressBar = document.getElementById('scrollProgress');
        if (!this.progressBar) return;
        this.updateScrollProgress();

        window.addEventListener('scroll', () => this.updateScrollProgress(), { passive: true });
    }

    updateScrollProgress() {
        if (!this.progressBar) return;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        this.progressBar.style.width = scrolled + '%';
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();

    console.log('%c✨ Portfolio Cargado', 'color: #00f5d4; font-size: 16px; font-weight: bold;');
    console.log('%cDesarrollado por Daniel Benito Díaz', 'color: #9b5de5; font-size: 12px;');
});
