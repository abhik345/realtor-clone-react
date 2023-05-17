// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB16UwGTx-tuZhuY8qCbfSVBt4c42CKljs",
  authDomain: "realtor-clone-react-d1aa4.firebaseapp.com",
  projectId: "realtor-clone-react-d1aa4",
  storageBucket: "realtor-clone-react-d1aa4.appspot.com",
  messagingSenderId: "517027904308",
  appId: "1:517027904308:web:c8692685af8e93db970361",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
