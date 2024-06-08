const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String },
    companyName: { type: String },
    location: { type: String },
    salary: { type: String },
    jobDescription: { type: String },
    jobSkills: { type: String },
    jobRequirements: { type: String },
    jobType: { type: String },
    education: { type: String },
    experienceLevel: { type: String },
    applicationInstructions: { type: String },
    applicationDeadline: { type: String },
    experienceLevel: { type: String },
    educationLevel: { type: String },
    contactInformation: { type: String },
    companyDescription: { type: String },
    companyWebsite: { type: String },
    social_media_links: [],
    additional_features: { type: String },
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.model("Jobs", jobSchema);
module.exports = Jobs;
