/**
 * Landing Page Interactive Features
 * TypeScript source for landing page interactivity
 * Handles navigation, smooth scrolling, animations, and mobile responsiveness
 */

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu(): void {
    const navToggle = document.getElementById('navToggle') as HTMLButtonElement;
    const navMenu = document.getElementById('navMenu') as HTMLUListElement;

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
function initSmoothScroll(): void {
    const links = document.querySelectorAll('a[href^="#"]') as NodeListOf<HTMLAnchorElement>;

    links.forEach((link) => {
        link.addEventListener('click', (e: Event) => {
            const href = (link as HTMLAnchorElement).getAttribute('href');

            if (!href || href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (!target) return;

            const offsetTop = (target as HTMLElement).offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        });
    });
}

// ===== NAVBAR STICKY & SCROLL EFFECTS =====
function initNavbarScroll(): void {
    const navbar = document.getElementById('navbar') as HTMLElement;
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
function initAnimationOnScroll(): void {
    const observerOptions: IntersectionObserverInit = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                (entry.target as HTMLElement).classList.add('in-view');
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
function initLazyLoading(): void {
    const images = document.querySelectorAll('img[loading="lazy"]') as NodeListOf<HTMLImageElement>;

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    img.src = img.src; // Trigger load
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
function updateActiveNavLink(): void {
    const sections = document.querySelectorAll('section[id], header') as NodeListOf<HTMLElement>;
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]') as NodeListOf<HTMLAnchorElement>;

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
function animateCounters(): void {
    const stats = document.querySelectorAll('.hero-stats .stat h3') as NodeListOf<HTMLElement>;

    const animateValue = (element: HTMLElement, duration: number = 2000): void => {
        const finalValue = element.textContent || '0';
        const numericValue = parseInt(finalValue.replace(/\D/g, ''), 10) || 0;
        const increment = numericValue / (duration / 16); // ~60fps

        let currentValue = 0;

        const updateCounter = (): void => {
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
                (stats as NodeListOf<HTMLElement>).forEach((stat) => {
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
function initPropertyCardInteractions(): void {
    const propertyCards = document.querySelectorAll('.property-card') as NodeListOf<HTMLElement>;

    propertyCards.forEach((card) => {
        const viewButton = card.querySelector('.btn-view-details') as HTMLButtonElement;

        if (viewButton) {
            viewButton.addEventListener('click', (e: Event) => {
                e.preventDefault();
                // Redirect to dashboard or show modal
                const dashboardLink = document.querySelector('a[href*="dashboard"]') as HTMLAnchorElement;
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
function initFormValidation(): void {
    const forms = document.querySelectorAll('form') as NodeListOf<HTMLFormElement>;

    forms.forEach((form) => {
        form.addEventListener('submit', (e: Event) => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach((input) => {
                const value = (input as HTMLInputElement | HTMLTextAreaElement).value.trim();
                if (!value) {
                    isValid = false;
                    (input as HTMLElement).classList.add('error');
                } else {
                    (input as HTMLElement).classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

// ===== KEYBOARD ACCESSIBILITY =====
function initKeyboardNavigation(): void {
    const navToggle = document.getElementById('navToggle') as HTMLButtonElement;

    // Close menu on Escape key
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu') as HTMLUListElement;
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
function initializeLandingPage(): void {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init(): void {
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

// Export for external use if needed
export {
    initMobileMenu,
    initSmoothScroll,
    initNavbarScroll,
    animateCounters,
    initPropertyCardInteractions,
};
