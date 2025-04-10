import { useState, useEffect } from "react"
import { router, useNavigation } from "expo-router"
import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/app/bootstrapping"
import { ProfileView } from "src/views/profileView"

import { logOut } from "../app/firebasemodel"

export const Profile = observer((props) => {
    const [selected, setSelected] = useState(props.model.user.bloodtype)
    const [username, setUsername] = useState(props.model.user.name)
    const [email, setEmail] = useState(props.model.user.username)
    const [phone, setPhone] = useState(props.model.user.phonenumber)
    const [edit, setEdit] = useState(false)
    const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({tabBarStyle: {display: edit ? "none":"flex"}})
  },[edit])
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
      setEdit={(val)=>{setEdit(val);if(!val){
        if(validPhone(phone))
            props.model.updateUser({phonenumber:phone})
        if(validEmail(email))
            props.model.updateUser({email:email})
        props.model.updateUser({name:username})
        props.model.updateUser({bloodtype:selected})
        }
}
}
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
function validEmail(email){
 return true
}
function validPhone(email){
return true
}
