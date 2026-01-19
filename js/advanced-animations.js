/**
 * Advanced AnimeJS Animations
 * Ultra-modern animations and effects
 */

class AdvancedAnimations {
    constructor() {
        this.initTextSplitting();
        this.initHeroAdvanced();
        this.initFloatingElements();
        this.initMouseFollower();
        this.initScrollProgress();
        this.initSkillsWave();
        this.initProjectsMorph();
        this.initTimelineStagger();
        this.initContactRipple();
        this.initBackgroundShapes();
    }

    /**
     * Split text into characters for advanced animations
     */
    initTextSplitting() {
        const textElements = document.querySelectorAll('.split-text');
        textElements.forEach(el => {
            const text = el.textContent;
            el.innerHTML = text.split('').map(char =>
                `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
        });
    }

    /**
     * Advanced Hero Animations with morphing
     */
    initHeroAdvanced() {
        // Title wave animation
        const heroTitle = document.querySelector('.hero h1 .gradient');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.innerHTML = text.split('').map((char, i) =>
                `<span class="wave-char" style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');

            // Continuous wave effect
            anime({
                targets: '.wave-char',
                translateY: [
                    { value: -20, duration: 500 },
                    { value: 0, duration: 500 }
                ],
                opacity: [
                    { value: 0.5, duration: 500 },
                    { value: 1, duration: 500 }
                ],
                delay: anime.stagger(50, { start: 300 }),
                loop: true,
                easing: 'easeInOutSine'
            });
        }

        // Animated gradient background for hero
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            anime({
                targets: heroSection,
                background: [
                    'radial-gradient(circle at 20% 50%, rgba(155, 93, 229, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(0, 245, 212, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 80%, rgba(241, 91, 181, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(155, 93, 229, 0.1) 0%, transparent 50%)'
                ],
                duration: 15000,
                easing: 'linear',
                loop: true
            });
        }

        // Typewriter effect for description
        const description = document.querySelector('.hero-description');
        if (description) {
            const originalText = description.textContent;
            description.textContent = '';
            let index = 0;

            const typeWriter = () => {
                if (index < originalText.length) {
                    description.textContent += originalText.charAt(index);
                    index++;
                    setTimeout(typeWriter, 30);
                }
            };

            setTimeout(typeWriter, 1000);
        }

        // Floating CTA buttons with rotation
        anime({
            targets: '.hero-cta .btn',
            translateY: [
                { value: -10, duration: 2000 },
                { value: 0, duration: 2000 }
            ],
            rotate: [
                { value: -2, duration: 2000 },
                { value: 2, duration: 2000 },
                { value: 0, duration: 2000 }
            ],
            loop: true,
            easing: 'easeInOutQuad',
            delay: anime.stagger(200)
        });
    }

    /**
     * Floating elements around the page
     */
    initFloatingElements() {
        const floatingShapes = [
            { emoji: '💻', color: '#00f5d4' },
            { emoji: '🚀', color: '#9b5de5' },
            { emoji: '⚡', color: '#fee440' },
            { emoji: '🎨', color: '#f15bb5' },
            { emoji: '🔧', color: '#00f5d4' },
            { emoji: '📱', color: '#9b5de5' }
        ];

        floatingShapes.forEach((shape, i) => {
            const element = document.createElement('div');
            element.className = 'floating-shape';
            element.textContent = shape.emoji;
            element.style.cssText = `
                position: fixed;
                font-size: 2rem;
                opacity: 0.3;
                z-index: -1;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            document.body.appendChild(element);

            anime({
                targets: element,
                translateX: [
                    { value: Math.random() * 200 - 100, duration: 3000 + Math.random() * 2000 },
                    { value: Math.random() * 200 - 100, duration: 3000 + Math.random() * 2000 }
                ],
                translateY: [
                    { value: Math.random() * 200 - 100, duration: 3000 + Math.random() * 2000 },
                    { value: Math.random() * 200 - 100, duration: 3000 + Math.random() * 2000 }
                ],
                rotate: [
                    { value: 360, duration: 6000 + Math.random() * 4000 }
                ],
                opacity: [
                    { value: 0.6, duration: 2000 },
                    { value: 0.2, duration: 2000 }
                ],
                scale: [
                    { value: 1.2, duration: 2000 },
                    { value: 0.8, duration: 2000 }
                ],
                loop: true,
                easing: 'easeInOutQuad',
                delay: i * 500
            });
        });
    }

    /**
     * Mouse follower with trail effect
     */
    initMouseFollower() {
        const trail = [];
        const trailLength = 8;

        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            dot.style.cssText = `
                position: fixed;
                width: ${12 - i}px;
                height: ${12 - i}px;
                background: linear-gradient(135deg, #00f5d4, #9b5de5);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                opacity: ${0.8 - (i * 0.1)};
                mix-blend-mode: screen;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }

        let mouseX = 0, mouseY = 0;
        const positions = Array(trailLength).fill({ x: 0, y: 0 });

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateTrail = () => {
            positions.unshift({ x: mouseX, y: mouseY });
            positions.pop();

            trail.forEach((dot, index) => {
                anime({
                    targets: dot,
                    left: positions[index].x,
                    top: positions[index].y,
                    duration: 200,
                    easing: 'linear'
                });
            });

            requestAnimationFrame(animateTrail);
        };

        animateTrail();
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
        `;
        document.body.appendChild(progressBar);

        const updateProgress = () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;

            anime({
                targets: progressBar,
                width: scrolled + '%',
                duration: 100,
                easing: 'linear'
            });
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }

    /**
     * Skills cards with wave effect
     */
    initSkillsWave() {
        const skillCards = document.querySelectorAll('.skill-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const index = Array.from(skillCards).indexOf(card);

                    // Card entrance with bounce
                    anime({
                        targets: card,
                        translateY: [100, 0],
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        rotate: [5, 0],
                        duration: 1200,
                        delay: index * 150,
                        easing: 'easeOutElastic(1, .8)'
                    });

                    // Animate icon with path
                    const icon = card.querySelector('.skill-icon');
                    anime({
                        targets: icon,
                        scale: [0, 1.2, 1],
                        rotate: [0, 360],
                        duration: 1500,
                        delay: index * 150 + 300,
                        easing: 'easeOutElastic(1, .6)'
                    });

                    // Tags with sequential animation
                    const tags = card.querySelectorAll('.skill-tag');
                    anime({
                        targets: tags,
                        translateX: [-30, 0],
                        opacity: [0, 1],
                        rotateY: [90, 0],
                        duration: 800,
                        delay: anime.stagger(80, { start: index * 150 + 600 }),
                        easing: 'easeOutExpo'
                    });

                    // Continuous glow pulse
                    anime({
                        targets: card,
                        boxShadow: [
                            '0 0 20px rgba(0, 245, 212, 0)',
                            '0 0 40px rgba(0, 245, 212, 0.3)',
                            '0 0 20px rgba(0, 245, 212, 0)'
                        ],
                        duration: 3000,
                        loop: true,
                        easing: 'easeInOutQuad',
                        delay: index * 300
                    });

                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.2 });

        skillCards.forEach(card => observer.observe(card));
    }

    /**
     * Projects with morphing animations
     */
    initProjectsMorph() {
        const projectCards = document.querySelectorAll('.project-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const mockup = card.querySelector('.project-mockup');
                    const lines = card.querySelectorAll('.mockup-line');
                    const techTags = card.querySelectorAll('.project-tech span');

                    // Card entrance with perspective
                    anime({
                        targets: card,
                        translateY: [150, 0],
                        rotateX: [45, 0],
                        opacity: [0, 1],
                        duration: 1500,
                        easing: 'easeOutExpo',
                        delay: idx * 200
                    });

                    // Mockup with 3D flip
                    if (mockup) {
                        anime({
                            targets: mockup,
                            rotateY: [90, 0],
                            scale: [0.5, 1],
                            opacity: [0, 1],
                            duration: 1200,
                            delay: idx * 200 + 300,
                            easing: 'easeOutExpo'
                        });

                        // Mockup lines typing effect
                        lines.forEach((line, i) => {
                            anime({
                                targets: line,
                                width: ['0%', line.style.width || '100%'],
                                opacity: [0, 1],
                                duration: 1000,
                                delay: idx * 200 + 800 + (i * 100),
                                easing: 'easeOutExpo'
                            });
                        });

                        // Continuous mockup animation
                        anime({
                            targets: mockup,
                            translateY: [0, -10, 0],
                            rotate: [0, 2, 0, -2, 0],
                            duration: 6000,
                            loop: true,
                            easing: 'easeInOutQuad',
                            delay: idx * 200 + 1500
                        });
                    }

                    // Tech tags with flip
                    anime({
                        targets: techTags,
                        rotateX: [90, 0],
                        translateY: [20, 0],
                        opacity: [0, 1],
                        duration: 800,
                        delay: anime.stagger(60, { start: idx * 200 + 1000 }),
                        easing: 'easeOutExpo'
                    });

                    // Hover pulse effect
                    card.addEventListener('mouseenter', () => {
                        anime({
                            targets: mockup,
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, 0],
                            duration: 800,
                            easing: 'easeOutElastic(1, .6)'
                        });

                        anime({
                            targets: lines,
                            translateX: [0, 5, 0],
                            duration: 600,
                            delay: anime.stagger(50),
                            easing: 'easeInOutQuad'
                        });
                    });

                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1 });

        projectCards.forEach(card => observer.observe(card));
    }

    /**
     * Timeline with advanced stagger
     */
    initTimelineStagger() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const dot = item.querySelector('.timeline-dot');
                    const content = item.querySelector('.timeline-content');
                    const listItems = item.querySelectorAll('li');

                    // Dot appears with ripple
                    anime({
                        targets: dot,
                        scale: [0, 1.5, 1],
                        opacity: [0, 1],
                        duration: 800,
                        delay: idx * 150,
                        easing: 'easeOutElastic(1, .6)'
                    });

                    // Continuous pulse
                    anime({
                        targets: dot,
                        scale: [1, 1.3, 1],
                        boxShadow: [
                            '0 0 0 0 rgba(0, 245, 212, 0.7)',
                            '0 0 0 10px rgba(0, 245, 212, 0)',
                            '0 0 0 0 rgba(0, 245, 212, 0)'
                        ],
                        duration: 2000,
                        loop: true,
                        easing: 'easeInOutQuad',
                        delay: idx * 150 + 800
                    });

                    // Content slides in
                    anime({
                        targets: content,
                        translateX: [-100, 0],
                        rotateY: [45, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        delay: idx * 150 + 200,
                        easing: 'easeOutExpo'
                    });

                    // List items cascade
                    anime({
                        targets: listItems,
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        duration: 600,
                        delay: anime.stagger(100, { start: idx * 150 + 600 }),
                        easing: 'easeOutExpo'
                    });

                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => observer.observe(item));
    }

    /**
     * Contact section with ripple effect
     */
    initContactRipple() {
        const contactItems = document.querySelectorAll('.contact-item');

        contactItems.forEach((item, idx) => {
            // Entrance animation
            anime({
                targets: item,
                translateX: [-100, 0],
                opacity: [0, 1],
                duration: 800,
                delay: idx * 100,
                easing: 'easeOutExpo'
            });

            // Hover ripple effect
            item.addEventListener('mouseenter', (e) => {
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(0, 245, 212, 0.3);
                    pointer-events: none;
                `;
                item.appendChild(ripple);

                const rect = item.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                anime({
                    targets: ripple,
                    width: [0, size * 2],
                    height: [0, size * 2],
                    left: x,
                    top: y,
                    opacity: [0.5, 0],
                    duration: 800,
                    easing: 'easeOutExpo',
                    complete: () => ripple.remove()
                });
            });
        });

        // 3D Card rotation
        const card3d = document.querySelector('.contact-card-3d');
        if (card3d) {
            anime({
                targets: card3d,
                rotateY: [45, 0],
                rotateX: [10, 0],
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 1500,
                easing: 'easeOutExpo',
                delay: 500
            });
        }
    }

    /**
     * Animated background shapes
     */
    initBackgroundShapes() {
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'bg-shapes';
        shapesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
            overflow: hidden;
        `;
        document.body.appendChild(shapesContainer);

        for (let i = 0; i < 10; i++) {
            const shape = document.createElement('div');
            const size = Math.random() * 100 + 50;
            const isCircle = Math.random() > 0.5;

            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(135deg, rgba(0, 245, 212, 0.1), rgba(155, 93, 229, 0.1));
                border-radius: ${isCircle ? '50%' : '10px'};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            shapesContainer.appendChild(shape);

            anime({
                targets: shape,
                translateX: [
                    { value: Math.random() * 300 - 150, duration: 5000 + Math.random() * 5000 },
                    { value: Math.random() * 300 - 150, duration: 5000 + Math.random() * 5000 }
                ],
                translateY: [
                    { value: Math.random() * 300 - 150, duration: 5000 + Math.random() * 5000 },
                    { value: Math.random() * 300 - 150, duration: 5000 + Math.random() * 5000 }
                ],
                rotate: isCircle ? 0 : [
                    { value: 360, duration: 10000 + Math.random() * 10000 }
                ],
                opacity: [
                    { value: 0.3, duration: 3000 },
                    { value: 0.1, duration: 3000 }
                ],
                scale: [
                    { value: 1.2, duration: 4000 },
                    { value: 0.8, duration: 4000 }
                ],
                loop: true,
                easing: 'easeInOutQuad',
                delay: i * 200
            });
        }
    }
}

// Initialize advanced animations
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedAnimations();
});
