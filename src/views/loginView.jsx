import { Pressable, Text, View, StyleSheet } from "react-native"

export function LoginView(props) {
  return (
    <View style = {styles.container}>
      <Pressable onPress={props.login} style = {styles.button}>
        <Text>Login</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: "#780000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
    },
})