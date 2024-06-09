const middleware=require("../middlewares/jwtMiddleware");

const express=require("express");
const router=express.Router();

const applicantRouter=require("./applicantRouter");

router.use(middleware.logRequest);
router.use('/user',applicantRouter);


module.exports=router;