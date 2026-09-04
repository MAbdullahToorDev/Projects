const router=require("express").Router();const c=require("../controllers/userController");
router.post("/",c.createUser);router.get("/:id",c.getUser);module.exports=router;