 


const AppliedJobs = require("../../models/appliedJobs");
const Jobs = require("../../models/jobModal");
const User = require("../../models/userModal");

const { PythonShell } = require('python-shell');
const path = require('path');

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

  uploadResume: async (filename, userId) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (user) {
        await User.updateOne({ _id: userId }, { $set: { resume: filename } });
        return { success: true, message: "Resume updated successfully" };
      } else {
        return { success: false, message: "User not found" };
      }
    } catch (error) {
      console.error("Error updating resume:", error);
      return { success: false, message: "Error updating resume", error: error.message };
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

applyJob: async (data) => {
  try {
    console.log("Data received:", data); // Print the data object
    const { jobId, userId } = data;

    // If jobId and userId are provided, proceed with the application
    if (jobId && userId) {
      // Check if the job exists
      const jobDetails = await module.exports.getJobDetails(jobId);
      if (!jobDetails.success) {
        console.log("Job not found")
        throw new Error("Job not found");
      }

      // Retrieve user information
      const user = await User.findOne({ _id: userId });
      if (!user) {
        console.log("user not found")
        throw new Error("User not found");
      }

      // Get the actual jobId from jobDetails
      const actualJobId = jobDetails.data._id;

      // Create a new applied job record
      const appliedJobRecord = await AppliedJobs.create({ 
          jobId: actualJobId, 
          appliedUsers: [user] 
      });

      // Convert jobSkills string to match expected format in Python script
      let jobSkills;
      if (jobDetails.data.jobSkills.includes(',')) {
        jobSkills = jobDetails.data.jobSkills.split(',').map(skill => skill.trim());
      } else {
        jobSkills = jobDetails.data.jobSkills.split('\n').map(skill => skill.trim());
      }

      // Construct the file path as a string
      const cvFilePath = path.join(__dirname, '..', '..', 'uploads', String(user.resume));

      // Call CV parser
      const pythonScriptPath = path.join(__dirname, 'app.py');
      const options = {
        pythonOptions: ['-u'], // unbuffered output
        args: [cvFilePath, ...jobSkills], // Pass CV file path and job skills as arguments
      };

      console.log("Calling Python script...");
      const result = await new Promise((resolve, reject) => {
        PythonShell.run(pythonScriptPath, options, (err, result) => {
          if (err) {
            console.log("Error calling Python script:")
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

      console.log("Python script executed successfully.");
      return { success: true, message: "Application updated successfully", result };
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
