import { SafeAreaView, ScrollView, StyleSheet, View, Modal, Text } from "react-native"
import Hexagon from "../components/hexagon"

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
              <View style = {styles.modalContainer}>
                <Hexagon color = "white" size={180}></Hexagon>
              </View>
              </Modal>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={{ height: 7 * (75 * 1.732 + 32) }}> 
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} open={()=>props.setModalVisible(true)} size={75} name="Hemoglobin"/>
            <Hexagon style={styles.hex2} size={75} name="Smoking"/>
            <Hexagon style={styles.hex3} size={75} name="Dental"/>
          </View>
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} size={75} name="Tattoo"/>
            <Hexagon style={styles.hex2} size={75} name="Antibiotics"/>
            <Hexagon style={styles.hex3} size={75} name="Viruses"/>
          </View>
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} size={75} name="Weight"/>
            <Hexagon style={styles.hex2} size={75} name="Health"/>
            <Hexagon style={styles.hex3} size={75} name="Surgery"/>
          </View>
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} size={75} name="Pregnancy"/>
            <Hexagon style={styles.hex2} size={75} name="Vaccines"/>
            <Hexagon style={styles.hex3} size={75} name="Cholestorol"/>
          </View>
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} size={75} name="Diabetes"/>
            <Hexagon style={styles.hex2} size={75} name="Age"/>
            <Hexagon style={styles.hex3} size={75} name="Allergies"/>
          </View>
          <View style={styles.hexRow}>
            <Hexagon style={styles.hex1} size={75} name="Travel"/>
            <Hexagon style={styles.hex2} size={75} name="Pressure"/>
            <Hexagon style={styles.hex3} size={75} name="Temperature"/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flexGrow: 1,
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
    right: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
