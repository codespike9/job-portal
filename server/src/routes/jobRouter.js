const express=require("express");
const router=express.Router();
const jwtMiddleware=require("../middlewares/jwtMiddleware");

const {createJob,getAllJobs,getApplicantsList,updateJobDetails,deleteJob}=require("../controllers/jobController");

router.post('/add-job',jwtMiddleware.verifyAccessToken,createJob);
router.get('/get-jobs',getAllJobs);
router.get('/view-applicants/:jobId',jwtMiddleware.verifyAccessToken,getApplicantsList);
router.put('/update-job-details/:jobId',jwtMiddleware.verifyAccessToken,updateJobDetails);
router.delete('/delete-job/:jobId',jwtMiddleware.verifyAccessToken,deleteJob);


module.exports=router;