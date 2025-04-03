import { configure, reaction, toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { Login } from "src/presenters/loginPresenter"

import { reactiveModel } from "./bootstrapping"

// wrapping the component in observer so that its reactive (re-renders) when the model properties the component references to change
export default observer(function IndexPage() {
  return <Login />
})
