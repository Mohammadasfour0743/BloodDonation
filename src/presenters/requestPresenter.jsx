import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { RequestView } from "src/views/requestView"

export const Request = observer((props) => {
  return <RequestView />
})
