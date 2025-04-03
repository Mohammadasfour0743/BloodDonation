import { configure, reaction, toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { Signup } from "src/presenters/signupPresenter"

import { reactiveModel } from "./bootstrapping"

// wrapping the component in observer so that its reactive (re-renders) when the model properties the component references to change
export default observer(function SignupPage() {
  return <Signup/>
})