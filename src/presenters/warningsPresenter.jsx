import { router } from "expo-router"
import { WarningsView } from "src/views/warningsView"
import { observer } from "mobx-react-lite"
import { useState } from "react";

export const Warnings = observer((props) => {
  const [page, setPage] = useState(0);

  return (<WarningsView 
    continue = {
      () => {
        router.replace("/(tabs)/profile")
      }
    }
    page = {page}
    setPage = {setPage}
  />)
  
})