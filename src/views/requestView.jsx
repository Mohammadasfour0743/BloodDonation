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
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Current Requests</Text>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.visible}
          onRequestClose={() => {
            props.setVisible(!props.visible)
          }}
        >
          <View style={styles.modal}>
            <Text>{"asdasda" ?? ""}</Text>
            <Text>
              Urgency: {props.current?.urgency ?? ""}, Blood Type:{" "}
              {props.current?.bloodType ?? ""}
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                props.setVisible(false)
              }}
            >
              <Text>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </View>

      <FlatList
        style={styles.container}
        renderItem={(element) => {
          const req = element.item
          return (
            <View>
              <Pressable
                onPress={() => {
                  props.setCurrent(req)
                  props.setVisible(true)
                }}
              >
                <Text>{req.hospitalId}</Text>
                <Text>
                  Urgency: {req.urgency}, Blood Type: {req.bloodType}
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
    backgroundColor: "#780000",
  },
  modal: {
    maxHeight: Dimensions.get("window").height - 500,
  },
  button: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
})
