const express = require('express')
const session = require('express-session')
const axios = require('axios')
const router = express.Router()

router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

/*router.get("/template", async(req,res,next)=> {
    try{
        const name = req.query.name;
        const table = req.query.table;
        if(!name || !table){
            JEAT.logger.error("fail, the query is undefined")
            res.status(502).send("fail, the query is undefined")
            return
        }
        
        res.send()
    }catch(e){
        res.status(500).send(e.message)
    }
})*/

router.get("/:restaurantName/viewTab", async(req,res,next)=> {
    try{
        const name = req.params.restaurantName;
        const table = req.query.table;
        if(!name || !table){
            JEAT.logger.error("fail, the query is undefined")
            res.status(502).send("fail, the query is undefined")
            return
        }

        let val = await JEAT.models.restaurant.viewTab({ 
            username:name, 
            table, 
        });

        if (val == -1)
            return res.status(403).send(`failed to view tab, table ${table} has no open tab`);
        
        res.send(val);
    }catch(e){
        res.status(500).send(e.message)
    }
})

//open tab at specific table
router.get('/:restaurantName/openTab', async(req,res,next)=> {
    try{
        const name = req.params.restaurantName;
        const table = req.query.table;
        if(!name || !table){
            JEAT.logger.error("failed to open tab, the query is undefined")
            return res.status(502).send("failed to open tab, the query is undefined") 
        }

        let val = await JEAT.models.restaurant.openTab({ 
            username:name, 
            table, 
        })

        if (val == -1)
            return res.status(403).send(`failed to open tab, table ${table} is already occupied`)
        else if (val == -2)
            return res.status(403).send("restaurant or table is not valid")
        
        res.send(`Opened tab at table ${table}`);
    }catch(e){
        res.status(500).send(e.message)
    }
})

//close tab at table
router.get('/:restaurantName/closeTab', async(req,res,next)=> {
    try{
        const name = req.params.restaurantName;
        const table = req.query.table;
        if(!name || !table){
            JEAT.logger.error("failed to close tab, the query is undefined")
            return res.status(502).send("failed to close tab, the query is undefined")
        }

        if (await JEAT.models.restaurant.closeTab({ username:name, table, }) == 1)
            return res.status(203).send(`no tab to close at table ${table}`);
        
        res.send(`Closed tab at table ${table}`);
    }catch(e){
        res.status(500).send(e.message)
    }
})

//add item to table and personal tab
router.get('/:restaurantName/addToTab', async(req,res,next) => {
    try {
        const name = req.params.restaurantName;
        const table = req.query.table;
        const item = req.query.item;

        if(!name || !table || !item){
            JEAT.logger.error("failed to add to tab, the query is undefined")
            return res.status(402).send("failed to add to tab, the query is undefined")
        }

        let val = await JEAT.models.restaurant.addToTab({
            username: name,
            table,
            item,
        })

        if (val == -1)
            return res.status(404).send(`failed to add to tab, no tab open at table ${table }`);
        else if (val == -2)
            return res.status(404).send(`failed to add to tab, item ${item} not on menu`);

        res.send(`Added x1 ${item} to tab at table ${table}`);

    } catch(e) {
        res.status(500).send(e.message)
    }
});

//check the restaurant name and table number
//render the menu
router.get("/getMenu", async(req,res,next)=>{
    try{
        const name = req.query.name;
        const table = req.query.table;
        if(!name || !table){
            JEAT.logger.error("fail to get menu, the query is undefined")
            res.status(502).send("fail to get menu, the query is undefined")
            return
        }
        const menu = await JEAT.models.restaurant.getMenu({
            username:name,
            table,
        })
        res.send(menu)
    }catch(e){
        res.status(500).send(e.message)
    }
})


router.get("/getInfo", async(req,res,next)=>{
    try{
        const name = req.query.name;
        const table = req.query.table;
        if(!name || !table){
            JEAT.logger.error("fail to get info, the query is undefined")
            res.status(502).send("fail to get info, the query is undefined")
            return
        }
        const info = await JEAT.models.restaurant.getInfo({
            username:name,
            table,
        })
        res.send(info)
    }catch(e){
        res.status(500).send(e.message)
    }
})

//perform sanity check to the cart to make sure e
//1) every item exist
//2) item has the same price
//3) re-render the items
router.post("/checkCart", async(req,res,next)=>{
    try{
        const name = req.query.name;
        const table = req.query.table;
        if(!name || !table){
            JEAT.logger.error("fail to check the cart, the query is undefined")
            res.status(502).send("fail to check the cart, the query is undefined")
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
    }catch(e){
        res.status(500).send(e.message)
    }
})
module.exports = router
