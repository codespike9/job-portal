const express=require("express");
const router=express.Router();
const jwtMiddleware=require("../middlewares/jwtMiddleware");

const {registerEmployer,loginEmployer,registerOrUpdateCompany}=require("../controllers/emloyerController");

router.post('/employer-registration',registerEmployer);
router.post('/employer-login',loginEmployer);
router.put('/add-company',jwtMiddleware.verifyAccessToken,registerOrUpdateCompany);


module.exports=router;