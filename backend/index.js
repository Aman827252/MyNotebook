const express=require("express")
const app=express()
const mongoDB=require("./db")
const port=5000
mongoDB();

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({msg: 'Hello'})
})

app.use("/api",require("./routes/notes"))
app.use("/api",require("./routes/auth"))

app.listen(port,()=>{
    console.log(`Server Running at ${port}`);
})