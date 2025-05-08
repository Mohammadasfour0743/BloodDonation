import { useEffect, useState } from "react"
import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { RequestView } from "src/views/requestView"

export const Request = observer((props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentRequest, setCurrentRequest] = useState(null)
  const [isPress, setIsPress] = useState(false)
  useEffect(() => {
    if (!props.model.getRequestById(currentRequest?.Id)) setModalVisible(false)
  }, [props.model.requests])
  return (
    <RequestView
      requestsArray={props.model.requests}
      visible={modalVisible}
      setVisible={setModalVisible}
      current={currentRequest}
      setCurrent={setCurrentRequest}
      bloodType={props.model.user.bloodtype}
      isPress={isPress}
      setIsPress={setIsPress}
    />
  )
})
