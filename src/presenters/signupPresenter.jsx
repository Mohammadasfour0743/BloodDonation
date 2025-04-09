// import { router } from "expo-router"
// import { observer } from "mobx-react-lite"
// import { SignupView } from "src/views/signupView"
// import { reactiveModel } from "src/app/bootstrapping"
// import { useState } from "react"

// export const Signup = observer((props) => {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [password2, setPassword2] = useState("")

//   return (
//     <SignupView
//       login={() => {
//         //console.log(username + "," + password)
//         router.replace("/(tabs)")
//       }}
//       setUser = {setUsername}
//       user = {username}
//       pass = {password}
//       setPass = {setPassword}
//       pass2 = {password2}
//       setPass2 = {setPassword2}
//     ></SignupView>
//   )
// })

import { useState } from "react"
import { router } from "expo-router"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/app/bootstrapping"
import { firebaseConfig } from "src/app/firebaseconfig.js"
import { signUp } from "src/app/firebasemodel"
import { SignupView } from "src/views/signupView"

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const Signup = observer((props) => {
  const [selected, setSelected] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  return (
    <SignupView
      login={() => {
        if (password !== password2) {
          console.error("Passwords do not match")
          return
        }

        signUp(username, password)
          .then(() => {
            router.replace("/(tabs)")
          })
          .catch((error) => {
            alert("Sign-up failed: " + error.message)
          })
      }}
      setUser={setUsername}
      user={username}
      pass={password}
      setPass={setPassword}
      pass2={password2}
      setPas2={setPassword2}
      setSelected={setSelected}
    ></SignupView>
  )
})
