const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name:{type:String,required:true}, description:String, category:{type:String,required:true},
  price:{type:Number,required:true}, salePrice:Number, discount:Number, image:String,
  emoji:String, stock:{type:Number,default:0}, rating:{type:Number,default:0}
},{timestamps:true});
module.exports = mongoose.model("Product",schema);
