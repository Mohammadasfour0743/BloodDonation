import { useState } from "react"
import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { RequestView } from "src/views/requestView"

export const Request = observer((props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentRequest, setCurrentRequest] = useState(null)
  return (
    <RequestView
      requestsArray={props.model.requests}
      visible={modalVisible}
      setVisible={setModalVisible}
      current={currentRequest}
      setCurrent={setCurrentRequest}
    />
  )
})
