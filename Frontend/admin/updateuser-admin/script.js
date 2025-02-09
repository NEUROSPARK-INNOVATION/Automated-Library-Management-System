document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("updateuserform");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get form values
        const _id = document.getElementById("userId").value.trim();
        const department = document.getElementById("Department").value.trim();
        const userImage = document.getElementById("userImage").value.trim();

        // Basic validation
        if (!userId) {
            alert("User ID is required.");
            return;
        }

        // Prepare data to send to the server
        const userData = {
            _id,
            department,
            userImage
        };

        try {
            const response = await fetch('https://newbackend-rp5q.onrender.com/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message); // Show success message
                form.reset(); // Reset the form after successful submission
            } else if (response.status === 404) {
                const result = await response.json();
                alert(result.error); // Show error message for not found
            } else {
                alert("Failed to update user.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while updating the user.");
        }
    });
});
