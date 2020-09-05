async function signupFormHandler(event) {
    event.preventDefault();
    // Query signup form inputs
    const firstname = document.querySelector('#firstNameSignup').value.trim();
    const lastname  = document.querySelector('#lastNameSignup').value.trim();
    const username  = document.querySelector('#userNameSignup').value.trim();
    const email     = document.querySelector('#emailSignup').value.trim();
    const password  = document.querySelector('#passwordSignup').value.trim();
    if (firstname && lastname && username && email && password) {
        // Call controller for signup endpoint
        const response = await fetch('/api/user', {
            method: 'post',
            body: JSON.stringify({ firstname, lastname, username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            // Redirect to user home
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    } else {
        alert("Please fill entire Signup Form")
    }
}

async function loginFormHandler(event) {
    event.preventDefault();
    // Query loginform inputs
    const email     = document.querySelector('#emailLogin').value.trim();
    const password  = document.querySelector('#passwordLogin').value.trim();
  
    if (email && password) {
        // Call controller for login endpoint
        const response = await fetch('/api/user/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            // Redirect to user home
            document.location.replace('/');
            debugger
            idleLogout();
        } else {
            alert("Incorrect Email Address or Password");
        }
    } else {
        alert("Please fill entire Login Form")     
    }
}
  
  var loginform = document.querySelector('.loginForm')
  if (loginform) loginform.addEventListener('submit', loginFormHandler);
  
  var signupform = document.querySelector('.signupForm')
  if (signupform) signupform.addEventListener('submit', signupFormHandler);