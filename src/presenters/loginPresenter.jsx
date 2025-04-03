// import { router } from "expo-router"
// import { observer } from "mobx-react-lite"
// import { LoginView } from "src/views/loginView"
// import { reactiveModel } from "src/app/bootstrapping"
// import { useState } from "react"

// export const Login = observer((props) => {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   return (
//     <LoginView
//       login={() => {
//         //console.log(username + "," + password)
//         router.replace("/(tabs)")
//       }}
//       setUser = {setUsername}
//       user = {username}
//       pass = {password}
//       setPass = {setPassword}
//     ></LoginView>
//   )
// })

import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { LoginView } from "src/views/loginView";
import { reactiveModel } from "src/app/bootstrapping";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "src/app/firebaseconfig.js";

// Initialize Firebase (or import the already initialized instance)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const Login = observer((props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoginView
      login={() => {
        // Use Firebase Auth to sign in with email and password
        signInWithEmailAndPassword(auth, username, password)
          .then((userCredential) => {
            console.log("User signed in:", userCredential.user);
            // Optionally update your reactive model with userCredential.user here
            router.replace("/(tabs)");
          })
          .catch((error) => {
            console.error("Error signing in:", error);
          });
      }}
      setUser={setUsername}
      user={username}
      pass={password}
      setPass={setPassword}
    />
  );
});
