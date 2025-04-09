import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { ProfileView } from "src/views/profileView"
import { reactiveModel } from "src/app/bootstrapping"
import { useState } from "react"

export const Profile = observer((props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  return (
    <ProfileView
      login={() => {
        //console.log(username + "," + password)
        router.replace("/(tabs)")
      }}
      setUser = {setUsername}
      user = {username}
      pass = {password}
      setPass = {setPassword}
    ></ProfileView>
  )
})