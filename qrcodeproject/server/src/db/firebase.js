const { initializeApp } = require("firebase-admin/app")
const { getFirestore } = require('firebase-admin/firestore')
const admin = require("firebase-admin");

//the config sdk should be confidential
const serviceAccount = require("./config.json");

module.exports = {
    async init() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        // Initialize Firebase
        const store = admin.firestore();

        // a simple test to check db connection
        try{
            JEAT.logger.info("---start testing the connection of firestore")
            const testCol = store.collection("test_collection")
            const documents = await testCol.get();
            documents.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
            JEAT.logger.info("---the db connection is successful!")
        }catch(e){
            JEAT.logger.error("fail to test initialization of the firebase store")
            JEAT.logger.error(e)
        }

        return store
    }
}

