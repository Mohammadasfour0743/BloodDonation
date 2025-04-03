import { initializeApp } from "firebase/app"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  query,
  where
} from "firebase/firestore"
import { runInAction } from "mobx"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  onAuthStateChanged, signOut} from "firebase/auth";

import { firebaseConfig } from "./firebaseconfig.js"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(); 
const COLLECTION1 = "donors"
const COLLECTION2 = "requests"

// making them available at the console to test
global.doc = doc
global.setDoc = setDoc
global.app = db

export function signIn(username, password) {
  return signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User signed in:", user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign In Error:", errorCode, errorMessage);
    });
}

// Function to sign up with email and password
export function signUp(username, password) {
  return createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("User signed up:", user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign Up Error:", errorCode, errorMessage);
    });
}

// Listen for authentication state changes (sign in, sign out)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User logged in:", user.email);
  } else {
    // No user is signed in
    console.log("No user is logged in.");
  }
});

const docToStore = doc(db, COLLECTION1, "data")


export function connectToPersistence(model, watchFunction) {
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
        model.user.name = data.name ?? "default"
        model.user.username = data.username ?? "default"
        model.user.bloodtype = data.bloodtype ?? "default"
      }
      // if no document during the read, sets the model's properties to the default values.
      else {
        model.user.name = "default"
        model.user.username = "default"
      }
    })
    .catch((error) => console.error("Error reading document:", error))

  // METHOD FOR REQUESTS - Only fetch documents where current is true
  const requestsQuery = query(
    collection(db, COLLECTION2),
    where("current", "==", true)
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
        const existingRequest = model
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

//web fxn
// export async function saveRequests(request) {
//   try {
//     const docRef = doc(collection(db, COLLECTION2), request.id);
//     await setDoc(docRef, {
//       hospitalId: request.hospitalId,
//       urgency: request.urgency,
//       bloodType: request.bloodType,
//       amount: request.amount,
//       description: request.description,
//     });
//     console.log("Request successfully saved with ID:", request.id);
//   } catch (error) {
//     console.error("Error saving request:", error);
//   }
// }