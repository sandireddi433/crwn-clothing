import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBNjZAvvtVUkpqRDOnUBKrIBCMxa6dhlPE",
  authDomain: "crwn-db-3d58a.firebaseapp.com",
  databaseURL: "https://crwn-db-3d58a.firebaseio.com",
  projectId: "crwn-db-3d58a",
  storageBucket: "crwn-db-3d58a.appspot.com",
  messagingSenderId: "638244075004",
  appId: "1:638244075004:web:6421ddaa1afff6b652ee79",
  measurementId: "G-9CEPTBS4T4",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
