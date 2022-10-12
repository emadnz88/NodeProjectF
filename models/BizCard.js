const mongoose = require("mongoose");

const bizCardSchema = new mongoose.Schema({
    bizUserId :{
        type :String,
        
        

    },
    bizCardId:{
        type:String,

    },
    bizName :{
        type : String,
        required : true,
        minlength : 2
    },
    bizDiscription :{
        type : String,
        required : true,
        minlength : 6 ,
        maxlength : 122
    },
    bizAdress:{
        type : String,
        required : true,
        minlength : 4,
        maxlength :36
    },

    bizPhone :{
        type : String,
        required : true,
        minlength: 9 
    },

    bizImage:{
        type : String,
        required : true,
        minlength : 2
        }

    



})


const BizCard = mongoose.model("bizCards",bizCardSchema);
module.exports = BizCard;
