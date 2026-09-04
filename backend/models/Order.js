const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  products:[{product:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},quantity:Number,price:Number}],
  total:Number,address:String,status:{type:String,default:"pending"}
},{timestamps:true});
module.exports = mongoose.model("Order",schema);
