const axios = require('axios');

console.log("\nthe response data:")
console.log("---------------------------")

axios.get('http://localhost:8008/jefferywcg390729705/viewTab?table=1')
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});