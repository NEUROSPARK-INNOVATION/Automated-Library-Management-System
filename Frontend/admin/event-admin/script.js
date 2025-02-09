// Fetch existing events when the page loads
document.addEventListener('DOMContentLoaded', fetchEvents);

document.getElementById('addProductForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Get form values
    const title = capitalize(document.getElementById('bookHeading').value);
    const date = document.getElementById('bookDate').value;
    const imageUrl = document.getElementById('bookImage').value;
    const category = document.getElementById('bookCategory').value;
    const description = document.getElementById('bookdescription').value;

    // Create new event object
    const newEvent = {
        title,
        date,
        imageUrl,
        category,
        description
    };

    // Send a POST request to add a new event
    try {
        const response = await fetch('https://newbackend-rp5q.onrender.com/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
        });

        if (response.ok) {
            const addedEvent = await response.json();
            addEventToGrid(addedEvent); // Add the new event to the grid
            this.reset(); // Reset form fields
        } else {
            console.error('Failed to add event');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to fetch and display all events from the database
async function fetchEvents() {
    try {
        const response = await fetch('https://newbackend-rp5q.onrender.com/api/events');
        
        if (response.ok) {
            const events = await response.json();
            events.forEach(addEventToGrid); // Add each event to the grid
        } else {
            console.error('Failed to fetch events');
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Function to add an event card to the grid
function addEventToGrid(event) {
    const productCard = document.createElement('article');
    productCard.className = 'card';

    productCard.innerHTML = `
        <div class="card-image-container">
            <img src="${event.imageUrl}" alt="${event.title}" class="card-image">
            <div class="date-badge">
                <span>${new Date(event.date).getDate()}</span>
                ${new Date(event.date).toLocaleString('default', { month: 'short' })}
            </div>
        </div>
        <div class="card-content">
            <div class="category">${event.category}</div>
            <h2 class="card-title">${event.title}</h2>
            <div class="meta">
                <div class="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    ${new Date(event.date).toLocaleDateString()}
                </div>
                <div class="meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Admin
                </div>
            </div>
            <p class="card-text">${event.description}</p>
            <a href="#" class="read-more">Read More...</a>
        </div>
    `;

    // Add the new event card to the grid
    document.getElementById('productsGrid').appendChild(productCard);
}

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
        e.target.src = 'https://lh3.googleusercontent.com/pw/AP1GczP4vf5wR6toC-dUfO1UPkM1fmydL9PpB7dac2Pmhft9N8nRHoNqV9Xn1ujw9K_4RmEuqIzf3bnK9zdLP4O1VdB6PhWb1mLOi06o_li0vyxz7pIxBj0j6-Y49Q-U-k4I2jP2ki2GadCaDnf1MLC5_FihBH9FAoW70nx_tbcGGrKkoieQtNETG19slLjNuQiViQjOojfw7fVxN4TLxHOJk199h0m6ZNJlTkRP9pWxqf9FtTEdEl7wPDbVFTjA8alGb6umb3AhBKkweO8rTvUkt-DjJuzwKTQ_bt3zU3Fut_OK3RUA17Z4Bd23hOQUbVDpB0KUP6sdlNmTfQyC8y0hueHp1GU2eWw0PpvKM6R-GHwA7aGWvA1eMV_uvXsy6xfNGsCRl_H_x9Ah3V9C3PyXrdZkOqazLv-2mAq2aMGE8h9zJqKwU_9JaIP492lRrmPz72NGC-YLvepPJtgcat8SFwg03b4ckvpQycZZeCT0WkUZoqssdhD3RjhoaqpB8y1pB9uPwdLIFd4WhEckvcphNS53FFD3FvNtmifjtO_NRJ4QGvu0rJqkud0wxk9Eqf-ViGRAIrwf0QFwDi6uUfIMbs484HpoHlrz0qJyGJgK8rAbB9oNQLGax4c7Uh49ChcIHr0PQS4fVP2VFiIY5jnTJpmTYNe7nkKKJliF99ueaDKGUUa7xNtKHhVJGe4JaDQzq2Iuj9DYbX1RX8kVr6n1aoVWU6NJVFHKHVNsEupigq8oXE8gIKKNQNS8HMVCi9ORuUPuPOfqRY9XwFGPKCxSV5BgPC7i-ioLVYU680fnhATWnRk8J2wCVXuj3zh6VeLXKRR_WBhQ_oNnsIOPhjO1qHFUgdy7BGXl1lVG9x82tA3Oe2uTG1a0QGirr-rh9njw1kWqAaIX5U1Jk5kUvDjGmH8QayoEuDiOWgdGcjL5TYmZ6KRNItjkqvB-LrbNdJWYqk1XC5Fl8KC0AQmS=s339-no?authuser=0&quot;),%20url(&quot;https://lh3.googleusercontent.com/pw/AP1GczP4vf5wR6toC-dUfO1UPkM1fmydL9PpB7dac2Pmhft9N8nRHoNqV9Xn1ujw9K_4RmEuqIzf3bnK9zdLP4O1VdB6PhWb1mLOi06o_li0vyxz7pIxBj0j6-Y49Q-U-k4I2jP2ki2GadCaDnf1MLC5_FihBH9FAoW70nx_tbcGGrKkoieQtNETG19slLjNuQiViQjOojfw7fVxN4TLxHOJk199h0m6ZNJlTkRP9pWxqf9FtTEdEl7wPDbVFTjA8alGb6umb3AhBKkweO8rTvUkt-DjJuzwKTQ_bt3zU3Fut_OK3RUA17Z4Bd23hOQUbVDpB0KUP6sdlNmTfQyC8y0hueHp1GU2eWw0PpvKM6R-GHwA7aGWvA1eMV_uvXsy6xfNGsCRl_H_x9Ah3V9C3PyXrdZkOqazLv-2mAq2aMGE8h9zJqKwU_9JaIP492lRrmPz72NGC-YLvepPJtgcat8SFwg03b4ckvpQycZZeCT0WkUZoqssdhD3RjhoaqpB8y1pB9uPwdLIFd4WhEckvcphNS53FFD3FvNtmifjtO_NRJ4QGvu0rJqkud0wxk9Eqf-ViGRAIrwf0QFwDi6uUfIMbs484HpoHlrz0qJyGJgK8rAbB9oNQLGax4c7Uh49ChcIHr0PQS4fVP2VFiIY5jnTJpmTYNe7nkKKJliF99ueaDKGUUa7xNtKHhVJGe4JaDQzq2Iuj9DYbX1RX8kVr6n1aoVWU6NJVFHKHVNsEupigq8oXE8gIKKNQNS8HMVCi9ORuUPuPOfqRY9XwFGPKCxSV5BgPC7i-ioLVYU680fnhATWnRk8J2wCVXuj3zh6VeLXKRR_WBhQ_oNnsIOPhjO1qHFUgdy7BGXl1lVG9x82tA3Oe2uTG1a0QGirr-rh9njw1kWqAaIX5U1Jk5kUvDjGmH8QayoEuDiOWgdGcjL5TYmZ6KRNItjkqvB-LrbNdJWYqk1XC5Fl8KC0AQmS=s241-no?authuser=0&quot;);'; // Fallback image
    }
}, true);

// Capitalize first letter of a string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
