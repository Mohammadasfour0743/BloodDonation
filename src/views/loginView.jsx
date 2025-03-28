import { Pressable, Text, View } from "react-native"

export function LoginView(props) {
  return (
    <View>
      <Pressable onPress={props.login}>
        <Text>Login</Text>
      </Pressable>
    </View>
  )
}
