import { observer } from "mobx-react-lite"
import{LoginView} from "src/views/loginView"
import {router} from "expo-router"

export const Login = observer(
    (props)=>{
        return(<LoginView login = {() => {router.replace("/(tabs)")}}></LoginView>)
    }
)