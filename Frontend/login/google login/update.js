import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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

const user = auth.currentUser;

function updateUserProfile(user) {
    const userName = user.displayName;
    const userPhoto = user.photoURL;

    document.getElementById('username').textContent = userName;
    document.getElementById('profilepic').src = userPhoto;
}
//  updateUserProfile();

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        const uid = user.uid;
        return uid;

    } else {
        alert("Create Account & Login");
        window.location.href = "login.html";
    }
});