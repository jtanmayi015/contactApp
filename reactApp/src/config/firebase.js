// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0zPoZKxeKP5fehRrXfGibxqFXh4MspMs",
  authDomain: "vite-contact-de8db.firebaseapp.com",
  projectId: "vite-contact-de8db",
  storageBucket: "vite-contact-de8db.appspot.com",
  messagingSenderId: "296743815945",
  appId: "1:296743815945:web:5eb889926018eaa22f21d8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);