const express = require("express");
const auth = require("../middlewares/auth");
const joi = require("joi");
const BizCard = require("../models/BizCard");
const User = require("../models/User");
const _ = require("lodash");
const uuid = require("uuid")

const router = express.Router();


const bizCardSchema = joi.object({
    bizCardId:joi.string(),
    bizUserId:joi.string(),
    bizName:joi.string().required().min(2),
    bizDiscription:joi.string().required().min(6).max(122),
    bizAdress:joi.string().required().min(4).max(36),
    bizPhone:joi.string().required().min(9),
    bizImage:joi.string().required().min(2)
    
});
//**4**/
router.post("/",auth,async(req,res)=>{
    try{
        

        // joi validation

        const {error} = bizCardSchema.validate(req.body)
        if(error) return res.status(400).send(error.message);

        
        
        
       
        
            

            
        


        

        

        //add new bizCard 
        let bizCard = new BizCard(req.body);
       
        bizCard.bizUserId = req.payload._id;
        //create random bizCardId
        let flag = true 
        
        //while(flag){
            
             let randomId= uuid.v4()
             let chekExistId = await User.findOne({bizCardId:randomId})
             if(!chekExistId) return  randomId
             
       // }
        bizCard.bizCardId=randomId;
        await bizCard.save();
        res.status(201).send(bizCard);




    }catch(error){
        res.status(400).send("error in card"+error)

    }
})



//**5**/ get a bizcard by bizCardId
router.get("/:bizCardId",auth,async(req,res)=>{
    try{
        let bizCard = await BizCard.findOne({bizCardId:req.params.bizCardId})
        if(!bizCard) return res.status(404).send("bizCard does not exist")
        res.status(200).send(bizCard)

    }catch(error){
        res.status(400).send("error in get bizCard");

    }

})




//**6**/
//update bizCard by bizCardId

router.put("/:bizCardId",auth,async(req,res)=>{
    try{

        //joi validation
        const {error} = bizCardSchema.validate(req.body)
        if(error) return res.status(400).send(error.message)


        //search if exist
        let bizcard = await BizCard.findOne({bizCardId:req.params.bizCardId})
        if(!bizcard) return res.status(404).send("bizCard does not exist" )

        //update bizCard

        bizcard = await BizCard.findOneAndUpdate({bizCardId:req.params.bizCardId},req.body,{new:true});
        res.status(200).send(bizcard)

    }catch(error){
        res.status(400).send("error in put bizCars")
    }
    
})

//**7**/
//delete bizCard by bizCardId
router.delete("/:bizCardId",auth,async(req,res)=>{
    try{
        let bizCard = await BizCard.findOneAndRemove({bizCardId:req.params.bizCardId})
        if(!bizCard) return res.status(404).send("theres not sush bizCard");
        res.status(200).send("bizCard is deleted successfully")

    }catch(error){
        res.status(400).send("error in delet bizCard")
    }
})


//**8**/ get all bizCard
 router.get("/:bizUserId",auth,async(req,res)=>{
    try{
        let bizCard = await BizCard.find();
        res.status(200).send(bizCard)


    }catch(error){
        res.status(400).send("error in get bizCrds")
    }
 })


module.exports = router;