document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // In a real application, you would validate these credentials against a backend
    // For this example, we'll use a simple check
    if (email === 'user@example.com' && password === 'password') {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'home.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});