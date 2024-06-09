const express=require("express");
const router=express.Router();

const {registerEmployer,loginEmployer}=require("../controllers/emloyerController");

router.post('/employer-registration',registerEmployer);
router.post('/employer-login',loginEmployer);


module.exports=router;