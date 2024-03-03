const mongoose=require("mongoose");
const mongoURI="mongodb://localhost:27017/notebook"

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected To Mongo Successfully");
    }).catch(err=> console.log(err.message))
}

module.exports=connectToMongo;