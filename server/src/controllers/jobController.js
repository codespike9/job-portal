const { Applicant } = require("../models/ApplicantModels");
const CompanyDetails = require("../models/CompanyDetailsModels");
const Job = require("../models/JobModels");

const createJob = async (req, res) => {
  try {
    const { id, isEmployer } = req.user;

    if (isEmployer) {
      const data = req.body;
      data.company = id;
      const job = await Job.create(data);
      if (job) {
        const company=await CompanyDetails.findById(id);
        console.log(company);
        company.jobs.push(job._id);
        await company.save();
        return res.status(201).json({ message: "Job added successfully!" });
      } else {
        throw Error("Error creating job.");
      }
    }
    throw Error("Unauthorized access!! You are not an employer.");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const updateJobDetails=async(req,res)=>{
  try {
    const { id, isEmployer } = req.user;

    if(isEmployer){
      const data=req.body;
      const jobId=req.params.jobId;
      const job=await Job.findOneAndUpdate({_id:jobId,company:id},data,{new:true});
      return res.status(201).json({ message: "Job details updated successfully successfully!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

const deleteJob=async(req,res)=>{
  try {
    const { id, isEmployer } = req.user;

    if(isEmployer){
      const jobId=req.params.jobId;
      await Job.findOneAndDelete({_id:jobId,company:id});
      return res.status(200).json({ message: "Job details updated successfully successfully!" });
    }
    return res.status(403).json({ message: "Invalid permissions." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

const getAllJobs=async(req,res)=>{
  try {
    const jobs=await Job.find(req.query);

    if(!jobs.length){
      return res.status(404).json({message:"No jobs found!"});
    }
    return res.status(200).json({jobs:jobs});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}



const getApplicantsList = async (req, res) => {
  try {
    const { id, isEmployer } = req.user;

    if (!isEmployer) {
      return res.status(403).json({ message: "Unauthorized access for job details." });
    }

    const jobId = req.params.jobId;
    const job = await Job.findOne({ _id: jobId, company: id });

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }
    const applicant_list = await Promise.all(job.applicants.map(async (curr) => {
      const applicant_detail = await Applicant.findById(curr.applicant);
      console.log(applicant_detail);
      if (applicant_detail) {
        applicant_detail.appliedTime = curr.appliedTime;
        return applicant_detail;
      }
      return null;
    }));

    const job_details = {
      applicant_list: applicant_list, // Filter out null values if any
      job_details: job
    };

    return res.status(200).json(job_details);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports={createJob,getAllJobs,getApplicantsList,updateJobDetails,deleteJob}