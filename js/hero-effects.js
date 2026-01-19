/**
 * Hero Title Effects with AnimeJS
 * Spectacular text animations
 */

class HeroEffects {
    constructor() {
        this.initTitleAnimation();
    }

    /**
     * Spectacular title animation with stagger and morphing
     */
    initTitleAnimation() {
        const heroH1 = document.querySelector('.hero h1');
        if (!heroH1) return;

        // Split text into lines and words
        const lines = heroH1.innerHTML.split('<br>');
        heroH1.innerHTML = '';

        lines.forEach((line, lineIndex) => {
            const lineDiv = document.createElement('div');
            lineDiv.style.overflow = 'hidden';
            lineDiv.style.marginBottom = lineIndex === 0 ? '0.5rem' : '0';

            // Handle the gradient span specially
            if (line.includes('class="gradient')) {
                // Extract text from span
                const text = line.match(/data-text="([^"]+)"/)[1];
                const words = text.split(' ');

                const wordSpans = words.map((word, i) => {
                    return `<span class="word-wrapper" style="display: inline-block; overflow: hidden;">
                        <span class="word gradient glitch" data-text="${word}" style="display: inline-block; opacity: 0; transform: translateY(100%);">${word}</span>
                    </span>${i < words.length - 1 ? '&nbsp;' : ''}`;
                }).join('');

                lineDiv.innerHTML = wordSpans;
            } else {
                // Regular text
                const words = line.split(' ');
                const wordSpans = words.map((word, i) => {
                    return `<span class="word-wrapper" style="display: inline-block; overflow: hidden;">
                        <span class="word" style="display: inline-block; opacity: 0; transform: translateY(100%);">${word}</span>
                    </span>${i < words.length - 1 ? '&nbsp;' : ''}`;
                }).join('');

                lineDiv.innerHTML = wordSpans;
            }

            heroH1.appendChild(lineDiv);
        });

        // Animate words with stagger
        const words = heroH1.querySelectorAll('.word');

        anime.timeline({
            easing: 'easeOutExpo'
        })
        .add({
            targets: words,
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1400,
            delay: anime.stagger(80, { start: 400 }),
            easing: 'easeOutElastic(1, .6)'
        })
        .add({
            targets: '.word.gradient',
            scale: [0.8, 1],
            duration: 800,
            easing: 'easeOutElastic(1, .8)'
        }, '-=1000');

        // Add continuous subtle animation to gradient text
        this.addGradientAnimation();

        // Add particles effect
        this.addParticlesEffect();
    }

    /**
     * Continuous gradient animation
     */
    addGradientAnimation() {
        const gradientText = document.querySelector('.hero .gradient');
        if (!gradientText) return;

        anime({
            targets: gradientText,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            duration: 8000,
            easing: 'linear',
            loop: true,
            update: function() {
                gradientText.style.backgroundSize = '200% 200%';
            }
        });
    }

    /**
     * Particles effect around the title
     */
    addParticlesEffect() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        heroContent.style.position = 'relative';
        heroContent.appendChild(particlesContainer);

        // Create particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particlesContainer, i);
        }
    }

    createParticle(container, index) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, #00f5d4, #9b5de5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
        `;

        container.appendChild(particle);

        anime({
            targets: particle,
            translateY: [0, -50 - Math.random() * 50],
            translateX: [0, (Math.random() - 0.5) * 100],
            opacity: [
                { value: 0.6, duration: 500 },
                { value: 0, duration: 1000 }
            ],
            scale: [
                { value: 1, duration: 500 },
                { value: 0, duration: 1000 }
            ],
            duration: 2000 + Math.random() * 2000,
            delay: index * 200 + Math.random() * 1000,
            easing: 'easeOutQuad',
            complete: () => {
                particle.remove();
                // Create new particle
                setTimeout(() => this.createParticle(container, index), Math.random() * 2000);
            }
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new HeroEffects();
});
