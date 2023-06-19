const express = require('express')
const router = express.Router()

//check the restaurant name and table number
//render the menu
router.get("/getMenu", async(req,res)=>{
    const name = req.query.name;
    const table = req.query.table;
    if(!name || !table){
        JEAT.logger.error("fail to get menu, the query is undefined")
        res.send(502)
        return
    }
    const menu = await JEAT.models.restaurant.getMenu({
        username:name,
        table,
    })
    res.send(menu)
})


router.get("/getInfo", async(req,res)=>{
    const name = req.query.name;
    const table = req.query.table;
    if(!name || !table){
        JEAT.logger.error("fail to get info, the query is undefined")
        res.send(502)
        return
    }
    const info = await JEAT.models.restaurant.getInfo({
        username:name,
        table,
    })
    res.send(info)
})

//perform sanity check to the cart to make sure e
//1) every item exist
//2) item has the same price
//3) re-render the items
router.post("/checkCart", async(req,res)=>{
    const name = req.query.name;
    const table = req.query.table;
    if(!name || !table){
        JEAT.logger.error("fail to check the cart, the query is undefined")
        res.send(502)
        return
    }

    const total_price = req.body.total_price //this may not be needed if we re-render the cart
    const cart = req.body.cart

    const new_cart = await JEAT.models.restaurant.checkCart({
        username:name,
        table,
        cart,
        total_price
    })

    res.send(new_cart)
})
module.exports = router
