import { useState } from "react"
import { InfoView } from "src/views/infoView"

export function Information(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [selected, setSelected] = useState("")
  return (
    <InfoView modalVisible = {modalVisible} setModalVisible = {setModalVisible} 
    selected = {selected} setSelected = {setSelected}
    />
  )
}
