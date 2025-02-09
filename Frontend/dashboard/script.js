  // Renew button functionality
  document.querySelectorAll('.renew-button').forEach(button => {
    button.addEventListener('click', function() {
        alert('Book renewal requested');
    });
});

// Menu item selection
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.menu-item').forEach(i => i.style.color = '');
        this.style.color = '#4F46E5';
    });
});

// Search functionality
const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        alert(`Searching for: ${this.value}`);
    }
});

//user data
// // On dashboard page load, display user data
// window.onload = function() {
//     const userData = JSON.parse(localStorage.getItem('userData'));
//     if (userData) {
//         document.getElementById('username').innerText = userData.username; // Display username
//         document.getElementById('profilepic').src = userData.photo; // Display photo
//     } else {
//         console.log("No user data found.");
//     }
// };


// Assuming this is in your dashboard.js or similar file

window.onload = function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        document.getElementById('username').innerText = userData.username; // Display username
        document.getElementById('photo').src = userData.userImage; // Display photo
    } else {
        console.log("No user data found.");
    }
};

// Optional: Handle logout to clear local storage
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', function() {
    localStorage.removeItem('userData'); // Clear user data on logout
    window.location.href = "/login.html"; // Redirect to login page
});
