const correctUsername = 'admin';
const correctPassword = 'password123';

// Function to check if the device is blocked
function isBlocked() {
    const blockTime = localStorage.getItem('blockTime');
    if (blockTime) {
        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - blockTime;

        // Check if 24 hours (86400000 milliseconds) have passed
        if (timeElapsed < 1000) {
            return true; // Device is still blocked
        } else {
            // Unblock the device after 24 hours
            localStorage.removeItem('blockTime');
            localStorage.removeItem('attempts');
            return false; // Device is not blocked
        }
    }
    return false; // Device is not blocked
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Check if the device is blocked
    if (isBlocked()) {
        alert('Your device is temporarily blocked due to multiple failed login attempts. Please try again after 24 hours.');
        return;
    }

    // Get the entered username and password
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    // Initialize attempts count from localStorage or set to 0
    let attempts = parseInt(localStorage.getItem('attempts')) || 0;

    // Check if the entered credentials match the correct ones
    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        // Reset attempts on successful login
        localStorage.removeItem('attempts');
        window.location.href = '/admin/dashboard-admin/dashboard.html'; // Change to your actual admin dashboard URL
    } else {
        // Increment attempts count and store it in localStorage
        attempts++;
        localStorage.setItem('attempts', attempts);

        // Check if attempts have reached 3
        if (attempts >= 3) {
            // Block the device for 24 hours
            localStorage.setItem('blockTime', new Date().getTime());
            alert('Your device has been blocked for 24 hours due to multiple failed login attempts.');
        } else {
            alert(`Invalid username or password. You have ${3 - attempts} attempt(s) left.`);
        }
    }
});
