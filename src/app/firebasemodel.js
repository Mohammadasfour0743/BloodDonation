import { loadAsync } from "expo-font"
import * as Location from "expo-location"
import { router } from "expo-router"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { getApps, initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
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

// Fetch all requests near a donor
export async function getNearbyRequestsForDonor(donorId, radiusInKm = 10) {
  console.log("getting requests " + donorId)
  const donorRef = doc(db, "donors", donorId)
  const donorSnap = await getDoc(donorRef)

  if (!donorSnap.exists()) {
    console.error("Donor not found")
    return []
  }

  const donorLocation = donorSnap.data().location

  if (!donorLocation) {
    console.error("Donor has no location field")
    return []
  }

  try {
    const { latMin, latMax, lngMin, lngMax } = getBoundingBox(
      donorLocation.latitude,
      donorLocation.longitude,
      1500,
    )

    const requestsRef = collection(db, "requests")
    const q = query(
      requestsRef,
      where("latitude", ">=", latMin),
      where("latitude", "<=", latMax),
      where("longitude", ">=", lngMin),
      where("longitude", "<=", lngMax),
    )

    const docs = await getDocs(q)
    console.log(docs.length)
    docs.forEach((doc) => {
      console.log(doc.data())
    })
  } catch (e) {
    console.log(e)
  }
}

const R = 6371 // Earth's radius in km
const radius = 50 // 50 km

function toRad(degrees) {
  return (degrees * Math.PI) / 180
}

function toDeg(radians) {
  return (radians * 180) / Math.PI
}

function getBoundingBox(lat, lng, radius) {
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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user
    console.log("User signed up:", user)

    await setDoc(doc(db, "donors", user.uid), {
      uid: user.uid,
      username: email,
      bloodtype: bloodtype,
    })

    reactiveModel.user = {
      uid: user.uid,
      username: email,
      bloodtype: bloodtype,
    }

    return userCredential
  } catch (error) {
    console.error("Sign Up Error:", error.message)
    throw error
  }
}

export async function logOut() {
  signOut(auth)
    .then(() => {
      console.log("User bloodtype after logOut:", reactiveModel.user.bloodtype)
    })
    .catch((error) => {
      console.error("Sign Out Error:", error.code, error.message)
    })
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    reactiveModel.user.uid = user.uid
    console.log(reactiveModel.user.uid)
    connectToPersistence()
    router.replace("/(tabs)/requests")
  } else {
    console.log("No user is logged in.")
    reactiveModel.setUser({})
    reactiveModel.clearRequests()
    router.replace("/login")
  }
})

async function getCurrentLocation() {
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

export async function fetchRequests() {
  if (!reactiveModel.user || reactiveModel.user.bloodtype == "default") {
    console.error("Cannot fetch requests: user or bloodtype not set in model")
    return
  }
  console.log("Fetching requests for bloodtype:", reactiveModel.user.bloodtype)
  const location = await getCurrentLocation()
  let requestsQuery = query(
    collection(db, COLLECTION2),
    where("current", "==", true),
    //where("bloodTypes", "array-contains-any", [reactiveModel.user.bloodtype, "AB+"])
    where("bloodTypes", "array-contains", reactiveModel.user.bloodtype),
  )
  if (location) {
    const { latMin, latMax, lngMin, lngMax } = getBoundingBox(
      location.coords.latitude,
      location.coords.longitude,
      50,
    )
    requestsQuery = query(
      collection(db, COLLECTION2),
      where("current", "==", true),
      //where("bloodTypes", "array-contains-any", [reactiveModel.user.bloodtype, "AB+"])
      where("bloodTypes", "array-contains", reactiveModel.user.bloodtype),
      where("latitude", ">=", latMin),
      where("latitude", "<=", latMax),
      where("longitude", ">=", lngMin),
      where("longitude", "<=", lngMax),
    )
  }

  onSnapshot(requestsQuery, (snapshot) => {
    if (snapshot.empty) {
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
  })

  const allRequestsQuery = collection(db, COLLECTION2)
  onSnapshot(allRequestsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data()
      const id = change.doc.id
      // if ((change.type === "modified" && (data.current === false || !data.bloodTypes.includes(reactiveModel.user.bloodtype || "AB+")))) {
      if (
        change.type === "modified" &&
        (data.current === false ||
          !data.bloodTypes.includes(reactiveModel.user.bloodtype))
      ) {
        runInAction(() => {
          reactiveModel.removeRequest(id)
        })
      }
    })
  })
}

export function connectToPersistence() {
  if (!reactiveModel.user.uid) {
    console.log(
      "User UID is not set in the reactiveModel. Cannot connect to persistence.",
    )
    return
  }
  const docToStore = doc(db, COLLECTION1, reactiveModel.user.uid)

  getDoc(docToStore)
    .then((snapshot) => {
      const data = snapshot.data()
      if (data) {
        runInAction(() => {
          reactiveModel.user.username = data.username ?? "default"
          reactiveModel.user.bloodtype = data.bloodtype ?? "default"
          if (data.name) reactiveModel.user.name = data.name
          //console.log("getDoc:", reactiveModel.user.bloodtype);
        })
      }

      fetchRequests()
    })
    .catch((error) => console.error("Error reading donor document:", error))

  onSnapshot(docToStore, (snapshot) => {
    const data = snapshot.data()
    if (data) {
      const prevBloodtype = reactiveModel.user.bloodtype

      runInAction(() => {
        if (data.username) reactiveModel.user.username = data.username
        if (data.bloodtype) reactiveModel.user.bloodtype = data.bloodtype
        if (data.name) reactiveModel.user.name = data.name
        //console.log("updater received", reactiveModel.user);
      })

      if (prevBloodtype !== data.bloodtype && data.bloodtype) {
        //console.log("new req fetched ,bloodtype changed to", data.bloodtype);
        reactiveModel.clearRequests()
        fetchRequests()
      }
    }
  })

  reaction(
    () => reactiveModel.user.bloodtype,
    (newBloodtype, oldBloodtype) => {
      if (newBloodtype && newBloodtype !== oldBloodtype) {
        //console.log("bloodtype chnaged , new req fetched");
        reactiveModel.clearRequests()
        fetchRequests()
      }
    },
  )

  reaction(
    () => ({
      username: reactiveModel.user.username,
      name: reactiveModel.user.name,
      bloodtype: reactiveModel.user.bloodtype,
    }),
    (userData) => {
      if (!auth.currentUser) return
      const dataToUpdate = {}
      if (userData.username) dataToUpdate.username = userData.username
      if (userData.name) dataToUpdate.name = userData.name
      if (userData.bloodtype) dataToUpdate.bloodtype = userData.bloodtype

      if (Object.keys(dataToUpdate).length === 0) return

      // console.log("firestore upadted with: ",dataToUpdate);
      setDoc(docToStore, dataToUpdate, { merge: true }).catch((err) =>
        console.error("Error syncing to Firestore:", err),
      )
    },
  )
}
