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

import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { SignupView } from "src/views/signupView";
import { reactiveModel } from "src/app/bootstrapping";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "src/app/firebaseconfig.js";

// Initialize Firebase (or import the already initialized instance)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const Signup = observer((props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <SignupView
      login={() => {
        // Optional: Validate that both password fields match
        if (password !== password2) {
          console.error("Passwords do not match");
          return;
        }
        // Create a new user with Firebase Auth
        createUserWithEmailAndPassword(auth, username, password)
          .then((userCredential) => {
            console.log("User signed up:", userCredential.user);
            // Optionally update your reactive model with userCredential.user here
            router.replace("/(tabs)");
          })
          .catch((error) => {
            console.error("Error signing up:", error);
          });
      }}
      setUser={setUsername}
      user={username}
      pass={password}
      setPass={setPassword}
      pass2={password2}
      setPass2={setPassword2}
    />
  );
});
