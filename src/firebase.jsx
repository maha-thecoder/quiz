import {getAuth} from "firebase/auth"
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDwV74iQaMxaDO95ujUDFpOk-ajoeCR2aU",
    authDomain: "mental-login-32c8e.firebaseapp.com",
    projectId: "mental-login-32c8e",
    storageBucket: "mental-login-32c8e.firebasestorage.app",
    messagingSenderId: "92093412187",
    appId: "1:92093412187:web:3b79a3a8044755235c607e"
  };
  
  const app =initializeApp(firebaseConfig)

  const auth=getAuth(app)
  const db=getFirestore(app)
  

  export {auth,db}
  



  