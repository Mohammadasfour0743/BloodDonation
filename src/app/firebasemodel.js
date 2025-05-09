import { use } from "react"
import { loadAsync } from "expo-font"
import * as Location from "expo-location"
import { router } from "expo-router"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { getApps, initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore"
import { reaction, runInAction } from "mobx"

import { reactiveModel } from "./bootstrapping"
import { firebaseConfig } from "./firebaseconfig.js"
import { registerForPushNotificationsAsync } from "./notification.js"

let unsub = null
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

const COLLECTION1 = "donors"
const COLLECTION2 = "requests"

global.doc = doc
global.setDoc = setDoc
global.app = db

const R = 6371 // Earth's radius in km
const radius = 50 // 50 km

function toRad(degrees) {
  return (degrees * Math.PI) / 180
}

function toDeg(radians) {
  return (radians * 180) / Math.PI
}

export function getBoundingBox(lat, lng, radius) {
  const latRadian = toRad(lat)

  const latMin = lat - toDeg(radius / R)
  const latMax = lat + toDeg(radius / R)

  const lngMin = lng - toDeg(radius / R / Math.cos(latRadian))
  const lngMax = lng + toDeg(radius / R / Math.cos(latRadian))

  return { latMin, latMax, lngMin, lngMax }
}

export function signIn(username, password) {
  return signInWithEmailAndPassword(auth, username, password)
    .then(async (userCredential) => {
      const user = userCredential.user
      console.log("User signed in:", user.email)
      reactiveModel.clearUser()
      reactiveModel.clearRequests()

      reactiveModel.user.uid = user.uid
      connectToPersistence()
      console.log("User bloodtype after signin:", reactiveModel.user.bloodtype)

      return userCredential
    })
    .catch((error) => {
      console.error("Sign In Error:", error.message)
      throw error
    })
}

export async function signUp(email, password, bloodtype) {
  try {
    reactiveModel.clearUser()
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user
    console.log("User signed up:", user)
    console.log("Blodtypeeeee", bloodtype)
    reactiveModel.ready = false
    await setDoc(
      doc(db, "donors", user.uid),
      {
        uid: user.uid,
        username: email,
        bloodtype: bloodtype,
      },
      { merge: true },
    )

    reactiveModel.user = {
      uid: user.uid,
      username: email,
      bloodtype: bloodtype,
    }
    reactiveModel.ready = true
    return userCredential
  } catch (error) {
    console.error("Sign Up Error:", error.message)
    throw error
  }
}

export async function logOut() {
  try {
    unsub()
    unsub = null
    reactiveModel.clearUser()
    reactiveModel.clearRequests()

    await signOut(auth)
    console.log("User signed out successfully")
  } catch (error) {
    console.error("Sign Out Error:", error.code, error.message)
    throw error
  }
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    /* reactiveModel.clearUser();
    reactiveModel.clearRequests(); */
    reactiveModel.user.uid = user.uid
    console.log(reactiveModel.user.uid)

    if (Date.now() - Date.parse(user.metadata.creationTime) < 5000) {
      console.log("asd")
      router.replace("/warnings")
    } else router.replace("/(tabs)/requests")
    await updateUserLocation()
    await connectToPersistence()
    registerForPushNotificationsAsync(user.uid)
  } else {
    console.log("No user is logged in.")
    reactiveModel.clearUser()
    reactiveModel.clearRequests()
    router.replace("/login")
  }
})

export async function getCurrentLocation() {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      return false
    }

    let location = await Location.getCurrentPositionAsync({})
    return location
  } catch (e) {
    console.log(e)
  }
}

export async function updateUserLocation() {
  if (!reactiveModel.user.uid) {
    console.log("a")
    return
  }
  try {
    const location = await getCurrentLocation()
    if (!location) return
    reactiveModel.ready = false
    await setDoc(
      doc(db, COLLECTION1, reactiveModel.user.uid),
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      {
        merge: true,
      },
    )
    reactiveModel.ready = true
  } catch (e) {
    console.log(e)
  }
}

export async function fetchRequests() {
  if (!reactiveModel.user || !reactiveModel.user.bloodtype) {
    console.error("Cannot fetch requests: user or bloodtype not set in model")
    return
  }
  reactiveModel.ready = false
  await getDocs(
    query(collection(db, COLLECTION2), where("current", "==", true)),
  ).then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    runInAction(() => {
      reactiveModel.setRequest(data)
    })
  })
  reactiveModel.ready = true
  console.log("Fetching requests for bloodtype:", reactiveModel.user.bloodtype)
}

onSnapshot(collection(db, COLLECTION2), (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const data = change.doc.data()
    const id = change.doc.id
    if (change.type === "modified" && data.current === false) {
      runInAction(() => {
        reactiveModel.removeRequest(id)
      })
    }
  })
})
onSnapshot(
  query(collection(db, COLLECTION2), where("current", "==", true)),
  (snapshot) => {
    if (snapshot.empty || !reactiveModel.user.bloodtype) {
      console.warn("No changes detected. Double-check the query and data.")
      return
    }

    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data()
      const id = change.doc.id
      const request = { id, ...data }

      runInAction(() => {
        if (change.type === "added") {
          reactiveModel.addRequest(request)
        } else if (change.type === "modified") {
          reactiveModel.updateRequests(id, request)
        } else if (change.type === "removed") {
          reactiveModel.removeRequest(id)
        }
      })
    })
  },
)

export async function connectToPersistence() {
  if (!reactiveModel.user.uid) {
    console.log(
      "User UID is not set in the reactiveModel. Cannot connect to persistence.",
    )
    return
  }
  reactiveModel.ready = false

  await getDoc(doc(db, COLLECTION1, reactiveModel.user.uid))
    .then((snapshot) => {
      const data = snapshot.data()
      console.log("Initial getDoc ", data, reactiveModel.user.uid)
      if (data) {
        runInAction(() => {
          if (data.username) reactiveModel.user.username = data.username
          if (data.bloodtype) reactiveModel.user.bloodtype = data.bloodtype
          if (data.name) reactiveModel.user.name = data.name
          if (data.phonenumber)
            reactiveModel.user.phonenumber = data.phonenumber

          //console.log("updater received", reactiveModel.user);
        })
      }
    })
    .then(async () => {
      await fetchRequests()
    })
    .catch((error) => console.error("Error reading donor document:", error))
  reactiveModel.ready = true

  unsub = reaction(
    () => [
      reactiveModel.user.bloodtype,
      reactiveModel.user.phonenumber,
      reactiveModel.user.name,
    ],
    async (newBloodtype, oldBloodtype) => {
      if (!reactiveModel.ready) {
        return
      }

      //console.log("bloodtype chnaged , new req fetched");
      reactiveModel.clearRequests()

      await fetchRequests()
      const docToStore = doc(db, COLLECTION1, reactiveModel.user.uid)
      reactiveModel.ready = false
      await setDoc(
        docToStore,
        {
          bloodtype: newBloodtype[0] ?? oldBloodtype[0],
          phonenumber:
            newBloodtype[1] == "" ? newBloodtype[1] : oldBloodtype[1],
          name: newBloodtype[2] == "" ? newBloodtype[2] : oldBloodtype[2],
        },
        { merge: true },
      ).catch((err) => console.error("Error syncing to Firestore:", err))(
        (reactiveModel.ready = true),
      )
    },
  )
}
