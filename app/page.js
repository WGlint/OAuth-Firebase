"use client";

import firebase, { Auth, GoogleProvider } from "../firebase/firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function Page() {
  const db = firebase.firestore();
  const router = useRouter();

  const [Loading, setLoading] = useState(false);

  const [count, setcount] = useState(0);
  const [countGlo, setcountGlo] = useState(0);
  const [log, setlog] = useState(false);
  const [client, setclient] = useState({
    etat: log,
    uid: "",
    Person: "",
    email: "",
    url: "",
  });

  const Handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prompt = e.target[0].value;
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }).then((res) => console.log(res));
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log('Pas de contenu JSON dans la réponse');
      }
      
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    setlog(!log);
  }, [client]);

  async function LocalCount() {
    setcount(count + 1);
    try {
      const UserData = await db.collection("User").doc(client.uid);
      const GlobalCount = (await UserData.get()).data();
      if (GlobalCount.Count) {
        await UserData.update({
          Count: GlobalCount.Count + 1,
        });
      } else {
        await UserData.update({
          Count: 1,
        });
      }
      setcountGlo(GlobalCount.Count + 1);
    } catch (error) {
      toast.error("PAS DE COMPTE GLOBAL");
    }
  }

  async function putdata() {
    await db.collection("User").doc(client.uid).set({
      Person: client.Person,
    });
    const data = await db.collection("User").get();
    console.log(data.docs.map((doc) => console.log(doc.data())));
  }

  async function signinwithgoogle() {
    await Auth.signInWithPopup(GoogleProvider);
    setclient({
      etat: log,
      uid: Auth.currentUser.uid,
      Person: Auth.currentUser.displayName,
      email: Auth.currentUser.email,
      url: Auth.currentUser.photoURL,
    });
  }

  async function signout() {
    await Auth.signOut();
    setclient({
      etat: log,
      uid: "",
      Person: "",
      email: "",
      url: "",
    });
  }

  return (
    <>
      <div className="h-[100vh] w-[100vw] flex flex-col items-center gap-5 pt-10">
        <h1>Come and TRY MY APP !</h1>
        <p>Make yours choice :</p>
        <div className="grid grid-cols-1 gap-5">
          {log ? (
            <button
              onClick={signinwithgoogle}
              className="w-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Google sign IN
            </button>
          ) : (
            <button
              onClick={signout}
              className="w-xl bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Google sign OUT
            </button>
          )}
        </div>
        <Avatar log={client.etat} urlPicture={client.url} />
        <p>
          {" "}
          <span className="font-bold">Etat</span> :{" "}
          {client.etat ? "true" : "false"}{" "}
        </p>
        <p>
          {" "}
          <span className="font-bold">uid</span> : {client.uid}{" "}
        </p>
        <p>
          {" "}
          <span className="font-bold">Nom et prenom</span> : {client.Person}{" "}
        </p>
        <p>
          {" "}
          <span className="font-bold">Email</span> : {client.email}{" "}
        </p>
        <div className="grid grid-cols-2 gap-5">
          <button
            onClick={LocalCount}
            className="px-5 bg-indigo-700 py-2 rounded font-bold"
          >
            Local Count : {count}
          </button>
          <button className="px-5 bg-indigo-700 py-2 rounded font-bold">
            Global Count : {countGlo}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-5 " >
          <form onSubmit={(e) => Handlesubmit(e)} className="flex justify-center items-center gap-5 flex-col" >
            <input
              type="text"
              className="px-5 bg-indigo-700 py-2 rounded font-bold"
            />
            <button type="submit" className="px-5 w-[30%] bg-indigo-700 py-2 rounded font-bold">
              Send
            </button>
          </form>
          <Image width={312} height={1} src="https://avatars.githubusercontent.com/u/96632943?v=4" />
        </div>
      </div>
    </>
  );
}

function Avatar(props) {
  const { log, urlPicture } = props;

  const LogON =
    "absolute right-0 top-0 block h-4 w-4 rounded-full bg-green-600 ring-2 ring-white";
  const LogOFF =
    "absolute right-0 top-0 block h-4 w-4 rounded-full bg-red-600 ring-2 ring-white";

  return (
    <>
      <span className="relative inline-block">
        <img
          className="h-16 w-16 rounded-full"
          src={
            log
              ? urlPicture
              : "https://avatars.githubusercontent.com/u/96632943?v=4"
          }
          alt=""
        />
        <span className={log ? LogON : LogOFF} />
      </span>
    </>
  );
}
