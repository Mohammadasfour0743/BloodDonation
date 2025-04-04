import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { LoginView } from "src/views/loginView"
import { reactiveModel } from "src/app/bootstrapping"
import { useState } from "react"

export const Login = observer((props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  return (
    <LoginView
      login={() => {
        //console.log(username + "," + password)
        router.replace("/(tabs)")
      }}
      setUser = {setUsername}
      user = {username}
      pass = {password}
      setPass = {setPassword}
    ></LoginView>
  )
})
