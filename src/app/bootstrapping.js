import { configure, observable, reaction } from "mobx"
import { model } from "src/model"

import { connectToPersistence } from "./firebasemodel"

configure({ enforceActions: "never" })

export const reactiveModel = observable(model)

global.myModel = reactiveModel
