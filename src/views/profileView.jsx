import { Pressable, StyleSheet, Text, View, TextInput} from "react-native"
import {Link} from "expo-router"
import { logOut } from "../app/firebasemodel"

export function ProfileView(props) {
  return (
   
  <View style={styles.container}>
     <View style = {styles.title}>
     <View>
        <Text style = {{fontFamily: "Roboto-Bold", fontSize: 20,}}>User Profile</Text>
     </View>
     </View>
     <View style = {styles.button}>
        <Pressable onPress={props.edit}>
            <Text>Edit Profile</Text>
        </Pressable>
    </View>

    <View style = {styles.fix}>
    <View>
        <Text>Name: {props.user.name??""}</Text>
     </View>
     <View>
        <Text>Email: {props.user.email??""}</Text>
     </View>
     <View>
        <Text>Phone Number: {props.user.phonenumber??""}</Text>
     </View>
    <View>
        <Text>Blood Type: {props.user.bloodtype??""}</Text>
     </View>
    </View>

    <View style = {styles.log}>
        <Pressable onPress={logOut()}>
            <Text>Log Out</Text>
        </Pressable>
    </View>

  </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9e4e4",
    position: "relative",
    flex: 1,
  
    
  },
  title: {
    backgroundColor: "#f9e4e4",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between", 
    padding: "25",
    position: "absolute",
    right: 130,
    top: 50,
  },

  button: {
    position: "absolute",
    top: 25,
    left: 275,
    borderWidth: 2,
    padding: 3,
    borderRadius: 8,
  
  },

  fix: {
    position: "absolute",
    flex: 1,
    alignContent: "center",
    top: 250,
    left: 50,
    gap: 25,
  },

  log: {
    position: "absolute",
    flex: 1,
    alignContent: "center",
    top: 600,
    left: 175,
    borderWidth: 2,
    padding: 8,
    borderRadius: 8,
  },



})
