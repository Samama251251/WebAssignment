// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('d-none');
            scrollToTopBtn.classList.add('d-flex', 'justify-content-center', 'align-items-center');
            
            // Add fade-in animation
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    scrollToTopBtn.classList.add('d-none');
                    scrollToTopBtn.classList.remove('d-flex', 'justify-content-center', 'align-items-center');
                }
            }, 300);
        }
    });
    
    // Scroll to top with smooth animation when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});