import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAA9llQbvYW2Q3Fb-JaaZIY5pqXSJ6XQ2E",
    authDomain: "alms-8ed85.firebaseapp.com",
    projectId: "alms-8ed85",
    storageBucket: "alms-8ed85.firebasestorage.app",
    messagingSenderId: "198829919183",
    appId: "1:198829919183:web:009cdc333611117505e0ba",
    measurementId: "G-79QN1C79PV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Submit event listener
const submit = document.getElementById('submitBtnRegister');
submit.addEventListener('click', function(event) {
    event.preventDefault();

    // Input values
    const username = document.getElementById('username').value; 

    // Check if the username exists in the database
    fetch(`https://newbackend-rp5q.onrender.com/api/check-username/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                alert("Username already exists. Please choose another one.");
            } else {
                alert("Username is available! You can proceed with registration.");
                // Proceed with registration logic here

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
    
    // Alert for creating account
    alert("Creating account...");

createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            // Prepare data to send to backend
            const userData = {
                username: username,
                email: email,
                password: password // Note: You should NOT send the plain password; hash it on the server instead.
            };

            // Send user data to your backend API
            fetch('https://newbackend-rp5q.onrender.com/api/register', { // Adjust the URL as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Account created successfully!"); // Alert for successful account creation on server
                    window.location.href = "login.html";
                } else {
                    alert("Failed to store account on server: " + data.message); // Alert for failure in storing data
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Failed to register on server.");
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage); // Alert for Firebase registration errors
        });


            }
        })
        .catch(error => {
            console.error("Error checking username:", error);
            alert("An error occurred while checking the username.");
        });
    });