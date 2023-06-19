"use strict";
//convert data type

module.exports = {
    restaurant(opts){
        try{
            if( typeof opts.name !== "string" ||
                typeof opts.username !== "string" ||
                typeof opts.password !== "string" ||
                typeof opts.loc !== "string" ||
                typeof opts.size !== "number" ||
                typeof opts.description !== "string" ||
                typeof opts.phone !== "string" ||
                typeof opts.maxTable !== "number" ||
                !Array.isArray(opts.menu)
                )
            return false
            opts.menu.forEach(item=>{
               if(! JEAT.type.item(item)) throw(new Error())
            })
        }catch(e){
            JEAT.logger.error("type checker report a error for creating restaurant object")
            JEAT.logger.error(e)
            return false
        }
        return true
    },
    item(opts){
        try{
            if( typeof opts.name !== "string" ||
                typeof opts.description !== "string" ||
                typeof opts.price !== "number" ||
                typeof opts.discountPrice !== "number" ||
                typeof opts.type !== "string" ||
                typeof opts.availability !== "boolean" ||
                !Array.isArray(opts.ingredient))
            return false
            opts.ingredient.forEach(ingredient=>{
                if( typeof ingredient!== "string")
                throw(new Error())
            })
        }catch(e){
            JEAT.logger.error("type checker report a error for cheking item(food) object")
            JEAT.logger.error(e)
            return false
        }
        return true
    },
    cart(opts){
        try{
            if( typeof opts.username !== "string" ||
                typeof opts.table !== "string" ||
                typeof opts.total_price !== "number" ||
                !Array.isArray(opts.cart))
            return false
            opts.cart.forEach(item=>{
                if( typeof item.name !== "string" ||
                    typeof item.price !== "number" ||
                    typeof item.time !== "number" )
                throw(new Error())
            })
        }catch(e){
            JEAT.logger.error("type checker report a error for creating restaurant object")
            JEAT.logger.error(e)
            return false
        }
        return true
    }
}
