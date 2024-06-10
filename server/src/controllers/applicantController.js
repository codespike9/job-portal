const { generateToken } = require("../middlewares/jwtMiddleware");
const { Applicant } = require("../models/ApplicantModels");
const Job=require("../models/JobModels");


const registerApplicant = async (req, res) => {
  try {
    const { email, mobile_no, password, name, address } = req.body;
    const new_applicant = await Applicant.create({
      email,
      mobile_no,
      password,
      name,
      address,
    });

    const payload = {
      id: new_applicant.id,
      isEmployer: false,
    };

    const access_token = generateToken(payload);
    if (new_applicant && access_token) {
      res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });
      return res.status(201).json({
        access_token: access_token,
        user: {
          username: new_applicant.name,
          email: new_applicant.email,
          mobile_no: new_applicant.mobile_no,
        },
        message: "Registration successfull!!",
      });
    } else {
      return res.status(400).json({ message: "Some error occurred!" });
    }
  } catch (error) {
    console.error(error);
  }
};
const loginApplicant = async (req, res) => {
  try {
    const data = req.body;
    const userData = await Applicant.findOne({
      $or: [{ mobile_no: data.identification }, { email: data.identification }],
    });

    if (!userData || !(await userData.comparePassword(data.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const payload = {
      id: userData.id,
      isEmployer: false,
    };

    const access_token = generateToken(payload);
    if (userData && access_token) {
      res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });
    }
    return res.status(201).json({
      access_token: access_token,
      user: {
        username: userData.name,
        email: userData.email,
        mobile_no: userData.mobile_no,
      },
      message: "Login successful!!",
    });
  } catch (error) {
    console.error(error);
  }
};


const applyForJob=async(req,res)=>{
  try {
    const {id,isEmployer}=req.user;
    const jobId=req.params.jobId;
    if(isEmployer)
      throw Error("Unauthorized Access!! Employers cannot apply.");
    const job=await Job.findOneAndUpdate({_id:jobId},{$push:{applicants:{applicant:id}}},{new:true});
    if(!job){
      throw Error("Can not apply for the job");
    }
    return res.status(201).json({message:"Applied for job successfully."});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

const updateOrAddProfileDetails = async (req, res) => {
  if (!(req.user.isEmployer)) {
      try {
          const { id } = req.user;
          const { name, email, mobile_no } = req.body;
          const avatar = req.files['avatar'] ? req.files['avatar'][0].path : null;
          const resume = req.files['resume'] ? req.files['resume'][0].path : null;

          const updateData = {
              name,
              email,
              mobile_no,
          };

          if (avatar) updateData.avatar = avatar;
          if (resume) updateData.resume = resume;

          const user = await Applicant.findOneAndUpdate({ _id: id }, updateData, { new: true });

          if (user) {
              return res.status(200).json({ "message": "User details updated successfully!" });
          } else {
              return res.status(400).json({ "message": "Some error occurred!" });
          }
      } catch (error) {
          return res.status(400).json({ "message": error.message });
      }
  } else {
      return res.status(403).json({ "message": "Forbidden: You are not authorized to perform this action" });
  }
};

async function viewProfile (req, res) {
  if (!(req.user.isEmployer)) {
      const { id } = req.user;
      const user = await Applicant.findOne({ _id: id },{password:0});

      if (user) {
          return res.status(200).json({ "user" : user });
      } else {
          return res.status(400).json({ "message" : "Some error occurred!" });
      }
  } else {
      return res.status(403).json({ "message" : message_403 });
  }
}

async function addEducation (req, res) {
  if (!(req.user.isEmployer)) {
      try {
          const { id } = req.user;
          const { institutionName, degree, yearOfPassing } = req.body;
          
          const user = await Applicant.findOneAndUpdate({ _id: id }, {
              $push : {
                  education: {
                      instituteName: institutionName,
                      degree: degree,
                      passingYear: yearOfPassing
                  }
              }
          }, {
              new: true
          });

          if (user) {
              return res.status(200).json({ "message" : "Education added successfully!" });
          } else {
              return res.status(400).json({ "message" : "Some error occurred!" });
          }
      } catch (error) {
          return res.status(400).json({ "message" : error.message });
      }
  } else {
      return res.status(403).json({ "message" : message_403 });
  }
}

async function updateEducation (req, res) {
  if (!(req.user.isEmployer)) {
      try {
          const { id } = req.user;
          const { educationId } = req.params;
          const { instituteName, degree, passingYear } = req.body;

          const user = await Applicant.findOneAndUpdate({ _id: id, "education._id": educationId },
          {
              $set: {
              "education.$.instituteName": instituteName,
              "education.$.degree": degree,
              "education.$.passingYear": passingYear
              }
          },
          { new: true });

          if (user) {
              return res.status(200).json({ "message": "Education updated successfully!" });
          } else {
              return res.status(404).json({ "message" : "No such education found" });
          }
      } catch (error) {
          return res.status(400).json({ "message" : error.message });
      }
  } else {
      return res.status(403).json({ "message" : message_403 });
  }
}

async function deleteEducation (req, res) {
  if (!(req.user.isEmployer)) {
      try {
          const { id } = req.user;
          const { educationId } = req.params;

          const user = await Applicant.findOneAndUpdate({ _id: id },
          {
              $pull: {
                  education: { _id: educationId }
              }
          },
          { new: true });

          if (user) {
              return res.status(200).json({ user: user });
          } else {
              return res.status(404).json({ "message" : "No such education found" });
          }
      } catch (error) {
          return res.status(400).json({ "message" : error.message });
      }
  } else {
      return res.status(403).json({ "message" : message_403 });
  }
}

module.exports = { registerApplicant,loginApplicant,applyForJob,viewProfile,updateOrAddProfileDetails,addEducation,deleteEducation,updateEducation};
