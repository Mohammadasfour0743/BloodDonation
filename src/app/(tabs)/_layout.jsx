import { Text } from "react-native"
import { Tabs } from "expo-router"

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="requests"
        options={{
          title: "Requests",
          tabBarIcon: () => {
            return <Text></Text>
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "User Profile",
          tabBarIcon: () => {
            return <Text></Text>
          },
        }}
      />
    </Tabs>
  )
}
