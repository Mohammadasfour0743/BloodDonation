import { Text } from "react-native"
import { Tabs } from "expo-router"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: {backgroundColor: ""} }}>
      <Tabs.Screen
        name="requests"
        options={{
          title: "Requests",
          tabBarIcon: () => {
            return <Octicons name="inbox" size={24} color="#9A4040" />
          }, tabBarLabelStyle: {
                color: "#9A4040",
                fontFamily: "Roboto-Medium"
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "User Profile",
          tabBarIcon: () => {
            return <MaterialIcons name="manage-accounts" size={24} color="#9A4040" />
          },  tabBarLabelStyle: {
            color: "#9A4040",
            fontFamily: "Roboto-Medium"}
        }}
      />
    </Tabs>
  )
}
