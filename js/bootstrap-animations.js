/**
 * Bootstrap-based Animations
 * Uses Bootstrap utilities with JavaScript for smooth transitions
 */

const BootstrapAnimations = (function() {
    'use strict';
    
    // Initialize all animations
    function init() {
        initTooltipsAndPopovers();
        enhanceNavbarTransitions();
        setupAccordionAnimations();
        setupCardTransitions();
        setupButtonEffects();
        initScrollFadeEffects();
        enhanceModals();
        setupFormAnimations();
    }
    
    /**
     * Initialize tooltips and popovers with animation
     */
    function initTooltipsAndPopovers() {
        // Initialize all tooltips with fade effect
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                animation: true,
                delay: { show: 100, hide: 100 }
            });
        });
        
        // Initialize all popovers with fade effect
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl, {
                animation: true,
                trigger: 'focus'
            });
        });
    }
    
    /**
     * Enhance navbar transitions
     */
    function enhanceNavbarTransitions() {
        // Change navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('navbar-scrolled', 'shadow-sm');
                    navbar.classList.remove('navbar-transparent');
                } else {
                    navbar.classList.remove('navbar-scrolled', 'shadow-sm');
                    if (navbar.classList.contains('navbar-main')) {
                        navbar.classList.add('navbar-transparent');
                    }
                }
            });
            
            // Trigger once on page load
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled', 'shadow-sm');
                navbar.classList.remove('navbar-transparent');
            }
        }
        
        // Add active class to current nav item
        const currentPageUrl = window.location.pathname;
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath && currentPageUrl.endsWith(linkPath)) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    
    /**
     * Set up smooth accordion animations
     */
    function setupAccordionAnimations() {
        // Enhance Bootstrap accordion with custom transitions
        const accordions = document.querySelectorAll('.accordion');
        accordions.forEach(accordion => {
            accordion.addEventListener('show.bs.collapse', function(e) {
                const activeItem = e.target.closest('.accordion-item');
                if (activeItem) {
                    activeItem.classList.add('accordion-active');
                    
                    // Add expanding animation class
                    e.target.classList.add('accordion-animating');
                    
                    // Remove animation class after transition completes
                    e.target.addEventListener('transitionend', function() {
                        e.target.classList.remove('accordion-animating');
                    }, { once: true });
                }
            });
            
            accordion.addEventListener('hide.bs.collapse', function(e) {
                const activeItem = e.target.closest('.accordion-item');
                if (activeItem) {
                    activeItem.classList.remove('accordion-active');
                    
                    // Add collapsing animation class
                    e.target.classList.add('accordion-animating');
                }
            });
        });
    }
    
    /**
     * Set up card hover transitions
     */
    function setupCardTransitions() {
        // Add hover effect to Bootstrap cards
        document.querySelectorAll('.card:not(.no-hover-effect)').forEach(card => {
            // Use Bootstrap shadow utilities with transition
            card.classList.add('transition-all');
            
            card.addEventListener('mouseenter', function() {
                if (card.classList.contains('shadow-sm')) {
                    card.classList.remove('shadow-sm');
                    card.classList.add('shadow');
                } else if (!card.classList.contains('shadow')) {
                    card.classList.add('shadow-sm');
                }
                
                // Optional transform effect - add a subtle lift
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                if (card.classList.contains('shadow') && !card.classList.contains('shadow-persistent')) {
                    card.classList.remove('shadow');
                    card.classList.add('shadow-sm');
                } else if (card.classList.contains('shadow-sm') && !card.classList.contains('shadow-sm-persistent')) {
                    card.classList.remove('shadow-sm');
                }
                
                // Reset transform
                card.style.transform = '';
            });
        });
    }
    
    /**
     * Set up button animation effects
     */
    function setupButtonEffects() {
        // Add transition effects to buttons
        document.querySelectorAll('.btn:not(.no-hover-effect)').forEach(btn => {
            btn.classList.add('transition-all');
            
            // Ripple effect for buttons
            btn.addEventListener('click', function(e) {
                // Create ripple element
                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');
                this.appendChild(ripple);
                
                // Get position
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size/2;
                const y = e.clientY - rect.top - size/2;
                
                // Set position and animate
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                // Remove after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    /**
     * Initialize scroll-triggered fade effects using Bootstrap utilities
     */
    function initScrollFadeEffects() {
        // Use Bootstrap's fade class with Intersection Observer
        const fadeElements = document.querySelectorAll('.fade-on-scroll');
        
        if (fadeElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add Bootstrap's fade class with show
                        entry.target.classList.add('fade', 'show');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            fadeElements.forEach(el => {
                // Set initial state
                el.classList.add('fade');
                el.style.opacity = '0';
                observer.observe(el);
            });
        }
        
        // Add scroll effects to sections
        document.querySelectorAll('section:not(.no-animate)').forEach((section, index) => {
            if (!section.classList.contains('fade-on-scroll') && 
                !section.classList.contains('animate-on-scroll')) {
                
                // Add delay based on section position
                section.style.transitionDelay = `${index * 0.1}s`;
                section.classList.add('fade-on-scroll');
            }
        });
    }
    
    /**
     * Enhance Bootstrap modals with animations
     */
    function enhanceModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            // Listen for modal events to add custom animations
            modal.addEventListener('show.bs.modal', function() {
                // Add entry animation class
                this.classList.add('modal-animate-in');
            });
            
            modal.addEventListener('shown.bs.modal', function() {
                // Clean up animation classes
                this.classList.remove('modal-animate-in');
            });
            
            modal.addEventListener('hide.bs.modal', function() {
                // Add exit animation class
                this.classList.add('modal-animate-out');
            });
            
            modal.addEventListener('hidden.bs.modal', function() {
                // Clean up animation classes
                this.classList.remove('modal-animate-out');
            });
        });
    }
    
    /**
     * Setup form field animations
     */
    function setupFormAnimations() {
        // Add floating label effect to form inputs
        document.querySelectorAll('.form-control').forEach(input => {
            // Skip if already using Bootstrap's floating labels
            if (input.parentElement.classList.contains('form-floating')) return;
            
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('input-focused');
                }
            });
            
            // Check if input has value on page load
            if (input.value !== '') {
                input.parentElement.classList.add('input-focused');
            }
        });
        
        // Add transition effect to form submissions
        document.querySelectorAll('form:not(.no-submit-animation)').forEach(form => {
            form.addEventListener('submit', function(e) {
                if (this.classList.contains('needs-validation') && !this.checkValidity()) {
                    // Don't animate invalid forms
                    return;
                }
                
                // Only animate if form has submit-animation class or data attribute
                if (this.classList.contains('submit-animation') || 
                    this.getAttribute('data-animate-submit') === 'true') {
                    
                    // Add animation classes
                    this.classList.add('form-submitting');
                    
                    // If it's an AJAX form, you'd remove the class after the request completes
                    setTimeout(() => {
                        this.classList.remove('form-submitting');
                    }, 1500);
                }
            });
        });
    }
    
    // Initialize on DOM content loaded
    document.addEventListener('DOMContentLoaded', init);
    
    // Return public methods
    return {
        init: init,
        setupCardTransitions: setupCardTransitions,
        setupButtonEffects: setupButtonEffects,
        initScrollFadeEffects: initScrollFadeEffects
    };
})(); 