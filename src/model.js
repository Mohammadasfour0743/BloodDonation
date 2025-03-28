export const model = {
  user: {
    //name: null,
    //username: null,
    //bloodtype: null,
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
