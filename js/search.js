document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    function initAnimations() {
        // Animate stats cards
        const statCards = document.querySelectorAll('.animate-on-scroll');
        statCards.forEach((card, index) => {
            const delay = card.dataset.delay || '0s';
            card.style.transitionDelay = delay;
            card.classList.add('animated');
        });
        
        // Animate job items
        const jobItems = document.querySelectorAll('.job-list-item');
        jobItems.forEach((item, index) => {
            item.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
            item.classList.add('animated');
        });
    }
    
    // Initialize search functionality
    function initSearch() {
        const jobsList = document.getElementById('jobsList');
        const jobItems = jobsList.querySelectorAll('.job-list-item');
        const noJobsFound = document.getElementById('noJobsFound');
        const searchInput = document.getElementById('jobSearch');
        const searchIcon = document.querySelector('.search-icon');
        
        // Create clear button
        const clearBtn = document.createElement('button');
        clearBtn.className = 'btn-close search-clear';
        clearBtn.setAttribute('aria-label', 'Clear search');
        clearBtn.style.display = 'none';
        searchInput.parentNode.appendChild(clearBtn);
        
        // Search function
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;
            
            jobItems.forEach(item => {
                const jobTitle = item.dataset.jobTitle.toLowerCase();
                const titleElement = item.querySelector('h6');
                
                // Reset title to original
                titleElement.textContent = item.dataset.jobTitle;
                
                if (searchTerm === '' || jobTitle.includes(searchTerm)) {
                    item.style.display = '';
                    visibleCount++;
                    
                    // Highlight matches
                    if (searchTerm !== '') {
                        const regex = new RegExp(`(${searchTerm})`, 'gi');
                        titleElement.innerHTML = item.dataset.jobTitle.replace(
                            regex, 
                            '<span class="highlight">$1</span>'
                        );
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (visibleCount === 0 && searchTerm !== '') {
                noJobsFound.classList.remove('d-none');
            } else {
                noJobsFound.classList.add('d-none');
            }
            
            // Show/hide clear button
            clearBtn.style.display = searchTerm !== '' ? 'block' : 'none';
        }
        
        // Event listeners
        searchInput.addEventListener('input', function() {
            // Animate search icon
            if (this.value) {
                searchIcon.classList.add('searching');
            } else {
                searchIcon.classList.remove('searching');
            }
            
            performSearch();
        });
        
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            searchIcon.classList.remove('searching');
            performSearch();
        });
    }
    
    // Initialize everything
    initAnimations();
    initSearch();
});