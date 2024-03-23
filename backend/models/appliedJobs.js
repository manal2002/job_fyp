const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    //companyId: { type: String },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs" },
    //appliedUsers: [],
    appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const AppliedJobs = mongoose.model("AppliedJobs", jobSchema);
module.exports = AppliedJobs;



// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const jobSchema = new Schema(
//   {
//     companyId: { type: String }, // Assuming companyId is a string
//     jobId: { type: Schema.Types.ObjectId, ref: "Jobs" }, // Assuming this is the job ID
//     appliedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of user references
//   },
//   {
//     timestamps: true,
//   }
// );

// const AppliedJobs = mongoose.model("AppliedJobs", jobSchema);
// module.exports = AppliedJobs;
