const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    jobId: { type: String },
    appliedUsers: [],
  },
  {
    timestamps: true,
  }
);

const AppliedJobs = mongoose.model("AppliedJobs", jobSchema);
module.exports = AppliedJobs;
