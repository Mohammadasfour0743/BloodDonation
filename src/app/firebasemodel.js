import React from "react"
import { router } from "expo-router"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
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
import { model } from "../model.js"

import { firebaseConfig } from "./firebaseconfig.js"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
//const auth = getAuth();
const COLLECTION1 = "donors"
const COLLECTION2 = "requests"

// making them available at the console to test
global.doc = doc
global.setDoc = setDoc
global.app = db

// export function signIn(username, password) {
//   return signInWithEmailAndPassword(auth, username, password)
//     .then((userCredential) => {
//       console.log("User signed in:", userCredential.user.email)
//       console.log("User bloodtype after signIn:", model.user.bloodtype);

//       return userCredential
//     })
//     .catch((error) => {
//       //console.error("Sign In Error:",error.message);
//       throw error
//     })
// }

export function signIn(username, password) {
  return signInWithEmailAndPassword(auth, username, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user.email);

      // Define a reference to the donor document using the user's UID.
      const donorDocRef = doc(db, COLLECTION1, user.uid);
      
      // Retrieve donor data from Firestore.
      const donorSnapshot = await getDoc(donorDocRef);
      let donorData = {};
      if (donorSnapshot.exists()) {
        donorData = donorSnapshot.data();
      } else {
        console.warn("Donor document does not exist.");
      }

      console.log("Model updated after sign-in:", donorData.bloodtype);

      return userCredential;
    })
    .catch((error) => {
      console.error("Sign In Error:", error.message);
      throw error;
    });
}


export async function signUp(email, password, bloodtype) {
  try {
    // Immediately update the model with the blood type selected in sign-up.
    model.user.bloodtype = bloodtype;
    console.log("User bloodtype saved to model:", model.user.bloodtype);

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

    // Update the model with the user's information.
    model.user = {
      uid: user.uid,
      username: email,
      bloodtype: bloodtype,
    };

    console.log("User bloodtype while user creation:", model.user.bloodtype)
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
      console.log("User bloodtype before signout:", model.user.bloodtype)
      console.log("User signed out.")
      model.user = {
        uid: null,
        username: null,
        bloodtype: null,
      };
      console.log("User bloodtype after signout:", model.user.bloodtype)
      
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error("Sign Out Error:", errorCode, errorMessage)
    })
}

onAuthStateChanged(auth, async (user) => {
  console.log("before logging in:", user.bloodtype)
  if (user) {
    console.log("User logged in:", user.email) // User is signed in

    // Define reference to the donor document using the user's UID.
    const donorDocRef = doc(db, COLLECTION1, user.uid);
    
    // Fetch donor data from Firestore.
    const donorSnapshot = await getDoc(donorDocRef);
    let donorData = {};
    if (donorSnapshot.exists()) {
      donorData = donorSnapshot.data();
    } else {
      console.warn("Donor document does not exist.");
    }
  // Update the model with donor data. Note: use donorData fields.
  model.user = {
    uid: user.uid,
    username: donorData.username || user.email,
    bloodtype: donorData.bloodtype || "default",
  };
    console.log("User bloodtype after login:", model.user.bloodtype)

    router.replace("/(tabs)/requests")

    // Now that the model is updated with a valid UID, you can call persistence.
    connectToPersistence(model, watchFunction);
  } else {
    console.log("No user is logged in.") // No user is signed in
    router.replace("/login")
  }
})

//const docToStore = doc(db, COLLECTION1, "data")

export function connectToPersistence(model, watchFunction) {
   // Check if the user UID is set
   if (!model.user.uid) {
    console.error("User UID is not set in the model. Cannot connect to persistence.");
    return;
  }

  const docToStore = doc(db, COLLECTION1, model.user.uid);

  function modelState() {
    return [model.user.username, model.user.name, model.user.bloodtype]
  }

  // persisting to the db
  function persistModel() {
    setDoc(
      docToStore,
      {
        name: model.user.name,
        username: model.user.username,
        bloodtype: model.user.bloodtype,
      },
      { merge: true },
    )
  }

  watchFunction(modelState, persistModel)

  getDoc(docToStore)
    .then((snapshot) => {
      //console.log("Firestore snapshot retrieved:", snapshot);
      const data = snapshot.data()
      //console.log("Data from Firestore:", data);

      // if data exists, updates the model's properties/fields with the stored values
      // if any field is missing, it updates to the default values (given in the model)
      if (data) {
        // model.user.name = data.name ?? "default"
        model.user.username = data.username ?? "default"
        model.user.bloodtype = data.bloodtype ?? "default";

      }
      // if no document during the read, sets the model's properties to the default values.
      else {
        model.user.name = "default"
        model.user.username = "default"
      }
    })
    .catch((error) => console.error("Error reading document:", error))

    console.log("User bloodtype before query:", model.user.bloodtype);


  // METHOD FOR REQUESTS - Only fetch documents where current is true
  const requestsQuery = query(
    collection(db, COLLECTION2),
    where("current", "==", true),
    //where("bloodtype", "==", model.user.bloodtype)

  )

  getDocs(requestsQuery)
    .then((snapshot) => {
      const fetchedRequests = []

      snapshot.forEach((doc) => {
        const data = doc.data()
        fetchedRequests.push({ id: doc.id, ...data })
      })

      if (fetchedRequests.length > 0) {
        fetchedRequests.forEach((newRequest) => {
          const existingRequest = model
            .getRequests()
            .find((req) => req.id === newRequest.id)

          if (existingRequest) {
            const updatedFields = {}
            Object.keys(newRequest).forEach((key) => {
              if (existingRequest[key] !== newRequest[key]) {
                updatedFields[key] = newRequest[key]
              }
            })

            if (Object.keys(updatedFields).length > 0) {
              model.updateRequests(newRequest.id, updatedFields)
            }
          } else {
            model.addRequest(newRequest)
          }
        })
      }
    })
    .catch((error) => console.error("error reading the docs:", error))

  // Listen for real-time updates on the filtered query
  onSnapshot(requestsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data()
      const id = change.doc.id

      if (change.type === "added" || change.type === "modified") {
        const newRequest = { id, ...data }
        const existingRequest = model.getRequests().find((req) => req.id === id)

        if (existingRequest) {
          const updatedFields = {}
          Object.keys(newRequest).forEach((key) => {
            if (existingRequest[key] !== newRequest[key]) {
              updatedFields[key] = newRequest[key]
            }
          })

          if (Object.keys(updatedFields).length > 0) {
            model.updateRequests(id, updatedFields)
          }
        } else {
          model.addRequest(newRequest)
        }
      } else if (change.type === "removed") {
        model.removeRequest(id)
      }
    })
  })

  // Listen for documents where current changes to false
  const allRequestsQuery = collection(db, COLLECTION2)
  onSnapshot(allRequestsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data()
      const id = change.doc.id

      // If document is updated to have current=false, remove it from our model
      if (change.type === "modified" && data.current === false) {
        model.removeRequest(id)
      }
    })
  })
}

//test function for the getDocs methods for requests
// export async function setRequests(model) {
//   try {
//     await setDoc(
//       reqStore,
//       { requests: model.requests },
//       { merge: true }
//     );
//     console.log("Requests successfully saved to Firestore");
//   } catch (error) {
//     console.error("Error saving requests:", error);
//   }
// }
