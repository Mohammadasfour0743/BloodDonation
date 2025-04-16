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
    setSelected(props.model.user.bloodtype || "")
    setUsername(props.model.user.name || "")
    setEmail(props.model.user.username || "")
    setPhone(props.model.user.phonenumber || "")
  }, [
    props.model.user.bloodtype,
    props.model.user.name,
    props.model.user.username,
    props.model.user.phonenumber
  ])

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
      setEdit={() => setEdit(true)}
      setName={setUsername}
      username={username}
      phone={phone}
      setPhone={setPhone}
      email={email}
      setEmail={setEmail}
      selected={selected}
      setSelected={setSelected}
      save={() => {
        if (validPhone(phone) && validEmail(email)) {
          props.model.updateUser({ phonenumber: phone })
          props.model.updateUser({ email: email })
          props.model.updateUser({ name: username })
          props.model.updateUser({ bloodtype: selected })

          setEdit(false)
        } else {
          setPhone(props.model.user.phonenumber)
          setEmail(props.model.user.username)
          setEdit(false)
        }
      }}
    ></ProfileView>
  )
})
function validEmail(email) {
  return true
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}
function validPhone(phoneNumber) {
  return true
  const phoneRegex = /^(?:\(\d{3}\)\s?|\d{3}[-.\s])?\d{3}[-.\s]?\d{4}$/
  return phoneRegex.test(phoneNumber)
}
