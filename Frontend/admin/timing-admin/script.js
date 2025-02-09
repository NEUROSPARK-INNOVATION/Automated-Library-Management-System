// Fetch existing timings when the page loads
document.addEventListener('DOMContentLoaded', fetchTimings);

// Function to fetch and display all timings from the database
async function fetchTimings() {
    try {
        const response = await fetch('https://newbackend-rp5q.onrender.com/api/timings'); // Adjust URL as needed
        if (response.ok) {
            const timings = await response.json();
            document.getElementById('monday-timing').textContent = `Monday - Friday: ${timings.monday || "9:00 AM - 8:00 PM"}`;
            document.getElementById('saturday-timing').textContent = `Saturday: ${timings.saturday || "10:00 AM - 6:00 PM"}`;
            document.getElementById('sunday-timing').textContent = `Sunday: ${timings.sunday || "Closed"}`;
        } else {
            console.error('Failed to fetch timings');
        }
    } catch (error) {
        console.error('Error fetching timings:', error);
    }
}

// Event listener for updating a timing notice
document.getElementById('addProductForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent default form submission

    const day = document.getElementById('day').value;
    const newTimingText = document.getElementById('time').value;

    const updatedTiming = { day, notice: newTimingText }; // Create updated timing object

    // Send a POST request to update the timing notice
    try {
        const response = await fetch('https://newbackend-rp5q.onrender.com/api/timings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTiming)
        });

        if (response.ok) {
            const addedTimingNotice = await response.json();
            // Update the displayed timing based on the selected day
            if (day === 'monday') {
                document.getElementById('monday-timing').textContent = `Monday - Friday: ${addedTimingNotice.notice}`;
            } else if (day === 'saturday') {
                document.getElementById('saturday-timing').textContent = `Saturday: ${addedTimingNotice.notice}`;
            } else if (day === 'sunday') {
                document.getElementById('sunday-timing').textContent = `Sunday: ${addedTimingNotice.notice}`;
            }
            this.reset(); // Reset form fields
        } else {
            console.error('Failed to update timing');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

