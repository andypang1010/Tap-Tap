const axios = require('axios');

console.log("\nthe response data:")
console.log("---------------------------")

axios.get('http://localhost:8008/jefferywcg319668515/openTab?table=3')
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});

axios.get('http://localhost:8008/jefferywcg319668515/addToTab?table=3&item=Tonkatsu ramen')
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});