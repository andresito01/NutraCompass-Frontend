import { auth } from "../../../config/firebase.js";
import * as fb from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

// ALL METHODS ENGAGE WITH FIREBASE AND FIRESTORE DATABASE

// User Authentication Methods
export async function registration(firstName, lastName, email, password) {
  try {
    await fb.createUserWithEmailAndPassword(auth, email, password);

    const currentUser = auth.currentUser;

    const db = getFirestore();
    const userRef = doc(db, "users", currentUser.uid);

    await setDoc(userRef, {
      email: currentUser.email,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function signIn(email, password) {
  try {
    await fb.signInWithEmailAndPassword(fb.getAuth(), email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await fb.signOut(fb.getAuth());
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
