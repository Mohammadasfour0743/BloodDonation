import { configure, observable, reaction } from "mobx"
import { model } from "src/model"

configure({ enforceActions: "never" })

export const reactiveModel = observable(model)

global.myModel = reactiveModel
