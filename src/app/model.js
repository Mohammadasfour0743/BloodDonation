import { makeAutoObservable } from "mobx"

export const model = makeAutoObservable(
  {
    user: {
      name: "change once",
      username: "edited2",
      bloodtype: "edited3",
    },
  
    requests: [{}],
  
    requests: [
      {
        id: 3,
        hospitalId: "St Joseph's",
        urgency: "High",
        bloodType: "B",
      },
    ],
  
    addRequest(req) {
      this.requests = [req, ...this.requests]
    },
  
    getRequestID(id) {
      return this.requests.find((currentRequest) => {
        return id == currentRequest.id
      })
    },
    setRequest(arr) {
      this.requests = arr
    },
    getRequest() {
      return this.requests
    },
    updateUser(id, userFields) {
      return {
        ...this.user,
        userFields,
      }
    },
    updateUser(id, requestFields) {
      this.requests.map((currentRequest) => {
        if (this.currentRequest.id == id)
          return {
            ...this.currentRequest,
            requestFields,
          }
        return currentRequest
      })
    },
    setUser(user) {
      this.user = user
    },
    getUser() {
      return this.user
    },
  }
) 