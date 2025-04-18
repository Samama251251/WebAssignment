/**
 * Animation Helper Utilities
 * Use these functions to add animations to any page
 */

const AnimationHelper = {
    /**
     * Add scroll animation to an element
     * @param {Element|string} element - DOM element or selector
     * @param {string} animation - Animation type (fade-in, fade-in-up, etc.)
     * @param {string} delay - Optional delay (e.g. "0.3s")
     */
    addScrollAnimation: function(element, animation = 'fade-in', delay = null) {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (!el) return;
        
        el.classList.add('animate-on-scroll');
        el.dataset.animation = animation;
        
        if (delay) {
            el.dataset.delay = delay;
            el.style.setProperty('--delay', delay);
        }
    },
    
    /**
     * Make a list/group of elements animate in sequence
     * @param {Element|string} parentElement - Parent element or selector
     * @param {string} childSelector - Selector for children to animate
     * @param {string} animation - Animation type
     * @param {number} baseDelay - Base delay in seconds
     * @param {number} staggerAmount - Amount to stagger each item in seconds
     */
    createStaggeredList: function(parentElement, childSelector, animation = 'fade-in-up', baseDelay = 0, staggerAmount = 0.1) {
        const parent = typeof parentElement === 'string' ? document.querySelector(parentElement) : parentElement;
        if (!parent) return;
        
        parent.classList.add('animate-on-scroll', 'stagger-list');
        
        const children = parent.querySelectorAll(childSelector);
        children.forEach((child, index) => {
            const delay = baseDelay + (index * staggerAmount);
            child.style.transitionDelay = `${delay}s`;
        });
    },
    
    /**
     * Add image hover zoom effect
     * @param {Element|string} imgContainer - Image container or selector
     */
    addImageHoverEffect: function(imgContainer) {
        const container = typeof imgContainer === 'string' ? document.querySelector(imgContainer) : imgContainer;
        if (!container) return;
        
        container.classList.add('img-hover-zoom');
    },
    
    /**
     * Add a custom animation to an element
     * @param {Element|string} element - Element or selector
     * @param {string} animationName - CSS animation name
     * @param {string} duration - Animation duration (e.g. "0.5s")
     * @param {string} timing - Timing function (e.g. "ease-out")
     * @param {string} trigger - When to trigger ("load", "scroll", "hover")
     */
    addCustomAnimation: function(element, animationName, duration = '0.5s', timing = 'ease', trigger = 'load') {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (!el) return;
        
        const applyAnimation = () => {
            el.style.animation = `${animationName} ${duration} ${timing}`;
        };
        
        switch(trigger) {
            case 'load':
                window.addEventListener('load', applyAnimation);
                break;
            case 'scroll':
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            applyAnimation();
                            observer.unobserve(el);
                        }
                    });
                }, { threshold: 0.1 });
                observer.observe(el);
                break;
            case 'hover':
                el.addEventListener('mouseenter', applyAnimation);
                el.addEventListener('mouseleave', () => {
                    el.style.animation = '';
                });
                break;
        }
    },
    
    /**
     * Animate element when it scrolls into view
     * @param {string} selector - CSS selector for elements to animate 
     * @param {Object} options - Animation options
     */
    animateOnScroll: function(selector, options = {}) {
        const defaults = {
            animation: 'fade-in',
            threshold: 0.1,
            delay: 0,
            once: true
        };
        
        const settings = { ...defaults, ...options };
        
        document.querySelectorAll(selector).forEach(el => {
            this.addScrollAnimation(el, settings.animation, settings.delay + 's');
        });
    },
    
    /**
     * Initialize all animations on a page
     * Best called on DOMContentLoaded
     */
    initializePage: function() {
        // Common elements to animate
        this.animateOnScroll('section > .container > h2', { animation: 'fade-in-up' });
        this.animateOnScroll('.row > .col-lg-6:first-child', { animation: 'fade-in-right' });
        this.animateOnScroll('.row > .col-lg-6:last-child', { animation: 'fade-in-left' });
        this.createStaggeredList('.card-grid', '.card');
        
        // Add more default animations here for your specific site
    }
};

// Auto-initialize if script is included directly
document.addEventListener('DOMContentLoaded', () => {
    if (window.autoInitAnimations !== false) {
        AnimationHelper.initializePage();
    }
}); 