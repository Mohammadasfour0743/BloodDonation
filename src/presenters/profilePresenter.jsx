import { useState } from "react"
import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/app/bootstrapping"
import { ProfileView } from "src/views/profileView"

import { logOut } from "../app/firebasemodel"

export const Profile = observer((props) => {
  return (
    <ProfileView
      user={props.model.user}
      logout={() => {
        logOut().then(() => {
          router.replace("/login")
        })
      }}
      edit={() => {}}
    ></ProfileView>
  )
})
