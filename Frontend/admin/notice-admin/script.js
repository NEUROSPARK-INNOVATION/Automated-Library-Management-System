// Fetch existing notices when the page loads
document.addEventListener('DOMContentLoaded', fetchNotices);

// Function to fetch and display all notices from the database
async function fetchNotices() {
    try {
        const response = await fetch('https://newbackend-rp5q.onrender.com/api/notices'); // Adjust URL as needed
        if (response.ok) {
            const notices = await response.json();
            notices.forEach(addNoticeToList); // Add each notice to the list
        } else {
            console.error('Failed to fetch notices');
        }
    } catch (error) {
        console.error('Error fetching notices:', error);
    }
}

// Event listener for adding a new notice
document.getElementById('addProductForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent default form submission

    const noticeText = document.getElementById('notice').value;

    const newNotice = { notice: noticeText }; // Create new notice object

    // Send a POST request to add a new notice
    try {
        const response = await fetch('https://newbackend-rp5q.onrender.com/api/notices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNotice)
        });

        if (response.ok) {
            const addedNotice = await response.json();
            addNoticeToList(addedNotice); // Add the new notice to the list
            this.reset(); // Reset form fields
        } else {
            console.error('Failed to add notice');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to add a notice to the list
function addNoticeToList(notice) {
    const noticeList = document.getElementById('notice-list');
    
    const noticeItem = document.createElement('li');
    noticeItem.innerHTML = `<p>${notice.notice}</p>`; // Assuming 'notice' is the key in your response

    noticeList.insertBefore(noticeItem, noticeList.firstChild); // Add new notice at the top of the list
}

// Error handling for images (if applicable)
document.addEventListener('error', function(e) {
   if (e.target.tagName.toLowerCase() === 'img') {
       e.target.src = '/assets/Books/default.png'; // Fallback image if needed
   }
}, true);
