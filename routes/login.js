const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const User = require("../models/User");



const router = express.Router();


// login schema

const loginSchema = joi.object({
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(8)
})

//**2**/
router.post("/",async(req,res)=>{
    try{
        // joi validation
        const {error} = loginSchema.validate(req.body);
        if(error) return res.status(400).send(error.message);


        // check for exist user
        let user = await User.findOne({email:req.body.email})
        if(!user) return res.status(404).send("wrong email or password")

        //compare the password
        const compareResult = await bcrypt.compare(req.body.password,user.password);

        if(!compareResult) return res.status.send("wrong email or password")

       

        // return token
        const genToken =jwt.sign({_id:user._id,biz:user.biz},process.env.secretKey)


         res.status(200).send(genToken)

    }catch(error){
        res.status(400).send("error in login")

    }

})


module.exports = router;