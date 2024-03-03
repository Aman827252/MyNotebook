const express=require("express")
var cors = require('cors')
const app=express()
const mongoDB=require("./db")
const port=5000
mongoDB();

app.use(cors())
app.use(express.json())

app.use("/api",require("./routes/notes"))
app.use("/api",require("./routes/auth"))

app.listen(port,()=>{
    console.log(`Server Running at ${port}`);
})