import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
// const analytics = getAnalytics(app);


const auth = getAuth();
auth.languageCode = 'en';
const Provider = new GoogleAuthProvider();

const googlelogin = document.getElementById('google-login-btn')

googlelogin.addEventListener('click', function() {
    signInWithPopup(auth, Provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user)
      window.location.href = "/dashboard/dashboard.html";
      
  }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message
  });
});
