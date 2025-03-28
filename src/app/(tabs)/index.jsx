import { Text } from "react-native"
import { observer } from "mobx-react-lite"
import { Request } from "src/presenters/requestPresenter"

import { reactiveModel } from "../../bootstrapping"

export default observer(function IndexPage() {
  return <Request model={reactiveModel} />
})
