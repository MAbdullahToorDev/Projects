const User = require("../models/User");
exports.createUser = async (req,res)=>res.status(201).json(await User.create(req.body));
exports.getUser = async (req,res)=>{const u=await User.findById(req.params.id);if(!u)return res.status(404).json({message:"User not found"});res.json(u);};
