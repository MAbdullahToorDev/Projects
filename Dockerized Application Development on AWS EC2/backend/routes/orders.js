const router=require("express").Router();const c=require("../controllers/orderController");
router.get("/",c.getOrders);router.post("/",c.createOrder);module.exports=router;