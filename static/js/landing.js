/**
 * Landing Page Interactive Features (Compiled from TypeScript)
 * Handles navigation, smooth scrolling, animations, and mobile responsiveness
 */

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when nav link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (!href || href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (!target) return;

            const offsetTop = target.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        });
    });
}

// ===== NAVBAR STICKY & SCROLL EFFECTS =====
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initAnimationOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all feature cards, property cards, testimonials
    const animatedElements = document.querySelectorAll(
        '.feature-card, .property-card, .testimonial-card, .hero-content'
    );

    animatedElements.forEach((el) => {
        observer.observe(el);
    });
}

// ===== LAZY LOADING IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach((img) => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach((img) => {
            img.classList.add('loaded');
        });
    }
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounters() {
    const stats = document.querySelectorAll('.hero-stats .stat h3');

    const animateValue = (element, duration = 2000) => {
        const finalValue = element.textContent || '0';
        const numericValue = parseInt(finalValue.replace(/\D/g, ''), 10) || 0;
        const increment = numericValue / (duration / 16); // ~60fps

        let currentValue = 0;

        const updateCounter = () => {
            currentValue += increment;

            if (currentValue >= numericValue) {
                element.textContent = finalValue;
                return;
            }

            // Format the display
            let displayValue = Math.floor(currentValue).toString();
            if (finalValue.includes('K')) {
                displayValue += 'K+';
            } else if (finalValue.includes('₹')) {
                displayValue = '₹' + displayValue + 'B+';
            }

            element.textContent = displayValue;
            requestAnimationFrame(updateCounter);
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                stats.forEach((stat) => {
                    animateValue(stat);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
}

// ===== PROPERTY CARD INTERACTIONS =====
function initPropertyCardInteractions() {
    const propertyCards = document.querySelectorAll('.property-card');

    propertyCards.forEach((card) => {
        const viewButton = card.querySelector('.btn-view-details');

        if (viewButton) {
            viewButton.addEventListener('click', (e) => {
                e.preventDefault();
                // Redirect to dashboard or show modal
                const dashboardLink = document.querySelector('a[href*="dashboard"]');
                if (dashboardLink) {
                    dashboardLink.click();
                }
            });
        }

        // Hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ===== FORM VALIDATION PLACEHOLDER =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach((input) => {
                const value = input.value.trim();
                if (!value) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

// ===== KEYBOARD ACCESSIBILITY =====
function initKeyboardNavigation() {
    const navToggle = document.getElementById('navToggle');

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.classList.remove('active');
                }
            }
        }
    });
}

// ===== MAIN INITIALIZATION =====
function initializeLandingPage() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('🏡 Initializing aashiyana landing page...');

        initMobileMenu();
        initSmoothScroll();
        initNavbarScroll();
        initAnimationOnScroll();
        initLazyLoading();
        updateActiveNavLink();
        animateCounters();
        initPropertyCardInteractions();
        initFormValidation();
        initKeyboardNavigation();

        console.log('✅ Landing page ready!');
    }
}

// Start initialization
initializeLandingPage();
