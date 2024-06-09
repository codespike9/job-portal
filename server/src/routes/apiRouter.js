const middleware=require("../middlewares/jwtMiddleware");

const express=require("express");
const router=express.Router();

const applicantRouter=require("./applicantRouter");
const employerRouter=require("./employerRouter");
const jobRouter=require("./jobRouter");

router.use(middleware.logRequest);
router.use('/user',applicantRouter);
router.use('/employer',employerRouter);
router.use('/jobs',jobRouter);


module.exports=router;