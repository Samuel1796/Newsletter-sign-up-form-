// DOM Elements
const signupCard = document.getElementById("signup-card");
const successCard = document.getElementById("success-card");
const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const errorMessage = document.getElementById("error-message");
const userEmailDisplay = document.getElementById("user-email");
const dismissBtn = document.getElementById("dismiss-btn");

/**
 * Validates an email address format
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
function isValidEmail(email) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
}

/**
 * Shows error state on the form
 * @param {string} message - The error message to display
 */
function showError(message) {
  errorMessage.textContent = message; // Sets the error message text
  errorMessage.classList.add("visible"); // Makes error message visible
  emailInput.classList.add("error"); // Adds error styling to input field
  emailInput.setAttribute("aria-invalid", "true"); // Accessibility: marks field as invalid
  emailInput.setAttribute("aria-describedby", "error-message"); // Links error to field
}

/**
 * Clears error state from the form
 */
function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.remove("visible");
  emailInput.classList.remove("error");
  emailInput.removeAttribute("aria-invalid");
  emailInput.removeAttribute("aria-describedby");
}

/**
 * Shows the success message card
 * @param {string} email - The user's email address to display
 */
function showSuccessMessage(email) {
  userEmailDisplay.textContent = email;
  signupCard.classList.add("hidden");
  successCard.classList.remove("hidden");

  // Focus on dismiss button for accessibility
  dismissBtn.focus();
}

/**
 * Shows the signup form and hides success message
 */
function showSignupForm() {
  successCard.classList.add("hidden");
  signupCard.classList.remove("hidden");

  // Reset form
  signupForm.reset();
  clearError();

  // Focus on email input for accessibility
  emailInput.focus();
}

/**
 * Validates the form and returns validation result
 * @returns {Object} - Object with isValid boolean and error message if invalid
 */

function validateForm() {
  const email = emailInput.value.trim();  // Gets and trims email input
  
  if (!email) {  // Checks for empty input
    return { isValid: false, message: 'Valid email required' };
  }
  
  if (!isValidEmail(email)) {  // Validates email format
    return { isValid: false, message: 'Valid email required' };
  }
  
  return { isValid: true, email: email };  // Success case
}

// Event Listeners

// Form submission
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const validation = validateForm();

  if (!validation.isValid) {
    showError(validation.message);
    emailInput.focus();
    return;
  }

  clearError();
  showSuccessMessage(validation.email);
});

// Real-time validation on input
emailInput.addEventListener("input", function () {
  // Only clear error if there is one and input is now valid
  if (emailInput.classList.contains("error")) {
    const email = emailInput.value.trim();
    if (email && isValidEmail(email)) {
      clearError();
    }
  }
});

// Clear error on focus if input was corrected
emailInput.addEventListener("focus", function () {
  // Keep visual indication but don't interfere with typing
});

// Validate on blur (when leaving the field)
emailInput.addEventListener("blur", function () {
  const email = emailInput.value.trim();

  // Only show error if there's content that's invalid
  if (email && !isValidEmail(email)) {
    showError("Valid email required");
  } else if (!email && emailInput.classList.contains("error")) {
    // Keep error visible if field was previously in error state and is now empty
  } else if (email && isValidEmail(email)) {
    clearError();
  }
});

// Dismiss button click
dismissBtn.addEventListener("click", showSignupForm);

// Handle keyboard accessibility for dismiss
dismissBtn.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    showSignupForm();
  }
});

// Handle Enter key in email input
emailInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    signupForm.dispatchEvent(new Event("submit"));
  }
});
