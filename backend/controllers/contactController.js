const Contact = require("../models/Contact");
exports.createContact = async (req,res)=>res.status(201).json(await Contact.create(req.body));
