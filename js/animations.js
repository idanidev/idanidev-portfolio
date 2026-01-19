/**
 * Portfolio Animations with AnimeJS
 * Modular animation system for portfolio components
 */

class PortfolioAnimations {
    constructor() {
        this.initHeroAnimations();
        this.initScrollAnimations();
        this.initSkillsAnimations();
        this.initProjectsAnimations();
        this.initTimelineAnimations();
        this.initParticleSystem();
    }

    /**
     * Hero Section Animations
     */
    initHeroAnimations() {
        // Animate hero tag
        anime({
            targets: '.hero-tag',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: 200
        });

        // Animate hero title with stagger
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            heroTitle.innerHTML = heroTitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        }

        anime({
            targets: '.hero h1 .letter',
            translateY: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: (el, i) => 400 + 30 * i
        });

        // Animate gradient text with color shift
        anime({
            targets: '.hero .gradient',
            filter: [
                'hue-rotate(0deg)',
                'hue-rotate(30deg)',
                'hue-rotate(0deg)'
            ],
            duration: 8000,
            easing: 'linear',
            loop: true
        });

        // Animate hero description
        anime({
            targets: '.hero-description',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: 600
        });

        // Animate CTA buttons with bounce
        anime({
            targets: '.hero-cta .btn',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutElastic(1, .8)',
            delay: anime.stagger(100, { start: 800 })
        });

        // Animate stats with counting effect
        this.animateStats();
    }

    /**
     * Animate statistics numbers
     */
    animateStats() {
        const stats = document.querySelectorAll('.stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));

                    const obj = { value: 0 };
                    anime({
                        targets: obj,
                        value: numericValue,
                        round: 1,
                        duration: 2000,
                        easing: 'easeOutExpo',
                        update: function() {
                            target.textContent = obj.value + finalValue.replace(/\d/g, '').replace(/\+/g, '+');
                        }
                    });

                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    /**
     * Skills Section Animations
     */
    initSkillsAnimations() {
        const skillCards = document.querySelectorAll('.skill-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: index * 100
                    });

                    // Animate skill icon
                    anime({
                        targets: entry.target.querySelector('.skill-icon'),
                        scale: [0, 1],
                        rotate: [0, 360],
                        duration: 1000,
                        easing: 'easeOutElastic(1, .6)',
                        delay: index * 100 + 200
                    });

                    // Animate skill tags
                    anime({
                        targets: entry.target.querySelectorAll('.skill-tag'),
                        translateX: [-20, 0],
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(50, { start: index * 100 + 400 })
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillCards.forEach(card => observer.observe(card));
    }

    /**
     * Projects Section Animations
     */
    initProjectsAnimations() {
        const projectCards = document.querySelectorAll('.project-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Main card animation
                    anime({
                        targets: entry.target,
                        translateY: [80, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutExpo',
                        delay: index * 150
                    });

                    // Animate mockup with parallax effect
                    const mockup = entry.target.querySelector('.project-mockup');
                    if (mockup) {
                        anime({
                            targets: mockup,
                            scale: [0.8, 1],
                            rotate: [5, 0],
                            opacity: [0, 1],
                            duration: 1200,
                            easing: 'easeOutElastic(1, .8)',
                            delay: index * 150 + 200
                        });

                        // Animate mockup lines
                        anime({
                            targets: mockup.querySelectorAll('.mockup-line'),
                            width: ['0%', function(el) {
                                return el.style.width || '100%';
                            }],
                            opacity: [0, 1],
                            duration: 800,
                            easing: 'easeOutExpo',
                            delay: anime.stagger(100, { start: index * 150 + 600 })
                        });
                    }

                    // Animate project info
                    const projectInfo = entry.target.querySelector('.project-info');
                    if (projectInfo) {
                        anime({
                            targets: projectInfo.children,
                            translateX: [30, 0],
                            opacity: [0, 1],
                            duration: 800,
                            easing: 'easeOutExpo',
                            delay: anime.stagger(100, { start: index * 150 + 400 })
                        });
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        projectCards.forEach(card => observer.observe(card));
    }

    /**
     * Timeline Section Animations
     */
    initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Animate timeline dot
                    const dot = entry.target.querySelector('.timeline-dot');
                    anime({
                        targets: dot,
                        scale: [0, 1],
                        duration: 600,
                        easing: 'easeOutElastic(1, .6)',
                        delay: index * 100
                    });

                    // Pulse animation for dot
                    anime({
                        targets: dot,
                        scale: [1, 1.2, 1],
                        duration: 1500,
                        easing: 'easeInOutQuad',
                        delay: index * 100 + 800,
                        loop: true
                    });

                    // Animate timeline content
                    const content = entry.target.querySelector('.timeline-content');
                    anime({
                        targets: content,
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: index * 100 + 200
                    });

                    // Animate list items
                    anime({
                        targets: content.querySelectorAll('li'),
                        translateX: [-30, 0],
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(80, { start: index * 100 + 600 })
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => observer.observe(item));
    }

    /**
     * Scroll-based animations
     */
    initScrollAnimations() {
        const reveals = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(reveal => observer.observe(reveal));

        // Parallax effect for orbs
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            anime({
                targets: '.orb-1',
                translateY: scrolled * 0.1,
                duration: 0,
                easing: 'linear'
            });

            anime({
                targets: '.orb-2',
                translateY: scrolled * 0.15,
                duration: 0,
                easing: 'linear'
            });

            anime({
                targets: '.orb-3',
                translateY: scrolled * 0.2,
                duration: 0,
                easing: 'linear'
            });
        });
    }

    /**
     * Particle System
     */
    initParticleSystem() {
        const particleCount = 20;
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '-1';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < particleCount; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '0';

        const colors = ['#00f5d4', '#9b5de5', '#f15bb5'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);

        anime({
            targets: particle,
            translateY: [0, -window.innerHeight - 100],
            translateX: [0, (Math.random() - 0.5) * 200],
            opacity: [0, 0.6, 0],
            duration: Math.random() * 10000 + 15000,
            easing: 'linear',
            complete: () => {
                particle.remove();
                this.createParticle(container);
            }
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});
