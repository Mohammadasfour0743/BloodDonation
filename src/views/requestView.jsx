import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export function RequestView(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Current Requests</Text>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          style={{ flex: 1 }}
          visible={props.visible}
          onRequestClose={() => {
            props.setVisible(!props.visible)
          }}
        >
          <View style={styles.close}>
            <Pressable
              style={{ flex: 1 }}
              onPress={() => {
                props.setVisible(false)
              }}
            ></Pressable>
          </View>
          <View style={styles.modal}>
            {props.current?.urgency && (
              <View style={styles.urgentRequest}>
                <Text style={styles.urgentText}>URGENT</Text>
              </View>
            )}
            <Text style={styles.requestTitle}>
              {props.current?.hospitalId ?? ""}
            </Text>
            <View style={styles.hospitalDetails}>
              <Text style={styles.detailsText}>
                Location: {props.current?.location ?? ""}
              </Text>
              <Text style={styles.detailsText}>
                Blood Type: {props.current?.bloodType ?? ""}
              </Text>
              <Text style={styles.detailsText}>
                Amount: {props.current?.amount ?? ""}
              </Text>
            </View>
            <View style={styles.contactDetails}>
              <Text style={{ fontSize: 17, fontFamily: "Roboto-Bold" }}>
                Contact Hospital
              </Text>
              <Text style={styles.detailsText}>
                {props.current?.email ?? ""}
              </Text>
              <Text style={styles.detailsText}>
                {props.current?.phoneNumber ?? ""}
              </Text>
            </View>

            <Pressable
              style={styles.button}
              onPress={() => {
                props.setVisible(false)
              }}
            >
              <Text style={{ fontFamily: "Roboto-Bold" }}>Respond</Text>
            </Pressable>
          </View>
        </Modal>
      </View>

      <FlatList
        renderItem={(element) => {
          const req = element.item
          return (
            <View>
              <Pressable
                style={styles.requestContainer}
                onPress={() => {
                  props.setCurrent(req)
                  props.setVisible(true)
                }}
              >
                {req.urgency && (
                  <View style={styles.urgent}>
                    <Text style={{ fontFamily: "Roboto-Medium" }}>URGENT</Text>
                  </View>
                )}
                <Text style={styles.requestText}>{req.hospitalId}</Text>
                <Text style={styles.separator}>{"\u2B24"}</Text>
                <Text style={styles.requestText}>
                  Blood Type: {req.bloodType}
                </Text>
              </Pressable>
            </View>
          )
        }}
        data={props.requestsArray}
        keyExtractor={(element) => {
          return element.id
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  title: {
    color: "#9A4040",
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },

  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modal: {
    maxHeight: Dimensions.get("window").height / 2,
    backgroundColor: "#D3C2C2",
    flex: 1,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    position: "relative",
  },

  close: {
    maxHeight: Dimensions.get("window").height / 2,
    flex: 1,
  },

  button: {
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#FFEE93",
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
  },

  requestContainer: {
    backgroundColor: "#9A4040",
    borderRadius: 8,
    padding: 15,
    marginVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },

  requestText: {
    color: "white",
    fontSize: 14,
    marginHorizontal: 12,
    fontFamily: "Roboto-Medium",
  },

  separator: {
    color: "white",
    fontSize: 10,
  },

  urgent: {
    backgroundColor: "#D3C2C2",
    padding: 4,
    borderRadius: 4,
    position: "absolute",
    left: "10",
    top: "-5",
  },

  urgentRequest: {
    backgroundColor: "#9A4040",
    padding: 4,
    borderRadius: 4,
    position: "absolute",
    left: "15",
    top: "15",
  },

  urgentText: {
    color: "white",
    fontSize: 14,
    fontWeight: 45,
    fontFamily: "Roboto-Medium",
  },

  requestTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: 100,
    fontFamily: "Roboto-Bold",
  },

  hospitalDetails: {
    color: "black",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 6,
    position: "absolute",
    top: 75,
    left: 60,
  },

  detailsText: {
    fontSize: 14,
    fontWeight: 100,
    fontFamily: "Roboto-Medium",
  },

  contactDetails: {
    color: "black",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 6,
    position: "absolute",
    bottom: 10,
    left: 35,
  },
})
