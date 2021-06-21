import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABsTKn93OWnTmf-18FEeq3wluW0VmsWI0",
  authDomain: "fir-fa115.firebaseapp.com",
  projectId: "fir-fa115",
  storageBucket: "fir-fa115.appspot.com",
  messagingSenderId: "973335857428",
  appId: "1:973335857428:web:f49f5fc28115a55f5fda01",
  measurementId: "G-VF7HYE3N3M",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebaseApp.firestore();

export default firebaseApp;
