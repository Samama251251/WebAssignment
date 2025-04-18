/**
 * Global Animation and Smooth Scrolling
 * This module provides animation utilities for the entire website
 */

(function() {
    'use strict';
    
    // Initialize all animation features
    function init() {
        initSmoothScroll();
        initScrollAnimations();
        initHoverAnimations();
        initLoaderAnimation();
    }
    
    /**
     * Enable smooth scrolling for all anchor links
     */
    function initSmoothScroll() {
        // Select all links with hashes
        document.querySelectorAll('a[href*="#"]').forEach(anchor => {
            // Skip links that don't link to the current page
            if (anchor.pathname !== window.location.pathname && anchor.pathname !== '') return;
            
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').split('#')[1];
                
                // Skip if empty hash or no element
                if (!targetId) return;
                
                const targetElement = document.getElementById(targetId);
                if (!targetElement) return;
                
                e.preventDefault();
                
                // Calculate header height for offset (if fixed header exists)
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition - headerHeight - 20, // 20px extra padding
                    behavior: 'smooth'
                });
                
                // Update URL without scroll
                history.pushState(null, null, `#${targetId}`);
            });
        });
    }
    
    /**
     * Initialize scroll-triggered animations for elements
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        // Set initial state - hidden
        animatedElements.forEach(el => {
            if (!el.classList.contains('animated')) {
                el.style.opacity = '0';
            }
        });
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation classes when element becomes visible
                    entry.target.classList.add('animated');
                    
                    // Apply specific animation if defined
                    const animationType = entry.target.dataset.animation || 'fade-in';
                    entry.target.classList.add(animationType);
                    
                    // Reset opacity that was set initially
                    entry.target.style.opacity = '';
                    
                    // Stop observing after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // Trigger when 15% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Adjust trigger point (negative value means "before it's fully in view")
        });
        
        // Start observing elements
        animatedElements.forEach(el => {
            observer.observe(el);
        });
        
        // Auto-apply to common sections if not manually marked
        autoApplyAnimations();
    }
    
    /**
     * Auto-apply animations to common elements if not manually marked
     */
    function autoApplyAnimations() {
        // Section titles
        document.querySelectorAll('section > .container > h2, section > .container > .row > .col > h2').forEach(el => {
            if (!el.closest('.animate-on-scroll') && !el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
                el.dataset.animation = 'fade-in-up';
                el.style.opacity = '0';
            }
        });
        
        // Cards in rows
        document.querySelectorAll('.card').forEach((el, index) => {
            if (!el.closest('.animate-on-scroll') && !el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
                el.dataset.animation = 'fade-in-up';
                el.dataset.delay = (index * 0.1) + 's'; // Staggered delay
                el.style.opacity = '0';
            }
        });
        
        // Images
        document.querySelectorAll('section img').forEach(el => {
            if (!el.closest('.animate-on-scroll') && !el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
                el.dataset.animation = 'fade-in';
                el.style.opacity = '0';
            }
        });
        
        // Observe newly added elements
        initScrollAnimations();
    }
    
    /**
     * Add subtle hover animations to interactive elements
     */
    function initHoverAnimations() {
        // Animate buttons on hover
        document.querySelectorAll('.btn').forEach(btn => {
            if (!btn.classList.contains('btn-hover-animated')) {
                btn.classList.add('btn-hover-animated');
            }
        });
        
        // Animate cards on hover
        document.querySelectorAll('.card:not(.no-hover)').forEach(card => {
            if (!card.classList.contains('card-hover-animated')) {
                card.classList.add('card-hover-animated');
            }
        });
    }
    
    /**
     * Initialize page load animation
     */
    function initLoaderAnimation() {
        // Don't show loader if page is already loaded
        if (document.readyState === 'complete') return;
        
        // Create and append loader element
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(loader);
        
        // Hide loader when page is fully loaded
        window.addEventListener('load', () => {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.remove();
            }, 500); // Remove after fade out animation
        });
    }
    
    // Initialize on DOM content loaded
    document.addEventListener('DOMContentLoaded', init);
})(); 