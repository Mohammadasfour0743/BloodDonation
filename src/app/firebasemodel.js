import React from "react"
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
import { runInAction } from "mobx"

import { reactiveModel } from "./bootstrapping"
import { firebaseConfig } from "./firebaseconfig.js"

//const app = initializeApp(firebaseConfig)
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

const COLLECTION1 = "donors"
const COLLECTION2 = "testrequests"

global.doc = doc
global.setDoc = setDoc
global.app = db

export function signIn(username, password) {
  return signInWithEmailAndPassword(auth, username, password)
    .then(async (userCredential) => {
      const user = userCredential.user
      console.log("User signed in:", user.email)

      const donorDocRef = doc(db, COLLECTION1, user.uid)

      const donorSnapshot = await getDoc(donorDocRef)
      let donorData = {}
      if (donorSnapshot.exists()) {
        donorData = donorSnapshot.data()

        runInAction(() => {
          reactiveModel.user = {
            uid: user.uid,
            username: donorData.username || user.email,
            bloodtype: donorData.bloodtype || "default",
          }
        })
        console.log(
          "Model updated after sign-in:",
          reactiveModel.user.bloodtype,
        )
      } else {
        console.warn("Donor document does not exist.")
        runInAction(() => {
          reactiveModel.user = {
            uid: user.uid,
            username: user.email,
            bloodtype: "default",
          }
        })
      }

      fetchRequests()

      return userCredential
    })
    .catch((error) => {
      console.error("Sign In Error:", error.message)
      throw error
    })
}

export async function signUp(email, password, bloodtype) {
  try {
    reactiveModel.user.bloodtype = bloodtype
    console.log("User bloodtype saved to model:", reactiveModel.user.bloodtype)

    console.log("Attempting to sign up with email:", email)
    console.log("Blood type being saved:", bloodtype)

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

    console.log(
      "User bloodtype while user creation:",
      reactiveModel.user.bloodtype,
    )
    console.log("Donor profile created for user:", user.uid)
    return userCredential
  } catch (error) {
    console.error("Sign Up Error:", error.message)
    throw error
  }
}

export async function logOut() {
  signOut(auth)
    .then(() => {
      console.log(
        "User bloodtype before signout:",
        reactiveModel.user.bloodtype,
      )
      console.log("User signed out.")
      reactiveModel.user = {
        uid: null,
        username: null,
        bloodtype: null,
      }
      console.log("User bloodtype after signout:", reactiveModel.user.bloodtype)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error("Sign Out Error:", errorCode, errorMessage)
    })
}

function fetchRequests() {
  if (!reactiveModel.user || !reactiveModel.user.bloodtype) {
    console.error("Cannot fetch requests: user or bloodtype not set")
    return
  }

  console.log("Fetching requests for bloodtype:", reactiveModel.user.bloodtype)

  const requestsQuery = query(
    collection(db, COLLECTION2),
    where("current", "==", true),
    where("bloodtype", "==", reactiveModel.user.bloodtype),
  )

  getDocs(requestsQuery)
    .then((snapshot) => {
      const fetchedRequests = []

      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log("Fetched request document:", doc.id, data)
        fetchedRequests.push({ id: doc.id, ...data })
      })

      console.log(
        "Total fetched requests (no further filtering):",
        snapshot.size,
      )

      const currentRequests = fetchedRequests.filter(
        (req) => req.current === true,
      )
      const matchingRequests = currentRequests.filter(
        (req) => req.bloodtype === reactiveModel.user.bloodtype,
      )

      console.log("Documents with current === true:", currentRequests.length)
      console.log("Documents matching bloodtype:", matchingRequests.length)

      runInAction(() => {
        reactiveModel.clearRequests()
        matchingRequests.forEach((request) => {
          reactiveModel.addRequest(request)
        })
      })

      console.log(
        "Updated model requests count:",
        reactiveModel.getRequests().length,
      )
      reactiveModel.getRequests().forEach((req, index) => {
        console.log(
          `Model Request #${index + 1}: ID: ${req.id}, Blood Type: ${req.bloodtype}`,
        )
      })
    })
    .catch((error) => console.error("Error fetching requests:", error))

  onSnapshot(requestsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data()
      const id = change.doc.id
      if (change.type === "added" || change.type === "modified") {
        const newRequest = { id, ...data }
        const existingRequest = reactiveModel
          .getRequests()
          .find((req) => req.id === id)
        if (existingRequest) {
          const updatedFields = {}
          Object.keys(newRequest).forEach((key) => {
            if (existingRequest[key] !== newRequest[key]) {
              updatedFields[key] = newRequest[key]
            }
          })
          if (Object.keys(updatedFields).length > 0) {
            reactiveModel.updateRequests(id, updatedFields)
          }
        } else {
          reactiveModel.addRequest(newRequest)
        }
      } else if (change.type === "removed") {
        reactiveModel.removeRequest(id)
      }
    })
  })

  const allRequestsQuery = collection(db, COLLECTION2)
  onSnapshot(allRequestsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data()
      const id = change.doc.id
      if (change.type === "modified" && data.current === false) {
        reactiveModel.removeRequest(id)
      }
    })
  })
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User logged in:", user.email)

    const donorDocRef = doc(db, COLLECTION1, user.uid)

    const donorSnapshot = await getDoc(donorDocRef)
    let donorData = {}
    if (donorSnapshot.exists()) {
      donorData = donorSnapshot.data()
    } else {
      console.warn("Donor document does not exist.")
    }

    runInAction(() => {
      reactiveModel.user = {
        uid: user.uid,
        username: donorData.username || user.email,
        bloodtype: donorData.bloodtype || "default",
      }
    })
    console.log("User bloodtype after login:", reactiveModel.user.bloodtype)

    fetchRequests()

    router.replace("/(tabs)/requests")
  } else {
    console.log("No user is logged in.")
    router.replace("/login")
  }
})

export function connectToPersistence(model, watchFunction) {
  if (!reactiveModel.user.uid) {
    console.error(
      "User UID is not set in the reactiveModel. Cannot connect to persistence.",
    )
    return
  }

  const docToStore = doc(db, COLLECTION1, reactiveModel.user.uid)

  function modelState() {
    return [
      reactiveModel.user.username,
      reactiveModel.user.name,
      reactiveModel.user.bloodtype,
      reactiveModel.phonenumber,
    ]
  }

  function persistModel() {
    setDoc(
      docToStore,
      {
        name: reactiveModel.user.name,
        username: reactiveModel.user.username,
        bloodtype: reactiveModel.user.bloodtype,
        phonenumber: reactiveModel.phonenumber,
      },
      { merge: true },
    )
  }

  watchFunction(modelState, persistModel)

  getDoc(docToStore)
    .then((snapshot) => {
      const data = snapshot.data()
      if (data) {
        runInAction(() => {
          reactiveModel.user.username = data.username ?? "default"
          reactiveModel.user.bloodtype = data.bloodtype ?? "default"
          reactiveModel.user.phonenumber = data.phonenumber ?? "default"
        })
      } else {
        runInAction(() => {
          reactiveModel.user.username = "default"
          reactiveModel.user.bloodtype = "default"
          reactiveModel.user.phonenumber = "default"
        })
      }
    })
    .catch((error) => console.error("Error reading donor document:", error))

  console.log(
    "Donor persistence established. Current bloodtype:",
    reactiveModel.user.bloodtype,
  )
}

//test function for the getDocs methods for requests
// export async function setRequests(model) {
//   try {
//     await setDoc(
//       reqStore,
//       { requests: reactiveModel.requests },
//       { merge: true }
//     );
//     console.log("Requests successfully saved to Firestore");
//   } catch (error) {
//     console.error("Error saving requests:", error);
//   }
// }
