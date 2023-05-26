import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCW3eGl3CWkAf8rrGHRPrFJ_jNxEuhpskc",
  authDomain: "authjs-500a8.firebaseapp.com",
  projectId: "authjs-500a8",
  storageBucket: "authjs-500a8.appspot.com",
  messagingSenderId: "937383511788",
  appId: "1:937383511788:web:b092a2d2c5e779dfd1c7c9",
  measurementId: "G-GG0TS0NK29"
};


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const Auth = firebase.auth();
export default firebase;
