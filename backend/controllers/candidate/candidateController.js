 


const AppliedJobs = require("../../models/appliedJobs");
const Jobs = require("../../models/jobModal");
const User = require("../../models/userModal");


const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');


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
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { resume: filename } },
        { new: true } // To return the updated document
      );
      if (user) {
        return { success: true, message: "Resume updated successfully", user };
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
        console.log("Job not found");
        throw new Error("Job not found");
      }

      // Retrieve user information
      const user = await User.findOne({ _id: userId });
      if (!user) {
        console.log("User not found");
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
      let jobSkills = jobDetails.data.jobSkills;

      // Construct the file path as a string
      const cvFilePath = path.join(__dirname, '..', '..', 'uploads', String(data.my_resume));

      console.log("Calling Python script...");
      const pythonScriptPath = path.join(__dirname, 'app.py');

      // Spawn a new process to execute the Python script
      const pythonProcess = spawn('python', [pythonScriptPath, cvFilePath, JSON.stringify(jobSkills)]);

      let matchedSkills = '';
      let matchScore = '';

      // Listen for output data from the Python script (stdout)
      pythonProcess.stdout.on('data', (data) => {
        // Parse the JSON output
        const result = JSON.parse(data);
        // Extract matched skills and match score
        matchedSkills = result.matched_skills;
        matchScore = result.match_score;
        console.log('Matched skills:', matchedSkills);
        console.log('Match score:', matchScore);
      });

      // Listen for errors from the Python script (stderr)
      pythonProcess.stderr.on('data', (data) => {
        console.error('Python script error:', data.toString());
      });

      // Handle process exit
      pythonProcess.on('exit', (code) => {
        console.log(`Python script process exited with code ${code}`);
        // Optionally, handle any exit tasks here
      });

      // Return success message along with matched skills and match score
      return { success: true, message: "Application updated successfully", matchedSkills, matchScore };
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
