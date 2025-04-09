import { Pressable, StyleSheet, Text, View, TextInput} from "react-native"
import {Link} from "expo-router"

export function ProfileView(props) {
  return (
   
  <View style={styles.container}>
     <View style = {styles.title}>
     <View>
        <Text style = {{fontFamily: "Roboto-Bold", fontSize: 20,}}>User Profile</Text>
     </View>
     </View>
     <View style = {styles.button}>
        <Pressable>
            <Text>Edit Profile</Text>
        </Pressable>
    </View>

    <View style = {style.f}>
    <View>
        <Text>Name</Text>
     </View>
     <View>
        <Text>Contact Info</Text>
     </View>
    <View>
        <Text>Blood Type</Text>
     </View>
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
  
  },

})
