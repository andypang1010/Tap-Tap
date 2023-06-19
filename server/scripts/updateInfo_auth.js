const axios = require('axios');
const AesEncryption = require('aes-encryption')
const crypto = require('crypto')


const keyString = "Jeffery is the most handsome man in the world!!"
const key = getHash(keyString)

function getHash(keyString){
    let key = crypto.createHash('sha1').update(keyString).digest('hex');
    for(let i=0;i<24;i++) key+='1'
    return key
}


const data= {
    username:"jefferywcg1234",
    name:"jeffery's new bar"+ (Math.floor)(Math.random()*1000000),
    loc: "888 5th avenue NY",
    size: 120,
    description:"this restaurant is dope",
    phone: "123-123-123",
    maxTable: 100,
}

let plaintext=JSON.stringify(data)
let date = (Date.now())
const aes = new AesEncryption()
aes.setSecretKey(key)
const encrypted = aes.encrypt(getHash(plaintext+date))

console.log("the request body:")
console.log("---------------------------")
console.log(plaintext)
console.log(date)
console.log(encrypted)
console.log("---------------------------")


console.log("\nthe response data:")
console.log("---------------------------")
axios.post('http://localhost:8008/auth/updateRestaurantInfo',
  { timestamp:date,
    authCode:encrypted,
    data:data
  }
)
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});
