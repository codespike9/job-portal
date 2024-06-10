const express=require("express");
const router=express.Router();
const jwtMiddleware=require("../middlewares/jwtMiddleware");
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'resume') {
            cb(null, 'D:/glosity-assignment/job-portal/server/public/resume');
        } else if (file.fieldname === 'avatar') {
            cb(null, 'D:/glosity-assignment/job-portal/server/public/images');
        } else {
            cb(new Error('Invalid field name'), null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Create multer instance
const upload = multer({ storage });


const {registerApplicant,loginApplicant,applyForJob,updateOrAddProfileDetails,viewProfile,addEducation,deleteEducation,updateEducation}=require("../controllers/applicantController");

router.post('/user-registration',registerApplicant);
router.post('/user-login',loginApplicant);
router.put('/apply/:jobId',jwtMiddleware.verifyAccessToken,applyForJob);
router.put('/update-profile', jwtMiddleware.verifyAccessToken, upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'avatar', maxCount: 1 }]), updateOrAddProfileDetails);
router.get('/view-profile',jwtMiddleware.verifyAccessToken,viewProfile);
router.post('/profile/education/add', jwtMiddleware.verifyAccessToken, addEducation);
router.put('/profile/education/:educationId/update', jwtMiddleware.verifyAccessToken, updateEducation);
router.delete('/profile/education/:educationId/delete', jwtMiddleware.verifyAccessToken, deleteEducation);


module.exports=router;