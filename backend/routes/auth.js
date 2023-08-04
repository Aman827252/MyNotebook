const express=require("express")
const router=express.Router()
const User=require("../models/User")
const {body,validationResult} = require("express-validator")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const JWT_SECRET="hellohowareyou"

// router.post("/auth",(req,res)=>{

//     const newUser=User(req.body);
//     newUser.save() //We can also save the data in database using .save() function by importing the schemas.
//     console.log(req.body);
//     res.json(req.body);
// })

router.post("/createuser",[

    body('name','Enter a valid name').isLength({min: 3}),
    body("email","Enter a valid email").isEmail(),
    body("password","Enter a valid password").isLength({min: 8})
    ],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        let user=await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({error: 'Sorry a user with this email is already exist'});
        }
        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(req.body.password,salt)

        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            // password:req.body.password
            password:secPassword //create a hashed password using bcrypt
        })
        // res.json(user)

        const data={
            user:{
                id: user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        res.json({authToken})
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
})

router.post("/login",[
    body('email','Enter a valid Email'),
    body('password','Enter a valid Password')
],async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email,password}=req.body
    try {
        const userEmail=await User.findOne({email})
        if(!userEmail){
            return res.status(404).json({msg: "Please Provide Valid Email"});
        }
        // console.log(userEmail);
        const validpass=await bcrypt.compare(password,userEmail.password);
        if(!validpass){
            return res.status(404).json({msg: "Please Provide Valid Password"});
        }

        const data={
            user:{
                id: userEmail.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        res.json({authToken})
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }

})

module.exports=router;