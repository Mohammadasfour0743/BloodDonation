import { observer } from "mobx-react-lite"
import { Login } from "src/presenters/loginPresenter"
import { persistModel } from "./firebasemodel"
import { model } from "./model"

export default observer(function IndexPage() {
  return <Login />
})
persistModel(model);
