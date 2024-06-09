const express=require("express");
const router=express.Router();
const jwtMiddleware=require("../middlewares/jwtMiddleware");

const {registerApplicant,loginApplicant,applyForJob}=require("../controllers/applicantController");

router.post('/user-registration',registerApplicant);
router.post('/user-login',loginApplicant);
router.put('/apply/:jobId',jwtMiddleware.verifyAccessToken,applyForJob);


module.exports=router;