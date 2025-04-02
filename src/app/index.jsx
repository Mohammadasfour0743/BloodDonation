import { observer } from "mobx-react-lite"
import {reaction} from "mobx"
import { Login } from "src/presenters/loginPresenter"
import { connectToPersistence, persistModel } from "./firebasemodel"
import { model } from "./model"

global.model = model
connectToPersistence(model, reaction);

export default observer(function IndexPage() {
  return <Login />
})