const form = document.getElementById('signup-form');
const statusMessage = document.getElementById('status-message');

const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const dob = document.getElementById('dob');
const terms = document.getElementById('terms');
const roleInputs = form.querySelectorAll('input[name="role"]');

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, errorEl, message) {
  errorEl.textContent = message;
  input.classList.toggle('invalid', Boolean(message));
  input.classList.toggle('valid', !message && input.value !== '');
}

function validateFullname() {
  const errorEl = document.getElementById('fullname-error');
  if (!fullname.value.trim()) {
    setError(fullname, errorEl, 'Full name is required.');
    return false;
  }
  setError(fullname, errorEl, '');
  return true;
}

function validateEmail() {
  const errorEl = document.getElementById('email-error');
  if (!email.value.trim()) {
    setError(email, errorEl, 'Email is required.');
    return false;
  }
  if (!EMAIL_RULE.test(email.value.trim())) {
    setError(email, errorEl, 'Please enter a valid email address (e.g. name@example.com).');
    return false;
  }
  setError(email, errorEl, '');
  return true;
}

function validatePassword() {
  const errorEl = document.getElementById('password-error');
  if (!password.value) {
    setError(password, errorEl, 'Password is required.');
    return false;
  }
  if (!PASSWORD_RULE.test(password.value)) {
    setError(password, errorEl, 'Password must be at least 8 characters and include a letter and a number.');
    return false;
  }
  setError(password, errorEl, '');
  return true;
}

function validateConfirmPassword() {
  const errorEl = document.getElementById('confirm-password-error');
  if (!confirmPassword.value) {
    setError(confirmPassword, errorEl, 'Please confirm your password.');
    return false;
  }
  if (confirmPassword.value !== password.value) {
    setError(confirmPassword, errorEl, 'Passwords do not match.');
    return false;
  }
  setError(confirmPassword, errorEl, '');
  return true;
}

function validateDob() {
  const errorEl = document.getElementById('dob-error');
  if (!dob.value) {
    setError(dob, errorEl, 'Date of birth is required.');
    return false;
  }
  setError(dob, errorEl, '');
  return true;
}

function validateRole() {
  const errorEl = document.getElementById('role-error');
  const checked = Array.from(roleInputs).some((input) => input.checked);
  errorEl.textContent = checked ? '' : 'Please select whether you are a student or employee.';
  return checked;
}

function validateTerms() {
  const errorEl = document.getElementById('terms-error');
  if (!terms.checked) {
    errorEl.textContent = 'You must agree to the terms and conditions.';
    return false;
  }
  errorEl.textContent = '';
  return true;
}

fullname.addEventListener('input', validateFullname);
email.addEventListener('input', validateEmail);
password.addEventListener('input', () => {
  validatePassword();
  if (confirmPassword.value) validateConfirmPassword();
});
confirmPassword.addEventListener('input', validateConfirmPassword);
dob.addEventListener('input', validateDob);
roleInputs.forEach((input) => input.addEventListener('change', validateRole));
terms.addEventListener('change', validateTerms);

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
  statusMessage.hidden = false;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const validations = [
    validateFullname(),
    validateEmail(),
    validatePassword(),
    validateConfirmPassword(),
    validateDob(),
    validateRole(),
    validateTerms(),
  ];

  const isValid = validations.every(Boolean);

  if (!isValid) {
    showStatus('Please fix the highlighted fields before submitting.', 'error');
    form.querySelector('.invalid, input:invalid')?.focus();
    return;
  }

  showStatus(`Welcome, ${fullname.value.trim()}! Your account has been created.`, 'success');
  form.reset();
  form.querySelectorAll('.valid, .invalid').forEach((el) => el.classList.remove('valid', 'invalid'));
});
