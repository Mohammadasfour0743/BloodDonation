export const model = {
  user: {
    //name: null,
    //username: null,
    //bloodtype: null,
  },

  //requests: [{}],

  requests: [
    {
      id: 3,
      hospitalId: "St Joseph's",
      urgency: true,
      bloodType: "B",
      location: "bangladesh",
      amount: "2 units",
      email: "randomemail@something.com",
      phoneNumber: "1000202879",
    },

    {
      id: 4,
      hospitalId: "St Joseph's",
      urgency: false,
      bloodType: "B",
      location: "hungary",
      amount: "2 units",
      email: "randomemail@something.com",
      phoneNumber: "1000202879",
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
  getRequests() {
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
