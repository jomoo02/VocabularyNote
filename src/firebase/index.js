

import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFPMHIKdgxfcEXnjqYxVX7OjhB8fvQCEU",
  authDomain: "my-vocabulary-note.firebaseapp.com",
  databaseURL: "https://my-vocabulary-note-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-vocabulary-note",
  storageBucket: "my-vocabulary-note.appspot.com",
  messagingSenderId: "1010505130508",
  appId: "1:1010505130508:web:108ca0c9907097c6be4429",
  measurementId: "G-B99VNXEYRC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {
    db
}