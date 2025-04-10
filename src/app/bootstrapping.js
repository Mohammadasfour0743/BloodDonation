import { configure, observable, reaction } from "mobx"
import { model } from "src/model"

import { connectToPersistence } from "./firebasemodel"
import { registerForPushNotificationsAsync } from "./notifications"

configure({ enforceActions: "never" })

export const reactiveModel = observable(model)

connectToPersistence(reactiveModel, reaction)
registerForPushNotificationsAsync();

global.myModel = reactiveModel
