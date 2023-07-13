const axios = require('axios');

console.log("\nthe response data:")
console.log("---------------------------")
axios.get('http://localhost:8008/getInfo?table=1&name=jefferywcg1234')
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});
