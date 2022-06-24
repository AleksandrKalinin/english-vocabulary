const request = require("request-promise");

request.get("https://api.shutterstock.com/v2/images/search", {
  headers: {
    "User-Agent": "request"
  },
  auth: {
    user: "90de7-c275d-9dbaf-4ec2a-18baf-7bd8d",
    pass: "8574f-ba344-e30a1-f6398-92d2e-19713"
  },

  qs: {
    "query": "New York",
    "sort": "popular",
    "orientation": "horizontal",
    "per_page": 1,
    "page": 1
  },
  useQueryString: true
})
.then(res => {
  console.log(res);
});
