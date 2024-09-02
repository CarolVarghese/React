// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWEUwzfR2YdwAIO80KVwa85an5Cx2Pfr0",
  authDomain: "fireboss-e56af.firebaseapp.com",
  projectId: "fireboss-e56af",
  storageBucket: "fireboss-e56af.appspot.com",
  messagingSenderId: "576186750717",
  appId: "1:576186750717:web:7a0cfe423634ecc588d094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
export const db = getFirestore(app);

export { auth };