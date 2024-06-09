const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'CompanyDetails',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['internship', 'full-time', 'part-time'],
    required: true
  },
  workMode: {
    type: String,
    enum: ['remote', 'onsite'],
    required: true
  },
  responsibilities: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  CTC: {
    type: Number,
    validate: {
      validator: function(value) {
        return this.jobType !== 'internship' && this.jobType !== 'part-time' || value != null;
      },
      message: 'CTC is required for full-time jobs'
    }
  },
  stipend: {
    type: Number,
    validate: {
      validator: function(value) {
        return this.jobType === 'internship' || value != null;
      },
      message: 'Stipend is required for internships'
    }
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  jobVisibility: {
    type:String,
    enum:['private','public'],
    default:'public'
  },
  applicants: [{
    applicant:{
      type: Schema.Types.ObjectId,
      ref: 'Applicant',
    },
    appliedTime:{
      type:Date,
      default:Date.now
    },
    // type: Schema.Types.ObjectId,
    // ref: 'Applicant',
  }]
});

// Create a model based on the schema
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
