import { Text } from "react-native"
import { observer } from "mobx-react-lite"
import { reactiveModel } from "../../bootstrapping"
import { Request } from "src/presenters/requestPresenter"

export default observer(function IndexPage() {
    return <Request model = {reactiveModel}/>
})
