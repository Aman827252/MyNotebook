const express=require("express")
const router=express.Router()

router.get("/notes",(req,res)=>{
    res.status(200).json([])
})

module.exports=router;