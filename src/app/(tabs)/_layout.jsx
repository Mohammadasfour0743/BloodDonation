import { Text, View } from "react-native"
import { Tabs } from "expo-router"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import Octicons from "@expo/vector-icons/Octicons"

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#900000" }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#B47F7F",
          tabBarInactiveTintColor: "#780000",
          headerShown: false,
          contentStyle: { backgroundColor: "#900000" },
          // For older versions of React Navigation
          cardStyle: { backgroundColor: "#900000" },
          // For the tab screens specifically
          sceneContainerStyle: { backgroundColor: "#900000" },
          tabBarStyle: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 25,
            marginHorizontal: "10%",
            borderRadius: 15,
            width: "80%",
            alignSelf: "center",
            borderTopWidth: 0,
            shadowOpacity: 0.5,
            height: 60,
            paddingTop: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 1)",
            elevation: 2,
          },
          tabBarLabelStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 12,
          },
          tabBarItemStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Tabs.Screen
          name="requests"
          options={{
            title: "Requests",
            tabBarIcon: ({ color }) => {
              return <Octicons name="inbox" size={24} color={color} />
            },
            tabBarLabelStyle: {
              color: "#9A4040",
              fontFamily: "Roboto-Medium",
            },
          }}
        />
        <Tabs.Screen
          name="information"
          options={{
            title: "Information",
            tabBarIcon: ({ color }) => {
              return <MaterialIcons name="opacity" size={24} color={color} />
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
            tabBarIcon: ({ color }) => {
              return (
                <MaterialIcons name="manage-accounts" size={24} color={color} />
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
