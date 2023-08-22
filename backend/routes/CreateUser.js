const express = require('express')
const User = require('../model/User')
const { body, validationResult } = require('express-validator');


const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const jwtSecret="thisisjwtSecrethisisjwtSecrethisisjwtSecret"
const router=express.Router()

router.post("/createuser",[
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password','Incorrect password').isLength({ min: 5 })
],
async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10);
    let decodePass=await bcrypt.hash(req.body.password,salt)

    try {
       await User.create({
          name:req.body.name,
          password:decodePass,
          email:req.body.email,
          location:req.body.location
        }).then(res.json({success:true}))
          
      }


   


    catch(errors){
     console.log(errors)
     res.json({success:false});
    }
})


//user log in................
router.post("/login",[
  body('email','email not found').isEmail(),
  
  body('password','Incorrect password').isLength({ min: 5 })
],

async(req,res)=>{

  let email=req.body.email
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }



  try {
     let userData=await User.findOne({email})
     if(!userData){
      return res.status(400).json({ errors: "try with valid email & password"});
     }

     const comparePass=bcrypt.compare(req.body.password,userData.password)

     const data={
      user:{
        id:userData.id
      }
      
     }

     const authToken=jwt.sign(data,jwtSecret)
     if(!comparePass)
     {
      return res.status(400).json({ errors: "try with valid password"});
     }else {
      return res.json({success:true, authToken:authToken});
     }
     
        
    }

 catch(errors){
   console.log(errors)
   res.json({success:false});
  }
})

module.exports = router ;