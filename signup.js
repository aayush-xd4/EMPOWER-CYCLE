document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    
    // In a real application, you would send this data to a backend
    // For this example, we'll just store it in localStorage
    localStorage.setItem('user', JSON.stringify({ name, email }));
    localStorage.setItem('loggedIn', 'true');
    
    window.location.href = 'home.html';
});