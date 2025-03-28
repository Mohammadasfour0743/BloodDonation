import { initializeApp } from "firebase/app"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import {firebaseConfig} from "./firebaseconfig.js"

const app = initializeApp(firebaseConfig)
/* const analytics = getAnalytics(app); */
const db = getFirestore(app)

const COLLECTION = "donors"

// making them available at the console to test
global.doc = doc
global.setDoc = setDoc
global.app = db

// export the function connectToPersistence

  const docToStore = doc(db, COLLECTION, "datanew")

  // defining the 2 callback functions from sideEffectFxn

  // specifies the part of the model to monitor and persist


  export function persistModel(model) {
      setDoc(
        docToStore, {
          name: model.name, 
          username: model.username, 
          bloodtype: model.bloodtype
        },
        {merge: true}
      )
    }


  // to trigger the persistence when the model state changes
