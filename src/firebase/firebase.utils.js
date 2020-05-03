import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD2UrRHyG1BQ3gDC6cwl5GxeXcRMJWAn_M",
  authDomain: "crwn-db-6992c.firebaseapp.com",
  databaseURL: "https://crwn-db-6992c.firebaseio.com",
  projectId: "crwn-db-6992c",
  storageBucket: "crwn-db-6992c.appspot.com",
  messagingSenderId: "432513807103",
  appId: "1:432513807103:web:daf4caef0bbee690c152ca",
  measurementId: "G-KPJWTK9G69"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
