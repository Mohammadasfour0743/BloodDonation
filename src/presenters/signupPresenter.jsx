import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { SignupView } from "src/views/signupView"
import { reactiveModel } from "src/app/bootstrapping"
import { useState } from "react"

export const Signup = observer((props) => {
  const [selected, setSelected] = useState("");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  return (
    <SignupView
      login={() => {
        //console.log(username + "," + password)
        router.replace("/(tabs)")
      }}
      setUser = {setUsername}
      user = {username}
      pass = {password}
      setPass = {setPassword}
      pass2 = {password2}
      setPas2 = {setPassword2}
      setSelected={setSelected} 
    ></SignupView>
  )
})
