import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAX2XCuqL-hde2rhd5udFTvZfbkm4IeEw",
  authDomain: "user-email-password-auth-1e6b1.firebaseapp.com",
  projectId: "user-email-password-auth-1e6b1",
  storageBucket: "user-email-password-auth-1e6b1.appspot.com",
  messagingSenderId: "358957135150",
  appId: "1:358957135150:web:d0cf3c6736da9fad32f6bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
