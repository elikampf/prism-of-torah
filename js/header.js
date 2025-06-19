// Header functionality
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const headerNav = document.querySelector('.header-nav');
    let lastScrollY = window.scrollY;

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        headerNav.setAttribute('aria-expanded', !isExpanded);
    });

    // Header scroll behavior
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when page is scrolled (for styling changes)
        if (currentScrollY > 10) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Hide header when scrolling down significantly, show when scrolling up
        // Only hide the header when user has scrolled down more than 200px
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('header-hidden');
        } else if (currentScrollY < lastScrollY || currentScrollY <= 200) {
            header.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = header.contains(event.target);
        if (!isClickInside && headerNav.getAttribute('aria-expanded') === 'true') {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            headerNav.setAttribute('aria-expanded', 'false');
        }
    });

    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}); 