"use strict";
//convert data type

module.exports = {
    restaurant(opts){
        try{
            if( typeof opts.name === "string" &&
                typeof opts.username === "string" &&
                typeof opts.password === "string" &&
                typeof opts.loc === "string" &&
                typeof opts.size === "number" &&
                typeof opts.description === "string" &&
                typeof opts.menu === "object" &&
                typeof opts.phone === "string"
                )
            return true
        }catch(e){
            JEAT.logger.error("type checker report a error for creating restaurant object")
            JEAT.logger.error(e)
            return false
        }
        return false
    }
}
