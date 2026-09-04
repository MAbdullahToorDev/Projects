const mongoose = require("mongoose");
const schema = new mongoose.Schema({name:{type:String,required:true,unique:true},description:String,image:String});
module.exports = mongoose.model("Category",schema);
