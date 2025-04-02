import { initializeApp } from "firebase/app"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import {firebaseConfig} from "./firebaseconfig.js"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const COLLECTION = "donors"

// making them available at the console to test
global.doc = doc
global.setDoc = setDoc
global.app = db

const docToStore = doc(db, COLLECTION, "data")


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
      console.log("Firestore snapshot retrieved:", snapshot);
      const data = snapshot.data()
      console.log("Data from Firestore:", data);

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

}