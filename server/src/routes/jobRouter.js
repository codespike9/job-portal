const express=require("express");
const router=express.Router();
const jwtMiddleware=require("../middlewares/jwtMiddleware");

const {createJob,getAllJobs}=require("../controllers/jobController");

router.post('/add-job',jwtMiddleware.verifyAccessToken,createJob);
router.get('/get-jobs',getAllJobs);

module.exports=router;