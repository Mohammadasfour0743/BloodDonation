import { Pressable, StyleSheet, Text, View, TextInput} from "react-native"
import {Link} from "expo-router"

export function SignupView(props) {
  return (
   
  <View style={styles.container}>
    <View style = {styles.textView}>
      <Text style = {styles.text}>Choose Username</Text>
    </View>
    <View style = {styles.inputContainer}>
      <TextInput 
      onChangeText={props.setUser} 
      value = {props.user} 
      placeholder="Username"
      style = {styles.input}
      />
    </View>
    <View style = {styles.textView}>
      <Text style = {styles.text}>Choose Password</Text>
    </View>
    <View style = {styles.inputContainer}>
      <TextInput 
      onChangeText= {props.setPass}
      value = {props.pass} 
      placeholder="Password"
      style = {styles.input}/>
    </View>
    <View style = {styles.textView}>
      <Text style = {styles.text}>Confirm Password</Text>
    </View>
    <View style = {styles.inputContainer}>
      <TextInput 
      onChangeText= {props.setPass2}
      value = {props.pass2} 
      placeholder="Confirm Password"
      style = {styles.input}/>
    </View>

    <View style = {styles.buttonView}>
    <Pressable onPress={props.login} style={styles.button}>
        <Text>Sign Up</Text>
    </Pressable>
    </View>
    <View style={[styles.textView, styles.redirect]}>
          <Text >Already have an account?</Text>
          <Link href="/">
            <Text style={styles.link}>Sign In</Text>
          </Link>
        </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f9e4e4",
      flex: 1,
      justifyContent: "center",
      
    },
    button: {
      flex:1,
      borderWidth: 2,
      borderRadius: 10,
      backgroundColor:"#d9d9d9",
  
      padding: 8,
      alignItems: "center",
      justifyContent: "center",
    
    },
    input: {
      padding:10,
      backgroundColor:"#d9d9d9",
      borderWidth: 1,
      width: "50%",
      borderRadius: 5,
      flex: 1,
    },
    inputContainer: {
      flexDirection: "row",
      padding: 20, 
    },
    text: {
  
    },
    textView: {
      flexDirection: "row",
      alignContent: "flex-start",
      marginHorizontal: 20
    },
    buttonView: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 100,
    },
    link: {
      color: "#6c5ce7",
      textDecorationStyle: "solid",
      textDecorationLine: "underline",
    },
    redirect: {
      gap: 10,
      marginStart: 100,
      marginTop: 20,
    },
  })
  