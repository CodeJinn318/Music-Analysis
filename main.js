function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove existing error messages
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    field.parentElement.appendChild(errorDiv);
    field.classList.add('error');
    
    // Remove error state after user starts typing
    field.addEventListener('input', () => {
        field.classList.remove('error');
        errorDiv.remove();
    });
}

function submitForm() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
        form.reset();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }, 2000);
    }, 1500);
} 