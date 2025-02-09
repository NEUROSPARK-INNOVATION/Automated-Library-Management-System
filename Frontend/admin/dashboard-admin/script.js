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


document.addEventListener('DOMContentLoaded', function() {
    // Update current date and time
    function updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    }
    
    updateDateTime();
    setInterval(updateDateTime, 60000);
});

//visitors count
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve visitor count from localStorage
    var visitCount = localStorage.getItem("home_visit_count") || 0;

    // Display the visitor count
    document.querySelector(".visitor-count").textContent = visitCount;
});

//user count
async function fetchUserCount() {
    try {
        const response = await fetch('https://newbackend-rp5q.onrender.com/api/user-count'); // Update with your server URL if needed
        const data = await response.json();
        document.getElementById('user-count').textContent = data.count; // Update the HTML with the count
    } catch (error) {
        console.error('Error fetching user count:', error);
        document.getElementById('user-count').textContent = 'Error'; // Handle error case
    }
}

// Fetch user count on page load
window.onload = fetchUserCount();

//issue book
document.addEventListener("DOMContentLoaded", () => {
    const usersTableBody = document.getElementById("users-table-body");

    // Function to fetch users from the server
    async function fetchUsers() {
        try {
            const response = await fetch('https://newbackend-rp5q.onrender.com/api/users');
            const users = await response.json();

            // Populate the table with user data
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user._id}</td>
                    <td>${user.username}</td>
                    <td>${user.bookIssued || 'None'}</td>
                    <td>${user.department}</td>
                    <td><button class="delete-button" data-id="${user._id}">Delete</button></td>
                `;
                usersTableBody.appendChild(row);
            });

            // Add event listeners for delete buttons
            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', deleteUser);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // Function to delete a user by ID
    async function deleteUser(event) {
        const userId = event.target.getAttribute('data-id');
        if (confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`https://newbackend-rp5q.onrender.com/api/users/${userId}`, { method: 'DELETE' });
                if (response.ok) {
                    alert("User deleted successfully.");
                    location.reload(); // Reload the page to refresh the data
                } else {
                    alert("Failed to delete user.");
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    }

    // Fetch users when the page loads
    fetchUsers();
});

// book table
document.addEventListener("DOMContentLoaded", () => {
    const booksTableBody = document.getElementById("book-table-body");

    // Function to fetch books from the server
    async function fetchBooks() {
        try {
            const response = await fetch('https://newbackend-rp5q.onrender.com/api/books');
            const books = await response.json();

            // Populate the table with book data
            books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book._id}</td>
                    <td>${book.Title}</td>
                    <td>${book.author}</td>
                    <td><button class="delete-button delete-button-book" data-id="${book._id}">Delete</button></td>
                    
                `;
                booksTableBody.appendChild(row);
            });

            // Add event listeners for delete buttons
            document.querySelectorAll('.delete-button-book').forEach(button => {
                button.addEventListener('click', deleteBook);
            });
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    // Function to delete a book by ID
    async function deleteBook(event) {
        const bookId = event.target.getAttribute('data-id');
        if (confirm("Are you sure you want to delete this book?")) {
            try {
                const response = await fetch(`https://newbackend-rp5q.onrender.com/api/books/${bookId}`, { method: 'DELETE' });
                if (response.ok) {
                    alert("Book deleted successfully.");
                    location.reload(); // Reload the page to refresh the data
                } else {
                    alert("Failed to delete book.");
                }
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    }

    // Fetch books when the page loads
    fetchBooks();
});


// script.js
async function fetchBorrowedBooksCount() {
    try {
        const response = await fetch('https://newbackend-rp5q.onrender.com/borrowed-books-count');
        const data = await response.json();

        if (response.ok) {
            document.getElementById('borrowedBook').innerText = data.count;
        } else {
            console.error('Failed to fetch count:', data.error);
            document.getElementById('borrowedBook').innerText = 'Error fetching count';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('borrowedBook').innerText = 'Error fetching count';
    }
}

// Call the function when the page loads
window.onload = fetchBorrowedBooksCount;
