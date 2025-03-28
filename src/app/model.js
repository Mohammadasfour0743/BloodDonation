export const model = {
  user: {
    name: "change once",
    username: "edited2",
    bloodtype: "edited3",
  },

  requests: [],

  /*request: {
    id: string;
    hospitalId: string;
    urgency: number;
    bloodType: string;
}
*/

  addRequest(req) {
    this.requests = [...this.requests, req]
  },

  getRequest(id) {
    return this.requests.find((currentRequest) => {
      return id == currentRequest.id
    })
  },
}
