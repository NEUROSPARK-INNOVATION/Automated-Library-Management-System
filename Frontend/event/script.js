// document.addEventListener('DOMContentLoaded', fetchEvents);

// async function fetchEvents() {
//     try {
//         const response = await fetch('http://localhost:3000/api/events');
        
//         if (response.ok) {
//             const events = await response.json();
//             events.forEach(addEventToGrid); // Add each event to the grid
//         } else {
//             console.error('Failed to fetch events');
//         }
//     } catch (error) {
//         console.error('Error fetching events:', error);
//     }
// }

// // Function to add an event card to the grid
// function addEventToGrid(event) {
//     const productCard = document.createElement('article');
//     productCard.className = 'card';

//     productCard.innerHTML = `
//         <div class="card-image-container">
//             <img src="${event.imageUrl}" alt="${event.title}" class="card-image">
//             <div class="date-badge">
//                 <span>${new Date(event.date).getDate()}</span>
//                 ${new Date(event.date).toLocaleString('default', { month: 'short' })}
//             </div>
//         </div>
//         <div class="card-content">
//             <div class="category">${event.category}</div>
//             <h2 class="card-title">${event.title}</h2>
//             <div class="meta">
//                 <div class="meta-item">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2">
//                         <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                         <line x1="16" y1="2" x2="16" y2="6"></line>
//                         <line x1="8" y1="2" x2="8" y2="6"></line>
//                         <line x1="3" y1="10" x2="21" y2="10"></line>
//                     </svg>
//                     ${new Date(event.date).toLocaleDateString()}
//                 </div>
//                 <div class="meta-item">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2">
//                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                         <circle cx="12" cy="7" r="4"></circle>
//                     </svg>
//                     Admin
//                 </div>
//             </div>
//             <p class="card-text">${event.description}</p>
//             <a href="#" class="read-more">Read More...</a>
//         </div>
//     `;

//     // Add the new event card to the grid
//     document.getElementById('container').appendChild(productCard);
// }
document.addEventListener('DOMContentLoaded', fetchEvents);

async function fetchEvents() {
    try {
        const response = await fetch('https://newbackend-rp5q.onrender.com/api/events'); // Ensure this URL is correct
        
        if (response.ok) {
            const events = await response.json();
            events.forEach(addEventToGrid); // Add each event to the grid
        } else {
            console.error('Failed to fetch events:', response.status, response.statusText);
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

    // Append the new event card to the grid
    const container = document.getElementById('container');
    if (container) { // Check if container exists
        container.appendChild(productCard);
    } else {
        console.error('Container element not found.');
    }
}
