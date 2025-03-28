import "./teacherFetch"

import { configure, observable, reaction } from "mobx"
import { model } from "src/DinnerModel"

//——————————————————————————————————————————————————————————————————————————————
import { dishesConst } from "./dishesConst"

configure({ enforceActions: "never" })

export const reactiveModel = observable(model)

// make the model and a few example dishes available in the browser Console for testing
global.myModel = reactiveModel
global.dishesConst = dishesConst
global.myModel.dishes = dishesConst

// or you can add a few dishes here, don't forget to remove this in TW2
// myModel.numberOfGuests = 3
// myModel.addToMenu(dishesConst[0])
