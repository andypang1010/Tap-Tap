const col = JEAT.db.collection("restaurants")
const { v4: uuidv4 } = require('uuid');

//Minimum eight characters
//at least one uppercase letter, one lowercase letter,
//one number and one special character
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.,!@#\$%\^&\*])(?=.{8,})")

module.exports = class restaurant{

    /**
     * create a new restaurant
     * TODO: authentication
     */
    static async createRestaurant(opts) {

        const res_object = await col.doc(opts.username).set(opts);
        await col.doc(opts.username).update({
            createAt:new Date(),
            updateAt:new Date()
        })


        return res_object
    }

    /**
     * register a new restaurant
     * perform data type check for opts
     * check if the username is duplicated
     * -------
     * if success, return the restaurant object
     * if fail, throw an error
     */
    static async register(opts) {

        let err_message;
        //type checking
        if(!JEAT.type.restaurant(opts)){
            err_message = "fail to register, type checker fail to check the restaurant object";
            JEAT.logger.warn(err_message);
        }

        //check if the username is duplicated
        const dup = await col.doc(opts.username).get()
        if(dup.exists){
            err_message = "fail to register, the username is already used"
            JEAT.logger.warn(err_message);
        }

        //check if password match the regex
        if(!passwordRegex.test(opts.password)){
            err_message = "the password must contain least one uppercase letter, one lowercase letter, one number and one special character, with minimum length of 8"
            JEAT.logger.warn(err_message);
        }

        //create the restaurant
        const object = this.createRestaurant(opts)

        if(err_message){
            throw(err_message)
        }else{
            return object
        }
    }

    /**
     * get restaurant by username(unique)
     * */
    static async getRestaurant(username){
        const result = await col.doc(username)
        if(!result.empty){
            console.log(result)
        }
    }
    /**
     * get the menu for a restaurant
     */
    static async getMenu(){

    }
    /**
     * update the menu for a given restaurant
     * input: expected an array of object
     * return the new menu
     */
    static async updateMenu(){

    }
}
