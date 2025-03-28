// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDFv1XX_YmrD-hyOS1Sh0I0zdLkYyxB8D0",
  authDomain: "back-end-blood-donation.firebaseapp.com",
  projectId: "back-end-blood-donation",
  storageBucket: "back-end-blood-donation.firebasestorage.app",
  messagingSenderId: "426652873350",
  appId: "1:426652873350:web:9ca844d10e0dafa5101707",
  measurementId: "G-RSPN6SFGZ6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
