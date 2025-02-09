// Filter function
function filterBooks() {
    const genre = document.getElementById('genre').value;

    if (genre === 'all') {
        addBookToGrid(books);
    } else {
        const filteredBooks = books.filter(book => book.genre === genre);
        addBookToGrid(filteredBooks);
    }
}


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
    const productsGrid = document.getElementById('book-list');
    
    const productCard = document.createElement('div');
    productCard.className = 'book-card';
    
    productCard.innerHTML = `
        <img src="${book.imageUrl}" alt="${book.Title}" class="product-image">
        <div class="content">
            <h3 class="product-title">${book.Title}</h3>
            <p class="product-author">${book.author}</p>
            <span class="genre">${book.Genres}</span>
        </div>
    `;
    
    productsGrid.insertBefore(productCard,productsGrid.firstChild);
}

// Fetch existing books when the page loads
fetchBooks();