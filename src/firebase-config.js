import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCyL5T_tBCes_i-nLB8Pj_9oe1sCooypFc",
  authDomain: "login-form-6715c.firebaseapp.com",
  projectId: "login-form-6715c",
  storageBucket: "login-form-6715c.appspot.com",
  messagingSenderId: "658368695384",
  appId: "1:658368695384:web:fd88cd239df36206490e2d",
  measurementId: "G-0BH3PTG5QY",
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);