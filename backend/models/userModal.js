// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String },
//     lastName: { type: String },
//     email: { type: String, required: true },
//     contact: { type: String, required: true },
//     password: { type: String, required: true },
//     isActivated: { type: Boolean, default: true },
//     role: { type: String, default: "Candidate" },
//     linkedinUrl: { type: String },
//     currentRole: { type: String },
//     age: { type: String },
//     yearsOfExp: { type: String },
//     cctc: { type: String },
//     location: { type: String },
//     skills: [],
//     experience: [],
//     about: { type: String },
//     subscribed: { type: Boolean, default: false },
//     profileImage: {
//       type: String,
//       default:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx9tjaExsY-srL4VsHNE_OKGVCJ-eIFNBktw&usqp=CAU",
//     },
//     //appliedJobs: [],
//     //appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
//     appliedJobs: [{
//       job: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' },
//       quizScore: Number, // Store the quiz score associated with the job
//       // Any other relevant fields related to the applied job can be added here
//     }]
//   },

//   {

//     resume: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("User", userSchema);
// module.exports = User;

// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String },
//     lastName: { type: String },
//     email: { type: String, required: true },
//     contact: { type: String, required: true },
//     password: { type: String, required: true },
//     isActivated: { type: Boolean, default: true },
//     role: { type: String, default: "Candidate" },
//     linkedinUrl: { type: String },
//     currentRole: { type: String },
//     age: { type: String },
//     yearsOfExp: { type: String },
//     cctc: { type: String },
//     location: { type: String },
//     skills: [],
//     experience: [],
//     about: { type: String },
//     subscribed: { type: Boolean, default: false },
//     profileImage: {
//       type: String,
//       default:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx9tjaExsY-srL4VsHNE_OKGVCJ-eIFNBktw&usqp=CAU",
//     },
//     //appliedJobs: [],
//     //appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
//     appliedJobs: [{
//       job: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' },
//       quizScore: Number, // Store the quiz score associated with the job
//       skillMatchScore: Number,
//       matchedSkills: []
//       // Any other relevant fields related to the applied job can be added here
//     }]
//   },
//   {
//     resume: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("User", userSchema);
// module.exports = User;



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    resume: { type: String },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: true },
    role: { type: String, default: "Candidate" },
    linkedinUrl: { type: String },
    currentRole: { type: String },
    age: { type: String },
    yearsOfExp: { type: String },
    location: { type: String },
    skills: [],
    experience: [],
    about: { type: String },
    subscribed: { type: Boolean, default: false },
    
    profileImage: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx9tjaExsY-srL4VsHNE_OKGVCJ-eIFNBktw&usqp=CAU",
    },
    appliedJobs: [{
      job: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' },
      quizScore: Number, // Store the quiz score associated with the job
      skillMatchScore: Number,
      matchedSkills: [],
      // Any other relevant fields related to the applied job can be added here
    }],
    // Define the resume field here
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
