const axios = require('axios');

console.log("\nthe response data:")
console.log("---------------------------")
axios.post('http://localhost:8008/checkCart?table=1&name=jefferywcg1234',{
    total_price:0,
    cart:[
        {name:"Tonkatsu ramen",time:5,price:0},
        {name:"coke",time:2,price:0},
        {name:"teriyaki chicken",time:1,price:0}
    ]
})
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});
