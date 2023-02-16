// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC73lcP41acNenD3YcnQeiOe-5l8bVEwvQ",
  authDomain: "chat-app-a71ef.firebaseapp.com",
  projectId: "chat-app-a71ef",
  storageBucket: "chat-app-a71ef.appspot.com",
  messagingSenderId: "857541476857",
  appId: "1:857541476857:web:2f139c7d620c5a81327d28",
  measurementId: "G-2QYSEHPLPX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);