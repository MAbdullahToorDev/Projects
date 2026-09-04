require("dotenv").config();
const mongoose=require("mongoose");
const Product=require("../../toor-backend/models/Product");
const Category=require("../../toor-backend/models/Category");
const User=require("../../toor-backend/models/User");
const products=require("../seed/products.json");
const categories=require("../seed/categories.json");
const users=require("../seed/users.json");

async function seed(){
  await mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/toor");
  await Product.deleteMany({}); await Category.deleteMany({}); await User.deleteMany({});
  await Category.insertMany(categories); await Product.insertMany(products); await User.insertMany(users);
  console.log("Toor database seeded."); await mongoose.disconnect();
}
seed().catch(e=>{console.error(e);process.exit(1)});
