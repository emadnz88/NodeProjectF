const express = require("express");
const _ = require("lodash");
const User = require("../models/User");
const auth = require("../middlewares/auth");

const router = express.Router();
//**3**/
router.get("/",auth,async(req,res)=>{
    try{
        let user = await User.findById(req.payload._id)
        if(!user) return res.status(404).send("wrong details")
        res.status(200).send(_.pick(user,["id","name","email","biz"]))
    }catch(error){
        return res.status(400).send(error)
    }

    

})
module.exports = router;