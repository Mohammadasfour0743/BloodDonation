import React from "react"
import { router } from "expo-router"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { initializeApp, getApps } from "firebase/app"
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
import { model } from "../model.js"

import { firebaseConfig } from "./firebaseconfig.js"

//const app = initializeApp(firebaseConfig)
const app = getApps().length === 0 
    ? initializeApp(firebaseConfig)
    : getApps()[0];
const db = getFirestore(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

const COLLECTION1 = "donors"
const COLLECTION2 = "testrequests"

// making them available at the console to test
global.doc = doc
global.setDoc = setDoc
global.app = db


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
        // Update the model with the user's information
        runInAction(() => {
          model.user = {
            uid: user.uid,
            username: donorData.username || user.email,
            bloodtype: donorData.bloodtype || "default",
          };
        });
        console.log("Model updated after sign-in:", model.user.bloodtype);
      } else {
        console.warn("Donor document does not exist.");
        runInAction(() => {
          model.user = {
            uid: user.uid,
            username: user.email,
            bloodtype: "default",
          };
        });
      }

      // Now that the user is signed in and model is updated, fetch requests
      fetchRequests(); 

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


// Separate function to fetch requests
function fetchRequests() {
  if (!model.user || !model.user.bloodtype) {
    console.error("Cannot fetch requests: user or bloodtype not set");
    return;
  }

  console.log("Fetching requests for bloodtype:", model.user.bloodtype);
  
  // First, get ALL requests without any filtering
  const allRequestsQuery = collection(db, COLLECTION2);


  getDocs(allRequestsQuery)
    .then((allSnapshot) => {
      const allRequests = [];
      
      allSnapshot.forEach((doc) => {
        const data = doc.data();
        allRequests.push({ id: doc.id, ...data });
      });
      console.log("ALL REQUESTS IN COLLECTION (NO FILTERS):", allSnapshot.size);
      allRequests.forEach((req, index) => {
        console.log(`Request #${index + 1}:`);
        console.log("- ID:", req.id);
        console.log("- Blood Type:", req.bloodtype);
        console.log("- Current Status:", req.current);
      });
      
      // Now filter just for current === true
      const currentRequests = allRequests.filter(req => req.current === true);
      console.log("CURRENT REQUESTS ONLY:", currentRequests.length);
      
      // Now filter for both current === true AND matching blood type
      const matchingRequests = currentRequests.filter(req => req.bloodtype === model.user.bloodtype);
      console.log("MATCHING BLOOD TYPE AND CURRENT:", matchingRequests.length);
      matchingRequests.forEach((req, index) => {
        console.log(`Matching Request #${index + 1}:`);
        console.log("- ID:", req.id);
        console.log("- Blood Type:", req.bloodtype);
        console.log("- Current Status:", req.current);
      });
      
      // Update the model with the matching requests
      runInAction(() => {
        model.clearRequests();
        matchingRequests.forEach(request => {
          model.addRequest(request);
        });
      });
      
      console.log("Requests updated in model:", model.getRequests().length);
      
      // Verify the model's requests
      const modelRequests = model.getRequests();
      console.log("MODEL REQUESTS:", modelRequests.length);
      modelRequests.forEach((req, index) => {
        console.log(`Model Request #${index + 1}:`);
        console.log("- ID:", req.id);
        console.log("- Blood Type:", req.bloodtype || "No blood type");
      });
    })
    .catch((error) => console.error("Error fetching requests:", error));
}


onAuthStateChanged(auth, async (user) => {
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
  // Update the model with donor data
  runInAction(() => {
    model.user = {
      uid: user.uid,
      username: donorData.username || user.email,
      bloodtype: donorData.bloodtype || "default",
    };
  });
    console.log("User bloodtype after login:", model.user.bloodtype)
    
    // Fetch requests after updating the model
    fetchRequests();
      
    router.replace("/(tabs)/requests")

  } else {
    console.log("No user is logged in.") // No user is signed in
    router.replace("/login")
  }
})


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
      console.log("Firestore snapshot retrieved:", snapshot);
      const data = snapshot.data()
      console.log("Data from Firestore:", data);

      // if data exists, updates the model's properties/fields with the stored values
      // if any field is missing, it updates to the default values (given in the model)
      if (data) {runInAction(() => {
        model.user.username = data.username ?? "default";
        model.user.bloodtype = data.bloodtype ?? "default";
      });
      // if no document during the read, sets the model's properties to the default values.
      } else {
        runInAction(() => {
          model.user.username = "default";
          model.user.bloodtype = "default";
        });
      }
    })
    .catch((error) => console.error("Error reading document:", error))

    console.log("User bloodtype before query:", model.user.bloodtype);

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
