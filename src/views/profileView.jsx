import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link } from "expo-router"
import Entypo from "@expo/vector-icons/Entypo"
import Feather from "@expo/vector-icons/Feather"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

import { logOut } from "../app/firebasemodel"

export function ProfileView(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={[
            styles.logout,
            {
              flexDirection: "row",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text
            style={{
              marginLeft: 10,
              alignSelf: "flex-start",
              fontFamily: "Roboto-bold",
              fontSize: 28,
              color: "#9a4040",
            }}
          >
            Profile
          </Text>
          <Pressable onPress={[props.logout]}>
            <MaterialIcons name="logout" size={40} color="#9A4040" />
          </Pressable>
        </View>
        <View style={styles.profileIcon}>
          <View style={styles.bloodType}>
            <View style={styles.type}>
              <Text
                style={{
                  color: "white",
                  fontSize: 55,
                  fontFamily: "Roboto-Medium",
                }}
              >
                {props.selected}
              </Text>
            </View>
            {props.edit && (
              <Pressable
                style={{
                  alignSelf: "flex-end",
                  marginTop: -150,
                  paddingBottom: 130,
                }}
                onPress={() => {
                  props.setEdit2(!props.edit2)
                }}
              >
                <MaterialCommunityIcons
                  name="pencil-circle"
                  size={40}
                  color="black"
                  backgroundColor="white"
                  borderRadius={80}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
      {
        <View style={{ flex: 1 }}>
          {props.edit2 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <SelectList
                  boxStyles={{
                    width: "50%",
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

              <View style={[styles.saveButton, { marginBottom: 80 }]}>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 15,
                  }}
                  onPress={props.saveBlood}
                >
                  <Text style={{ color: "white", fontFamily: "Roboto-Medium" }}>
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={props.edit ? styles.indonor : styles.donor}>
                <TextInput
                  editable={props.edit}
                  placeholder="Insert Name"
                  style={styles.donorText}
                  placeholderTextColor={"gray"}
                  onChangeText={props.setName}
                  value={props.username}
                ></TextInput>
              </View>
              <View style={styles.title}>
                <View>
                  <Text style={styles.personal}>Personal Information</Text>
                </View>
                <View style={props.edit ? styles.input : styles.unput}>
                  <Entypo
                    name="mail"
                    size={30}
                    color="#9A4040"
                    style={{ marginHorizontal: 10 }}
                  />
                  <TextInput
                    editable={props.edit}
                    placeholder="Email address"
                    placeholderTextColor={"gray"}
                    onChangeText={props.setEmail}
                    value={props.email}
                    style={{ width: "100%" }}
                  ></TextInput>
                </View>
                <View style={props.edit ? styles.input : styles.unput}>
                  <Feather
                    name="phone"
                    size={30}
                    color="#9A4040"
                    style={{ marginHorizontal: 10 }}
                  />
                  <TextInput
                    editable={props.edit}
                    placeholder="Phone number"
                    placeholderTextColor={"gray"}
                    inputMode="tel"
                    onChangeText={props.setPhone}
                    style={{ width: "100%" }}
                    value={props.phone}
                  />
                </View>
                {props.edit ? (
                  <View style={{ flex: 1, gap: 10 }}>
                    <View style={styles.saveButton}>
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 15,
                        }}
                        onPress={props.save}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Roboto-Medium",
                          }}
                        >
                          Save Changes
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={{ flex: 1, gap: 10 }}>
                    <View style={styles.saveButton}>
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 15,
                        }}
                        onPress={props.setEdit}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Roboto-Medium",
                          }}
                        >
                          Edit Profile
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              {!props.edit && (
                <View style={styles.footerButtons}>
                  <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() =>
                      Linking.openURL("https://teamsigmoidwebsite.vercel.app/")
                    }
                  >
                    <Text style={styles.footerButtonText}>
                      Contact Us/Report a Bug
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      }
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
    justifyContent: "center",
    alignItems: "center",
  },

  type: {
    backgroundColor: "#9A4040",
    borderRadius: 1000,
    width: 140,
    height: 140,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  donor: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },

  indonor: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "80%",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#9A4040",
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
    width: "80%",
    gap: 10,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#9A4040",
  },
  unput: {
    flexDirection: "row",
    width: "80%",
    gap: 10,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  saveButton: {
    alignSelf: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#9A4040",
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
