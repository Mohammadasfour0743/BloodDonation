import { useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage" // or use your auth provider

export default function Index() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken") // Check if token exists
        if (userToken) {
          router.replace("/(tabs)/requests") // Redirect to Requests Tab if logged in
        } else {
          router.replace("/login") // Redirect to Login if not logged in
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        router.replace("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    )
  }

  return null // Nothing renders since the user is redirected
}
