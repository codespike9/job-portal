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
        company.save();
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



const getApplicantsList=async(req,res)=>{

}
module.exports={createJob,getAllJobs}