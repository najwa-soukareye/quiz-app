document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-box form');
    const registerForm = document.getElementById('registerForm');
    const showLogin = document.getElementById('showLogin');
    const registerLink = document.querySelector('.register-link a');
  
    
    registerLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.parentElement.classList.add('hidden');
      registerForm.classList.remove('hidden');
    });
  
    
    showLogin.addEventListener('click', (e) => {
      e.preventDefault();
      registerForm.classList.add('hidden');
      loginForm.parentElement.classList.remove('hidden');
    });
  
   
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        const username = document.getElementById("registerUsername").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("registerConfirmPassword").value;
    
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
    
        let users = JSON.parse(localStorage.getItem("users")) || [];
    
        // Check if user already exists
        if (users.some(user => user.email === email)) {
          alert("User with this email already exists!");
          return;
        }
    
        // Add new user
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
    
        alert("Registration successful! You can now log in.");
        registerForm.reset();
        registerForm.parentElement.classList.add('hidden');
        loginForm.parentElement.classList.remove('hidden');
      });
    
      // Handle Login
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
    
        // Check for hardcoded admin
        if (email === "admin@quiz.com" && password === "admin123") {
          window.location.assign( "dashboard.html");
          return;
        }
    
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = users.find(user => user.email === email && user.password === password);
    
        if (validUser) {
          alert("Login successful!");
          window.location.assign("home.html");
        } else {
          alert("Invalid email or password.");
        }
        if (username && email && password && confirmPassword && password === confirmPassword) {
            // Simulate a successful registration
            localStorage.setItem('isLoggedIn', 'true');
            window.location.assign('home.html');  // Redirect to home page after registration
          } else {
            alert('Please fill out all fields and ensure passwords match');
          }
      });
    });
  
