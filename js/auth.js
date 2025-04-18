/**
 * Authentication Form Validation
 * 
 * This module handles validation for both login and signup forms
 * including form submission validation.
 */

// Use IIFE to avoid polluting global scope
(function() {
    'use strict';

    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const signupName = document.getElementById('signupName');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const termsCheck = document.getElementById('termsCheck');

    // Validation patterns
    const patterns = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        // Password must be at least 8 characters, with at least one uppercase, one lowercase, one number
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    };

    // Error messages
    const errorMessages = {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        password: 'Password must be at least 8 characters with uppercase, lowercase and number',
        passwordMatch: 'Passwords do not match',
        terms: 'You must agree to the terms and conditions'
    };

    /**
     * Initialize validation
     */
    function init() {
        // Add event listeners for form submission only
        if (loginForm) {
            loginForm.addEventListener('submit', validateLoginForm);
        }

        if (signupForm) {
            signupForm.addEventListener('submit', validateSignupForm);
        }

        // Password strength meter should still work during typing
        // but without showing validation errors
        if (signupPassword) {
            signupPassword.addEventListener('input', function() {
                updatePasswordStrengthOnly(this);
            });
            signupPassword.addEventListener('focus', function() {
                const strengthMeter = document.querySelector('.password-strength');
                if (strengthMeter) {
                    strengthMeter.classList.remove('d-none');
                }
            });
        }
    }

    /**
     * Update only the password strength meter without validation
     * @param {HTMLInputElement} passwordField - The password field
     */
    function updatePasswordStrengthOnly(passwordField) {
        const strengthMeter = passwordField.parentNode.parentNode.querySelector('.password-strength');
        if (strengthMeter) {
            updatePasswordStrength(passwordField.value, strengthMeter);
        }
    }

    /**
     * Clear all form errors
     * @param {HTMLFormElement} form - The form to clear errors from
     */
    function clearAllErrors(form) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            clearError(input);
        });
    }

    /**
     * Validate login form on submission
     * @param {Event} e - The submit event
     */
    function validateLoginForm(e) {
        // Prevent form submission
        e.preventDefault();
        
        // Clear previous errors
        clearAllErrors(loginForm);
        
        // Validate email and password
        const isEmailValid = validateField(loginEmail);
        const isPasswordValid = validateField(loginPassword);
        
        // Submit form if valid
        if (isEmailValid && isPasswordValid) {
            // For demo purposes, we'll just redirect to the admin dashboard
            // In a real application, you would submit the form or make an AJAX request
            window.location.href = 'AdminDashboard.html';
        }
    }

    /**
     * Validate signup form on submission
     * @param {Event} e - The submit event
     */
    function validateSignupForm(e) {
        // Prevent form submission
        e.preventDefault();
        
        // Clear previous errors
        clearAllErrors(signupForm);
        
        // Validate all fields
        const isNameValid = validateField(signupName);
        const isEmailValid = validateField(signupEmail);
        const isPasswordValid = validateField(signupPassword);
        const isConfirmPasswordValid = validatePasswordMatch(signupPassword, confirmPassword);
        const isTermsChecked = validateTerms();
        
        // Submit form if valid
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsChecked) {
            // For demo purposes, we'll just redirect to the client posting page
            // In a real application, you would submit the form or make an AJAX request
            window.location.href = 'client_posting.html';
        }
    }

    /**
     * Validate an individual field
     * @param {HTMLInputElement} field - The input field to validate
     * @returns {boolean} - Whether the field is valid
     */
    function validateField(field) {
        // Clear previous error
        clearError(field);
        
        // Check if field is required and empty
        if (field.required && field.value.trim() === '') {
            showError(field, errorMessages.required);
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim() !== '') {
            if (!patterns.email.test(field.value.trim())) {
                showError(field, errorMessages.email);
                return false;
            }
        }
        
        // Password validation (only for signup password)
        if (field.id === 'signupPassword' && field.value.trim() !== '') {
            if (!patterns.password.test(field.value.trim())) {
                showError(field, errorMessages.password);
                return false;
            }
        }
        
        // If we got here, the field is valid
        field.classList.add('is-valid');
        return true;
    }

    /**
     * Validate that passwords match
     * @param {HTMLInputElement} passwordField - The password field
     * @param {HTMLInputElement} confirmField - The confirm password field
     * @returns {boolean} - Whether the passwords match
     */
    function validatePasswordMatch(passwordField, confirmField) {
        // Clear previous error
        clearError(confirmField);
        
        // Check if confirm password is empty
        if (confirmField.value.trim() === '') {
            showError(confirmField, errorMessages.required);
            return false;
        }
        
        // Check if passwords match
        if (passwordField.value !== confirmField.value) {
            showError(confirmField, errorMessages.passwordMatch);
            return false;
        }
        
        // If we got here, the passwords match
        confirmField.classList.add('is-valid');
        return true;
    }

    /**
     * Validate terms checkbox
     * @returns {boolean} - Whether the terms checkbox is checked
     */
    function validateTerms() {
        // Check if terms checkbox is checked
        if (!termsCheck.checked) {
            showError(termsCheck, errorMessages.terms);
            return false;
        }
        
        // Clear previous error
        clearError(termsCheck);
        return true;
    }

    /**
     * Show error message for a field
     * @param {HTMLElement} field - The field to show error for
     * @param {string} message - The error message
     */
    function showError(field, message) {
        // Add invalid class to the field
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        
        // Create error message element if it doesn't exist
        let errorElement = field.parentNode.querySelector('.invalid-feedback');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            
            // For input groups, append after the input group
            if (field.parentNode.classList.contains('input-group')) {
                field.parentNode.parentNode.appendChild(errorElement);
            } else {
                field.parentNode.appendChild(errorElement);
            }
        }
        
        errorElement.textContent = message;
    }

    /**
     * Clear error message for a field
     * @param {HTMLElement} field - The field to clear error for
     */
    function clearError(field) {
        // Remove invalid/valid classes from the field
        field.classList.remove('is-invalid');
        field.classList.remove('is-valid');
        
        // Remove error message element if it exists
        const parent = field.parentNode.classList.contains('input-group') 
            ? field.parentNode.parentNode 
            : field.parentNode;
        
        const errorElement = parent.querySelector('.invalid-feedback');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    /**
     * Show success message
     * @param {string} message - The success message
     */
    function showSuccessMessage(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast position-fixed bottom-0 end-0 m-3';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="toast-header bg-success text-white">
                <strong class="me-auto">Success</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        `;
        
        // Add to document
        document.body.appendChild(toast);
        
        // Show toast
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove toast after it's hidden
        toast.addEventListener('hidden.bs.toast', function() {
            document.body.removeChild(toast);
        });
    }

    /**
     * Show password strength meter
     * Used for an enhanced user experience on signup
     */
    function addPasswordStrengthMeter() {
        if (!signupPassword) return;
        
        // Create strength meter elements
        const strengthMeter = document.createElement('div');
        strengthMeter.className = 'password-strength mt-2 d-none';
        strengthMeter.innerHTML = `
            <small class="text-muted">Password strength: <span class="strength-text">Type a password</span></small>
            <div class="progress mt-1" style="height: 5px;">
                <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        `;
        
        // Insert after the password field's parent (input group)
        signupPassword.parentNode.parentNode.appendChild(strengthMeter);
    }

    /**
     * Update password strength meter
     * @param {string} password - The password to check
     * @param {HTMLElement} meterElement - The meter element
     */
    function updatePasswordStrength(password, meterElement) {
        // Get elements
        const strengthText = meterElement.querySelector('.strength-text');
        const progressBar = meterElement.querySelector('.progress-bar');
        
        // Check password strength
        let strength = 0;
        let feedback = 'Very weak';
        let colorClass = 'bg-danger';
        
        // Calculate strength
        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        
        // Update feedback and color based on strength
        if (strength >= 100) {
            feedback = 'Strong';
            colorClass = 'bg-success';
        } else if (strength >= 75) {
            feedback = 'Good';
            colorClass = 'bg-info';
        } else if (strength >= 50) {
            feedback = 'Medium';
            colorClass = 'bg-warning';
        } else if (strength >= 25) {
            feedback = 'Weak';
            colorClass = 'bg-danger';
        }
        
        // Update UI
        strengthText.textContent = feedback;
        progressBar.style.width = strength + '%';
        progressBar.setAttribute('aria-valuenow', strength);
        
        // Update color
        progressBar.className = 'progress-bar ' + colorClass;
    }

    // Add password strength meter for enhanced UX
    addPasswordStrengthMeter();

    // Initialize validation on page load
    document.addEventListener('DOMContentLoaded', init);
    
})(); 