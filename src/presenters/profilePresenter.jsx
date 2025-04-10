import { useEffect, useState } from "react"
import { router, useNavigation } from "expo-router"
import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/app/bootstrapping"
import { ProfileView } from "src/views/profileView"
import { setEmitFlags } from "typescript"

import { logOut } from "../app/firebasemodel"

export const Profile = observer((props) => {
  const [selected, setSelected] = useState(props.model.user.bloodtype)
  const [username, setUsername] = useState(props.model.user.name)
  const [email, setEmail] = useState(props.model.user.username)
  const [phone, setPhone] = useState(props.model.user.phonenumber)
  const [edit, setEdit] = useState(false)
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: edit ? "none" : "flex",
        alignSelf: "center",
        borderRadius: 15,
        width: "80%",
        borderTopWidth: 0,
        shadowOpacity: 0.5,
        marginBottom: 20,
        height: 60,
        paddingTop: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      },
    })
  }, [edit])
  return (
    <ProfileView
      user={props.model.user}
      logout={() => {
        logOut().then(() => {
          router.replace("/login")
        })
      }}
      updateUser={props.model.updateUser}
      edit={edit}
      setEdit={(val) => {
        setEdit(val)
        if (!val) {
          if (validPhone(phone)) props.model.updateUser({ phonenumber: phone })
          else setPhone(props.model.user.phonenumber)
          if (validEmail(email)) props.model.updateUser({ email: email })
          else setEmail(props.model.user.username)

          props.model.updateUser({ name: username })
          props.model.updateUser({ bloodtype: selected })
        }
      }}
      setName={setUsername}
      username={username}
      phone={phone}
      setPhone={setPhone}
      email={email}
      setEmail={setEmail}
      selected={selected}
      setSelected={setSelected}
    ></ProfileView>
  )
})
function validEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}
function validPhone(phoneNumber) {
  const phoneRegex = /^(?:\(\d{3}\)\s?|\d{3}[-.\s])?\d{3}[-.\s]?\d{4}$/
  return phoneRegex.test(phoneNumber)
}
