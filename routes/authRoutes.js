const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../modules/userSchema");

const JWT_SECRET = 'my_secrct_key'; 

router.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        if(!name || !email || !password){
            return res.status(400).json({message:"Please fill in all fields"});
        }
        const user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({message:"User All Ready Exits"})

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await User.create({name,password:hashedPassword,email});
        res.status(201).json({message:"User created successfully",data:data});
    }catch(e){
        console.log(e.message);
        
    }
})



router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        if(!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
        }

                 const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h', 
        });

        
        res.json({
            message: "Login successful",
            token,  
        });

    }catch(e){
        console.log(e.message)
    }

})


module.exports = router;