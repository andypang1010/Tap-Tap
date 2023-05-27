const {initializeApp} = require("firebase/app")
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite')

const firebaseConfig = require("./config")


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

module.exports = db
