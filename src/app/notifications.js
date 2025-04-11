import { Platform } from "react-native"
import * as Device from 'expo-device'
import * as Notifications from "expo-notifications"
import Constants from "expo-constants"

export async function registerForPushNotificationsAsync(userId) {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }
    console.log("hellooooo")
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== "granted") {
    console.log("not granted")
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== "granted") {
    handleRegistrationError(
      "Permission not granted to get push token for push notification!",
    )
    return
  }
  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId
  if (!projectId) {
    handleRegistrationError("Project ID not found")
  }
  try{  
  const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data
    await fetch("https://pushnotificationsserver-production.up.railway.app/save-token?userid=" + userId + "&token=" +pushTokenString )
  } catch (e) {
    handleRegistrationError(`${e}`)
  }
}

function handleRegistrationError(errorMessage) {
  console.log(errorMessage)
  throw new Error(errorMessage)
}
