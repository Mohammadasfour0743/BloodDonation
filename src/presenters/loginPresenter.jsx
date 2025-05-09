import { useState } from "react"
import { router } from "expo-router"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/app/bootstrapping"
import { firebaseConfig } from "src/app/firebaseconfig.js"
import { auth, signIn } from "src/app/firebasemodel" // Ensure this is correctly imported
import { LoginView } from "src/views/loginView"

// Initialize Firebase (or import the already initialized instance)

export const Login = observer((props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <LoginView
      login={() => {
        signIn(username, password)
          .then(() => {
            router.replace("/(tabs)/requests")
          })
          .catch((error) => {
            setErrorMsg("Invalid username or password. Try again.");
          })
      }}
      setUser={setUsername}
      user={username}
      pass={password}
      setPass={setPassword}
      errorMsg={errorMsg}
    />
  )
})
