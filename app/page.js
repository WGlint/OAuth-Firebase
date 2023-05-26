"use client";

import firebase, { Auth, GoogleProvider } from "../firebase/firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useAuthState } from "react-firebase-hooks/auth";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/app",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export default function Page() {
  async function signinwithgoogle() {
    await Auth.signInWithPopup(GoogleProvider);
    console.log(Auth.currentUser);
  }

  return (
    <>
      <div className="h-[100vh] w-[100vw] flex flex-col items-center gap-5 pt-10">
        <h1>Come and TRY MY APP !</h1>
        <p>Make yours choice :</p>
        <div className="grid grid-flow-col grid-rows-1">
          <button
            onClick={signinwithgoogle}
            className="w-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Google sign IN
          </button>
          <button>
            Google sign OUT
          </button>
        </div>
        <div></div>
      </div>
    </>
  );
}
