import { Text, View } from "react-native"
import { Tabs } from "expo-router"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import Octicons from "@expo/vector-icons/Octicons"

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            alignSelf: "center",
            borderRadius: 15,
            width: "80%",
            borderTopWidth: 0,
            shadowOpacity: 0.5,
            marginBottom: 20,
            height: 60,
            paddingTop: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          },
          tabBarLabelStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 12, // Adjust label size
            backgroundColor: "white",
          },
        }}
      >
        <Tabs.Screen
          name="requests"
          options={{
            title: "Requests",
            tabBarIcon: () => {
              return <Octicons name="inbox" size={24} color="#9A4040" />
            },
            tabBarLabelStyle: {
              color: "#9A4040",
              fontFamily: "Roboto-Medium",
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "User Profile",
            tabBarIcon: () => {
              return (
                <MaterialIcons
                  name="manage-accounts"
                  size={24}
                  color="#9A4040"
                />
              )
            },
            tabBarLabelStyle: {
              color: "#9A4040",
              fontFamily: "Roboto-Medium",
            },
          }}
        />
      </Tabs>
    </View>
  )
}
