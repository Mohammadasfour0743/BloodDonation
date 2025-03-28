import { configure, observable, reaction } from "mobx"
import { model } from "./model"
import { connectToPersistence } from "./firebasemodel"

configure({ enforceActions: "never" })

// create an observable version of the model so that changes to its properties trigger reactive updates
export const reactiveModel = observable(model)

// a reaction to watch for changes in the properties specified below
// done using the callbacks below
// reaction(
//     function modelState() {
//         return reactiveModel.name
//     },
//     function reactModel() {
//         console.log("name has changed")
//     },
// )

global.myModel = reactiveModel

// connectToPersistence(reactiveModel)

