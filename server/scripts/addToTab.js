const axios = require('axios');

console.log("\nthe response data:")
console.log("---------------------------")

axios.get('http://localhost:8008/jefferywcg390729705/addToTab?table=1&item=Tonkatsu ramen')
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});