// cryptographic assumption:
//      (1)the attacker without knowing the private key cannot sign the future timestamp
//      (2)the ciphertext is not malleable, and can only be sued for once

//use AES symmetric encryption, as the server is not open-sourced, it can be seen as signature
// malleability check!! ideally, it should not be malleable

const AesEncryption = require('aes-encryption')
const crypto = require('crypto')


const keyString = "Jeffery is the most handsome man in the world!!"
const key = getHash(keyString)
const aes = new AesEncryption()
aes.setSecretKey(key)

let timestamps_seen=[]

function getHash(keyString){
    let key = crypto.createHash('sha1').update(keyString).digest('hex');
    for(let i=0;i<24;i++) key+='1'
    return key
}

module.exports = {
    verifyTimeSignature(plaintext,ciphertext,timestamp){
        if(Date.now()-timestamp>600000) return false //the timestamp is issued within 10
        if(timestamps_seen.indexOf(timestamp)!= -1) return false //the timestamp never appear before
        timestamps_seen.push(timestamp);
        return aes.encrypt(getHash(plaintext+timestamp)) === ciphertext
    }
}
