# Taptap server
## code management
* The gateway of the server is [```src/index.js```](https://github.com/andypang1010/Tap-Tap/blob/server/server/src/index.js).
* Most of the functions are in the directory of [```src/core```](https://github.com/andypang1010/Tap-Tap/tree/server/server/src/core). 
* The express server code is in [```src/smaster.js```](https://github.com/andypang1010/Tap-Tap/blob/server/server/src/master.js).
* The code for handling HTTP requests with different routes is in [```src/controller```](https://github.com/andypang1010/Tap-Tap/blob/server/server/src/controller). 
* The firestore configuration and connection test is in  [```src/db/firebase.js```](https://github.com/andypang1010/Tap-Tap/blob/server/server/src/db/firebase.js).
* We created JS schema and type checker for handling the schemaless of firestore. The db models is in  [```src/models```](https://github.com/andypang1010/Tap-Tap/blob/server/server/src/models), and the type checker is in  [```/core/type.js```](https://github.com/andypang1010/Tap-Tap/blob/server/server/src/core/type.js).

* ## configuration and running the server
* firestore admin is needed, add the firebase configuration document to ```/db/config.js```
* The password for root-level authentication is in [```src/core/crypto.js```](https://github.com/andypang1010/Tap-Tap/blob/server/server/src/core/crypto.js), which is stored as the ```keyString```. This step could also be done by importing an ```.env``` file.
* To run the server after the configuration, do ```cd server``` and ```node index```.

  ## examples and scripts for test the exporting of the server 
  * The scripts are stored in  [```scripts```](https://github.com/andypang1010/Tap-Tap/blob/server/server/scripts). 
