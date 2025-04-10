import { useState, useEffect} from "react"
import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { RequestView } from "src/views/requestView"

export const Request = observer((props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentRequest, setCurrentRequest] = useState(null)
  useEffect(()=>{
    console.log("Current requests in model:", props.model.requests)
    if(!props.model.getRequestById(currentRequest?.id))
      setModalVisible(false)
  },[props.model.requests])
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
