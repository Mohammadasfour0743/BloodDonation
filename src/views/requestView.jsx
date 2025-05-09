import { useEffect, useState } from "react"
import {
  ActivityIndicator,
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
import { isLoaded, isLoading } from "expo-font"
import Ionicons from "@expo/vector-icons/Ionicons"
import { getAuth } from "firebase/auth"
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore"
import { Observer, observer } from "mobx-react-lite"

import { getBoundingBox, getCurrentLocation } from "../app/firebasemodel"

export const RequestView = observer(function RequestRender(props) {
  const [hasClicked, setHasClicked] = useState(false)
  const [alreadyResponded, setAlreadyResponded] = useState({})
  //const [alreadyResponded, setAlreadyResponded] = useState(false)
  const [tab, setTab] = useState("RELEVANT")
  const [filteredRequests, setFilteredRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [urgentSelected, setUrgentSelected] = useState(false)

  // console.log('RequestView rendering with data:', props.requestsArray?.length || 0, 'items');

  useEffect(() => {
    // Create an async function inside useEffect

    async function filterData() {
      setLoading(true)

      try {
        const location = await getCurrentLocation()

        const { latMin, latMax, lngMin, lngMax } = getBoundingBox(
          location.coords.latitude,
          location.coords.longitude,
          50,
        )

        const timedreq = [...props.requestsArray].sort(
          (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0),
        )
        const filtered = []

        for (const element of timedreq) {
          if (tab === "RELEVANT") {
            if (
              element.latitude > latMin &&
              element.latitude < latMax &&
              element.longitude < lngMax &&
              element.longitude > lngMin &&
              (!props.bloodType == "N/A"
                ? element.bloodTypes.includes(props.bloodType)
                : true) &&
              (urgentSelected ? element.urgency : true)
            ) {
              filtered.push(element)
            }
          } else if (tab === "URGENT") {
            if (element.urgency && (urgentSelected ? element.urgency : true)) {
              filtered.push(element)
            }
          } else {
            if (urgentSelected ? element.urgency : true) filtered.push(element)
          }
        }

        setFilteredRequests(filtered)
      } catch (error) {
        console.error("Error filtering requests:", error)
      } finally {
        setLoading(false)
      }
    }

    filterData()
  }, [props.requestsArray, props.bloodType, tab, urgentSelected])

  useEffect(() => {
    const checkIfResponded = async () => {
      const db = getFirestore()
      const user = getAuth().currentUser

      if (!user || !props.current) return

      const responseRef = doc(
        db,
        "responses",
        `${user.uid}_${props.current.id}`,
      )
      const responseDoc = await getDoc(responseRef)

      if (responseDoc.exists()) {
        setAlreadyResponded((prev) => ({
          ...prev,
          [props.current.id]: true,
        }))
      }
    }
    checkIfResponded()
  }, [props.current])

  const handleRespond = async () => {
    if (!props.current || alreadyResponded[props.current.id]) return

    try {
      const db = getFirestore()
      const user = getAuth().currentUser

      const responseRef = doc(
        db,
        "responses",
        `${user.uid}_${props.current.id}`,
      )

      await setDoc(responseRef, {
        userId: user.uid,
        requestId: props.current.id,
        respondedAt: new Date().toString(),
      })

      setAlreadyResponded((prev) => ({
        ...prev,
        [props.current.id]: true,
      }))

      console.log("Response stored!")
      props.setVisible(false)
    } catch (err) {
      console.error("Failed to respond:", err)
    }
  }

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
          style={[
            styles.button,
            (alreadyResponded[props.current?.id] || hasClicked) && {
              opacity: 0.5,
            },
          ]}
          onPress={() => {
            props.setVisible(false)
            props.setResponded(true)
          }}
          disabled={alreadyResponded[props.current?.id] || hasClicked}
        >
          <Text style={{ fontFamily: "Roboto-Bold" }}>
            {alreadyResponded[props.current?.id]
              ? "Already Responded"
              : "Respond"}
          </Text>
        </Pressable>
      </View>
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginVertical: 15 }}>
        <Text style={[styles.title, { fontSize: 28 }]}>Current requests</Text>
      </View>
      {/*       <View style={styles.titleContainer}>
        <Text style={styles.title}>Current Requests</Text>
      </View> */}
      <View
        style={{
          flexDirection: "row",
          gap: 15,
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 600 }}>Filter by</Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Pressable
            style={{
              backgroundColor: tab === "RELEVANT" ? "#9A4040" : "#B47F7F",
              padding: 12,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              justifyContent: "center",
              width: "50%",
              alignItems: "center",
            }}
            onPress={() => {
              console.log("Relevant")
              setTab("RELEVANT")
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>Personal</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: tab === "ALL" ? "#9A4040" : "#B47F7F",
              padding: 12,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
              justifyContent: "center",
              width: "50%",
              alignItems: "center",
            }}
            onPress={() => {
              console.log("all")
              setTab("ALL")
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>All</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => setUrgentSelected((prev) => !prev)}
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <View
            style={{
              backgroundColor: urgentSelected ? "#65558F" : "#b9b9b9",
              width: 24,
              height: 24,
              borderRadius: 6,
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {urgentSelected && (
              <Ionicons name="checkmark-outline" size={20} color="white" />
            )}
          </View>
          <Text style={{ fontSize: 13 }}>Urgent only</Text>
        </Pressable>

        {/*  <Pressable
          style={{
            backgroundColor: tab === 'URGENT' ? '#b35d5d' : '#b47f7f',
            padding: 12,
            borderRadius: 12,
            width: '48%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            console.log('urgent');
            setTab('URGENT');
          }}
        >
          <Text style={{ color: 'white' }}>Urgent</Text>
        </Pressable> */}
      </View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          style={{ flex: 1 }}
          visible={props.responded}
          onRequestClose={() => {
            props.setResponded(!props.responded)
          }}
        >
          <BlurView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: 15,
                padding: 10,
                margin: 8,
                borderColor: "#9A4040",
                flex: 1,
                maxWidth: 400,
                maxHeight: 200,
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "white",
                gap: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto-Bold",
                    color: "#9A4040",
                    fontSize: 20,
                  }}
                >
                  Important!
                </Text>
              </View>
              <View style={{ padding: 5 }}>
                <Text>
                  It is recommended to wait 8 weeks between blood donations. If
                  you have donated blood within the last 8 weeks, please wait
                  before donating again.
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-around",
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={{ padding: 10 }}
                    onPress={() => props.setResponded(false)}
                  >
                    <Text
                      style={{ color: "#4285F4", fontFamily: "roboto-medium" }}
                    >
                      Cancel
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: "#FFEE93",
                      padding: 10,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      handleRespond()
                      props.setResponded(false)
                    }}
                  >
                    <Text style={{ fontFamily: "roboto-bold" }}>
                      I can donate!
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </BlurView>
        </Modal>
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
      </View>
      {loading && <ActivityIndicator size={"large"} />}
      {!loading && (
        <FlatList
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={(element) => {
            const req = element.item
            return (
              <Observer>
                {() => (
                  <View>
                    <Pressable
                      style={
                        props.isPress && req.id == props.current.id
                          ? styles.requestContainerSelected
                          : styles.requestContainer
                      }
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
                      <View
                        style={{ maxWidth: 180, flexDirection: "row", flex: 1 }}
                      >
                        <Text
                          style={
                            props.isPress && req.id == props.current.id
                              ? styles.requestTextSelected
                              : styles.requestText
                          }
                        >
                          {req.hospitalName ?? "Hospital name"}
                        </Text>
                      </View>
                      <View style={{}}>
                        <Text
                          style={
                            props.isPress && req.id == props.current.id
                              ? styles.separatorSelected
                              : styles.separator
                          }
                        >
                          {"\u2B24"}
                        </Text>
                      </View>
                      <View
                        style={{ maxWidth: 220, flexDirection: "row", flex: 1 }}
                      >
                        <Text
                          style={
                            props.isPress && req.id == props.current.id
                              ? styles.requestTextSelected
                              : styles.requestText
                          }
                        >
                          Blood Type: {req.bloodTypes.join(", ")}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                )}
              </Observer>
            )
          }}
          data={filteredRequests}
          keyExtractor={(element) => {
            return element.id
          }}
        />
      )}
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
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
    backgroundColor: "#ffffff",
    borderWidth: 2,

    borderColor: "#9A4040",
    borderRadius: 8,
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
  },
})
