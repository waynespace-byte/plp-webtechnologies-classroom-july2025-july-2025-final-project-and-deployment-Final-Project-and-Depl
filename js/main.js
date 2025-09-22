/*=============== NAVIGATION MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove menu mobile when clicking nav links
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*=============== HEADER SCROLL EFFECT ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL REVEAL ANIMATION ===============*/
function scrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', scrollReveal);

/*=============== CONTACT FORM VALIDATION ===============*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    const formFields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        company: document.getElementById('company'),
        service: document.getElementById('service'),
        message: document.getElementById('message')
    };

    const formErrors = {
        name: document.getElementById('name-error'),
        email: document.getElementById('email-error'),
        service: document.getElementById('service-error'),
        message: document.getElementById('message-error')
    };

    const submitBtn = document.getElementById('submit-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const successMessage = document.getElementById('success-message');

    // Validation functions
    function validateName(name) {
        return name.trim().length >= 2;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    function validateService(service) {
        return service.trim() !== '';
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    // Show error function
    function showError(field, message) {
        const errorElement = formErrors[field];
        const inputElement = formFields[field];
        
        if (errorElement && inputElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            inputElement.style.borderColor = '#ef4444';
        }
    }

    // Clear error function
    function clearError(field) {
        const errorElement = formErrors[field];
        const inputElement = formFields[field];
        
        if (errorElement && inputElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            inputElement.style.borderColor = '#e5e7eb';
        }
    }

    // Clear all errors
    function clearAllErrors() {
        Object.keys(formErrors).forEach(field => {
            clearError(field);
        });
    }

    // Real-time validation
    if (formFields.name) {
        formFields.name.addEventListener('input', function() {
            if (this.value.trim()) {
                if (validateName(this.value)) {
                    clearError('name');
                } else {
                    showError('name', 'Name must be at least 2 characters long');
                }
            } else {
                clearError('name');
            }
        });
    }

    if (formFields.email) {
        formFields.email.addEventListener('input', function() {
            if (this.value.trim()) {
                if (validateEmail(this.value)) {
                    clearError('email');
                } else {
                    showError('email', 'Please enter a valid email address');
                }
            } else {
                clearError('email');
            }
        });
    }

    if (formFields.service) {
        formFields.service.addEventListener('change', function() {
            if (validateService(this.value)) {
                clearError('service');
            } else {
                showError('service', 'Please select a service');
            }
        });
    }

    if (formFields.message) {
        formFields.message.addEventListener('input', function() {
            if (this.value.trim()) {
                if (validateMessage(this.value)) {
                    clearError('message');
                } else {
                    showError('message', 'Message must be at least 10 characters long');
                }
            } else {
                clearError('message');
            }
        });
    }

    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearAllErrors();
        
        // Get form data
        const formData = {
            name: formFields.name?.value || '',
            email: formFields.email?.value || '',
            company: formFields.company?.value || '',
            service: formFields.service?.value || '',
            message: formFields.message?.value || ''
        };

        // Validate required fields
        let hasErrors = false;

        if (!validateName(formData.name)) {
            showError('name', 'Name is required and must be at least 2 characters');
            hasErrors = true;
        }

        if (!validateEmail(formData.email)) {
            showError('email', 'Please enter a valid email address');
            hasErrors = true;
        }

        if (!validateService(formData.service)) {
            showError('service', 'Please select a service');
            hasErrors = true;
        }

        if (!validateMessage(formData.message)) {
            showError('message', 'Message is required and must be at least 10 characters');
            hasErrors = true;
        }

        // If there are errors, don't submit
        if (hasErrors) {
            return;
        }

        // Show loading state
        submitBtn.classList.add('btn--loading');
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            successMessage.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            // Hide loading state
            submitBtn.classList.remove('btn--loading');
            submitBtn.disabled = false;
        }
    });
}

/*=============== SMOOTH SCROLLING FOR ANCHOR LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*=============== INTERSECTION OBSERVER FOR ANIMATIONS ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature__card, .service__card, .value__card, .team__card, .service-detail__card, .process__step');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

/*=============== ACTIVE NAVIGATION LINK ===============*/
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

/*=============== PRELOADER ===============*/
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

/*=============== BACK TO TOP BUTTON ===============*/
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
}

window.addEventListener('scroll', toggleBackToTop);

// Back to top functionality
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*=============== LAZY LOADING FOR IMAGES ===============*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*=============== PERFORMANCE OPTIMIZATION ===============*/
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollReveal = debounce(scrollReveal, 10);
const debouncedToggleBackToTop = debounce(toggleBackToTop, 10);
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 10);

// Replace original scroll listeners with debounced versions
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollReveal);
window.removeEventListener('scroll', toggleBackToTop);
window.removeEventListener('scroll', updateActiveNavLink);

window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollReveal);
window.addEventListener('scroll', debouncedToggleBackToTop);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);

/*=============== ACCESSIBILITY IMPROVEMENTS ===============*/
// Keyboard navigation for mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
    }
});

// Focus management for mobile menu
navToggle?.addEventListener('click', function() {
    setTimeout(() => {
        const firstNavLink = navMenu.querySelector('.nav__link');
        firstNavLink?.focus();
    }, 100);
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Announce form submission success
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        setTimeout(() => {
            if (successMessage.classList.contains('show')) {
                announceToScreenReader('Message sent successfully! We will get back to you soon.');
            }
        }, 2100);
    });
}

/*=============== INITIALIZE ON DOM CONTENT LOADED ===============*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any additional functionality here
    console.log('TechFlow Solutions website loaded successfully!');
    
    // Add loading animation to cards
    const cards = document.querySelectorAll('.feature__card, .service__card, .value__card, .team__card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initialize tooltips or other interactive elements
    const interactiveElements = document.querySelectorAll('[data-tooltip]');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Add tooltip functionality if needed
        });
    });
});