// Job Modal Form Validation and Skills Tags
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const addJobForm = document.getElementById('addJobForm');
    const saveJobBtn = document.getElementById('saveJobBtn');
    
    if (addJobForm && saveJobBtn) {
        // Skills input handling
        const skillInput = document.getElementById('skillInput');
        const addSkillBtn = document.getElementById('addSkillBtn');
        const skillsContainer = document.getElementById('skillsContainer');
        let skillsCount = 0;
        
        // Function to add skill badge
        function addSkillBadge(skill) {
            if (skill && skillsCount < 5) {
                // Create badge
                const badge = document.createElement('span');
                badge.classList.add('badge', 'bg-light-green', 'text-primary-green', 'py-2', 'px-3', 'mb-1');
                badge.innerHTML = `${skill} <i class="bi bi-x-circle cursor-pointer ms-1" data-action="remove-skill"></i>`;
                
                // Add to container
                skillsContainer.appendChild(badge);
                skillsCount++;
                
                // Clear input
                skillInput.value = '';
                
                // Add event listener to remove badge
                const removeBtn = badge.querySelector('[data-action="remove-skill"]');
                removeBtn.addEventListener('click', function() {
                    badge.remove();
                    skillsCount--;
                });
            } else if (skillsCount >= 5) {
                // Show alert if max skills reached
                showAlert('You can add up to 5 skills only', 'warning');
            }
        }
        
        // Add skill when button is clicked
        addSkillBtn.addEventListener('click', function() {
            addSkillBadge(skillInput.value.trim());
        });
        
        // Add skill when Enter key is pressed
        skillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkillBadge(this.value.trim());
            }
        });
        
        // Form validation on submit
        saveJobBtn.addEventListener('click', function() {
            let isValid = true;
            
            // Check if form is valid using Bootstrap validation
            if (!addJobForm.checkValidity()) {
                isValid = false;
                addJobForm.classList.add('was-validated');
            }
            
            // Custom validation for salary range
            const minSalary = document.getElementById('minSalary');
            const maxSalary = document.getElementById('maxSalary');
            
            if (parseInt(minSalary.value) > parseInt(maxSalary.value)) {
                isValid = false;
                maxSalary.setCustomValidity('Maximum salary must be greater than minimum salary');
                maxSalary.reportValidity();
            } else {
                maxSalary.setCustomValidity('');
            }
            
            // If all validations pass, submit the form
            if (isValid) {
                // Collect form data
                const formData = {
                    title: document.getElementById('jobTitle').value,
                    company: document.getElementById('companyName').value,
                    location: document.getElementById('location').value,
                    jobType: document.getElementById('jobType').value,
                    salary: `$${minSalary.value} - $${maxSalary.value}`,
                    description: document.getElementById('jobDescription').value,
                    skills: Array.from(skillsContainer.querySelectorAll('.badge')).map(badge => badge.textContent.trim().replace(' ×', '')),
                    rounds: {
                        dsa: document.getElementById('dsaRound').checked,
                        techStack: document.getElementById('techStackRound').checked,
                        behavioral: document.getElementById('behavioralRound').checked,
                        systemDesign: document.getElementById('systemDesignRound').checked
                    },
                    status: document.getElementById('jobStatus').checked ? 'Active' : 'Inactive'
                };
                
                // In a real app, you would send this data to your backend
                console.log('Job Data:', formData);
                
                // Show success message and close modal
                showAlert('Job added successfully!', 'success');
                
                // Create a new job entry in the list (for demo purposes)
                addJobToList(formData);
                
                // Close the modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('addJobModal'));
                modal.hide();
                
                // Reset the form
                addJobForm.reset();
                skillsContainer.innerHTML = '';
                skillsCount = 0;
                addJobForm.classList.remove('was-validated');
            }
        });
    }
    
    // Function to show alert notification
    function showAlert(message, type = 'success') {
        const alertContainer = document.createElement('div');
        alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertContainer.style.top = '20px';
        alertContainer.style.right = '20px';
        alertContainer.style.zIndex = '1050';
        alertContainer.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(alertContainer);
        
        // Auto dismiss after 3 seconds
        setTimeout(() => {
            alertContainer.classList.remove('show');
            setTimeout(() => {
                alertContainer.remove();
            }, 300);
        }, 3000);
    }
    
    // Function to add job to the list
    function addJobToList(jobData) {
        const jobsList = document.querySelector('.job-list-item').parentElement;
        
        // Create new job list item
        const newJobItem = document.createElement('li');
        newJobItem.className = 'list-group-item job-list-item p-3';
        newJobItem.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-6">
                    <h6 class="mb-1">${jobData.title}</h6>
                    <p class="mb-0 text-muted small">Posted just now • 0 applicants</p>
                </div>
                <div class="col-md-3 job-status">
                    <span class="badge bg-${jobData.status === 'Active' ? 'success' : 'secondary'}">${jobData.status}</span>
                </div>
                <div class="col-md-3 job-actions">
                    <button class="btn btn-sm btn-outline-secondary me-1">Edit</button>
                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            </div>
        `;
        
        // Add animation
        newJobItem.style.animation = 'fadeIn 0.5s';
        
        // Add to the beginning of the list
        jobsList.insertBefore(newJobItem, jobsList.firstChild);
    }
});

// Add this CSS for cursor pointer on the X icon for skills
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .cursor-pointer {
            cursor: pointer;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
`);