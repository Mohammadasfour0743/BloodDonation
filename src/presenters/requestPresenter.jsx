import { useEffect, useState } from "react"
import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { RequestView } from "src/views/requestView"

export const Request = observer((props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentRequest, setCurrentRequest] = useState(null)
  useEffect(() => {
    if (!props.model.getRequestById(currentRequest?.Id)) setModalVisible(false)
  }, [props.model.requests])
  Click(props.model, setCurrentRequest, setModalVisible);
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
