// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth, initializeAuth, getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpRYqHzYVbbFu-xvGi0HyhOReAglkixSk",
  authDomain: "godlifeapp.firebaseapp.com",
  projectId: "godlifeapp",
  storageBucket: "godlifeapp.firebasestorage.app",
  messagingSenderId: "255751315422",
  appId: "1:255751315422:web:9fd58ace5a8219aa8c474f",
  measurementId: "G-Z2QN3W756P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };