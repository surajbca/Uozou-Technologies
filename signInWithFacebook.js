// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArNcIibne40ySbeshZwqlQnTUmEyYXjSg",
  authDomain: "facebook-login-a98f4.firebaseapp.com",
  projectId: "facebook-login-a98f4",
  storageBucket: "facebook-login-a98f4.appspot.com",
  messagingSenderId: "207081529344",
  appId: "1:207081529344:web:87670b88ee581ebcd478e5",
};

// Initialize Firebase
const appF = initializeApp(firebaseConfig);
const authF = getAuth(appF);
authF.languageCode = "en";
const providerF = new FacebookAuthProvider();
const facebookLogin = document.getElementById("facebook-login-btn");
facebookLogin.addEventListener("click", function () {
  signInWithPopup(authF, providerF).then((result) => {
    const Credential = FacebookAuthProvider.credentialFromResult(result);
    const userF = result.user;
    console.log(userF);
    window.location.href = "../Home.html";
  });
  const errorCodeF = error.code;
  const errorMessageF = error.message;
});
