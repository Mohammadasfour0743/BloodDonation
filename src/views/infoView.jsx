import {
  Dimensions,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import Hexagon from "../components/hexagon"

const windowWidth = Dimensions.get("window").width

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
        }}
      >
        <Pressable
          onPress={() => props.setModalVisible(false)}
          style={styles.modalContainer}
        >
          <Hexagon color="#F0F0F0" size={150} text1={props.selected}></Hexagon>
        </Pressable>
      </Modal>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={{}}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-bold",
                fontSize: 20,
                color: "#9a4040",
              }}
            >
              Can I donate?
            </Text>
          </View>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 15 }}>
              There are broad criteria for blood donation, and the conditions
              are many, but they are all unified in an{" "}
              <Text
                style={{
                  color: "#9a4040",
                  fontSize: 15,
                  textDecorationLine: "underline",
                }}
                onPress={() =>
                  Linking.openURL(
                    "https://www.aabb.org/for-donors-patients/about-blood-donation",
                  )
                }
              >
                official document from the Association for the Advancement of
                Blood & Biotherapies
              </Text>
              . However these conditions vary from one hospital to another, and
              you can get in touch with the hospital at any time for any
              clarifications.
            </Text>
          </View>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 15 }}>
              Not everyone is eligible for blood donation, there are many
              reasons why you may not be able to donate, but these reasons fall
              into two main categories: Risks to your health and/or risks to the
              health of the patient.
            </Text>
          </View>
          <View style={{ padding: 15, marginBottom: 20 }}>
            <Text style={{ fontSize: 15 }}>
              If you are not eligible to donate, it’s okay! You can always
              spread the message and encourage someone else to donate!
            </Text>
          </View>
        </View>
        <View style={{ height: 7 * (73 * 1.732) }}>
          <View style={styles.hexRow}>
            <Hexagon
              style={styles.hex1}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Hemoglobin")
              }}
              size={75}
              name="Hemoglobin"
            />
            <Hexagon
              style={styles.hex2}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Smoking")
              }}
              size={75}
              name="Smoking"
            />
            <Hexagon
              style={styles.hex3}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Dental")
              }}
              size={75}
              name="Dental"
            />
          </View>
          <View style={styles.hexRow}>
            <Hexagon
              style={styles.hex1}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Tattoo")
              }}
              size={75}
              name="Tattoo"
            />
            <Hexagon
              style={styles.hex2}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Antibiotics")
              }}
              size={75}
              name="Antibiotics"
            />
            <Hexagon
              style={styles.hex3}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Viruses")
              }}
              size={75}
              name="Viruses"
            />
          </View>
          <View style={styles.hexRow}>
            <Hexagon
              style={styles.hex1}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Weight")
              }}
              size={75}
              name="Weight"
            />
            <Hexagon
              style={styles.hex2}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Health")
              }}
              size={75}
              name="Health"
            />
            <Hexagon
              style={styles.hex3}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Surgery")
              }}
              size={75}
              name="Surgery"
            />
          </View>
          <View style={styles.hexRow}>
            <Hexagon
              style={styles.hex1}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Pregnancy")
              }}
              size={75}
              name="Pregnancy"
            />
            <Hexagon
              style={styles.hex2}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Vaccines")
              }}
              size={75}
              name="Vaccines"
            />
            <Hexagon
              style={styles.hex3}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Cholestorol")
              }}
              size={75}
              name="Cholesterol"
            />
          </View>
          <View style={styles.hexRow}>
            <Hexagon
              style={styles.hex1}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Diabetes")
              }}
              size={75}
              name="Diabetes"
            />
            <Hexagon
              style={styles.hex2}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Age")
              }}
              size={75}
              name="Age"
            />
            <Hexagon
              style={styles.hex3}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Allergies")
              }}
              size={75}
              name="Allergies"
            />
          </View>
          <View style={styles.hexRow}>
            <Hexagon
              style={styles.hex1}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Travel")
              }}
              size={75}
              name="Travel"
            />
            <Hexagon
              style={styles.hex2}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Pressure")
              }}
              size={75}
              name="Pressure"
            />
            <Hexagon
              style={styles.hex3}
              open={() => {
                props.setModalVisible(true)
                props.setSelected("Temperature")
              }}
              size={75}
              name="Temperature"
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-bold",
              fontSize: 20,
              color: "#9a4040",
            }}
          >
            How to use BloodShare
          </Text>
        </View>
        <View style={{ gap: 15, padding: 15 }}>
          <Text>
            To donate blood, check BloodShare for current requests from
            hospitals in your area. When you find a valid request, you can click
            respond and the hospital will be alerted. Use the link provided in
            the request to navigate to the hospital.{" "}
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-bold",
                fontSize: 20,
                color: "#9a4040",
              }}
            >
              Before You Donate
            </Text>
          </View>
          <Text>
            You can take a few steps to prepare yourself before your donation,
            including:{" "}
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"\u2022"} Don't forget your ID card
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"\u2022"} Eat healthy, drink lots of fluids, and stay hydrated!
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"\u2022"} Get a good night's sleep
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"\u2022"}Avoid alcohol the night before, happy hour can wait!
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"\u2022"}If you're a regular smoker, take a break for a couple of
            hours
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-bold",
              fontSize: 20,
              color: "#9a4040",
            }}
          >
            Pre-Donation Screening
          </Text>
        </View>
        <View style={{ gap: 15, padding: 15 }}>
          <Text>
            {" "}
            During pre-donation screening, a blood bank employee will ask you
            some questions about your health, lifestyle, and disease risk
            factors. All of this information is confidential.
          </Text>
          <Text>
            {" "}
            An employee will perform a short health exam, taking your pulse,
            temperature and blood pressure.
          </Text>
          <Text>
            {" "}
            A drop of blood from your finger will also be tested to ensure that
            your blood iron level is sufficient for you to donate. All medical
            equipment used for this test, as well as during the donation
            process, is sterile, used only once and then disposed.
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-bold",
              fontSize: 20,
              color: "#9a4040",
            }}
          >
            Blood Donation
          </Text>
        </View>
        <View style={{ gap: 15, padding: 15 }}>
          <Text>
            {" "}
            Once the pre-donation screening is finished, you will proceed to a
            donor bed where your arm will be cleaned with an antiseptic, and a
            professional will use a blood donation kit to draw blood from a vein
            in your arm. If you are allergic to iodine, be sure to tell the
            phlebotomist at this point.
          </Text>
          <Text>
            {" "}
            During the donation process, you will donate one unit of blood; this
            takes about{" "}
            <Text style={{ fontWeight: "bold" }}>six to ten minutes</Text>.
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-bold",
              fontSize: 20,
              color: "#9a4040",
            }}
          >
            Post-Donation
          </Text>
        </View>
        <View style={{ gap: 15, padding: 15 }}>
          <Text>
            {" "}
            After donating, it is recommended that you do the following:{" "}
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"\u2022"} Increase your fluid intake for the next{" "}
            <Text style={{ fontWeight: "bold" }}>24 hours</Text>
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"\u2022"} Avoid physical exertion or heavy lifting, especially on
            the donation arm for the next{" "}
            <Text style={{ fontWeight: "bold" }}>5 hours</Text>
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"\u2022"} Eat well balanced meals for the next
            <Text style={{ fontWeight: "bold" }}> 24 hours</Text>
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {"\u2022"} Smoking and drinking are not recommended directly after a
            donation
          </Text>
          <Text style={{ marginTop: 40 }}>
            {" "}
            If you experience discomfort or light-headed after donating, lie
            down until the feeling passes.
          </Text>
          <Text>
            If some bleeding occurs after removal of the bandage, apply pressure
            to the site and raise your arm for three to five minutes.
          </Text>
          <Text>
            If bruising or bleeding appears under the skin, apply a cold pack
            periodically to the bruised area during the first 24 hours, then
            warm, moist heat intermittently.
          </Text>
        </View>
        <View style={{ marginBottom: 100, marginLeft: 15 }}>
          <Text
            style={{
              color: "#9a4040",
              fontSize: 15,
              textDecorationLine: "underline",
              padding: 10,
              textAlign: "left",
            }}
            onPress={() => Linking.openURL("https://www.redcrossblood.org/")}
          >
            Learn more on the Red Cross website
          </Text>
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
  },
})
