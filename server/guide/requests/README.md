# All requests 
# Overview
The file document all the requests/responses: the precondition (expected input) and the specification(the expected reponse semantics). These will be classified based on the phase of action that clients perform in a specific page.
<br /><br />
 &emsp;│&nbsp; scan the qrcode<br />
 &emsp;│  <br />
 &emsp;│── menu page<br />
 &emsp;│<br />
 &emsp;│&nbsp; add food and checkout<br />
 &emsp;│  <br />
 &emsp;│── checkout page<br />
 &emsp;│<br />
 &emsp;│&nbsp; confirm and order<br />
 &emsp;│  <br />
 &emsp;│── payment page<br />
 &emsp;│<br />
 &emsp;│&nbsp; make payment<br />
 &emsp;│  <br />
 &emsp;│── sucess page
 
 # menu page
### render the menu
 *  ``` 
      request:
        path: /checkout
        body: {
          restaurant_uid: String,
          tableID: String
        }
        
      response: {
        menu: Array of Object[food]   
       }
      
      semantics: 
        1) perform sanity check of the restaurant_uid and tableID
        2) send the menu of the restaurant with restaurant_uid and tableID
    ```
    
 # checkout page
### render the selected food and information
*  ``` 
      request:
        path: /checkout
        body: {
          restaurant_uid: String,
          tableID: String,
          foodCart: Array of Object[food],
          priceSum: Number
        }
        
      response: {
        foodCart_checked: Array of Object[food],
        priceSum_checked: Number
      }
      
      semantics: 
        1) perform sanity of foods in foodCart (the existance and type), and check if the sum(price) is the same. 
        2) send back the checked cart and price, raise alarm if anything wrong
    ```
    
 ### update the cart/price
*  ``` 
      request:
        path: /checkout/update
        body: {
          restaurant_uid: String,
          tableID: String,
          foodCart: Array of Object[food],
          priceSum: Number
        }
        
      response: {
        foodCart_checked: Array of Object[food],
        priceSum_checked: Number
      }
      
      semantics: same as above
    ```
    
   
