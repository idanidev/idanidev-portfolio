/**
 * Scroll to Top Button
 * Shows/hides button based on scroll position and handles smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (!scrollToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top with animation
    scrollToTopBtn.addEventListener('click', () => {
        // Anime.js smooth scroll
        anime({
            targets: 'html, body',
            scrollTop: 0,
            duration: 800,
            easing: 'easeInOutQuad'
        });

        // Button animation on click
        anime({
            targets: scrollToTopBtn,
            scale: [1, 0.9, 1],
            rotate: [0, -10, 0],
            duration: 400,
            easing: 'easeOutElastic(1, .5)'
        });
    });

    // Add pulse animation when button appears
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: scrollToTopBtn,
                    scale: [1, 1.1, 1],
                    duration: 600,
                    easing: 'easeOutElastic(1, .5)'
                });
            }
        });
    });
});
