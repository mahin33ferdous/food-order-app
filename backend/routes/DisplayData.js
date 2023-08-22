const express = require('express')
const User = require('../model/User')
const router=express.Router()
router.post("/fooddata",async (req,res)=>{
 
    try{

        //console.log(global.food_items)
        //res.send([global.food_items])
       await console.log( (global.food_items))
        res.send([global.food_items,global.foodCategory])
        
        // try {
        //     await User.create({
        //        name:req.body.name,
        //        password:decodePass,
        //        email:req.body.email,
        //        location:req.body.location
        //      }).then(res.json({success:true}))
               
        //    }

    }
    catch(errors){
        console.log(errors)
        //res.json({success:false});
         res.send("server not working")
       }


})

module.exports = router ;