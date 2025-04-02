import { observer } from "mobx-react-lite"
import { Request } from "src/presenters/requestPresenter"

//import { reactiveModel } from "src/app/bootstrapping"
import { model } from "src/app/model"

export default observer(function IndexPage() {
  return <Request model={model} />
})
