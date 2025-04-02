import { observer } from "mobx-react-lite"
import {reaction} from "mobx"
import { Login } from "src/presenters/loginPresenter"
import { connectToPersistence, setRequests } from "./firebasemodel"
import { model } from "./model"
import { toJS } from "mobx";



// a reaction to trigger if the model changes
// whenever model.user.name updates, MobX detects the change and passes the new name as newName to reactModel
// reaction(
//     // observes the name
//      function modelState() {
//          return model.user.name
//      },
//      // side effect if the name changes
//      function reactModel(newName) {
//          console.log("name has changed to ", newName)
//      },
//  )

global.model = model
global.setRequests = setRequests
connectToPersistence(model, reaction);

// wrapping the component in observer so that its reactive (re-renders) when the model properties the component references to change
export default observer(function IndexPage() {
  return <Login />
})
