import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "ezrental-a72d8.firebaseapp.com",
  databaseURL: "https://ezrental-a72d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ezrental-a72d8",
  storageBucket: "ezrental-a72d8.appspot.com",
  messagingSenderId: "14211979679",
  appId: "1:14211979679:web:40d1af493981d4a9b145aa",
  measurementId: "G-WX1YG1DB20"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const metaprovider = new FacebookAuthProvider();


export { db,auth,storage,provider,metaprovider };