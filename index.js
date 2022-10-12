const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
const bizCard = require("./routes/bizCard")






const app = express();
const  PORT = process.env.PORT || 5000;





app.use(express.json());
app.use("/api/register",register);
app.use("/api/login",login);
app.use("/api/profile",profile);
app.use("/api/bizCard",bizCard);




//mongoose connect
mongoose.connect(process.env.db,{useNewUrlParser:true})
.then (console.log("Mongodb connected successfully"))
.catch ((err)=> console.log(err));









app.listen(PORT,()=>console.log("server started on port",PORT));