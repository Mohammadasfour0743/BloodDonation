import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Link } from "expo-router"
import Entypo from "@expo/vector-icons/Entypo"
import AntDesign from '@expo/vector-icons/AntDesign';


export function LoginView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Entypo
            name="mail"
            size={30}
            color="#9A4040"
            
          />
        <TextInput
          onChangeText={props.setUser}
          value={props.user}
          placeholder="Email"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
      <AntDesign name="lock1" size={30} color="#9A4040" />
        <TextInput
          onChangeText={props.setPass}
          secureTextEntry={true}
          value={props.pass}
          placeholder="Password"
          style={styles.input}
        />
      </View>

      <View style={styles.buttonView}>
        <Pressable onPress={props.login} style={styles.button}>
          <Text>Log In</Text>
        </Pressable>
      </View>
      <View style={[styles.textView, styles.redirect]}>
        <Text>Don't have an account?</Text>
        <Link href="/signup">
          <Text style={styles.link}>Sign Up</Text>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "transparent",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#9A4040",
  },
  input: {
    backgroundColor: "transparent",
    width: "50%",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    borderColor: "#9A4040",
    borderBottomWidth: 2,
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  text: {},
  textView: {
    flexDirection: "row",
    alignItem: "flex-start",
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 100,
  },
  link: {
    color: "#9A4040",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  redirect: {
    gap: 10,
    
    marginTop: 20,
  },
})
