export const model = {
  user: {
    username: null,
    bloodtype: null,
    location: null,
    coordinates: null,
  },

  longitude: undefined,
  latitude: undefined,
  unsubscribeGeoQuery: null,
  unsubscribeRegularQuery: null,

  setLongitude(longitude) {
    this.longitude = longitude;
  },

  setLatitude(latitude) {
    this.latitude = latitude;
  },

  requests: [],
  addRequest(req) {
    if (this.requests.find((val) => val.id == req.id)) return;
    this.requests = [req, ...this.requests];
  },

  getRequestById(id) {
    return this.requests.find((currentRequest) => {
      return id == currentRequest.id;
    });
  },

  setRequest(arr) {
    this.requests = arr;
  },
  getRequests() {
    return this.requests;
  },

  updateUser(userFields) {
    this.user = {
      ...this.user,
      ...userFields,
    };
  },
  removeRequest(id) {
    this.requests = this.requests.filter((item) => {
      return item.id != id;
    });
  },
  updateRequests(id, requestFields) {
    Object.keys(requestFields).forEach((key) => {
      this.getRequestById(id)[key] = requestFields[key];
    });
  },
  setUser(user) {
    this.user = user;
  },
  getUser() {
    return this.user;
  },
  clearRequests() {
    this.requests = [];
    console.log(this.requests);
  },
};
