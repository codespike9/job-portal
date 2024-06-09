const express=require("express");
const router=express.Router();

const {registerApplicant,loginApplicant}=require("../controllers/applicantController");

router.post('/user-registration',registerApplicant);
router.post('/user-login',loginApplicant);


module.exports=router;