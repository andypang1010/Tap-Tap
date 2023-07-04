const col = JEAT.db.collection("restaurants")
const tabStatus = require('./tabStatus')
const { v4: uuidv4 } = require('uuid')

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
            isValid:true,
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
            throw(err_message)
        }

        //check if the username is duplicated
        let dup = await col.doc(opts.username).get()
        if(dup.exists){
            err_message = "fail to register, the username is already used"
            JEAT.logger.warn(err_message);
            throw(err_message)
        }

        //check if the restaurant name is duplicated
        /*if(await this.checkRestaurantExist(opts.name)){
            err_message = "fail to register, the restaurant is already used"
            JEAT.logger.warn(err_message);
        }*/

        //check if password match the regex
        if(!passwordRegex.test(opts.password)){
            err_message = "the password must contain least one uppercase letter, one lowercase letter, one number and one special character, with minimum length of 8"
            JEAT.logger.warn(err_message);
        }

        //create the restaurant
        const object = this.createRestaurant(opts)
        return object
    }

    static async updateStatus(opts){
        const target = await this.getRestaurant(opts.username);
        if (target.data().tables[opts.table][opts.itemNumber] === undefined) {
            JEAT.logger.error(`failed to move item ${opts.itemNumber} to status ${opts.status}, item number does not exist at table`)
            return -1
        }

        const formerStatus = target.data().tables[opts.table][opts.itemNumber].status;

        let val = this.checkStatusCodeValid(formerStatus, opts.status)

        if (val === -1) {
            JEAT.logger.error(`failed to update status of item ${opts.itemNumber}, status '${opts.status}' not recognized`)
            return -2
        } else if (!val) {
            JEAT.logger.error(`failed to update status of item ${opts.itemNumber}, cannot transition from status '${formerStatus}' to status '${opts.status}'`)
            return -3
        }

        let tables = target.data().tables;

        tables[opts.table][opts.itemNumber].status = opts.status;

        await col.doc(opts.username).update({
            tables:tables
        })

        return formerStatus;
    }

    static async getTab(opts){
        const target = await this.getRestaurant(opts.username)
        if (target.data().tables[opts.table] === undefined) {
            JEAT.logger.error(`failed to get tab, table ${opts.table} has no open tab`);
            return -1
        }

        return target.data().tables[opts.table];
    }

    static async openTab(opts){
        const target = await this.getRestaurant(opts.username)
        if (target.data().tables[opts.table]) {
            JEAT.logger.error(`failed to open tab, table ${opts.table} is already occupied`);
            return -1
        }

        if(!this.checkRestaurantTable(target,opts.table)){
            JEAT.logger.error("restaurant or table is not valid");
            return -2
        }

        let tables = target.data().tables;
        tables[opts.table] = [];

        await col.doc(opts.username).update({
            tables:tables
        })

        return
    }

    static async closeTab(opts){
        const target = await this.getRestaurant(opts.username);

        if (target.data().tables[opts.table] === undefined) {
            JEAT.logger.warn(`no tab open at table ${opts.table}`);
            return 1
        }

        let tables = target.data().tables;
        delete tables[opts.table]

        await col.doc(opts.username).update({
            tables:tables
        })

        return
    }

    static async addToTab(opts){
        const target = await this.getRestaurant(opts.username);
        const item = opts.item;
        const quantity = opts.quantity;
        const instructions = opts.instructions;

        if (target.data().tables[opts.table] === undefined) {
            JEAT.logger.error(`failed to add to tab, no tab open at table ${opts.table}`);
            return -1
        }
        
        if(!this.checkQuantityValid(target, quantity)){
            JEAT.logger.error(`failed to add to tab, quantity ${quantity} is not valid`)
            return -2
        }

        let tables = target.data().tables;
        let menu = target.data().menu;

        const data = { "item-name" : item, "quantity" : quantity, "special-instructions" : instructions, "status" : tabStatus.ORDER_PLACED};

        for (let i = 0; i < menu.length; i++) {
            if (menu[i].name === item) {
                tables[opts.table].push(data);
                await col.doc(opts.username).update({
                    tables:tables
                })
                
                return
            }
        }

        JEAT.logger.error(`failed to add to tab, item ${opts.item} not found on menu`);
        return -3
    }

    static async cancelItem(opts){
        const target = await this.getRestaurant(opts.username);
        if(target.data().tables[opts.table][opts.itemNumber] === undefined){
            JEAT.logger.error(`failed to move item ${opts.itemNumber} to status ${opts.status}, item number does not exist at table`)
            return -1
        }

        if(!this.checkQuantityValid(target, opts.quantity)){
            JEAT.logger.error(`failed to add to tab, quantity ${opts.quantity} is not valid`)
            return -2
        }

        let tables = target.data().tables;

        if(tables[opts.table][opts.itemNumber].quantity <= opts.quantity) {
            if(tables[opts.table].length == 1) {
                delete tables[opts.table]
            } else {
                tables[opts.table].splice(opts.itemNumber, 1);
            }
        } else {
            tables[opts.table][opts.itemNumber].quantity -= opts.quantity;
        }

        if (target.data().tables[opts.table] === undefined) {
            JEAT.logger.warn(`no tab open at table ${opts.table}`);
            return 1
        }

        await col.doc(opts.username).update({
            tables:tables
        })

        return
    }

    /**
     * get restaurant by username(unique)
     * */
    static async getRestaurant(uname){
        const result = await col.doc(uname).get()
        return result
    }

    /**
     * check the existence of restaurant by the name
     * */
    static checkRestaurantExist(target){
        return target.exists
    }

    /**
     * check the validity of restaurant by the name
     * */
    static checkRestaurantValid(target){
        return target.exists&& target.data().isValid
    }

    /**
     * check the existence of the table
     * */
    static checkRestaurantTable(target,table){
        try{
            return this.checkRestaurantValid(target) && (target.data().maxTable >= table) && (table >= 0)
        } catch(e) {
            return false
        }
    }

    /**
     * check the quantity requested is less than restaurant's maxQuantity
     * */
    static checkQuantityValid(target,quantity){
        try{
            return this.checkRestaurantValid(target) && (target.data().maxQuantity >= quantity) && (quantity >= 0)
        } catch(e) {
            return false
        }
    }

    /**
     * check the status codes and if the former status can be updated to the new status
     * */
    static checkStatusCodeValid(formerStatus,newStatus){
        let valid = -1;
        if(Object.values(tabStatus).includes(formerStatus) && Object.values(tabStatus).includes(newStatus)) {
            switch (newStatus) {
                case 'Order Prepared':
                    (formerStatus === 'Order Placed') ? valid = true : valid = false
                    break
                case 'Order Delivered':
                    (formerStatus === 'Order Placed' || formerStatus === 'Order Prepared') ? valid = true : valid = false
                    break
                case 'Payment Completed':
                    (formerStatus === 'Order Placed' || formerStatus === 'Order Prepared' || formerStatus === 'Order Delivered' || formerStatus === 'Payment Failed') ? valid = true : valid = false
                    break
                case 'Payment Failed':
                    (formerStatus === 'Order Placed' || formerStatus === 'Order Prepared' || formerStatus === 'Order Delivered') ? valid = true : valid = false
                    break
                case 'Order is in error state':
                    (formerStatus !== 'Order is in error state') ? valid = true : valid = false
                    break
                default:
                    valid = false;
                    break
            }
        }

        return valid
    }

    /**
     * get the menu for a restaurant
     */
    static async getMenu(opts){
        let err_message;
        const target = await this.getRestaurant(opts.username)
        if(!this.checkRestaurantTable(target,opts.table)){
            err_message = "fail to get Menu, restaurant or table is not valid"
            JEAT.logger.warn(err_message)
            throw(err_message)

        }
        return target.data().menu
    }

    /**
     * update the menu for a given restaurant
     * input: expected an array of object
     * return the new menu
     */
    static async updateMenu(opts){
        if(!JEAT.type.menu(opts.menu)){
            err_message = "fail to update menu, type checker fail to check the menu";
            JEAT.logger.warn(err_message);
            throw(err_message)
        }

        let err_message;
        const target = await this.getRestaurant(opts.username)
        if(!this.checkRestaurantValid(target)){
            err_message = "fail to update Menu, restaurant is not valid"
            JEAT.logger.warn(err_message)
            throw(err_message)
        }

        //update the menu
        await col.doc(opts.username).update({
            menu:opts.menu
        })

        return await this.getMenu({...opts,table:0})
    }

    static async updateInfo(opts){
        let err_message;

        if(!JEAT.type.restaurantInfo(opts)){
            err_message = "fail to update restaurant info, type checker fail to check the info";
            JEAT.logger.warn(err_message);
            throw(err_message)
        }

        const target = await this.getRestaurant(opts.username)
        if(!this.checkRestaurantValid(target)){
            err_message = "fail to update restaurant info, restaurant is not valid"
            JEAT.logger.warn(err_message)
            throw(err_message)
        }

        //update the menu
        await col.doc(opts.username).update(opts)

        return await this.getInfo({...opts,table:0})
    }
    /**
     * get general information for a restaurant
     */
    static async getInfo(opts){
        let err_message;
        const target = await this.getRestaurant(opts.username)
        if(!this.checkRestaurantTable(target,opts.table)){
            err_message = "fail to get information of the restaurant, restaurant or table is not valid"
            JEAT.logger.warn(err_message)
            throw(err_message)
        }
        JEAT.logger.info(opts.table);
        let {name,description,loc,maxTable,size,phone,tables} = target.data();
        return {name,description,loc,maxTable,size,phone,tables}
    }

    /**
     * check the access, re-render the cart
     */
    static async checkCart(opts){
        let err_message;
        //check the type of the cart opts
        if(!(JEAT.type.cart(opts))){
            err_message = "fail to get type of opts for a cart"
            JEAT.logger.warn(err_message)
            throw(err_message)
        }
       const menu = await this.getMenu({
            username:opts.username,
            table:opts.table
       });

       let total_price = 0;
       const new_cart =[]
       opts.cart.forEach((cart_item)=>{
            let menu_item = menu.filter((item)=>item.availability && item.name === cart_item.name);
            //the cart_item exist in menu and available
            if(menu_item.length ==1){
                new_cart.push({
                    name:menu_item[0].name,
                    price:menu_item[0].discountPrice,
                    time:cart_item.time
                })
                total_price+=cart_item.time*menu_item[0].discountPrice
            }
       })

       return {cart:new_cart,total_price}
    }

}
