const Product = require("../models/Product");
exports.getProducts = async (req,res)=>res.json(await Product.find().sort({createdAt:-1}));
exports.getProduct = async (req,res)=>{const p=await Product.findById(req.params.id); if(!p)return res.status(404).json({message:"Product not found"}); res.json(p);};
exports.createProduct = async (req,res)=>res.status(201).json(await Product.create(req.body));
exports.updateProduct = async (req,res)=>{const p=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});res.json(p);};
exports.deleteProduct = async (req,res)=>{await Product.findByIdAndDelete(req.params.id);res.json({message:"Product deleted"});};
