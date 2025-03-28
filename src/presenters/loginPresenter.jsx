import { observer } from "mobx-react-lite"
import{LoginView} from "src/views/loginView"

export const Login = observer(
    (props)=>{
        return(<LoginView login = {() => {router.replace()}}></LoginView>)
    }
)