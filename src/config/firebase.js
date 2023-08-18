// Import the functions you need from the SDKs you need
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgfXz9gqe6NGn_rz-eKMOOFxhJZ3JB3ZU",
  authDomain: "nutracompass.firebaseapp.com",
  projectId: "nutracompass",
  storageBucket: "nutracompass.appspot.com",
  messagingSenderId: "679887861797",
  appId: "1:679887861797:web:dc127006d5eaecda1f27cc",
  measurementId: "G-T3GBC2NK5L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
