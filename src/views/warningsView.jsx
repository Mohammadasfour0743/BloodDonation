import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Link } from "expo-router"
import Entypo from "@expo/vector-icons/Entypo"
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modal, ScrollView } from "react-native";
import PagerView from "react-native-pager-view";
import { useState } from "react";
import Dots from "react-native-dots-pagination"

export function WarningsView(props) {
  const pages = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in lectus eu erat lacinia efficitur. Morbi pretium ex sit amet dictum vehicula. Fusce sit amet vestibulum neque. Quisque volutpat luctus nunc et tempor. Integer sodales nibh at ligula pretium dictum. Aenean et ante ipsum. In commodo tellus nulla. Integer semper dignissim mauris eget sodales. In risus dui, tincidunt in accumsan et, vehicula ac ante. Aliquam erat volutpat.", "Don't Drink", "Get Sleep", "Eat Well"]
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
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
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