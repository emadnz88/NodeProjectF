const express = require("express");
const joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/User");




const router = express.Router();


const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email().min(6),
    password: joi.string().required().min(8),
    biz: joi.boolean().required()

});

//**1**/
router.post("/",async(req,res)=>{
    try{
        //joi validation

        const {error} = registerSchema.validate(req.body)
        if (error) return res.status(400).send(error.message)


        // user exist
        let user = await User.findOne({email:req.body.email})
        if(user) return res.status(400).send("user already exist")

        //add new user
        user = new User(req.body);
        

        //encrypt password
        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(user.password,salt);


         await user.save();
        res.status(201).send(_.pick(user,["_id","name","email"]))
        

       



    }catch(error){
        res.status(400).send("Error in register")

    }
})


module.exports = router;





