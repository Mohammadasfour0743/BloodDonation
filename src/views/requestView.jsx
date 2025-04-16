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
import { BlurView } from "expo-blur"
import { Observer, observer } from "mobx-react-lite"

export const RequestView = observer(function RequestRender(props) {
  console.log(
    "RequestView rendering with data:",
    props.requestsArray?.length || 0,
    "items",
  )
  const ModelContent = observer(() => {
    return (
      <View style={styles.modal}>
        {props.current?.urgency && (
          <View style={styles.urgentRequest}>
            <Text style={styles.urgentText}>URGENT</Text>
          </View>
        )}

        <Text style={styles.requestTitle}>
          {props.current?.hospitalName ?? "Hospital name"}
        </Text>
        <View style={styles.hospitalDetails}>
          <Text style={{ fontSize: 17, fontFamily: "Roboto-Bold" }}>
            Hospital Details:
          </Text>
          <Text style={styles.detailsText}>
            Location: {props.current?.location ?? "kista"}
          </Text>
          <Text style={styles.detailsText}>
            Blood Type: {props.current?.bloodTypes.join(", ") ?? ""}
          </Text>
          <Text style={styles.detailsText}>
            Amount: {props.current?.amount ?? ""}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Roboto-Bold",
            position: "absolute",
            top: 190,
            left: 35,
          }}
        >
          Notes:
        </Text>
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.detailsText}>
            {props.current?.description ?? ""}
          </Text>
        </ScrollView>
        <View style={styles.contactDetails}>
          <Text style={{ fontSize: 17, fontFamily: "Roboto-Bold" }}>
            Contact Hospital
          </Text>
          <Text style={styles.detailsText}>
            {props.current?.email ?? "test@email.se.co.org"}
          </Text>
          <Text style={styles.detailsText}>
            {props.current?.phoneNumber ?? "5441 243563"}
          </Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            props.setVisible(false)
            props.setResponded(true)
          }}
        >
          <Text style={{ fontFamily: "Roboto-Bold" }}>Respond</Text>
        </Pressable>
      </View>
    )
  })
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
        visible={props.responded}
        onRequestClose={() => {
          props.setResponded(!props.responded)
        }}
      >
      <BlurView style = {{flex:1, justifyContent: "center", alignItems: "center"}}>
        <View style = {{borderWidth: 2, borderRadius: 15, padding: 10, margin: 8, borderColor: "#9A4040", flex: 1, maxWidth: 400, maxHeight: 200, justifyContent: "space-around", alignItems: "center", backgroundColor: "white", gap: 10}}>
          <View>
            <Text style = {{fontFamily: "Roboto-Bold", color: "#9A4040", fontSize: 20,}}>Important!</Text>
          </View>
          <View style = {{padding: 5}}>
            <Text>It is recommended to wait 8 weeks between blood donations. If you have donated blood within the last 8 weeks, please wait before donating again.</Text>
          </View>
          <View style = {{justifyContent: "space-around", flex: 1, alignItems: "center", flexDirection: "row"}}>
            <View  style = {{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Pressable style = {{padding: 10}} onPress = {() => props.setResponded(false)}>
              <Text style = {{color: "#4285F4", fontFamily: "roboto-medium"}}>Cancel</Text>
            </Pressable>
            </View>
            <View  style = {{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Pressable style = {{backgroundColor: "#FFEE93", padding: 10, borderRadius: 8}} onPress = {props.donate}>
              <Text style = {{fontFamily: "roboto-bold"}}>I can donate!</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </BlurView>
      </Modal>
      </View>
      <View style={{flex:1}}>
      <Modal
        animationType="slide"
        transparent={true}
        style={{ flex: 1 }}
        visible={props.visible}
        onRequestClose={() => {
          props.setVisible(!props.visible)
        }}
      >
        <BlurView intensity={8} style={styles.close}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              props.setVisible(false)
            }}
          ></Pressable>
        </BlurView>
        <Observer>{() => <ModelContent />}</Observer>
      </Modal>

      <FlatList
      contentContainerStyle={{}}
        renderItem={(element) => {
          const req = element.item
          return (
            <Observer>
              {() => (
                <View>
                  <Pressable
                    style = {props.isPress && req.id == props.current.id ? styles.requestContainerSelected : styles.requestContainer}
                    onPress={() => {
                      props.setIsPress(true)
                      props.setCurrent(req)
                      props.setVisible(true)
                    }}
                  >
                    {req.urgency && (
                      <View style={styles.urgent}>
                        <Text style={{ fontFamily: "Roboto-Medium" }}>
                          URGENT
                        </Text>
                      </View>
                    )}
                    <View style = {{maxWidth: 180, flexDirection: "row", flex: 1}}>
                    <Text style = {props.isPress && req.id == props.current.id ? styles.requestTextSelected : styles.requestText}>
                      {req.hospitalName ?? "Hospital name"}
                    </Text>
                    </View>
                    <View style = {{}}>
                    <Text style={props.isPress && req.id == props.current.id ? styles.separatorSelected: styles.separator}>{"\u2B24"}</Text>
                    </View>
                    <View style = {{maxWidth: 220, flexDirection: "row", flex: 1}}>
                    <Text style={props.isPress && req.id == props.current.id ? styles.requestTextSelected : styles.requestText}>
                      Blood Type: {req.bloodTypes.join(", ")}
                    </Text>
                    </View>
                  </Pressable>
                </View>
              )}
            </Observer>
          )
        }}
        data={props.requestsArray}
        keyExtractor={(element) => {
          return element.id
        }}
      />
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
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
    maxHeight: Dimensions.get("window").height * 0.6,
    backgroundColor: "#D3C2C2",
    flex: 1,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
  },

  close: {
    maxHeight: Dimensions.get("window").height * 0.5,
    flex: 0.7,
  },

  button: {
    width: "90%",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#FFEE93",
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    margin: "auto",
  },

  requestContainer: {
    borderColor: "#9A4040",
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    borderWidth: 2,
    padding: 15,
    marginVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },

  requestText: {
    color: "black",
    fontSize: 14,
    marginHorizontal: 12,
    fontFamily: "Roboto-Medium",
  },

  separator: {
    color: "black",
    fontSize: 10,
    padding: 2,
  },

  urgent: {
    backgroundColor: "#D3C2C2",
    padding: 4,
    borderRadius: 4,
    position: "absolute",
    left: 10,
    top: -12,
  },

  urgentRequest: {
    backgroundColor: "#9A4040",
    padding: 4,
    borderRadius: 4,
    position: "absolute",
    left: 15,
    top: 15,
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
    flex: 1,
    color: "black",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 6,
    position: "absolute",
    top: 65,
    left: 35,
  },

  detailsText: {
    fontSize: 14,
    fontWeight: 100,
    fontFamily: "Roboto-Medium",
  },

  contactDetails: {
    flex: 1,
    color: "black",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 6,
    position: "absolute",
    bottom: 110,
    left: 35,
  },
  detailsContainer: {
    alignSelf: "center",
    flex: 1,
    borderWidth: 0,
    borderRadius: 8,
    position: "absolute",
    top: 220,
    maxHeight: 100,
    maxWidth: 340,
    left: 35,
  },

  requestContainerSelected: {
    backgroundColor: "#9A4040", 
    borderRadius: 8,
    padding: 15,
    marginVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },

  requestTextSelected: {
    color: "white",
    fontSize: 14,
    marginHorizontal: 12,
    fontFamily: "Roboto-Medium",
  },

  separatorSelected: {
    color: "white",
    fontSize: 10,
    padding: 2,

  },
})
