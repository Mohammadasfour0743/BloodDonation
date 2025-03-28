import { observer } from "mobx-react-lite"
import {reaction} from "mobx"
import { Login } from "src/presenters/loginPresenter"
import { connectToPersistence, persistModel } from "./firebasemodel"
import { model } from "./model"


// a reaction to watch for changes in the properties specified below
// done using the callbacks below
reaction(
     function modelState() {
         return model.name
     },
     function reactModel() {
         console.log("name has changed")
     },
 )

global.model = model
connectToPersistence(model, reaction);

export default observer(function IndexPage() {
  return <Login />
})
