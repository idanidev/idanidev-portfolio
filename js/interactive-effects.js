/**
 * Interactive Effects with AnimeJS
 * Advanced hover effects, click interactions, and gestures
 */

class InteractiveEffects {
    constructor() {
        this.initHoverEffects();
        this.initClickEffects();
        this.initCardTilt();
        this.initTextReveal();
        this.initSkillsInteractive();
        this.initProjectsInteractive();
        this.initButtonMorphing();
        this.initParallaxScroll();
        this.initMobileGestures();
    }

    /**
     * Advanced hover effects for all elements
     */
    initHoverEffects() {
        // Skill cards hover with 3D perspective
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.05,
                    translateZ: 50,
                    duration: 400,
                    easing: 'easeOutQuad'
                });

                // Animate background gradient on hover
                const background = card.querySelector('.skill-icon');
                anime({
                    targets: background,
                    background: [
                        'linear-gradient(135deg, rgba(0, 245, 212, 0.1), rgba(155, 93, 229, 0.2))',
                        'linear-gradient(135deg, rgba(155, 93, 229, 0.2), rgba(241, 91, 181, 0.2))'
                    ],
                    duration: 600,
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutQuad'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    translateZ: 0,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });

            // Mouse move parallax inside card
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                anime({
                    targets: card.querySelector('.skill-icon'),
                    translateX: deltaX * 10,
                    translateY: deltaY * 10,
                    duration: 300,
                    easing: 'easeOutQuad'
                });

                anime({
                    targets: card.querySelectorAll('.skill-tag'),
                    translateX: deltaX * 5,
                    translateY: deltaY * 5,
                    duration: 300,
                    delay: anime.stagger(30),
                    easing: 'easeOutQuad'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: [card.querySelector('.skill-icon'), ...card.querySelectorAll('.skill-tag')],
                    translateX: 0,
                    translateY: 0,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });
        });

        // Navigation links with underline animation
        document.querySelectorAll('.nav-links a').forEach(link => {
            const underline = document.createElement('span');
            underline.style.cssText = `
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0;
                height: 2px;
                background: linear-gradient(90deg, #00f5d4, #9b5de5);
                transition: none;
            `;
            link.style.position = 'relative';
            link.appendChild(underline);

            link.addEventListener('mouseenter', () => {
                anime({
                    targets: underline,
                    width: '100%',
                    duration: 400,
                    easing: 'easeOutExpo'
                });

                anime({
                    targets: link,
                    color: '#00f5d4',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            link.addEventListener('mouseleave', () => {
                anime({
                    targets: underline,
                    width: 0,
                    duration: 400,
                    easing: 'easeOutExpo'
                });

                anime({
                    targets: link,
                    color: '#a0a0b0',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    /**
     * Click effects and interactions
     */
    initClickEffects() {
        // Add ripple effect to all buttons
        document.querySelectorAll('.btn, .contact-item, .project-link').forEach(btn => {
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
                    background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                `;
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);

                anime({
                    targets: ripple,
                    scale: [0, 2],
                    opacity: [1, 0],
                    duration: 600,
                    easing: 'easeOutExpo',
                    complete: () => ripple.remove()
                });
            });
        });

        // Stats counter on click
        document.querySelectorAll('.stat-number').forEach(stat => {
            stat.style.cursor = 'pointer';
            stat.addEventListener('click', () => {
                anime({
                    targets: stat,
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                    duration: 800,
                    easing: 'easeOutElastic(1, .6)'
                });
            });
        });
    }

    /**
     * 3D card tilt effect
     */
    initCardTilt() {
        const cards = document.querySelectorAll('.project-card, .contact-card-3d');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
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

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 500,
                    easing: 'easeOutElastic(1, .6)'
                });
            });
        });
    }

    /**
     * Text reveal on scroll
     */
    initTextReveal() {
        const textElements = document.querySelectorAll('.hero-description, .project-info p, .timeline-content p');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const words = entry.target.textContent.split(' ');
                    entry.target.innerHTML = words.map(word =>
                        `<span class="word" style="display: inline-block; opacity: 0;">${word}&nbsp;</span>`
                    ).join('');

                    anime({
                        targets: entry.target.querySelectorAll('.word'),
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 600,
                        delay: anime.stagger(30),
                        easing: 'easeOutExpo'
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        textElements.forEach(el => observer.observe(el));
    }

    /**
     * Interactive skills section
     */
    initSkillsInteractive() {
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('click', () => {
                // Create expanding circle effect
                const circle = document.createElement('div');
                circle.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: radial-gradient(circle, rgba(0, 245, 212, 0.2), transparent);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                `;
                card.appendChild(circle);

                anime({
                    targets: circle,
                    width: 300,
                    height: 300,
                    opacity: [1, 0],
                    duration: 800,
                    easing: 'easeOutExpo',
                    complete: () => circle.remove()
                });

                // Bounce all tags
                anime({
                    targets: card.querySelectorAll('.skill-tag'),
                    translateY: [0, -10, 0],
                    duration: 400,
                    delay: anime.stagger(50),
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    /**
     * Interactive projects
     */
    initProjectsInteractive() {
        document.querySelectorAll('.project-card').forEach(card => {
            const mockup = card.querySelector('.project-mockup');

            card.addEventListener('click', () => {
                // Pulse animation
                anime({
                    targets: mockup,
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                    duration: 1000,
                    easing: 'easeOutElastic(1, .6)'
                });

                // Animate mockup lines sequentially
                const lines = mockup.querySelectorAll('.mockup-line');
                anime({
                    targets: lines,
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.1)',
                        'rgba(0, 245, 212, 0.5)',
                        'rgba(255, 255, 255, 0.1)'
                    ],
                    duration: 1000,
                    delay: anime.stagger(100),
                    easing: 'easeInOutQuad'
                });
            });
        });
    }

    /**
     * Button morphing effect
     */
    initButtonMorphing() {
        document.querySelectorAll('.btn-primary').forEach(btn => {
            let isHovering = false;

            btn.addEventListener('mouseenter', () => {
                isHovering = true;

                anime({
                    targets: btn,
                    scale: 1.05,
                    borderRadius: ['12px', '20px', '12px'],
                    duration: 600,
                    easing: 'easeInOutQuad'
                });

                // Continuous shimmer while hovering
                const shimmer = () => {
                    if (!isHovering) return;

                    anime({
                        targets: btn,
                        boxShadow: [
                            '0 5px 20px rgba(0, 245, 212, 0.3)',
                            '0 5px 40px rgba(155, 93, 229, 0.5)',
                            '0 5px 20px rgba(241, 91, 181, 0.3)',
                            '0 5px 20px rgba(0, 245, 212, 0.3)'
                        ],
                        duration: 2000,
                        easing: 'linear',
                        complete: shimmer
                    });
                };
                shimmer();
            });

            btn.addEventListener('mouseleave', () => {
                isHovering = false;

                anime({
                    targets: btn,
                    scale: 1,
                    borderRadius: '12px',
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    /**
     * Parallax scroll effects
     */
    initParallaxScroll() {
        const parallaxElements = [
            { selector: '.hero-content', speed: 0.3 },
            { selector: '.section-header', speed: 0.2 },
            { selector: '.stat', speed: 0.15 }
        ];

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(({ selector, speed }) => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const offset = scrolled * speed;
                        anime({
                            targets: el,
                            translateY: -offset,
                            duration: 0,
                            easing: 'linear'
                        });
                    }
                });
            });
        });
    }

    /**
     * Mobile gesture support
     */
    initMobileGestures() {
        if ('ontouchstart' in window) {
            let touchStartX = 0;
            let touchStartY = 0;

            // Swipe detection for project cards
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('touchstart', (e) => {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                });

                card.addEventListener('touchend', (e) => {
                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;
                    const deltaX = touchEndX - touchStartX;
                    const deltaY = touchEndY - touchStartY;

                    if (Math.abs(deltaX) > 50) {
                        // Swipe animation
                        anime({
                            targets: card,
                            translateX: [deltaX > 0 ? 20 : -20, 0],
                            duration: 400,
                            easing: 'easeOutQuad'
                        });
                    }
                });
            });

            // Tap feedback for mobile
            document.querySelectorAll('.btn, .skill-card, .contact-item').forEach(el => {
                el.addEventListener('touchstart', () => {
                    anime({
                        targets: el,
                        scale: 0.95,
                        duration: 100,
                        easing: 'easeOutQuad'
                    });
                });

                el.addEventListener('touchend', () => {
                    anime({
                        targets: el,
                        scale: 1,
                        duration: 200,
                        easing: 'easeOutQuad'
                    });
                });
            });
        }
    }
}

// Initialize interactive effects
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveEffects();
});
