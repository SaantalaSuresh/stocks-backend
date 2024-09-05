const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AuthRouter = require("./routes/authRoutes")

dotenv.config()
const app = express()


app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRouter);






mongoose.connect(process.env.MONGODBURL)
.then(()=>{
    console.log("MONGODB connected Successfully");
    app.listen(4000,()=>{
        console.log("Server is running on port 4000");
    })
})
.catch(e=>{
    console.log(e.message)
})