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
    menu:[
        {
          "name":"Tonkatsu ramen",
          "price": 120,
          "discountPrice":100,
          "description":"Tonkatsu ramen spicy",
          "availability":true,
          "ingredient":["ramen","tonkatus","chasu","seewead"],
          "type":"ramen"
        },
        {
            "name":"coke",
            "price": 20,
            "discountPrice":20,
            "description":"coke",
            "availability":true,
            "ingredient":["coke","water","sugar","carbon dioxide"],
            "type":"drink"
          },
          {
            "name":"teriyaki chicken",
            "price": 120,
            "discountPrice":120,
            "description":"chicken with teriyaki sauce",
            "availability":false,
            "ingredient":["chicken","rice","sauce"],
            "type":"entree"
          },
          {
            "name":"Shoyu ramen",
            "price": 120,
            "discountPrice":120,
            "description":"Shoyu + Ramen",
            "availability":true,
            "ingredient":["Shoyu","chashu","ramen"],
            "type":"ramen"
          },
    ],
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
axios.post('http://localhost:8008/auth/updateMenu',
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
