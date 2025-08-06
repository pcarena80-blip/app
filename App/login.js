document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('loggedInUser')) {
    window.location.href = 'index.html';
  }

  const loginCard = document.getElementById('login-card');
  const signupCard = document.getElementById('signup-card');
  const showSignupLink = document.getElementById('show-signup');
  const showLoginLink = document.getElementById('show-login');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  const showAlert = (alertElementId, message, type = 'danger') => {
    const alertPlaceholder = document.getElementById(alertElementId);
    alertPlaceholder.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  };

  showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginCard.classList.add('d-none');
    signupCard.classList.remove('d-none');
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupCard.classList.add('d-none');
    loginCard.classList.remove('d-none');
  });

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
      showAlert('signup-alert', 'An account with this email already exists.');
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    showAlert('login-alert', ' Account created successfully! Please log in.', 'success');
    signupForm.reset();
    showLoginLink.click();
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    if (user && user.password === password) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      sessionStorage.setItem('login_success', 'true'); 
      window.location.href = 'index.html';
    } else {
      showAlert('login-alert', 'Invalid email or password.');
    }
  });
});