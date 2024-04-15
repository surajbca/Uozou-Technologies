// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5AnU6c-a8nHUdI05EXPgHTF5TmV3IELc",
  authDomain: "uozou-technologies-sign-732ef.firebaseapp.com",
  projectId: "uozou-technologies-sign-732ef",
  storageBucket: "uozou-technologies-sign-732ef.appspot.com",
  messagingSenderId: "341986573405",
  appId: "1:341986573405:web:c74b764ac6726237dea1b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById("google-signin-button");
googleLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider).then((result) => {
    const Credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log(user);
    window.location.href = "../Home.html";
  });
  const errorCode = error.code;
  const errorMessage = error.message;
});
