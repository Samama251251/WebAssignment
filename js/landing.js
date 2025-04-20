/**
 * Landing Page Interactive Features
 * This module handles interactive elements for the landing page
 */

(function() {
    'use strict';
    
    // Initialize all interactive components
    function init() {
        initFaqAccordion();
        initFaqSearch();
        initFaqCategories();
        enhanceWithAnimations();
    }
    
    /**
     * Initialize FAQ accordion with animated interactions
     */
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            const content = item.querySelector('.faq-content');
            
            // Set initial heights for smooth animation
            content.style.maxHeight = '0px';
            
            header.addEventListener('click', () => {
                // Toggle active state for the clicked item
                const isActive = item.classList.contains('active');
                
                // Optional: Close other open items first (comment out for multiple open items)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-content').style.maxHeight = '0px';
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = '0px';
                } else {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
            
            // Add hover effects
            header.addEventListener('mouseenter', () => {
                if (!item.classList.contains('active')) {
                    item.classList.add('hover');
                }
            });
            
            header.addEventListener('mouseleave', () => {
                item.classList.remove('hover');
            });
        });
    }
    
    /**
     * Add search functionality to FAQs
     */
    function initFaqSearch() {
        const searchInput = document.getElementById('faq-search');
        const faqItems = document.querySelectorAll('.faq-item');
        const faqEmpty = document.querySelector('.faq-empty');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();
                let visibleItems = 0;
                
                if (searchTerm.length < 2) {
                    // Show all items when search is empty or too short
                    faqItems.forEach(item => {
                        item.classList.remove('hidden');
                        item.style.display = '';
                        
                        // Remove any highlights
                        const question = item.querySelector('.faq-header h3');
                        const answer = item.querySelector('.faq-content p');
                        question.innerHTML = question.textContent;
                        answer.innerHTML = answer.textContent;
                    });
                    
                    if (faqEmpty) faqEmpty.style.display = 'none';
                    return;
                }
                
                // Filter items based on search
                faqItems.forEach(item => {
                    const question = item.querySelector('.faq-header h3').textContent.toLowerCase();
                    const answer = item.querySelector('.faq-content p').textContent.toLowerCase();
                    
                    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                        item.classList.remove('hidden');
                        item.style.display = '';
                        visibleItems++;
                        
                        // Highlight matching text
                        highlightMatches(item, searchTerm);
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                });
                
                // Show "no results" message if no items match
                if (faqEmpty) {
                    faqEmpty.style.display = visibleItems === 0 ? 'flex' : 'none';
                }
            });
        }
    }
    
    /**
     * Highlight matching search terms in FAQ items
     */
    function highlightMatches(item, term) {
        const question = item.querySelector('.faq-header h3');
        const answer = item.querySelector('.faq-content p');
        
        // Helper function to add highlights
        const addHighlights = (element, text) => {
            // Create regex to match the search term, case insensitive
            const regex = new RegExp('(' + term + ')', 'gi');
            return text.replace(regex, '<span class="highlight">$1</span>');
        };
        
        // Apply highlighting
        question.innerHTML = addHighlights(question, question.textContent);
        answer.innerHTML = addHighlights(answer, answer.textContent);
    }
    
    /**
     * Initialize FAQ category filtering
     */
    function initFaqCategories() {
        const categoryButtons = document.querySelectorAll('.faq-category');
        const faqItems = document.querySelectorAll('.faq-item');
        const faqEmpty = document.querySelector('.faq-empty');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                let visibleItems = 0;
                
                // Filter items based on category
                faqItems.forEach(item => {
                    const itemCategories = item.getAttribute('data-category')?.split(' ') || [];
                    
                    if (category === 'all' || itemCategories.includes(category)) {
                        item.classList.remove('category-hidden');
                        item.style.display = '';
                        visibleItems++;
                    } else {
                        item.classList.add('category-hidden');
                        item.style.display = 'none';
                    }
                });
                
                // Show "no results" message if no items match
                if (faqEmpty) {
                    faqEmpty.style.display = visibleItems === 0 ? 'flex' : 'none';
                }
            });
        });
    }
    
    /**
     * Enhance page with additional animations
     */
    function enhanceWithAnimations() {
        // Apply staggered animations to FAQ items if not already animated
        const faqAccordion = document.querySelector('.faq-accordion');
        if (faqAccordion && !faqAccordion.classList.contains('stagger-list')) {
            const faqItems = faqAccordion.querySelectorAll('.faq-item');
            
            // Add staggered animation classes
            faqAccordion.classList.add('stagger-list', 'animate-on-scroll');
            faqItems.forEach((item, index) => {
                // Use animation-order for CSS animations
                item.style.setProperty('--animation-order', index);
            });
        }
        
        // Enhance feature card animations
        document.querySelectorAll('.feature-card').forEach(card => {
            if (!card.classList.contains('animate-on-scroll')) {
                card.classList.add('animate-on-scroll', 'fade-in-up');
            }
        });
        
        // Add image hover effects to testimonial images
        document.querySelectorAll('.testimonial-card').forEach(card => {
            const avatar = card.querySelector('.avatar-circle');
            if (avatar && !avatar.closest('.img-hover-zoom')) {
                const parent = avatar.parentElement;
                parent.classList.add('img-hover-zoom');
            }
        });
        
        // Add smooth reveal animation to pricing cards
        const pricingSection = document.querySelector('#pricing');
        if (pricingSection) {
            const pricingCards = pricingSection.querySelectorAll('.card');
            pricingCards.forEach((card, index) => {
                card.classList.add('animate-on-scroll');
                card.dataset.animation = 'fade-in-up';
                card.dataset.delay = (index * 0.15) + 's';
            });
        }
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', init);

    // Scroll to Top functionality
    document.addEventListener('DOMContentLoaded', function() {
        const scrollToTopButton = document.querySelector('.scroll-to-top');
        const scrollThreshold = 300; // Show button after scrolling 300px

        // Function to handle scroll event
        function handleScroll() {
            if (window.scrollY > scrollThreshold) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        }

        // Function to scroll to top
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Add event listeners
        window.addEventListener('scroll', handleScroll);
        scrollToTopButton.addEventListener('click', scrollToTop);

        // Initial check for scroll position
        handleScroll();
    });
})(); 