const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    // obj={
    //     a:'yfyj',
    //     n: 5
    // }
    res.json([]);
})

module.exports=router;