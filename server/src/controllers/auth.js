const express = require('express')
const router = express.Router()

//register a new restaurant
//crypto primitive is used, currently, we only allow ourself for registration and updating the restaurant
router.post("/register", async(req,res,next)=>{
    try{
        const data = req.body.data
        if(!JEAT.crypto.verifyTimeSignature(JSON.stringify(data),req.body.authCode, req.body.timestamp)){
            res.status(500).send("fail to check the authentication, cannot register")
            return;
        }
        const newRestaurant = await JEAT.models.restaurant.register(data)
        res.send(newRestaurant)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})
module.exports = router

//update menu
router.post("/updateMenu", async(req,res)=>{
    const data = req.body.data
    try{
        const data = req.body.data
        if(!JEAT.crypto.verifyTimeSignature(JSON.stringify(data),req.body.authCode, req.body.timestamp)){
            res.status(500).send("fail to check the authentication, cannot register")
            return;
        }
        const new_menu = await JEAT.models.restaurant.updateMenu(data)
        res.send(new_menu)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.post("/updateInfo", async(req,res)=>{
    const data = req.body.data
    if(!JEAT.crypto.verifyTimeSignature(JSON.stringify(data),req.body.authCode, req.body.timestamp)){
        res.status(500).send("fail to check the authentication, cannot update menu")
        return;
    }
})
module.exports = router
