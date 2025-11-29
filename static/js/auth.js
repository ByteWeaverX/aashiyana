/**
 * aashiyana Authentication Module
 * Handles form validation, password strength, and interactive features
 */

class AashiyanaAuth {
    constructor() {
        this.formSelectors = {
            login: '#loginForm',
            signup: '#signupForm',
            password: '#password',
            confirmPassword: '#confirm_password',
            email: '#email',
            fullName: '#full_name'
        };
        
        this.init();
    }

    /**
     * Initialize all authentication features
     */
    init() {
        this.setupPasswordToggle();
        this.setupFormValidation();
        this.setupPasswordStrengthMeter();
        this.setupEmailValidation();
        this.setupAccessibility();
    }

    /**
     * Setup password visibility toggle
     */
    setupPasswordToggle() {
        const toggleButtons = document.querySelectorAll('.password-toggle');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const input = button.previousElementSibling;
                const icon = button.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                    button.setAttribute('aria-label', 'Hide password');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                    button.setAttribute('aria-label', 'Show password');
                }
            });
        });
    }

    /**
     * Setup form validation listeners
     */
    setupFormValidation() {
        const forms = [
            this.formSelectors.login,
            this.formSelectors.signup
        ];
        
        forms.forEach(selector => {
            const form = document.querySelector(selector);
            if (form) {
                form.addEventListener('submit', (e) => this.validateForm(e, form));
                
                // Add real-time validation
                const inputs = form.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
                inputs.forEach(input => {
                    input.addEventListener('blur', () => this.validateField(input));
                    input.addEventListener('input', () => this.validateField(input));
                });
            }
        });
    }

    /**
     * Validate individual field
     */
    validateField(field) {
        let isValid = true;
        const errorElement = field.parentElement.querySelector('.form-error');
        
        if (field.type === 'email') {
            isValid = this.validateEmail(field.value);
            if (!isValid) {
                field.classList.add('error');
                if (errorElement) errorElement.textContent = 'Please enter a valid email address';
            } else {
                field.classList.remove('error');
                if (errorElement) errorElement.textContent = '';
            }
        } else if (field.id === 'confirm_password') {
            const password = document.querySelector(this.formSelectors.password);
            isValid = field.value === password.value;
            if (!isValid) {
                field.classList.add('error');
                if (errorElement) errorElement.textContent = 'Passwords do not match';
            } else {
                field.classList.remove('error');
                if (errorElement) errorElement.textContent = '';
            }
        } else if (field.type === 'password') {
            isValid = field.value.length >= 6;
            if (!isValid && field.value.length > 0) {
                field.classList.add('error');
                if (errorElement) errorElement.textContent = 'Password must be at least 6 characters';
            } else {
                field.classList.remove('error');
                if (errorElement) errorElement.textContent = '';
            }
        } else if (field.type === 'text') {
            isValid = field.value.trim().length > 0;
            if (!isValid) {
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        }
        
        return isValid;
    }

    /**
     * Validate entire form
     */
    validateForm(e, form) {
        const inputs = form.querySelectorAll('input[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            e.preventDefault();
            this.showErrorMessage('Please fix the errors above and try again');
        }
        
        return isFormValid;
    }

    /**
     * Validate email format
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Setup password strength meter
     */
    setupPasswordStrengthMeter() {
        const passwordInput = document.querySelector(this.formSelectors.password);
        if (!passwordInput) return;
        
        passwordInput.addEventListener('input', () => {
            const strength = this.calculatePasswordStrength(passwordInput.value);
            this.updateStrengthMeter(strength);
        });
    }

    /**
     * Calculate password strength score (0-4)
     */
    calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        return Math.min(strength, 4);
    }

    /**
     * Update strength meter UI
     */
    updateStrengthMeter(strength) {
        const bars = document.querySelectorAll('.strength-bar');
        const strengthLevel = document.getElementById('strengthLevel');
        const strengthText = document.querySelector('.strength-text');
        
        if (!bars.length || !strengthLevel) return;
        
        const strengthLabels = ['Weak', 'Fair', 'Good', 'Good', 'Strong'];
        const strengthClasses = ['weak', 'fair', 'good', 'good', 'strong'];
        
        // Reset all bars
        bars.forEach(bar => {
            bar.classList.remove('weak', 'fair', 'good', 'strong');
        });
        
        // Fill bars based on strength
        for (let i = 0; i < strength; i++) {
            bars[i].classList.add(strengthClasses[strength - 1]);
        }
        
        strengthLevel.textContent = strengthLabels[strength];
        if (strengthText) {
            strengthText.className = `strength-text ${strengthClasses[strength - 1]}`;
        }
    }

    /**
     * Setup email validation with debounce
     */
    setupEmailValidation() {
        const emailInput = document.querySelector(this.formSelectors.email);
        if (!emailInput) return;
        
        let debounceTimeout;
        emailInput.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                if (this.validateEmail(emailInput.value)) {
                    emailInput.classList.remove('error');
                } else if (emailInput.value.length > 0) {
                    emailInput.classList.add('error');
                }
            }, 500);
        });
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add aria-labels to all inputs
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        inputs.forEach(input => {
            if (!input.getAttribute('aria-label')) {
                const label = input.parentElement.querySelector('label');
                if (label) {
                    input.setAttribute('aria-label', label.textContent);
                }
            }
        });
        
        // Add role to error messages
        const errorMessages = document.querySelectorAll('.error-message, .success-message');
        errorMessages.forEach(msg => {
            msg.setAttribute('role', 'alert');
            msg.setAttribute('aria-live', 'polite');
        });
    }

    /**
     * Show error message
     */
    showErrorMessage(message) {
        const formWrapper = document.querySelector('.auth-form-wrapper');
        if (!formWrapper) return;
        
        // Remove existing error
        const existingError = formWrapper.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Create and insert new error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        errorDiv.setAttribute('role', 'alert');
        
        formWrapper.insertBefore(errorDiv, formWrapper.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            errorDiv.style.transition = 'opacity 0.3s ease-out';
            setTimeout(() => errorDiv.remove(), 300);
        }, 5000);
    }

    /**
     * Show success message
     */
    showSuccessMessage(message) {
        const formWrapper = document.querySelector('.auth-form-wrapper');
        if (!formWrapper) return;
        
        // Remove existing message
        const existingMsg = formWrapper.querySelector('.success-message');
        if (existingMsg) existingMsg.remove();
        
        // Create and insert new success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        successDiv.setAttribute('role', 'alert');
        
        formWrapper.insertBefore(successDiv, formWrapper.firstChild);
        
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transition = 'opacity 0.3s ease-out';
            setTimeout(() => successDiv.remove(), 300);
        }, 5000);
    }
}

/**
 * Google Authentication Handler
 */
class GoogleAuthHandler {
    constructor() {
        this.handleGoogleCallback = this.handleGoogleCallback.bind(this);
        this.initGoogleLogin();
    }

    /**
     * Initialize Google Sign-In
     */
    initGoogleLogin() {
        // Check if Google API is loaded
        if (typeof google !== 'undefined') {
            const clientId = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
            
            google.accounts.id.initialize({
                client_id: clientId,
                callback: this.handleGoogleCallback,
                auto_select: false,
                cancel_on_tap_outside: true
            });
            
            // Render Google Sign-In button if placeholder exists
            const googleButtonPlaceholder = document.querySelector('.btn-social-google');
            if (googleButtonPlaceholder && !googleButtonPlaceholder.classList.contains('google-button-rendered')) {
                google.accounts.id.renderButton(googleButtonPlaceholder, {
                    theme: 'outline',
                    size: 'large',
                    width: '100%',
                    locale: 'en_IN'
                });
                googleButtonPlaceholder.classList.add('google-button-rendered');
            }
        }
    }

    /**
     * Handle Google OAuth callback
     */
    handleGoogleCallback(response) {
        if (response.credential) {
            this.processGoogleToken(response.credential);
        }
    }

    /**
     * Send Google token to backend
     */
    async processGoogleToken(token) {
        try {
            const response = await fetch('/api/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ token: token })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Redirect to dashboard or home
                window.location.href = data.redirect_url || '/dashboard';
            } else {
                this.showGoogleError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Google Login Error:', error);
            this.showGoogleError('An error occurred during login. Please try again.');
        }
    }

    /**
     * Show error message for Google login
     */
    showGoogleError(message) {
        const auth = new AashiyanaAuth();
        auth.showErrorMessage(message);
    }
}

/**
 * Initialize on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Aashiyana Auth
    const auth = new AashiyanaAuth();
    
    // Initialize Google Auth
    const googleAuth = new GoogleAuthHandler();
    
    // Add smooth animations on load
    const authContent = document.querySelector('.auth-content');
    if (authContent) {
        authContent.style.animation = 'slideDownIn 0.6s ease-out';
    }
    
    const authShowcase = document.querySelector('.auth-showcase');
    if (authShowcase) {
        authShowcase.style.animation = 'fadeIn 0.8s ease-out 0.2s both';
    }
});

/**
 * Prevent form submission on Enter in input fields (except textarea)
 */
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.type === 'text') {
        const form = e.target.closest('form');
        if (form) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton && e.target !== submitButton) {
                e.preventDefault();
            }
        }
    }
});

/**
 * Export for module systems
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AashiyanaAuth, GoogleAuthHandler };
}
