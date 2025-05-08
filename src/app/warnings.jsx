import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/app/bootstrapping"
import { Warnings } from "../presenters/warningsPresenter"

export default observer(function WarningsPage() {
  return <Warnings model={reactiveModel} />
})