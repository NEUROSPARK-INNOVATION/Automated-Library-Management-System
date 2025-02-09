document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookIssueForm");
    const issueDateInput = document.getElementById("issueDate");
    const returnDateInput = document.getElementById("returnDate");

    // Add event listener for issue date change
    issueDateInput.addEventListener("change", () => {
        const issueDate = new Date(issueDateInput.value);
        if (!isNaN(issueDate)) {
            // Add 15 days to the issue date
            const returnDate = new Date(issueDate);
            returnDate.setDate(issueDate.getDate() + 15);

            // Format return date to YYYY-MM-DD for input type=date
            const formattedReturnDate = returnDate.toISOString().split('T')[0];
            returnDateInput.value = formattedReturnDate; // Set the calculated return date
        }
    });

//     form.addEventListener("submit", (e) => {
//         e.preventDefault();

//         // Basic form validation
//         const memberName = document.getElementById("memberName").value.trim();
//         const memberId = document.getElementById("memberId").value.trim();
//         const bookTitle = document.getElementById("bookTitle").value.trim();
//         const bookId = document.getElementById("bookId").value.trim();
//         const issueDate = document.getElementById("issueDate").value;

//         if (!memberName || !memberId || !bookTitle || !bookId || !issueDate) {
//             showMessage("Please fill in all fields.", "error");
//             return;
//         }
//         form.reset(); // Reset the form after submission
//  
//    });
// Function to issue a book
async function issueBook() {
    const userId = document.getElementById('memberId').value; // Get user ID from input
    const bookId = document.getElementById('bookId').value; // Get book ID from input

    try {
            const response = await fetch('https://newbackend-rp5q.onrender.com/issue-book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, bookId })
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Show success message
        } else {
            const errorData = await response.json();
            alert(errorData.message); // Show error message
        }
    } catch (error) {
        console.error("Error issuing book:", error);
        alert("An error occurred while issuing the book.");
    }
}

// Attach event listener to the issue button
document.getElementById('issueButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
    issueBook(); // Call the function to issue a book
});
form.reset();
});

