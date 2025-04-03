export const model = {
  user: {
    name: null,
    username: null,
    bloodtype: null,
  },

  //requests: [{}],

  requests: [],
  addRequest(req) {
    this.requests = [req, ...this.requests]
  },

  getRequest(id) {
    return this.requests.find((currentRequest) => {
      return id == currentRequest.id
    })
  },
  setRequest(arr) {
    this.requests = arr
  },
  getRequests() {
    return this.requests
  },
  updateUser(id, userFields) {
    return {
      ...this.user,
      userFields,
    }
  },

  updateRequests(id, requestFields) {
    Object.keys(requestFields).forEach((key) => {
      this.getRequest(id)[key] = requestFields[key]
    })
  },

  setUser(user) {
    this.user = user
  },
  getUser() {
    return this.user
  },
}
