import "src/app/bootstrapping"

import { useEffect } from "react"
import { View } from "react-native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"

import { getNearbyRequestsForDonor } from "./firebasemodel"

export default function RootLayout() {
  const [loaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("assets/fonts/Roboto-Bold.ttf"),
  })

  if (!loaded) return null
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <Stack
        screenOptions={{
          title: "Blood Donor App",
        }}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="warnings" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  )
}
