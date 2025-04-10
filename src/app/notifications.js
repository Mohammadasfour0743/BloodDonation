import { Platform } from "react-native"

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }

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
  try {
    const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data
    console.log(pushTokenString)
    return pushTokenString
  } catch (e) {
    handleRegistrationError(`${e}`)
  }
}

function handleRegistrationError(errorMessage) {
  console.log(errorMessage)
  throw new Error(errorMessage)
}
