const Order = require("../models/Order");
exports.createOrder = async (req,res)=>res.status(201).json(await Order.create(req.body));
exports.getOrders = async (req,res)=>res.json(await Order.find().populate("products.product").sort({createdAt:-1}));
