document.getElementById('addProductForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const productTitle = document.getElementById('productTitle').value;
    const productAuthor = document.getElementById('productAuthor').value;
    const productImage = document.getElementById('productImage').value;
    const productGenres = document.getElementById('productGenres').value;

    
    // Send a POST request to add a new book
    const response = await fetch('https://newbackend-rp5q.onrender.com/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productTitle,
            productAuthor,
            productImage,
            productGenres 
        })
    });

    if (response.ok) {
        const newBook = await response.json();
        addBookToGrid(newBook); // Add the new book to the grid
        this.reset(); // Reset the form fields
    } else {
        console.error('Failed to add book');
    }
});

// Function to fetch and display all books from the database
async function fetchBooks() {
    const response = await fetch('https://newbackend-rp5q.onrender.com/api/books');
    
    if (response.ok) {
        const books = await response.json();
        books.forEach(addBookToGrid);
    } else {
        console.error('Failed to fetch books');
    }
}

// Function to add a book card to the grid
function addBookToGrid(book) {
    const productsGrid = document.getElementById('productsGrid');
    
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
        <img src="${book.imageUrl}" alt="${book.Title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${book.Title}</h3>
            <p class="product-author">${book.author}</p>
        </div>
    `;
    
    productsGrid.appendChild(productCard);
    productsGrid.insertBefore(productCard,productsGrid.firstChild);
}

// Fetch existing books when the page loads
fetchBooks();
