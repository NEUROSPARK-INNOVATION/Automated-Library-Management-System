// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

// import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// const firebaseConfig = {
//   apiKey:"AIzaSyAA9llQbvYW2Q3Fb-JaaZIY5pqXSJ6XQ2E",
//   authDomain: "alms-8ed85.firebaseapp.com",
//   projectId: "alms-8ed85",
//   storageBucket: "alms-8ed85.firebasestorage.app",
//   messagingSenderId: "198829919183",
//   appId: "1:198829919183:web:009cdc333611117505e0ba",
//   measurementId: "G-79QN1C79PV"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);


// //submit
// const submit = document.getElementById('submitBtnLogin')
// submit.addEventListener('click', function(event) {
//     event.preventDefault()

//     //input
//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;

// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     alert("Logging in........");
//     window.location.href = "/dashboard/dashboard.html"; // Redirecting to other page.
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(errorMessage);
//   });
// });


// //reset
// const reset = document.getElementById('reset');

// reset.addEventListener('click', function(event) {
//   event.preventDefault()

//   const auth = getAuth();
//   const email = document.getElementById('loginEmail').value;

//   sendPasswordResetEmail(auth, email)
//   .then(() => {
//     // Password reset email sent!
//     // ..
//     alert("Password reset email sent!");
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(errorMessage);
//   });
// });


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
const auth = getAuth();

// Submit Login
const submit = document.getElementById('submitBtnLogin');
submit.addEventListener('click', async function(event) {
    event.preventDefault();

    // Input
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert("Logging in...");

        // Fetch user details from your server
        const response = await fetch('https://newbackend-rp5q.onrender.com/user/details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        console.log("Response from server:", response); // Log the response

        if (response.ok) {
            const userDetails = await response.json();
            console.log("User details fetched:", userDetails); // Log user details
            localStorage.setItem('userData', JSON.stringify(userDetails)); // Store user details in localStorage
            window.location.href = "/dashboard/dashboard.html"; // Redirecting to dashboard page
        } else {
            const errorData = await response.json();
            console.error("Failed to fetch user details:", errorData); // Log error details
            alert("Failed to fetch user details.");
        }
    } catch (error) {
        console.error("Error during login:", error); // Log error during login
        alert(error.message);
    }
});

// Reset Password
const reset = document.getElementById('reset');
reset.addEventListener('click', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent!");
        })
        .catch((error) => {
            console.error("Error sending password reset email:", error); // Log error during reset
            alert(error.message);
        });
});
