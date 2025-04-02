export const model = {
  user: {
    name: "change once",
    username: "edited2",
    bloodtype: "edited3",
  },

  //requests: [{}],

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

  getRequest(id) {
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
  setUser(user) {
    this.user = user
  },
  getUser() {
    return this.user
  },
}
