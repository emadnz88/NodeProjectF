const jwt = require("jsonwebtoken");


module.exports = (req,res,next)=>{
    try{
        //get the token
        let token = req.header("Authorization")

        if(!token) return res.status(401).send("access denied, no token provided")

        // check token 
        let payload = jwt.verify(token,process.env.secretKey)
        req.payload = payload;
        next();

    }catch(error){
        res.status(400).send("invalid token")

    }
}
