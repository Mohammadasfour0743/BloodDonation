import { useState } from "react"
import { router } from "expo-router"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/app/bootstrapping"
import { firebaseConfig } from "src/app/firebaseconfig.js"
import { signUp } from "src/app/firebasemodel"
import { SignupView } from "src/views/signupView"

//const app = initializeApp(firebaseConfig)
//const auth = getAuth(app)

export const Signup = observer((props) => {
  const [selected, setSelected] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <SignupView
      login={() => {
        console.log("Selected blood type:", selected)
        if (password !== password2) {
          setErrorMsg("Passwords do not match")
          return
        }

        signUp(username, password, selected)
          .then(() => {
            // router.replace("/(tabs)/requests")
          })
          .catch((error) => {
            setErrorMsg("Sign-up failed")
          })
      }}
      setUser={setUsername}
      user={username}
      pass={password}
      setPass={setPassword}
      pass2={password2}
      setPass2={setPassword2}
      setSelected={setSelected}
      errorMsg={errorMsg}
    ></SignupView>
  )
})
