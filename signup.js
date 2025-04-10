    // Sa form ug form elements
    const form = document.getElementById('signup-form');
    const formContainer = document.getElementById('form-container');
    const successMessage = document.getElementById('success-message');
    const confirmationEmail = document.getElementById('confirmation-email');
    const restartButton = document.getElementById('restart-btn');
    
    
    // Simple form sa validation func
    function checkName(name) {
      console.log('Checking name:', name);
      if (name.length < 2) {
        return 'Name must be at least 2 characters';
      }
      return '';
    }
    
    function checkUsername(username) {
      console.log('Checking username:', username);
      if (username.length < 3) {
        return 'Username must be at least 3 characters';
      }
      if (username.length > 20) {
        return 'Username must be less than 20 characters';
      }
      return '';
    }
    
    function checkEmail(email) {
      console.log('Checking email:', email);
      if (!email.includes('@')) {
        return 'Please enter a valid email address';
      }
      return '';
    }
    
    function checkPassword(password) {
      console.log('Checking password (length only):', password.length);
      if (password.length < 8) {
        return 'Password must be at least 8 characters';
      }
      return '';
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
      
      // Form values gikan sa id
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const termsAgreed = document.getElementById('terms').checked;
      
      console.log('Form data:', { 
        firstName, 
        lastName, 
        username, 
        email, 
        passwordLength: password.length,
        termsAgreed 
      });
      
      // Clear previous error messages
      clearErrors();
      
      // if validate ang form (mag false paba ko? haha)
      let isValid = true;
      
      // Check each field
      const firstNameError = checkName(firstName);
      if (firstNameError) {
        showError('firstName', firstNameError);
        isValid = false;
      }
      
      const lastNameError = checkName(lastName);
      if (lastNameError) {
        showError('lastName', lastNameError);
        isValid = false;
      }
      
      const usernameError = checkUsername(username);
      if (usernameError) {
        showError('username', usernameError);
        isValid = false;
      }
      
      const emailError = checkEmail(email);
      if (emailError) {
        showError('email', emailError);
        isValid = false;
      }
      
      const passwordError = checkPassword(password);
      if (passwordError) {
        showError('password', passwordError);
        isValid = false;
      }
      
      if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
      }
      
      if (!termsAgreed) {
        alert('Please agree to the terms of service and privacy policy');
        isValid = false;
      }
      
      console.log('Form validation result:', isValid);
      
      // If valid, ishow success message
      if (isValid) {
        console.log('Form is valid, showing success message');
        
        // Show loading on button
        const submitButton = document.getElementById('submit-btn');
        submitButton.innerHTML = 'Processing...';
        submitButton.disabled = true;
        
        // Form submission if delayed pang style lang 
        setTimeout(function() {
          formContainer.style.display = 'none';
          successMessage.classList.remove('hidden');
          confirmationEmail.textContent = email;
          console.log('Success message displayed for email:', email);
        }, 1500);
      }
    });
    
    // Restart button ni - mogo back sa form
    restartButton.addEventListener('click', function() {
      console.log('Restart button clicked');
      successMessage.classList.add('hidden');
      formContainer.style.display = 'block';
      form.reset();
      document.getElementById('submit-btn').innerHTML = 'Create Account';
      document.getElementById('submit-btn').disabled = false;
    });
    
    // Function para mo display error message
    function showError(fieldId, message) {
      console.log('Showing error for', fieldId, ':', message);
      const errorElement = document.getElementById(`${fieldId}-error`);
      errorElement.textContent = message;
      document.getElementById(fieldId).classList.add('error');
    }
    
    // Function para mo clear all errors
    function clearErrors() {
      console.log('Clearing all errors');
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(element => {
        element.textContent = '';
      });
      
      const inputElements = form.querySelectorAll('input');
      inputElements.forEach(input => {
        input.classList.remove('error');
      });
    }
    
  
  
