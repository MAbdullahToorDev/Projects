const mongoose = require("mongoose");
const schema = new mongoose.Schema({name:String,email:{type:String,required:true,unique:true},phone:String});
module.exports = mongoose.model("User",schema);
