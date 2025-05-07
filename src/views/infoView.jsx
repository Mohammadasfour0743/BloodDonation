import { SafeAreaView, ScrollView, StyleSheet, View, Modal, Text, Dimensions, TouchableOpacity, Pressable, Linking } from "react-native"
import Hexagon from "../components/hexagon"

const windowWidth = Dimensions.get('window').width;

export function InfoView(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Modal
              animationType="fade"
              transparent={true}
              style={{ flex: 1 }}
              visible={props.modalVisible}
              onRequestClose={() => {
                props.setModalVisible(!props.modalVisible)
              }}>
              <Pressable onPress = {()=>props.setModalVisible(false)} style = {styles.modalContainer}>
                <Hexagon color = "#F0F0F0" size={150} text1 = {props.selected}>
                </Hexagon>
              </Pressable>
              </Modal>
      <ScrollView contentContainerStyle={styles.content}>
        <View style = {{}}>
              <View style = {{justifyContent: "center", alignItems: "center", padding: 10, marginTop: 20}}><Text style = {{fontFamily: "Roboto-bold", fontSize: 20, color: "#9a4040"}}>Can I donate?</Text></View>
              <View style = {{padding: 15}}><Text style = {{fontSize: 15}}>There are broad criteria for blood donation, and the conditions are many, but they are all unified in an official document from the Association for the Advancement of Blood & Biotherapies. However these conditions vary from one hospital to another, and you can get in touch with the hospital at any time for any clarifications.</Text></View>
              <View style = {{padding: 15}}><Text style = {{fontSize: 15}}>Even though most people are eligible for blood donation, it is not the case for everyone. There are many reasons why you may not be able to donate, but these reasons fall into two main categories: Risks to your health and/or risks to the health of the patient.</Text></View>
              <View style = {{padding: 15, marginBottom: 20}}><Text style = {{fontSize: 15}}>If you are not eligible to donate, it’s okay! You can always spread the message and encourage someone else to donate!</Text></View>
        </View>
        <View style={{ height: 7 * (73 * 1.732 ), }}> 
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} open={()=>{props.setModalVisible(true); props.setSelected("Hemoglobin")}} size={75} name="Hemoglobin"/>
            <Hexagon style={styles.hex2} open={()=>{props.setModalVisible(true); props.setSelected("Smoking")}} size={75} name="Smoking"/>
            <Hexagon style={styles.hex3} open={()=>{props.setModalVisible(true); props.setSelected("Dental")}} size={75} name="Dental"/>
          </View>
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} open={()=>{props.setModalVisible(true); props.setSelected("Tattoo")}} size={75} name="Tattoo"/>
            <Hexagon style={styles.hex2} open={()=>{props.setModalVisible(true); props.setSelected("Antibiotics")}} size={75} name="Antibiotics"/>
            <Hexagon style={styles.hex3} open={()=>{props.setModalVisible(true); props.setSelected("Viruses")}} size={75} name="Viruses"/>
          </View>
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} open={()=>{props.setModalVisible(true); props.setSelected("Weight")}} size={75} name="Weight"/>
            <Hexagon style={styles.hex2} open={()=>{props.setModalVisible(true); props.setSelected("Health")}} size={75} name="Health"/>
            <Hexagon style={styles.hex3} open={()=>{props.setModalVisible(true); props.setSelected("Surgery")}} size={75} name="Surgery"/>
          </View>
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} open={()=>{props.setModalVisible(true); props.setSelected("Pregnancy")}} size={75} name="Pregnancy"/>
            <Hexagon style={styles.hex2} open={()=>{props.setModalVisible(true); props.setSelected("Vaccines")}} size={75} name="Vaccines"/>
            <Hexagon style={styles.hex3} open={()=>{props.setModalVisible(true); props.setSelected("Cholestorol")}} size={75} name="Cholesterol"/>
          </View>
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} open={()=>{props.setModalVisible(true); props.setSelected("Diabetes")}} size={75} name="Diabetes"/>
            <Hexagon style={styles.hex2} open={()=>{props.setModalVisible(true); props.setSelected("Age")}} size={75} name="Age"/>
            <Hexagon style={styles.hex3} open={()=>{props.setModalVisible(true); props.setSelected("Allergies")}} size={75} name="Allergies"/>
          </View>
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} open={()=>{props.setModalVisible(true); props.setSelected("Travel")}} size={75} name="Travel"/>
            <Hexagon style={styles.hex2} open={()=>{props.setModalVisible(true); props.setSelected("Pressure")}} size={75} name="Pressure"/>
            <Hexagon style={styles.hex3} open={()=>{props.setModalVisible(true); props.setSelected("Temperature")}} size={75} name="Temperature"/>
          </View>
        </View>
        <View style = {{justifyContent: "center", alignItems: "center", padding: 10, marginTop: 20}}>
          <Text style = {{fontFamily: "Roboto-bold", fontSize: 20, color: "#9a4040"}}>Before You Donate</Text>
        </View>
        <View style = {{gap: 15, padding: 15}}>
          <Text>To donate blood, find a blood donation facility near you using BloodShare. Then, call the facility to make an appointment. Blood can also be donated during a blood drive, which may be held at a place of business, high school or college, place of worship, community center or bloodmobile. When making the appointment, ask the following questions:</Text>
          <Text> 🩸 What kind of identification is required? (First-time donors are usually asked to present two forms of identification—the type of identification needed varies by facility).</Text>
          <Text> 🩸 If you have any particular health concerns or have traveled outside of the country, it’s also a good idea to inform the blood bank at the time you are making your appointment.</Text>
          <Text>Feel good about your decision! BloodShare sets standards to ensure patient and donor safety. Accredited facilities undergo a rigorous assessment to prove they meet the standards, which ensure optimal safety for donors and patients.</Text>
        </View>
        <View style = {{justifyContent: "center", alignItems: "center", padding: 10, marginTop: 20}}>
          <Text style = {{fontFamily: "Roboto-bold", fontSize: 20, color: "#9a4040"}}>Pre-Donation Screening</Text>
        </View>
        <View style = {{gap: 15, padding: 15}}>
          <Text> 🩸 During pre-donation screening, a blood bank employee will ask you some questions about your health, lifestyle, and disease risk factors. All of this information is confidential.</Text>
          <Text> 🩸 An employee will perform a short health exam, taking your pulse, temperature and blood pressure.</Text>
          <Text> 🩸 A drop of blood from your finger will also be tested to ensure that your blood iron level is sufficient for you to donate. All medical equipment used for this test, as well as during the donation process, is sterile, used only once and then disposed.</Text>
        </View>
        <View style = {{justifyContent: "center", alignItems: "center", padding: 10, marginTop: 20}}>
          <Text style = {{fontFamily: "Roboto-bold", fontSize: 20, color: "#9a4040"}}>Blood Donation</Text>
        </View>
        <View style = {{gap: 15, padding: 15}}>
          <Text> 🩸 Once the pre-donation screening is finished, you will proceed to a donor bed where your arm will be cleaned with an antiseptic, and a professional will use a blood donation kit to draw blood from a vein in your arm. If you are allergic to iodine, be sure to tell the phlebotomist at this point.</Text>
          <Text> 🩸 During the donation process, you will donate one unit of blood; this takes about six to ten minutes.</Text>
        </View>
        <View style = {{justifyContent: "center", alignItems: "center", padding: 10, marginTop: 20}}>
          <Text style = {{fontFamily: "Roboto-bold", fontSize: 20, color: "#9a4040"}}>Post-Donation</Text>
        </View>
        <View style = {{gap: 15, padding: 15}}>
          <Text> 🩸 Following your donation, you will receive refreshments in the canteen area, where you can stay until you feel strong enough to leave.</Text>
          <Text> 🩸 After donating, it is recommended that you increase your fluid intake for the next 24 to 48 hours; avoid strenuous physical exertion, heavy lifting or pulling with the donation arm for about five hours; and eat well balanced meals for the next 24 hours. After donating, smoking and alcohol consumption is not recommended.</Text>
          <Text> 🩸 Although donors seldom experience discomfort after donating, if you feel light-headed, lie down until the feeling passes. If some bleeding occurs after removal of the bandage, apply pressure to the site and raise your arm for three to five minutes. If bruising or bleeding appears under the skin, apply a cold pack periodically to the bruised area during the first 24 hours, then warm, moist heat intermittently.</Text>
        </View>
        <View style = {{marginLeft: 15, marginBottom: 10}}>
          <Text style = {{fontFamily: "Roboto-bold", fontSize: 15, color: "#9a4040"}}>Criteria for Blood Donor Selection is according to Association for the Advancement of Blood & Biotherapies</Text>
        </View>
        <View style = {{marginBottom: 30, marginLeft: 15}}>
          <Text style = {{color: "#9a4040", fontSize: 15, textDecorationLine: "underline"}} onPress={() => Linking.openURL("https://www.aabb.org/for-donors-patients/about-blood-donation")}>Learn more</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    marginLeft: (3 / 7) * windowWidth - 166.14,
  },
  hexRow: {
    maxHeight: 75 * 1.732 + 1,
    position: "relative",
    flex: 1,
    flexDirection: "row",
  },
  hex1: {
    position: "absolute",
    top: 65,
    left: 4,
  },
  hex2: {
    position: "absolute",
    left: 120,
  },
  hex3: {
    position: "absolute",
    top: 65,
    left: 236,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
