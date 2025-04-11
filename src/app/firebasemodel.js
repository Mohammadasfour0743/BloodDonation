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
import { reactiveModel } from "./bootstrapping";
import { reaction } from "mobx";
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

global.doc = doc
global.setDoc = setDoc
global.app = db


export function signIn(username, password) {
  return signInWithEmailAndPassword(auth, username, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user.email);

      // setting reactiveModel.user.uid for connectToPersistance
      reactiveModel.user.uid = user.uid;
      connectToPersistence();
      console.log("User bloodtype after signin:", reactiveModel.user.bloodtype)

      return userCredential;
    })
    .catch((error) => {
      console.error("Sign In Error:", error.message);
      throw error;
    });
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

    // creating a doc for each user
    await setDoc(doc(db, "donors", user.uid), {
      uid: user.uid,
      username: email,
      bloodtype: bloodtype,
    })

    // saving it to the model
     reactiveModel.user = {
      uid: user.uid,
      username: email,
      bloodtype: bloodtype,
    };

    return userCredential
  } catch (error) {
    console.error("Sign Up Error:", error.message)
    throw error
  }
}

export async function logOut() {
  signOut(auth)
    .then(() => {
      reactiveModel.setUser({});
      console.log("User bloodtype after logOut:", reactiveModel.user.bloodtype)
    })
    .catch((error) => {
      console.error("Sign Out Error:", error.code, error.message)
    })
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // setting reactiveModel.user.uid for connectToPersistance
    reactiveModel.user.uid = user.uid;
    connectToPersistence(); 
    router.replace("/(tabs)/requests")
  } else {
    console.log("No user is logged in.")
    router.replace("/login")
  }
})


export function fetchRequests() {
  if (!reactiveModel.user || !reactiveModel.user.bloodtype) {
    console.error("Cannot fetch requests: user or bloodtype not set in model");
    return;
  }
  console.log("Fetching requests for bloodtype:", reactiveModel.user.bloodtype);

  const requestsQuery = query(
    collection(db, COLLECTION2),
    where("current", "==", true),
    where("bloodtype", "==", reactiveModel.user.bloodtype),
  )

    onSnapshot(requestsQuery, (snapshot) => {
      if (snapshot.empty) {
        console.warn("No changes detected. Double-check the query and data.");
        return;
      }
    
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const id = change.doc.id;
        const request = { id, ...data };
    
        runInAction(() => {
          if (change.type === "added") {
            reactiveModel.addRequest(request);
          }
          else if (change.type === "modified") {
            reactiveModel.updateRequests(id, request);
          } else if (change.type === "removed") {
            reactiveModel.removeRequest(id);
          }
        });
      });
    });
    // Listener for cleanup: remove any documents in the collection that become "not current".
  const allRequestsQuery = collection(db, COLLECTION2);
  onSnapshot(allRequestsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      const id = change.doc.id;
      if ((change.type === "modified" && data.current === false) || (change.type === "modified" &&  data.bloodtype !== reactiveModel.user.bloodtype)) {
        runInAction(() => {
          reactiveModel.removeRequest(id);
        });
      }
    });
  });
}


export function connectToPersistence() {
  if (!reactiveModel.user.uid) {
    console.log("User UID is not set in the reactiveModel. Cannot connect to persistence.");
    return;
  }
  const docToStore = doc(db, COLLECTION1, reactiveModel.user.uid);
  
  getDoc(docToStore)
  .then((snapshot) => {
    const data = snapshot.data();
    if (data) {
      runInAction(() => {
        reactiveModel.user.username = data.username ?? "default";
        reactiveModel.user.bloodtype = data.bloodtype ?? "default";
        console.log("getDoc:", reactiveModel.user.bloodtype);
      });
    }
    reaction(
      () => [
        reactiveModel.user.username,
        reactiveModel.user.name,
        reactiveModel.user.bloodtype,
      ],
      ([username, name, bloodtype]) => {
        console.log("Detected change in user model. Syncing to Firestore.");
        setDoc(
          docToStore,
          { username, name, bloodtype },
          { merge: true }
        ).catch(err => console.error("Error syncing to Firestore:", err));
      }
    );
      fetchRequests();
    })
    .catch((error) => console.error("Error reading donor document:", error));
}
