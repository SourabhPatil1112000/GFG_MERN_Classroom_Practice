// Get all form elements
const form = document.getElementById('registrationForm');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const age = document.getElementById('age');
const genderRadios = document.querySelectorAll('input[name="gender"]');
const terms = document.getElementById('terms');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const ageError = document.getElementById('ageError');
const genderError = document.getElementById('genderError');
const termsError = document.getElementById('termsError');

// Real-time validation (as user types)
fullname.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
age.addEventListener('input', validateAge);
genderRadios.forEach(radio => radio.addEventListener('change', validateGender));
terms.addEventListener('change', validateTerms);

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Run all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isAgeValid = validateAge();
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();
    
    // If all validations pass
    if (isNameValid && isEmailValid && isPasswordValid && 
        isAgeValid && isGenderValid && isTermsValid) {
        
        // Show success message
        const successMsg = document.getElementById('successMessage');
        successMsg.style.display = 'block';
        
        // Optional: Log form data
        const formData = {
            fullname: fullname.value,
            email: email.value,
            age: age.value,
            gender: getSelectedGender()
        };
        console.log('Form submitted:', formData);
        
        // Reset form after 3 seconds (optional)
        setTimeout(() => {
            successMsg.style.display = 'none';
            // Uncomment to reset form:
            // form.reset();
            // removeValidationStyles();
        }, 3000);
    }
});

// Validation Functions
function validateName() {
    const value = fullname.value.trim();
    
    if (value === '') {
        showError(nameError, 'Full name is required');
        markInvalid(fullname);
        return false;
    }
    
    if (value.length < 3) {
        showError(nameError, 'Name must be at least 3 characters');
        markInvalid(fullname);
        return false;
    }
    
    if (!value.match(/^[a-zA-Z\s]+$/)) {
        showError(nameError, 'Name should only contain letters and spaces');
        markInvalid(fullname);
        return false;
    }
    
    showError(nameError, '');
    markValid(fullname);
    return true;
}

function validateEmail() {
    const value = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
        showError(emailError, 'Email address is required');
        markInvalid(email);
        return false;
    }
    
    if (!emailPattern.test(value)) {
        showError(emailError, 'Please enter a valid email address (e.g., name@domain.com)');
        markInvalid(email);
        return false;
    }
    
    showError(emailError, '');
    markValid(email);
    return true;
}

function validatePassword() {
    const value = password.value;
    
    if (value === '') {
        showError(passwordError, 'Password is required');
        markInvalid(password);
        return false;
    }
    
    if (value.length < 8) {
        showError(passwordError, 'Password must be at least 8 characters long');
        markInvalid(password);
        return false;
    }
    
    // Check for at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    
    if (!hasLetter || !hasNumber) {
        showError(passwordError, 'Password must contain at least one letter and one number');
        markInvalid(password);
        return false;
    }
    
    // Optional: Check for strength (bonus)
    const hasSpecialChar = /[!@#$%^&*]/.test(value);
    if (hasSpecialChar) {
        password.style.borderColor = '#2ecc71';
    }
    
    showError(passwordError, '');
    markValid(password);
    return true;
}

function validateAge() {
    const value = age.value;
    
    if (value === '') {
        showError(ageError, 'Age is required');
        markInvalid(age);
        return false;
    }
    
    const ageNum = parseInt(value);
    
    if (isNaN(ageNum)) {
        showError(ageError, 'Please enter a valid number');
        markInvalid(age);
        return false;
    }
    
    if (ageNum < 18) {
        showError(ageError, 'You must be at least 18 years old to register');
        markInvalid(age);
        return false;
    }
    
    if (ageNum > 120) {
        showError(ageError, 'Please enter a valid age (max 120)');
        markInvalid(age);
        return false;
    }
    
    showError(ageError, '');
    markValid(age);
    return true;
}

function validateGender() {
    const selected = getSelectedGender();
    
    if (!selected) {
        showError(genderError, 'Please select your gender');
        return false;
    }
    
    showError(genderError, '');
    return true;
}

function validateTerms() {
    if (!terms.checked) {
        showError(termsError, 'You must agree to the Terms and Privacy Policy');
        return false;
    }
    
    showError(termsError, '');
    return true;
}

// Helper Functions
function showError(element, message) {
    element.textContent = message;
}

function markInvalid(element) {
    element.classList.add('invalid');
    element.classList.remove('valid');
}

function markValid(element) {
    element.classList.add('valid');
    element.classList.remove('invalid');
}

function getSelectedGender() {
    for (let radio of genderRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}

function removeValidationStyles() {
    const inputs = [fullname, email, password, age];
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
}

// Live character counter for password (bonus)
password.addEventListener('input', function() {
    const length = this.value.length;
    const hint = document.querySelector('#passwordGroup .hint');
    if (length > 0 && length < 8) {
        hint.style.color = '#e74c3c';
        hint.innerHTML = `⚠️ ${length}/8 characters minimum needed`;
    } else if (length >= 8) {
        hint.style.color = '#2ecc71';
        hint.innerHTML = `✓ ${length} characters - Good length!`;
    } else {
        hint.style.color = '#888';
        hint.innerHTML = 'Minimum 8 characters with letters and numbers';
    }
});

// Age hint update
age.addEventListener('input', function() {
    const value = parseInt(this.value);
    const hint = document.querySelector('#ageGroup .hint');
    if (value && value < 18) {
        hint.style.color = '#e74c3c';
        hint.innerHTML = '⚠️ You must be 18+ to register';
    } else if (value && value >= 18) {
        hint.style.color = '#2ecc71';
        hint.innerHTML = '✓ Age verified';
    } else {
        hint.style.color = '#888';
        hint.innerHTML = 'You must be at least 18 years old';
    }
});