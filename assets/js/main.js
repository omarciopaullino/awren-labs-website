// Awren Labs — Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            navToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
            }
            lastScroll = currentScroll;
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .wp-card, .research-tag').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            alert('Obrigado pelo contato. Retornaremos em breve.');
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imgObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }

    // Copy to clipboard functionality for code blocks
    document.querySelectorAll('pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        button.style.cssText = 'position: absolute; top: 8px; right: 8px; padding: 4px 8px; font-size: 12px; background: #1E1E1E; border: 1px solid #2A2A2A; color: #B0B0B0; cursor: pointer;';
        pre.style.position = 'relative';
        pre.appendChild(button);

        button.addEventListener('click', function() {
            const code = pre.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(function() {
                button.textContent = 'Copied!';
                setTimeout(function() {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
    });

    console.log('Awren Labs — Site loaded');
});

// Utility functions
const Awren = {
    // Format date
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Generate random ID
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Smooth scroll to element
    scrollTo: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },

    // Toggle mobile nav
    toggleNav: function() {
        const nav = document.querySelector('.nav');
        const toggle = document.querySelector('.nav-toggle');
        if (nav && toggle) {
            nav.classList.toggle('active');
            toggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        }
    }
};

// Export for use in other scripts
window.Awren = Awren;