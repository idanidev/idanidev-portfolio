/**
 * Mobile Menu with AnimeJS
 * Hamburger menu for mobile devices
 */

class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        // Only initialize on mobile
        if (window.innerWidth > 768) return;

        this.createHamburger();
        this.createMobileMenu();
        this.setupEventListeners();
    }

    createHamburger() {
        const nav = document.querySelector('nav');
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Menu');
        hamburger.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .hamburger {
                display: none;
                flex-direction: column;
                gap: 5px;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 8px;
                z-index: 1001;
            }

            .hamburger-line {
                width: 25px;
                height: 2px;
                background: var(--text-primary);
                border-radius: 2px;
                transition: all 0.3s ease;
            }

            .mobile-menu {
                position: fixed;
                top: 0;
                right: -100%;
                width: 70%;
                max-width: 300px;
                height: 100vh;
                background: var(--bg-secondary);
                backdrop-filter: blur(20px);
                z-index: 1000;
                padding: 5rem 2rem 2rem;
                box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
                transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .mobile-menu.active {
                right: 0;
            }

            .mobile-menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }

            .mobile-menu-overlay.active {
                opacity: 1;
                pointer-events: all;
            }

            .mobile-menu-links {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                list-style: none;
            }

            .mobile-menu-links a {
                color: var(--text-primary);
                font-size: 1.2rem;
                font-weight: 500;
                text-decoration: none;
                padding: 0.5rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
                position: relative;
            }

            .mobile-menu-links a::before {
                content: '';
                position: absolute;
                left: 0;
                bottom: -1px;
                width: 0;
                height: 2px;
                background: var(--gradient-1);
                transition: width 0.3s ease;
            }

            .mobile-menu-links a:active,
            .mobile-menu-links a:hover {
                color: var(--accent-cyan);
                transform: translateX(10px);
            }

            .mobile-menu-links a:hover::before {
                width: 100%;
            }

            @media (max-width: 768px) {
                .hamburger {
                    display: flex;
                }

                .nav-links {
                    display: none !important;
                }

                .hamburger.active .hamburger-line:nth-child(1) {
                    transform: translateY(7px) rotate(45deg);
                }

                .hamburger.active .hamburger-line:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.active .hamburger-line:nth-child(3) {
                    transform: translateY(-7px) rotate(-45deg);
                }
            }
        `;
        document.head.appendChild(style);

        nav.appendChild(hamburger);
        this.hamburger = hamburger;
    }

    createMobileMenu() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        this.overlay = overlay;

        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';

        // Get navigation links
        const navLinks = document.querySelectorAll('.nav-links a');
        const mobileLinks = document.createElement('ul');
        mobileLinks.className = 'mobile-menu-links';

        navLinks.forEach(link => {
            const li = document.createElement('li');
            const a = link.cloneNode(true);
            li.appendChild(a);
            mobileLinks.appendChild(li);
        });

        mobileMenu.appendChild(mobileLinks);
        document.body.appendChild(mobileMenu);
        this.mobileMenu = mobileMenu;
        this.mobileLinks = mobileLinks.querySelectorAll('a');
    }

    setupEventListeners() {
        // Hamburger click
        this.hamburger.addEventListener('click', () => this.toggle());

        // Overlay click
        this.overlay.addEventListener('click', () => this.close());

        // Menu links click
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });

        // Prevent scroll when menu is open
        const preventScroll = (e) => {
            if (this.isOpen) {
                e.preventDefault();
            }
        };
        document.addEventListener('touchmove', preventScroll, { passive: false });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.hamburger.classList.add('active');
        this.mobileMenu.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate hamburger
        anime({
            targets: this.hamburger.querySelectorAll('.hamburger-line'),
            rotate: (el, i) => i === 1 ? 0 : (i === 0 ? 45 : -45),
            translateY: (el, i) => i === 0 ? 7 : (i === 2 ? -7 : 0),
            opacity: (el, i) => i === 1 ? 0 : 1,
            duration: 300,
            easing: 'easeOutQuad'
        });

        // Animate menu items
        anime({
            targets: this.mobileLinks,
            translateX: [50, 0],
            opacity: [0, 1],
            duration: 400,
            delay: anime.stagger(50, { start: 100 }),
            easing: 'easeOutExpo'
        });

        // Animate overlay
        anime({
            targets: this.overlay,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }

    close() {
        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Animate hamburger back
        anime({
            targets: this.hamburger.querySelectorAll('.hamburger-line'),
            rotate: 0,
            translateY: 0,
            opacity: 1,
            duration: 300,
            easing: 'easeOutQuad'
        });

        // Animate menu items out
        anime({
            targets: this.mobileLinks,
            translateX: [0, 50],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeOutExpo'
        });

        // Animate overlay out
        anime({
            targets: this.overlay,
            opacity: [1, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();

    // Reinitialize on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= 768 && !document.querySelector('.hamburger')) {
                new MobileMenu();
            }
        }, 250);
    });
});
