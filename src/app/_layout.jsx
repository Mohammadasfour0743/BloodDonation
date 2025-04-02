import "src/bootstrapping"
import {useFonts} from "expo-font"
import { Stack } from "expo-router"

export default function RootLayout() {
  const [loaded]= useFonts({
    "Roboto": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("src/assets/fonts/Roboto-Bold.ttf"),

  }) 
  if(!loaded)
    return null
  return (
    <Stack
      screenOptions={{
        title: "Blood Donor App",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
