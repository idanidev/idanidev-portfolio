/**
 * Optimized Animations with AnimeJS
 * Subtle and elegant animations without excessive motion
 */

class OptimizedAnimations {
  constructor() {
    this.initHeroAnimations();
    this.initScrollAnimations();
    this.initSkillsAnimations();
    this.initProjectsAnimations();
    this.initTimelineAnimations();
    this.initAvatarAnimation();
  }

  /**
   * Avatar Animation - Moto entrance effect
   */
  initAvatarAnimation() {
    const avatar = document.querySelector("#hero-avatar img");
    if (!avatar) return;

    // Check if mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: CSS handles everything, no JS interference
      return;
    }


    // Desktop animation - Initial state - hidden off-screen
    avatar.style.opacity = "0";
    avatar.style.transform = "translateX(-100px) rotate(-30deg)";
    avatar.style.filter = "blur(10px)";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Moto rolling in effect
            anime
              .timeline({
                easing: "easeOutExpo",
              })
              .add({
                targets: avatar,
                translateX: [-100, 0],
                rotate: [-30, 0],
                opacity: [0, 1],
                filter: ["blur(10px)", "blur(0px)"],
                duration: 1200,
              })
              .add(
                {
                  targets: avatar,
                  scale: [1, 1.1, 1],
                  duration: 400,
                  easing: "easeOutElastic(1, .5)",
                },
                "-=200",
              )
              .add(
                {
                  targets: avatar,
                  boxShadow: [
                    "0 0 0px rgba(0, 212, 255, 0)",
                    "0 0 30px rgba(0, 212, 255, 0.8)",
                    "0 0 15px rgba(0, 212, 255, 0.4)",
                  ],
                  duration: 800,
                  easing: "easeOutQuad",
                },
                "-=400",
              );

            // Continuous glow pulse
            anime({
              targets: avatar,
              boxShadow: [
                "0 0 15px rgba(0, 212, 255, 0.4)",
                "0 0 25px rgba(255, 107, 74, 0.6)",
                "0 0 15px rgba(0, 212, 255, 0.4)",
              ],
              duration: 3000,
              easing: "easeInOutSine",
              loop: true,
              delay: 1500,
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(avatar);

    // Hover effect - wheelie! (desktop only)
    avatar.addEventListener("mouseenter", () => {
      anime({
        targets: avatar,
        scale: 1.15,
        rotate: 5,
        duration: 300,
        easing: "easeOutQuad",
      });
    });

    avatar.addEventListener("mouseleave", () => {
      anime({
        targets: avatar,
        scale: 1,
        rotate: 0,
        duration: 300,
        easing: "easeOutQuad",
      });
    });
  }

  /**
   * Hero Section - Subtle animations
   */
  initHeroAnimations() {
    // Animate hero tag
    anime({
      targets: ".hero-tag",
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutExpo",
      delay: 200,
    });

    // Animate hero title
    anime({
      targets: ".hero h1",
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutExpo",
      delay: 400,
    });

    // Animate hero description
    anime({
      targets: ".hero-description",
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutExpo",
      delay: 600,
    });

    // Animate CTA buttons
    anime({
      targets: ".hero-cta .btn",
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 600,
      easing: "easeOutExpo",
      delay: anime.stagger(100, { start: 800 }),
    });

    // Animate stats
    this.animateStats();
  }

  /**
   * Animate statistics numbers
   */
  animateStats() {
    const stats = document.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ""));

            const obj = { value: 0 };
            anime({
              targets: obj,
              value: numericValue,
              round: 1,
              duration: 2000,
              easing: "easeOutExpo",
              update: function () {
                target.textContent =
                  obj.value + finalValue.replace(/\d/g, "").replace(/\+/g, "+");
              },
            });

            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.5 },
    );

    stats.forEach((stat) => observer.observe(stat));
  }

  /**
   * Skills Section - Elegant entrance
   */
  initSkillsAnimations() {
    const skillCards = document.querySelectorAll(".skill-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Card entrance
            anime({
              targets: entry.target,
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 800,
              easing: "easeOutExpo",
              delay: index * 100,
            });

            // Icon subtle scale
            anime({
              targets: entry.target.querySelector(".skill-icon"),
              scale: [0.8, 1],
              opacity: [0, 1],
              duration: 600,
              easing: "easeOutExpo",
              delay: index * 100 + 200,
            });

            // Tags fade in
            anime({
              targets: entry.target.querySelectorAll(".skill-tag"),
              translateY: [10, 0],
              opacity: [0, 1],
              duration: 500,
              easing: "easeOutExpo",
              delay: anime.stagger(50, { start: index * 100 + 400 }),
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    skillCards.forEach((card) => observer.observe(card));

  }

  /**
   * Projects Section - Clean animations
   */
  initProjectsAnimations() {
    const projectCards = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Card entrance
            anime({
              targets: entry.target,
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: "easeOutExpo",
              delay: index * 150,
            });

            // Mockup
            const mockup = entry.target.querySelector(".project-mockup");
            if (mockup) {
              anime({
                targets: mockup,
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 800,
                easing: "easeOutExpo",
                delay: index * 150 + 200,
              });

              // Mockup lines
              anime({
                targets: mockup.querySelectorAll(".mockup-line"),
                width: [
                  "0%",
                  function (el) {
                    return el.style.width || "100%";
                  },
                ],
                opacity: [0, 1],
                duration: 600,
                easing: "easeOutExpo",
                delay: anime.stagger(80, { start: index * 150 + 500 }),
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    projectCards.forEach((card) => observer.observe(card));

    // Subtle hover
  }

  /**
   * Timeline Section
   */
  initTimelineAnimations() {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Dot
            const dot = entry.target.querySelector(".timeline-dot");
            anime({
              targets: dot,
              scale: [0, 1],
              duration: 500,
              easing: "easeOutExpo",
              delay: index * 100,
            });

            // Content
            const content = entry.target.querySelector(".timeline-content");
            anime({
              targets: content,
              translateX: [-30, 0],
              opacity: [0, 1],
              duration: 800,
              easing: "easeOutExpo",
              delay: index * 100 + 200,
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    timelineItems.forEach((item) => observer.observe(item));
  }

  /**
   * Scroll-based animations
   */
  initScrollAnimations() {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              translateY: [20, 0],
              opacity: [0, 1],
              duration: 800,
              easing: "easeOutExpo",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    reveals.forEach((reveal) => observer.observe(reveal));

    // Subtle parallax for orbs
    const orb1 = document.querySelector(".orb-1");
    const orb2 = document.querySelector(".orb-2");
    const orb3 = document.querySelector(".orb-3");
    let orbTicking = false;

    window.addEventListener("scroll", () => {
      if (!orbTicking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          if (orb1) orb1.style.transform = `translateY(${scrolled * 0.05}px)`;
          if (orb2) orb2.style.transform = `translateY(${scrolled * 0.08}px)`;
          if (orb3) orb3.style.transform = `translateY(${scrolled * 0.1}px)`;
          orbTicking = false;
        });
        orbTicking = true;
      }
    }, { passive: true });
  }
}

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  new OptimizedAnimations();

  // Fallback: ensure all elements become visible after page load
  // This catches any elements that may have been missed by IntersectionObserver
  setTimeout(() => {
    document.querySelectorAll('.skill-card, .project-card, .timeline-content, .timeline-dot').forEach(el => {
      const style = getComputedStyle(el);
      if (style.opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, 3000);
});
