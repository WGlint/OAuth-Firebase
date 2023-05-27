"use client"

import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "../../firebase/firebase"


export default function Page() {

    const [user, loading, error] = useAuthState(firebase.auth())

    return (
        <div>
            <h1>Dashboard</h1>
            <p>user: {user?.displayName}</p>
            <p>loading: {loading?.toString()}</p>
            <p>error: {error?.toString()}</p>
        </div>
    )
}