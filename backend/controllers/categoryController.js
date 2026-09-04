const Category = require("../models/Category");
exports.getCategories = async (req,res)=>res.json(await Category.find().sort({name:1}));
exports.createCategory = async (req,res)=>res.status(201).json(await Category.create(req.body));
