import { observer } from "mobx-react-lite"
import { reactiveModel } from "src/app/bootstrapping"
import { Profile } from "src/presenters/profilePresenter"

export default observer(function ProfilePage() {
  return <Profile model={reactiveModel} />
})