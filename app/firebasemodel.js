import { initializeApp } from 'firebase/app';


import { firebaseConfig } from "./(tabs)/firebaseconfig.js";


const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
const db = getFirestore(app)

const COLLECTION = "donors"

global.doc = doc
global.setDoc = setDoc
global.app = db



// export the function connectToPersistence
export function connectToPersistence(model) {
  
  /* model.ready = false */
  const docRef = doc(db, COLLECTION, "data2")

  function getModelStateACB() {
    return [model.username, model.amountBloodL]
  }

  function saveModelToFirestoreACB() {
    
      setDoc(
        docRef,
        {
          username: model.username,
          amoundBloodL: model.amoundBloodL,
        },
        { merge: true },
      ).catch((error) => {
        console.error("Firestore write error:", error)
      })
    }
  }

  /* watchFunction(getModelStateACB, saveModelToFirestoreACB) */

  // read
  getDoc(docRef)
    .then((snapshot) => {
      const data = snapshot.exists ? snapshot.data() : {}

      if (data) {
        // for defaults
        model.username = data.username
        model.dishes = data.amountBloodL ?? 2
      } /* else {
        // if no data
        model.numberOfGuests = 2
        model.dishes = []
        model.currentDishId = null
      } */
      /* model.ready = true */
    })
    .catch((error) => {
      /* console.error("Firestore read error:", error)
      // defaults on error
      model.numberOfGuests = 2
      model.dishes = []
      model.currentDishId = null
      model.ready = true */
      /* state.data = {};  // Ensure state.data is never null */
    })