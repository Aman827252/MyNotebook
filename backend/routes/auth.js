const express=require("express")
const router=express.Router()
const User=require("../models/User")
const {body,validationResult} = require("express-validator")

// router.post("/auth",(req,res)=>{

//     const newUser=User(req.body);
//     newUser.save() //We can also save the data in database using .save() function by importing the schemas.
//     console.log(req.body);
//     res.json(req.body);
// })

router.post("/auth",[
    body('name','Enter a valid name').isLength({min: 3}),
    body("email","Enter a valid email").isEmail(),
    body("password","Enter a valid password").isLength({min: 8})
],(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(user=> res.json(user)).catch(err=> res.json({error: 'Please enter a valid values'}));
})

module.exports=router;