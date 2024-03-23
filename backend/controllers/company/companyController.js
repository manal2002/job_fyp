// const Jobs = require("../../models/jobModal");
// const { successResponse, errorResponse } = require("../../constants/response");
// const User = require("../../models/userModal");
// module.exports = {
//   addJob: (data) => {
//     return new Promise((resolve, reject) => {
//       Jobs.create(data).then(() => {
//         resolve(successResponse);
//       });
//     });
//   },
//   getMyJobs: () => {
//     return new Promise((resolve, reject) => {
//       Jobs.find().then(async (result) => {
//         let ids = [];
//         let jobArr = [];
//         if (result.length > 0) {
//           let jobObj = {};
//           for (let i = 0; i < result.length; i++) {
//             const e = result[i];
//             jobObj.job = e;
//             const jobids = e?._id;
//             ids.push(jobids);
//           }
//           if (ids.length > 0) {
//             let appliedUser = await User.find({ appliedJobs: { $in: ids } });
//             jobObj.applied_users = appliedUser;
//           }
//           jobArr.push(jobObj);
//         }

//         successResponse.data = jobArr;

//         resolve(successResponse);
//       });
//     });
//   },
// };


// const Jobs = require("../../models/jobModal");
// const AppliedJobs = require("../../models/appliedJobs");
// const User = require("../../models/userModal");
// const { successResponse, errorResponse } = require("../../constants/response");

// module.exports = {
//   addJob: (data) => {
//     return new Promise((resolve, reject) => {
//       Jobs.create(data).then(() => {
//         resolve(successResponse);
//       }).catch(error => {
//         console.error("Error in addJob:", error);
//         reject(error);
//       });
//     });
//   },

//   getMyJobs: async () => {
//     try {
//       const jobs = await Jobs.find();
//       const jobArr = [];

//       for (let i = 0; i < jobs.length; i++) {
//         const job = jobs[i];
//         const jobObj = { job };

//         const appliedJob = await AppliedJobs.findOne({ jobId: job._id });
//         if (appliedJob) {
//           const appliedUsers = await User.find({ _id: { $in: appliedJob.appliedUsers } });
//           jobObj.applied_users = appliedUsers;
//         }

//         jobArr.push(jobObj);
//       }

//       successResponse.data = jobArr;
//       return successResponse;
//     } catch (error) {
//       console.error("Error in getMyJobs:", error);
//       throw error;
//     }
//   }
// };


// const Jobs = require("../../models/jobModal");
// const AppliedJobs = require("../../models/appliedJobs");
// const User = require("../../models/userModal");
// const { successResponse, errorResponse } = require("../../constants/response");

// module.exports = {
//   addJob: async (data) => {
//     try {
//       await Jobs.create(data);
//       return successResponse;
//     } catch (error) {
//       console.error("Error in addJob:", error);
//       throw error;
//     }
//   },

//   getMyJobs: async () => {
//     try {
//       const jobs = await Jobs.find();
//       const jobArr = [];

//       for (let i = 0; i < jobs.length; i++) {
//         const job = jobs[i];
//         const jobObj = { job };

//         const appliedJob = await AppliedJobs.findOne({ jobId: job._id });
//         if (appliedJob) {
//           const appliedUsers = await User.find({ _id: { $in: appliedJob.appliedUsers } });
//           jobObj.applied_users = appliedUsers;
//         } else {
//           jobObj.applied_users = []; // Set applied users to an empty array if no users applied
//         }

//         jobArr.push(jobObj);
//       }

//       successResponse.data = jobArr;
//       return successResponse;
//     } catch (error) {
//       console.error("Error in getMyJobs:", error);
//       throw error;
//     }
//   }
// };


const Jobs = require("../../models/jobModal");
const AppliedJobs = require("../../models/appliedJobs");
const User = require("../../models/userModal");
const { successResponse, errorResponse } = require("../../constants/response");

module.exports = {
  // Function to add a job
  addJob: (data) => {
    console.log("Data received for adding job:", data);
    return new Promise((resolve, reject) => {
      Jobs.create(data)
        .then(() => {
          console.log("Job added successfully");
          resolve(successResponse("Job added successfully"));
        })
        .catch((error) => {
          console.error("Error adding job:", error);
          reject(errorResponse("Error adding job", error));
        });
    });
  },

  // Function to get jobs posted by the company along with applied candidates
  getMyJobs: () => {
    return new Promise((resolve, reject) => {
      Jobs.find()
        .then(async (jobs) => {
          console.log("Jobs fetched:", jobs);
          const jobDetails = await Promise.all(jobs.map(async (job) => {
            try {
              const appliedJobs = await AppliedJobs.find({ jobId: job._id })
                .populate({
                  path: 'appliedUsers',
                  model: 'User',
                  select: 'firstName lastName email contact resume' // Only select necessary fields
                });
              
              const appliedCandidates = appliedJobs.map(appliedJob => appliedJob.appliedUsers).flat();
              console.log("Applied candidates for job", job._id, ":", appliedCandidates);
              
              return {
                ...job.toObject(),
                appliedCandidates,
              };
            } catch (error) {
              console.error("Error fetching applied candidates for job", job._id, ":", error);
              return null; // Return null if an error occurs
            }
          }));

          console.log("Jobs fetched successfully:", jobDetails);
          resolve(successResponse("Jobs fetched successfully", jobDetails));
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
          reject(errorResponse("Error fetching jobs", error));
        });
    });
  },

  // Additional controller methods as needed
};
