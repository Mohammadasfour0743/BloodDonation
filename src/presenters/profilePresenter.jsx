import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { ProfileView } from "src/views/profileView"
import { reactiveModel } from "src/app/bootstrapping"
import { useState } from "react"
import { logOut} from "../app/firebaseModel"

export const Profile = observer((props) => {
  
  return (
    <ProfileView
      user = {props.model.user}
      logout = {() => {logOut()}}
      edit = {() => {}}
    ></ProfileView>
  )
})