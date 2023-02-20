
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNH-Qo3cbJttjeNFQQJRro1tsKMZSP97o",
  authDomain: "chat-2ec37.firebaseapp.com",
  projectId: "chat-2ec37",
  storageBucket: "chat-2ec37.appspot.com",
  messagingSenderId: "431172011940",
  appId: "1:431172011940:web:f98714e053dd2a50626331"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);