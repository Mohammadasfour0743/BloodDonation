import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/app/bootstrapping"
import { Information } from "../../presenters/infoPresenter"

export default observer(function IndexPage() {
  return <Information model={reactiveModel} />
})