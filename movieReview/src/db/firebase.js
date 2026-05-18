// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-RD-VR_ZihgmG-YEnllXTYnlx_kMdiYk",
  authDomain: "moveclone-50a2d.firebaseapp.com",
  projectId: "moveclone-50a2d",
  storageBucket: "moveclone-50a2d.firebasestorage.app",
  messagingSenderId: "444602664321",
  appId: "1:444602664321:web:f21c55ffe18e6f51b3d480",
  measurementId: "G-YY9ZC6RXWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
export {db , auth};