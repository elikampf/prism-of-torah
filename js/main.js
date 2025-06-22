// Main JavaScript file for Prism of Torah website

// DOM Elements
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

// Newsletter form handling with validation and Netlify integration
class NewsletterForm {
  constructor() {
    this.form = document.querySelector('form[name="newsletter"]');
    this.emailInput = this.form?.querySelector('input[name="email"]');
    this.submitButton = this.form?.querySelector('button[type="submit"]');
    this.init();
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.emailInput?.addEventListener('input', this.validateEmail.bind(this));
    this.emailInput?.addEventListener('blur', this.validateEmail.bind(this));
  }

  validateEmail() {
    const email = this.emailInput.value.trim();
    const isValid = this.isValidEmail(email);
    this.emailInput.classList.toggle('error', !isValid && email.length > 0);
    this.emailInput.classList.toggle('valid', isValid);
    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.validateEmail()) {
      this.showError('Please enter a valid email address');
      return;
    }
    this.setLoadingState(true);
    try {
      const formData = new FormData(this.form);
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      if (response.ok) {
        this.showSuccess();
        this.trackConversion('newsletter_signup', 'homepage');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      this.showError('Something went wrong. Please try again.');
    } finally {
      this.setLoadingState(false);
    }
  }

  setLoadingState(loading) {
    if (!this.submitButton) return;
    this.submitButton.disabled = loading;
    this.submitButton.textContent = loading ? 'Subscribing...' : 'Start Your Transformation';
    this.submitButton.classList.toggle('loading', loading);
  }

  showSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
      <div class="success-content">
        <h4>Welcome to the Journey! 🎉</h4>
        <p>Your first Torah insight will arrive this Friday. Check your email for confirmation.</p>
      </div>
    `;
    this.form.parentNode.insertBefore(successMessage, this.form.nextSibling);
    this.form.style.display = 'none';
    setTimeout(() => {
      successMessage.remove();
      this.form.style.display = 'block';
      this.form.reset();
    }, 10000);
  }

  showError(message) {
    const existingError = this.form.querySelector('.form-error');
    if (existingError) existingError.remove();
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-error';
    errorMessage.textContent = message;
    this.form.appendChild(errorMessage);
    setTimeout(() => errorMessage.remove(), 5000);
  }

  trackConversion(event, location) {
    if (typeof gtag !== 'undefined') {
      gtag('event', event, {
        'event_category': 'engagement',
        'event_label': location,
        'value': 1
      });
    }
    console.log(`Tracked: ${event} from ${location}`);
  }
}

// Smooth scrolling for anchor links
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        this.scrollToElement(target);
        this.trackNavigation(href);
      }
    });
  }

  scrollToElement(element) {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  trackNavigation(href) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'scroll_to_section', {
        'event_category': 'navigation',
        'event_label': href
      });
    }
  }
}

// Mobile hamburger menu functionality
class MobileNavigation {
  constructor() {
    this.toggle = document.querySelector('.mobile-menu-toggle');
    this.nav = document.querySelector('.header-nav');
    this.isOpen = false;
    this.init();
  }

  init() {
    if (!this.toggle || !this.nav) return;
    this.toggle.addEventListener('click', this.toggleMenu.bind(this));
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.toggle.contains(e.target) && !this.nav.contains(e.target)) {
        this.closeMenu();
      }
    });
    this.nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        this.closeMenu();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.isOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu() {
    this.nav.classList.add('nav-open');
    this.toggle.classList.add('menu-open');
    this.toggle.setAttribute('aria-expanded', 'true');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.nav.classList.remove('nav-open');
    this.toggle.classList.remove('menu-open');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.isOpen = false;
    document.body.style.overflow = '';
  }
}

// Header behavior on scroll
class HeaderController {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScrollY = window.scrollY;
    this.scrollThreshold = 100;
    this.init();
  }

  init() {
    if (!this.header) return;
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > this.scrollThreshold) {
      this.header.classList.add('header-scrolled');
    } else {
      this.header.classList.remove('header-scrolled');
    }
    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      this.header.classList.add('header-hidden');
    } else {
      this.header.classList.remove('header-hidden');
    }
    this.lastScrollY = currentScrollY;
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// Analytics and event tracking
class AnalyticsTracker {
  constructor() {
    this.init();
  }

  init() {
    this.trackPageView();
    this.trackUserInteractions();
    this.trackOutboundLinks();
  }

  trackPageView() {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }

  trackUserInteractions() {
    document.addEventListener('click', (e) => {
      const button = e.target.closest('button, .btn-primary, .btn-secondary');
      if (button) {
        this.trackEvent('button_click', {
          button_text: button.textContent.trim(),
          button_class: button.className
        });
      }
    });
    document.addEventListener('focus', (e) => {
      if (e.target.type === 'email') {
        this.trackEvent('email_field_focus', {
          form_name: e.target.closest('form')?.name || 'unknown'
        });
      }
    }, true);
  }

  trackOutboundLinks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && this.isOutboundLink(link.href)) {
        this.trackEvent('outbound_click', {
          link_url: link.href,
          link_text: link.textContent.trim()
        });
      }
    });
  }

  isOutboundLink(href) {
    return href && (
      href.includes('amazon.com') ||
      href.includes('feldheim.com') ||
      href.includes('hamadaf-y.co.il') ||
      href.includes('spotify.com') ||
      href.includes('apple.com') ||
      href.startsWith('mailto:')
    );
  }

  trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        'event_category': 'engagement',
        ...parameters
      });
    }
    console.log(`Analytics: ${eventName}`, parameters);
  }
}

// Lazy loading and performance optimizations
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.setupIntersectionObserver();
    this.optimizeImages();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
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
    } else {
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }

  setupIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });
      animatedElements.forEach(el => animationObserver.observe(el));
    }
  }

  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (index > 2) {
        img.loading = 'lazy';
      }
    });
  }
}

// Global error handling and fallbacks
class ErrorHandler {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('error', this.handleError.bind(this));
    window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
  }

  handleError(event) {
    console.error('JavaScript error:', event.error);
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        'description': event.error?.message || 'Unknown error',
        'fatal': false
      });
    }
  }

  handlePromiseRejection(event) {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
  }
}

// Initialize all functionality when DOM is ready
class PrismOfTorahApp {
  constructor() {
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.initializeComponents.bind(this));
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      new NewsletterForm();
      new SmoothScroll();
      new MobileNavigation();
      new HeaderController();
      new AnalyticsTracker();
      new PerformanceOptimizer();
      new ErrorHandler();
      console.log('Prism of Torah website initialized successfully');
    } catch (error) {
      console.error('Error initializing components:', error);
    }
  }
}

// Start the application
new PrismOfTorahApp();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add newsletter form to footer
    const newsletterForm = new NewsletterForm();
    footer.appendChild(newsletterForm.form);
});

// --- Podcast Page Specific Functions ---
// Only run these on the podcast page to avoid conflicts with podcast.js
if (window.location.pathname.includes('podcast.html')) {
  // Podcast functionality is handled in podcast.js
  // This prevents conflicts between the two files
}

// Animated Counter for Impact Statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize animated counters when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
}); 