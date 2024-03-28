const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    //companyId: { type: String },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs" },
    
    // appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    appliedUsers: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      quizScore: Number, // Store the quiz score associated with the job
      skillMatchScore: Number,
      matchedSkills: []
      // Any other relevant fields related to the applied job can be added here
    }],
  },
  {
    timestamps: true,
  }
);

const AppliedJobs = mongoose.model("AppliedJobs", jobSchema);
module.exports = AppliedJobs;


