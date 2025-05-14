import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import { Link } from "expo-router"
import AntDesign from "@expo/vector-icons/AntDesign"
import Entypo from "@expo/vector-icons/Entypo"

export function SignupView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Entypo name="mail" size={30} color="#9A4040" />
        <TextInput
          onChangeText={props.setUser}
          value={props.user}
          placeholderTextColor={"gray"}
          placeholder=" Enter Email"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="lock1" size={30} color="#9A4040" />
        <TextInput
          onChangeText={props.setPass}
          secureTextEntry={true}
          placeholderTextColor={"gray"}
          value={props.pass}
          placeholder="Choose Password"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <AntDesign name="lock1" size={30} color="green" />
        <TextInput
          onChangeText={props.setPass2}
          secureTextEntry={true}
          placeholderTextColor={"gray"}
          value={props.pass2}
          placeholder="Confirm Password"
          style={styles.input}
        />
      </View>

      <View style={{ justifyContent: "center", padding: 15 }}>
        <SelectList
          boxStyles={{
            width: "100%",
            borderColor: "#9A4040",
            borderWidth: 2,
            borderRadius: 12,
          }}
          dropdownStyles={{
            width: "100%",
            borderColor: "#9A4040",
            borderWidth: 2,
          }}
          placeholder="Select Blood Type"
          search={false}
          setSelected={props.setSelected}
          data={[
            { key: "A+", value: "A RhD positive (A+)" },
            { key: "A-", value: "A RhD negative (A-)" },
            { key: "B+", value: "B RhD positive (B+)" },
            { key: "B-", value: "B RhD negative (B-)" },
            { key: "O+", value: "O RhD positive (O+)" },
            { key: "O-", value: "O RhD negative (O-)" },
            { key: "AB+", value: "AB RhD positive (AB+)" },
            { key: "AB-", value: "AB RhD negative (AB-)" },
            { key: "N/A", value: "Don't Know" },
          ]}
          save="key"
        />
      </View>
      {props.errorMsg ? (
        <Text style={styles.errorMsg}>{props.errorMsg}</Text>
      ) : null}

      <View style={styles.buttonView}>
        <TouchableOpacity onPress={props.login} style={styles.button}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.textView, styles.redirect]}>
        <Text>Already have an account?</Text>
        <Link href="/login">
          <Text style={styles.link}>Sign In</Text>
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
  errorMsg: {
    color: "#FF4D4D",
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 10,
    marginBottom: -5,
  },
})
