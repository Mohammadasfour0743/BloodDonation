import { initializeApp } from "firebase/app"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import {firebaseConfig} from "./firebaseconfig.js"
import { collection, getDocs, onSnapshot } from "firebase/firestore";


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const COLLECTION1 = "donors"
const COLLECTION2 = "requests"

// making them available at the console to test
global.doc = doc
global.setDoc = setDoc
global.app = db

const docToStore = doc(db, COLLECTION1, "data")

  export function connectToPersistence(model, watchFunction) {
  function modelState() {
    return [model.user.username, model.user.name, model.user.bloodtype]
  }

  
  // persisting to the db
  function persistModel() {
      setDoc(
        docToStore, {
          name: model.user.name, 
          username: model.user.username, 
          bloodtype: model.user.bloodtype
        },
        {merge: true}
      )
    }

    watchFunction(modelState, persistModel)


    getDoc(docToStore)
    .then((snapshot) => {
      //console.log("Firestore snapshot retrieved:", snapshot);
      const data = snapshot.data()
      //console.log("Data from Firestore:", data);

      // if data exists, updates the model’s properties/fields with the stored values
      // if any field is missing, it updates to the default values (given in the model)
      if (data) {
        model.user.name = data.name ?? "default"
        model.user.username = data.username ?? "default"
        model.user.bloodtype = data.bloodtype ?? "default";
      }
      // if no document during the read, sets the model’s properties to the default values.
      else {
        model.user.name = "default"
        model.user.username = "default"
      }
    })     .catch((error) => console.error("Error reading document:", error));


  // METHOD FOR REQUESTS
  getDocs(collection(db, COLLECTION2))
  .then((snapshot) => {
    const fetchedRequests = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data) {
        fetchedRequests.push({ id: doc.id, ...data });
      }
    });

    if (fetchedRequests.length > 0) {
      fetchedRequests.forEach((newRequest) => {
        const existingRequest = model.getRequests().find(
                                (req) => req.id === newRequest.id);

        if (existingRequest) {
          const updatedFields = {};
          Object.keys(newRequest).forEach((key) => {
            if (existingRequest[key] !== newRequest[key]) {
              updatedFields[key] = newRequest[key];
            }
          });

          if (Object.keys(updatedFields).length > 0) {
            model.updateRequests(newRequest.id, updatedFields);
          }
        } else {
          model.addRequest(newRequest);
        }
      });
    }
  })
  .catch((error) => console.error("error reading the docs:", error));

onSnapshot(collection(db, COLLECTION2), (snapshot) => {
  const fetchedRequests = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data) {
      fetchedRequests.push({ id: doc.id, ...data });
    }
  });

  fetchedRequests.forEach((newRequest) => {
    const existingRequest = model.getRequests().find(
                            (req) => req.id === newRequest.id);

    if (existingRequest) {
      const updatedFields = {};
      Object.keys(newRequest).forEach((key) => {
        if (existingRequest[key] !== newRequest[key]) {
          updatedFields[key] = newRequest[key];
        }
      });

      if (Object.keys(updatedFields).length>0) {
        model.updateRequests(newRequest.id, updatedFields);
      }
    } else {
      model.addRequest(newRequest);
    }
  });
  //console.log("no need for reload", fetchedRequests);
});


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
