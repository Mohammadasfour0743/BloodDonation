import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Link } from "expo-router"
import Entypo from "@expo/vector-icons/Entypo"
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modal, ScrollView } from "react-native";
import PagerView from "react-native-pager-view";
import { useState } from "react";
import Dots from "react-native-dots-pagination"

export function WarningsView(props) {
  const pages = [
    "⚠️ Welcome to BloodShare, a real-time blood donation application. The safety of patients is our top priority, that is why we will ask you to review the following information carefully",
    "Thank you for considering donating blood💉🩸!                                  Please note that you should be at least 16 years old and weigh at least 50kg. You also need to be in good general health and feel well on the day of donation. Also, recent travel to certain countries or taking certain medications may affect your eligibility",
    "🚫Restrictions:                                                 If you’ve ever been diagnosed with HIV, hepatitis, or certain infections like syphilis, unfortunately, you won’t be eligible to donate. It is also very important to be upfront about your medical history!",
    "💧 After donating, drink fluids for 24–48 hours, avoid heavy activity for 5 hours, eat well, and lie down if you feel dizzy.",
    "🔒 By continuing, you confirm you’ve read and accepted these guidelines."
  ]
  return (
    <View style={styles.container}>
      
        <PagerView style={styles.pager} initialPage={0} scrollEnabled={true} onPageSelected={(e) => props.setPage(e.nativeEvent.position)}>
        {pages.map((text, index) => (
          <View style={styles.page} key={index.toString()}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.text}>{text}</Text>
            </ScrollView>
            {
              (index==pages.length - 1) && (<TouchableOpacity onPress = {props.continue} style = {styles.button}>
                <Text style = {{color: "white", fontFamily: "Roboto-Medium"}}>Continue</Text>
                </TouchableOpacity>)
            }
          </View>
        ))} 
        </PagerView>
        <View style={styles.dots}>
          <Dots length={pages.length } active={props.page} activeColor="#9A4040"/>
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",

  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 27,
    fontWeight: "600",
    textAlign: "center",
    color: "#780000"
  },

  button: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    alignSelf: "flex-end",
    marginHorizontal: 20,
    backgroundColor: "#9A4040",
  },

  dots: {

  }
})