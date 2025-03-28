import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/bootstrapping"
import {Login} from "src/presenters/loginPresenter"

export default observer(function IndexPage() {
  return (
    <Login></Login>
  )
})
