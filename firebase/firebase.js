import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.senderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt : 'select_account' })

export const Auth = firebase.auth();
export default firebase;
