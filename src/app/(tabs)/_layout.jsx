import { Text } from "react-native"
import {Tabs} from "expo-router"
export default function TabLayout() {

    return (
        <Tabs screenOptions = {
            {headerShown: false}
        } > 
        <Tabs.Screen name = "index" options = {{
            title: 'requests',
            tabBarIcon: () => {return <Text></Text>} 
        }}
        ></Tabs.Screen>
        </Tabs>
    )
}