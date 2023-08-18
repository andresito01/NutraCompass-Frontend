import * as fb from "firebase/auth";
import { Alert } from "react-native";

export async function registration(email, password) {
  try {
    await fb.createUserWithEmailAndPassword(fb.getAuth(), email, password);
    //const currentUser = firebase.auth().currentUser;

    // const db = firebase.firestore();
    // db.collection('users')
    //   .doc(currentUser.uid)
    //   .set({
    //     email: currentUser.email,
    //     lastName: lastName,
    //     firstName: firstName,
    //   });
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
