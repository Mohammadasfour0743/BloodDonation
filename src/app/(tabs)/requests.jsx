import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/app/bootstrapping"
import { Request } from "src/presenters/requestPresenter"

export default observer(function IndexPage() {
  return <Request model={reactiveModel} />
})
