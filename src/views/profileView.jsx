import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import { Link } from "expo-router"
import Entypo from "@expo/vector-icons/Entypo"
import Feather from "@expo/vector-icons/Feather"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { Linking } from "react-native"

import { logOut } from "../app/firebasemodel"
import { SafeAreaView } from "react-native-safe-area-context"

export function ProfileView(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.logout}>
          <Pressable onPress={props.logout}>
            <MaterialIcons name="logout" size={40} color="#9A4040" />
          </Pressable>
        </View>
        <View style={styles.profileIcon}>
          <MaterialIcons name="account-circle" size={140} color="black" />
          <View style={styles.bloodType}>
            <View style={styles.type}>
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontFamily: "Roboto-Medium",
                }}
              >
                {props.selected}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.donor}>
          <TextInput
            editable={props.edit}
            placeholder="Donor Name"
            style={styles.donorText}
            onChangeText={props.setName}
            value={props.username}
          ></TextInput>
          <Pressable
            onPress={() => {
              props.setEdit(!props.edit)
            }}
          >
            <Entypo name="edit" size={30} color="black" />
          </Pressable>
        </View>
      </View>

      <View style={styles.title}>
        <View>
          <Text style={styles.personal}>Personal Information</Text>
        </View>
        <View style={styles.input}>
          <Entypo
            name="mail"
            size={30}
            color="#9A4040"
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            editable={props.edit}
            placeholder="Email address"
            onChangeText={props.setEmail}
            value={props.email}
            style={{ width: "100%" }}
          ></TextInput>
        </View>
        <View style={styles.input}>
          <Feather
            name="phone"
            size={30}
            color="#9A4040"
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            editable={props.edit}
            placeholder="Phone number"
            inputMode="tel"
            onChangeText={props.setPhone}
            style={{ width: "100%" }}
            value={props.phone}
          />
        </View>
        {props.edit && (
          <View style = {{flex: 1, gap: 10,}}>
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
               <View style = {styles.saveButton}>
        <TouchableOpacity style = {{justifyContent: "center", alignItems: "center", padding: 15}} onPress = {props.save}>
            <Text style = {{color: "white", fontFamily: "Roboto-Medium"}}>Save Changes</Text>
        </TouchableOpacity>
      </View>
          </View>
        )}
      </View>
      <View style={styles.footerButtons}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => Linking.openURL("https://teamsigmoidwebsite.vercel.app/")}
        >
          <Text style={styles.footerButtonText}>Contact Us/Report a Bug</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logout: {
    alignItems: "flex-end",
    padding: 10,
  },

  profileIcon: {
    alignItems: "center",
    justifyContent: "center",
    postion: "relative",
  },

  bloodType: {
    position: "absolute",
    top: 70,
    right: 135,
  },

  type: {
    backgroundColor: "#9A4040",
    borderRadius: 1000,
    width: 65,
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  donor: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  donorText: {
    fontSize: 35,
    color: "#9A4040",
    fontFamily: "Roboto-Bold",
  },

  title: {
    gap: 10,
    flex: 1,
    marginHorizontal: 40,
    marginVertical: 25,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  personal: {
    fontSize: 20,
    color: "black",
    fontFamily: "Roboto-Medium",
  },

  input: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#9A4040",
  },

  saveButton: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#9A4040"
  },

  footerButtons: {
       flexDirection: "row",
       justifyContent: "space-around",
       paddingVertical: 60,
       marginHorizontal: 40,
     },
     footerButton: {
       backgroundColor: "#9A4040",
       paddingVertical: 12,
       paddingHorizontal: 24,
       borderRadius: 25,
     },
     footerButtonText: {
       color: "white",
       fontSize: 16,
       fontFamily: "Roboto-Medium",
       textAlign: "center",
     },
})
