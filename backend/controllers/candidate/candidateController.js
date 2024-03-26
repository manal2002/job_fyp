 //const { successResponse, errorResponse } = require("../../constants/response");
// const AppliedJobs = require("../../models/appliedJobs");
// const Jobs = require("../../models/jobModal");
// const User = require("../../models/userModal");
// const { sendEmailNotification } = require("../../utils/utils");
// const { cloudinary } = require("../../utils/cloudinary");

// module.exports = {
//   listAllJobs: () => {
//     return new Promise((resolve, reject) => {
//       Jobs.find().then((result) => {
//         if (result) {
//           successResponse.data = result;
//           resolve(successResponse);
//         } else {
//           resolve(errorResponse);
//         }
//       });
//     });
//   },
//   getJobDetails: (jobId) => {
//     return new Promise((resolve, reject) => {
//       Jobs.findOne({ _id: jobId }).then((result) => {
//         if (result) {
//           successResponse.data = result;
//           resolve(successResponse);
//         } else {
//           resolve(errorResponse);
//         }
//       });
//     });
//   },
//   uploadResume: (filename, userId) => {
//     return new Promise((resolve, reject) => {
//       User.findOne({ _id: userId }).then((user) => {
//         if (user) {
//           if (user.resume) {
//             User.updateOne({ _id: userId }, { $set: { resume: filename } })
//               .then(() => resolve())
//               .catch((error) => reject(error));
//           } else {
//             User.updateOne({ _id: userId }, { $set: { resume: filename } })
//               .then(() => resolve())
//               .catch((error) => reject(error));
//           }
//         }
//       });
//     });
//   },
//   // applyJob: (data) => {
//   //   return new Promise((resolve, reject) => {
//   //     console.log("DATA-------------", data);
//   //     let job_id = data.jobId;
//   //     let company_id = data.companyId;
//   //     delete data.jobId;
//   //     delete data.companyId;
//   //     let jobData = Jobs.findOne({_id : job_id})
//   //     AppliedJobs.findOne({ jobId: data.jobId }).then(async(job) => {
//   //       if (job) {
//   //         AppliedJobs.updateOne(
//   //           { jobId: job_id },
//   //           { $push: { appliedUsers: data } }
//   //         ).then(() => {
//   //           resolve(successResponse);
//   //         });
//   //       } else {
//   //         let applied_users = [];
//   //         applied_users.push(data);
//   //         let createdData = {
//   //           jobId: job_id,
//   //           companyId: company_id,
//   //           appliedUsers: applied_users,
//   //         };

//   //         AppliedJobs.create(createdData).then(() => {
//   //           resolve(successResponse);
//   //         });
//   //       }
//   //       await sendEmailNotification(
//   //         data.email,
//   //         jobData?.jobTitle,
//   //         "Your application submitted successfullyyy..."
//   //       );
//   //     });
//   //     // AppliedJobs.create(data).then(async (result) => {
//   //     //   if (result) {
//   //     //     let jobData = await Jobs.findOne({ _id: data.jobId });
//   //     //     const updatedUser = await User.findOneAndUpdate(
//   //     //       { email: data.email },
//   //     //       { $push: { appliedJobs: jobData?._id } },
//   //     //       { new: true }
//   //     //     ).then(async () => {
//   //     //       await sendEmailNotification(
//   //     //         data.email,
//   //     //         jobData?.jobTitle,
//   //     //         "Your application submitted successfullyyy..."
//   //     //       );
//   //     //       resolve(successResponse);
//   //     //     });
//   //     //   }
//   //     // });
//   //   });
//   // },
//   applyJob: (data) => {
//     return new Promise((resolve, reject) => {
//       let job_id = data.jobId;
//       let user_id = data.userId; // Extracted from data, ensure this is passed from the client
//       AppliedJobs.findOne({ jobId: job_id }).then((appliedJobRecord) => {
//         if (appliedJobRecord) {
//           // Job application exists, update it by adding the new user
//           AppliedJobs.updateOne(
//             { jobId: job_id },
//             { $addToSet: { appliedUsers: mongoose.Types.ObjectId(user_id) } } // Use mongoose.Types.ObjectId to ensure correct reference type
//           ).then(() => {
//             resolve(successResponse("Application updated successfully"));
//           }).catch((error) => {
//             console.error("Error updating application:", error);
//             reject(errorResponse("Error updating application", error));
//           });
//         } else {
//           // No application exists for this job, create a new record
//           AppliedJobs.create({
//             jobId: job_id,
//             companyId: data.companyId, // Ensure this is provided in data
//             appliedUsers: [mongoose.Types.ObjectId(user_id)] // Wrap user_id in an array and ensure correct reference type
//           }).then(() => {
//             resolve(successResponse("Application created successfully"));
//           }).catch((error) => {
//             console.error("Error creating application:", error);
//             reject(errorResponse("Error creating application", error));
//           });
//         }
//       }).catch((error) => {
//         console.error("Error applying for job:", error);
//         reject(errorResponse("Error applying for job", error));
//       });
//     });
//   },

//   getMyJobs: (userId) => {
//     return new Promise((resolve, reject) => {
//       let appliedJobs = [];
//       let userDetails = User.findOne({ _id: userId }).then(async (user) => {
//         if (user) {
//           appliedJobs = user.appliedJobs;
//           await AppliedJobs.find({ _id: { $in: appliedJobs } }).then(
//             async (jobs) => {
//               if (jobs.length > 0) {
//                 let ids = [];
//                 for (let i = 0; i < jobs.length; i++) {
//                   const e = jobs[i];
//                   ids.push(e.jobId);
//                 }
//                 ids = [...new Set(ids)];

//                 await Jobs.find({ _id: { $in: ids } }).then((yourJobs) => {
//                   successResponse.data = yourJobs;
//                 });
//               }
//             }
//           );
//           resolve(successResponse);
//         }
//       });
//     });
//   },
//   editProfile: (userId, data) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const imageResponse = await cloudinary.uploader.upload(
//           data?.profileImage,
//           {
//             upload_preset: "hiring_application",
//           }
//         );
//         console.log("image from cloudinary : ", imageResponse?.url);
//         data.profileImage = imageResponse?.url;
//         console.log("DATA : ", data);
//         const updatedUser = await User.updateOne(
//           { _id: userId },
//           { $set: data }
//         );

//         resolve(updatedUser);
//       } catch (error) {
//         console.error("Error in editProfile:", error);
//         reject(error);
//       }
//     });
//   },
//   getProfile: (userId) => {
//     return new Promise((resolve, reject) => {
//       User.findOne({ _id: userId }).then((result) => {
//         successResponse.data = result;
//         resolve(successResponse);
//       });
//     });
//   },
// };


const AppliedJobs = require("../../models/appliedJobs");
const Jobs = require("../../models/jobModal");
const User = require("../../models/userModal");
// import generateQuestions from "../../quiz/generateQuiz";
const { PythonShell } = require('python-shell');

module.exports = {
  listAllJobs: async () => {
    try {
      const result = await Jobs.find();
      return { success: true, message: "Jobs listed successfully", data: result };
    } catch (error) {
      console.error("Error listing jobs:", error);
      return { success: false, message: "Error listing jobs", error: error.message };
    }
  },

  getJobDetails: async (jobId) => {
    try {
      const result = await Jobs.findOne({ _id: jobId });
      if (result) {
        return { success: true, message: "Job details fetched successfully", data: result };
      } else {
        return { success: false, message: "Job not found" };
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
      return { success: false, message: "Error fetching job details", error: error.message };
    }
  },

  // uploadResume: async (filename, userId) => {
  //   try {
  //     const user = await User.findOne({ _id: userId });
  //     if (user) {
  //       await User.updateOne({ _id: userId }, { $set: { resume: filename } });
  //       return { success: true, message: "Resume updated successfully" };
  //     } else {
  //       return { success: false, message: "User not found" };
  //     }
  //   } catch (error) {
  //     console.error("Error updating resume:", error);
  //     return { success: false, message: "Error updating resume", error: error.message };
  //   }
  // },


  uploadResume: async (filename, userId) => {
    try {
      const user = await User.findOne({ _id: userId });
      
      if (!user) {
        return { success: false, message: "User not found" };
      }
  
      await User.updateOne({ _id: userId }, { $set: { resume: filename } });
      const job = await Jobs.findOne({});
  
      if (!job || !job.skills_and_requirement) {
        return { success: false, message: "Job not found or skills_and_requirement field empty" };
      }
  
      const jobSkills = JSON.parse(job.skills_and_requirement);
      const pythonScriptPath = path.join(__dirname, 'app.py');
      const cvFilePath = path.join(__dirname, '..', '..', 'uploads', filename);
      const options = {
        pythonOptions: ['-u'], // unbuffered output
        args: [cvFilePath, JSON.stringify(jobSkills)], // Pass CV file path and job skills as arguments
      };
  
      const result = await new Promise((resolve, reject) => {
        PythonShell.run(pythonScriptPath, options, (err, result) => {
          if (err) {
            console.error('Error calling Python script:', err);
            reject(err); // Reject if Python script call fails
          } else {
            // Handle Python script response here
            const parsedResult = JSON.parse(result);
            console.log('CV processed:', parsedResult);
            // Optionally, use the response data to update the user profile or matched skills
            resolve(parsedResult); // Resolve with Python script response
          }
        });
      });
  
      return { success: true, message: "Resume updated successfully", result };
    } catch (error) {
      console.error("Error updating resume:", error);
      return { success: false, message: "Error updating resume", error: error.message };
    }
  },

  // applyJob: async (data) => {
  //   try {
  //     const { jobId, companyId, userId } = data;
  //     let appliedJobRecord = await AppliedJobs.findOne({ jobId });
  //     if (appliedJobRecord) {
  //       await AppliedJobs.updateOne(
  //         { jobId },
  //         { $addToSet: { appliedUsers: userId } }
  //       );
  //     } else {
  //       await AppliedJobs.create({ jobId, companyId, appliedUsers: [userId] });
  //     }
  //     return { success: true, message: "Application updated successfully" };
  //   } catch (error) {
  //     console.error("Error applying for job:", error);
  //     return { success: false, message: "Error applying for job", error: error.message };
  //   }
  // },

  // applyJob: async (data) => {
  //   try {
  //     console.log("Data received:", data); // Print the data object
  //     const { jobTitle, companyName, location, userId } = data;
  
  //     // If jobTitle, companyName, and location are provided, query the database
  //     if (jobTitle && companyName && location) {
  //       const job = await Jobs.findOne({ jobTitle, companyName, location });
  //       if (!job) {
  //         throw new Error("Job not found");
  //       }
  
  //       const jobId = job._id;
  
  //       let appliedJobRecord = await AppliedJobs.findOne({ jobId });
  //       if (appliedJobRecord) {
  //         await AppliedJobs.updateOne(
  //           { jobId },
  //           { $addToSet: { appliedUsers: userId } }
  //         );
  //       } else {
  //         await AppliedJobs.create({ jobId, appliedUsers: [userId] });
  //       }
  //       return { success: true, message: "Application updated successfully" };
  //     } else {
  //       // If jobTitle, companyName, or location is not provided, handle the error
  //       throw new Error("Job title, company name, and location are required");
  //     }
  //   } catch (error) {
  //     console.error("Error applying for job:", error);
  //     return { success: false, message: "Error applying for job", error: error.message };
  //   }
  // },
  




//   applyJob: async (data) => {
//     try {
//         console.log("Data received:", data); // Print the data object
//         const { jobId, userId } = data;

//         // If jobId and userId are provided, proceed with the application
//         if (jobId && userId) {
//             // Check if the job exists
//             const jobDetails = await module.exports.getJobDetails(jobId);
//             if (!jobDetails.success) {
//                 throw new Error("Job not found");
//             }

//             // Get the actual jobId from jobDetails
//             const actualJobId = jobDetails.data._id;

//             // Check if the user has already applied for this job
//             let appliedJobRecord = await AppliedJobs.findOne({ jobId: actualJobId });
//             if (appliedJobRecord) {
//                 // If the user has already applied, update the record
//                 await AppliedJobs.updateOne(
//                     { jobId: actualJobId },
//                     { $addToSet: { appliedUsers: userId } }
//                 );
//             } else {
//                 // If the user hasn't applied yet, create a new record
//                 await AppliedJobs.create({ jobId: actualJobId, appliedUsers: [userId] });
//             }
//             return { success: true, message: "Application updated successfully" };
//         } else {
//             // If jobId or userId is not provided, handle the error
//             throw new Error("JobId and userId are required");
//         }
//     } catch (error) {
//         console.error("Error applying for job:", error);
//         return { success: false, message: "Error applying for job", error: error.message };
//     }
// },
//////////////////////////////////////

// applyJob: async (data) => {
//   try {
//       console.log("Data received:", data); // Print the data object
//       const { jobId, userId } = data;

//       // If jobId and userId are provided, proceed with the application
//       if (jobId && userId) {
//           // Check if the job exists
//           const jobDetails = await module.exports.getJobDetails(jobId);
//           if (!jobDetails.success) {
//               throw new Error("Job not found");
//           }

//           // Retrieve user information
//           const user = await User.findOne({ _id: userId });
//           if (!user) {
//               throw new Error("User not found");
//           }

//           // Get the actual jobId from jobDetails
//           const actualJobId = jobDetails.data._id;

//           // Create a new applied job record
//           const appliedJobRecord = await AppliedJobs.create({ 
//               jobId: actualJobId, 
//               appliedUsers: [user] 
//           });

//           return { success: true, message: "Application updated successfully" };
//       } else {
//           // If jobId or userId is not provided, handle the error
//           throw new Error("JobId and userId are required");
//       }
//   } catch (error) {
//       console.error("Error applying for job:", error);
//       return { success: false, message: "Error applying for job", error: error.message };
//   }
// },

applyJob: async (data) => {
  try {
      console.log("Data received:", data); // Print the data object
      const { jobId, userId, quiz_score } = data;

      // If jobId and userId are provided, proceed with the application
      if (jobId && userId) {
          // Check if the job exists
          const jobDetails = await module.exports.getJobDetails(jobId);
          if (!jobDetails.success) {
              throw new Error("Job not found");
          }

          // Retrieve user information
          const user = await User.findOne({ _id: userId });
          if (!user) {
              throw new Error("User not found");
          }

          // Get the actual jobId from jobDetails
          const actualJobId = jobDetails.data._id;

          // Create a new applied job record
          const appliedJobRecord = await AppliedJobs.create({ 
            jobId: actualJobId, 
            appliedUsers: [user],
            quizScore: quiz_score // Store quiz score along with other application data
          });

          return { success: true, message: "Application updated successfully" };
      } else {
          // If jobId or userId is not provided, handle the error
          throw new Error("JobId and userId are required");
      }
  } catch (error) {
      console.error("Error applying for job:", error);
      return { success: false, message: "Error applying for job", error: error.message };
  }
},






  // applyJob: async (data) => {
  //   try {
  //     console.log("Data received:", data); // Print the data object
  //     const { jobId, userId } = data;
  //     let appliedJobRecord = await AppliedJobs.findOne({ jobId });
  //     if (appliedJobRecord) {
  //       await AppliedJobs.updateOne(
  //         { jobId },
  //         { $addToSet: { appliedUsers: userId } }
  //       );
  //     } else {
  //       await AppliedJobs.create({ jobId, appliedUsers: [userId] });
  //     }
  //     return { success: true, message: "Application updated successfully" };
  //   } catch (error) {
  //     console.error("Error applying for job:", error);
  //     return { success: false, message: "Error applying for job", error: error.message };
  //   }
  // },
  

  getMyJobs: async (userId) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return { success: false, message: "User not found" };
      }
      const appliedJobs = user.appliedJobs;
      const jobs = await AppliedJobs.find({ _id: { $in: appliedJobs } });
      const jobIds = jobs.map(job => job.jobId);
      const myJobs = await Jobs.find({ _id: { $in: jobIds } });
      return { success: true, message: "Retrieved jobs successfully", data: myJobs };
    } catch (error) {
      console.error("Error getting user's jobs:", error);
      return { success: false, message: "Error getting user's jobs", error: error.message };
    }
  },

  editProfile: async (userId, data) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, { $set: data }, { new: true });
      return { success: true, message: "Profile updated successfully", data: updatedUser };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, message: "Error updating profile", error: error.message };
    }
  },

  getProfile: async (userId) => {
    try {
      const result = await User.findById(userId);
      if (result) {
        return { success: true, message: "Profile fetched successfully", data: result };
      } else {
        return { success: false, message: "User not found" };
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      return { success: false, message: "Error fetching profile", error: error.message };
    }
  },
};
