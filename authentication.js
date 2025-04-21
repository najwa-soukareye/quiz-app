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
    
    
        if (users.some(user => user.email === email)) {
          alert("User with this email already exists!");
          return;
        }
  
        users.push({ username, email, password });
        localStorage.setItem('username', username);
        localStorage.setItem('currentUserEmail', email);
        localStorage.setItem("users", JSON.stringify(users));
    
        alert("Registration successful! You can now log in.");
        registerForm.reset();
        registerForm.parentElement.classList.add('hidden');
        loginForm.parentElement.classList.remove('hidden');
      });
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
 
        if (email === "admin@quiz.com" && password === "admin123") {
          localStorage.setItem('isAdmin', 'true');
          window.location.assign("dashboard.html");
          return;
        }
  
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = users.find(user => user.email === email && user.password === password);
      
        if (validUser) {
          localStorage.setItem('currentUserEmail', email);
          localStorage.setItem('isLoggedIn', 'true');
          window.location.assign("home.html");
        } else {
          alert("Invalid email or password.");
        }
      });
    });
  
