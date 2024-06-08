

const AppliedJobs = require("../../models/appliedJobs");
const Jobs = require("../../models/jobModal");
const User = require("../../models/userModal");
// import generateQuestions from "../../quiz/generateQuiz";
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
//       console.log("Data received:", data); // Print the data object
//       const { jobId, userId, quiz_score } = data;

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

//           // Construct the application object with userId and application data
//           const applicationObject = {
//               user: userId, // Store userId instead of the entire user object
//               quizScore: parseFloat(quiz_score), // Convert quiz_score to a float
//               ...data, // Include all other application data
//           };

//           console.log("Application Object:", applicationObject); // Print the application object

//           // Create a new applied job record
//           const appliedJobRecord = await AppliedJobs.create({ 
//             jobId: actualJobId, 
//             appliedUsers: [applicationObject],
//           });

//           console.log("Applied Job Record:", appliedJobRecord); // Print the applied job record

//           // Update the User model to add the applied job
//           user.appliedJobs.push({ job: actualJobId, quizScore: parseFloat(quiz_score) });
//           await user.save();

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

      // Get the actual jobId from jobDetails
      const actualJobId = jobDetails.data._id;

      // Construct the application object with userId and application data
      const applicationObject = {
        user: userId, // Store userId instead of the entire user object
        quizScore: parseFloat(quiz_score), // Convert quiz_score to a float
        ...data, // Include all other application data
      };

      console.log("Application Object:", applicationObject); // Print the application object

      // Find the existing applied job for the user and job
      let appliedJobRecord = await AppliedJobs.findOneAndUpdate(
        { jobId: actualJobId, "appliedUsers.user": userId },
        {
          $set: {
            "appliedUsers.$.quizScore": parseFloat(quiz_score), // Update quiz score if the user already applied
            "appliedUsers.$.updatedAt": new Date(), // Update updatedAt timestamp
            ...data, // Include all other application data
          },
        },
        { new: true }
      );

      // If appliedJobRecord is null, it means the user hasn't applied for this job yet
      if (!appliedJobRecord) {
        // Create a new applied job record
        appliedJobRecord = await AppliedJobs.findOneAndUpdate(
          { jobId: actualJobId },
          {
            $push: {
              appliedUsers: applicationObject, // Add the new application object
            },
          },
          { upsert: true, new: true }
        );
      }

      console.log("Applied Job Record:", appliedJobRecord); // Print the applied job record

      // Update the User model to add the applied job if it's a new application
      if (!appliedJobRecord.appliedUsers.find(user => user.user.toString() === userId.toString())) {
        const user = await User.findById(userId);
        user.appliedJobs.push({ job: actualJobId, quizScore: parseFloat(quiz_score) });
        await user.save();
      }

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



// postResume: async (data) => {
//   console.log("post resume");

//   try {
//     console.log("Data received successfully:", data); // Print the data object
//     const { resume, resumeFileName, jobId, userId } = data;

//     // If all required fields are provided, proceed to process the resume data
//     if (resume && resumeFileName && jobId && userId) {
//       // Retrieve user information
//       const user = await User.findOne({ _id: userId });
//       if (!user) {
//         console.log("User not found");
//         throw new Error("User not found");
//       }

//       // Get the actual jobId from jobDetails
//       const jobDetails = await module.exports.getJobDetails(jobId);
//       if (!jobDetails.success) {
//         console.log("Job not found");
//         throw new Error("Job not found");
//       }
//       const actualJobId = jobDetails.data._id;

//       // Find or create the relevant AppliedJobs document
//       let appliedJob = await AppliedJobs.findOne({
//         jobId: actualJobId,
//         "appliedUsers.user": userId
//       });

//       // If the AppliedJobs document doesn't exist, create a new one
//       if (!appliedJob) {
//         appliedJob = await AppliedJobs.create({
//           jobId: actualJobId,
//           appliedUsers: [{ user: userId }]
//         });
//       }

//       console.log("script started");
//       // Run Python script to calculate matched skills and match score
//       const cvFilePath = path.join(__dirname, '..', '..', 'uploads', String(resumeFileName));
//       const pythonScriptPath = path.join(__dirname, 'app.py');
//       const options = {
//         mode: 'text', // Receive output as text/buffer
//         pythonOptions: ['-u'], // Get print results in real-time
//         args: [cvFilePath, JSON.stringify(jobDetails.data.jobSkills)], // Arguments for the Python script
//       };
//       const results = await PythonShell.run(pythonScriptPath, options);
//       console.log("Results:", results);
//       const { matched_skills, match_score } = JSON.parse(results[1]);

//       //match_score = match_score.toFixed(2)

//       console.log("script ended");

//       // Update matchedSkills and matchScore in the appliedJobs document
//       appliedJob.appliedUsers.forEach(userObj => {
//         if (userObj.user.equals(userId)) {
//           userObj.matchedSkills = matched_skills;
//           userObj.matchScore = match_score;
//         }
//       });

//       console.log("Updated appliedJob:", appliedJob);

//       // Save the updated appliedJobs document
//       await appliedJob.save();

//       console.log("Saved appliedJob:", appliedJob);
//       // Construct the resume object with the necessary fields
//       const resumeObject = {
//         resume,
//         resumeFileName,
//         jobId,
//         userId,
//         matchedSkills: matched_skills,
//         matchScore: match_score
//       };

//       console.log("Resume Object:", resumeObject); // Print the resume object

//       // Here, you can further process the resume data as needed, such as saving it to a database or performing other operations.

//       return { success: true, message: "Resume data retrieved successfully", data: resumeObject };
//     } else {
//       // If any required field is missing, handle the error
//       throw new Error("Required fields are missing");
//     }
//   } catch (error) {
//     console.error("Error getting resume data:", error);
//     return { success: false, message: "Error getting resume data", error: error.message };
//   }
// },


postResume: async (data) => {
  try {
    const { resume, resumeFileName, jobId, userId } = data;

    if (resume && resumeFileName && jobId && userId) {
      // Retrieve user information
      const user = await User.findById(userId);
      if (!user) {
        console.error("User not found");
        throw new Error("User not found");
      }

      // Update the resume file name in the user document
      user.resume = resumeFileName;
      await user.save();

      // Your existing code...
      console.log("post resume");
      console.log("Data received successfully:", data);

      // Retrieve job details
      const jobDetails = await module.exports.getJobDetails(jobId);
      if (!jobDetails.success) {
        console.error("Job not found");
        throw new Error("Job not found");
      }
      const actualJobId = jobDetails.data._id;

      // Find or create the relevant AppliedJobs document
      let appliedJob = await AppliedJobs.findOne({
        jobId: actualJobId,
        "appliedUsers.user": userId
      });

      if (!appliedJob) {
        appliedJob = await AppliedJobs.create({
          jobId: actualJobId,
          appliedUsers: [{ user: userId }]
        });
      }

      console.log("script started");
      // Run Python script to calculate matched skills and match score
      const cvFilePath = path.join(__dirname, '..', '..', 'uploads', String(resumeFileName));
      const pythonScriptPath = path.join(__dirname, 'app.py');
      const options = {
        mode: 'text', // Receive output as text/buffer
        pythonOptions: ['-u'], // Get print results in real-time
        args: [cvFilePath, JSON.stringify(jobDetails.data.jobSkills)], // Arguments for the Python script
      };
      const results = await PythonShell.run(pythonScriptPath, options);
      console.log("Results:", results);
      const { matched_skills, match_score } = JSON.parse(results[1]);

      console.log("script ended");

      // Update matchedSkills and matchScore in the appliedJobs document
      appliedJob.appliedUsers.forEach(userObj => {
        if (userObj.user.equals(userId)) {
          userObj.matchedSkills = matched_skills;
          userObj.matchScore = match_score;
        }
      });

      console.log("Updated appliedJob:", appliedJob);

      // Save the updated appliedJobs document
      await appliedJob.save();

      console.log("Saved appliedJob:", appliedJob);
      // Construct the resume object with the necessary fields
      const resumeObject = {
        resume,
        resumeFileName,
        jobId,
        userId,
        matchedSkills: matched_skills,
        matchScore: match_score
      };

      console.log("Resume Object:", resumeObject); // Print the resume object

      // Here, you can further process the resume data as needed, such as saving it to a database or performing other operations.

      return { success: true, message: "Resume data retrieved successfully", data: resumeObject };
    } else {
      throw new Error("Required fields are missing");
    }
  } catch (error) {
    console.error("Error getting resume data:", error);
    return { success: false, message: "Error getting resume data", error: error.message };
  }
},




// getResume: async (userId, jobId) => {
//   try {
//     // Find the applied job record for the given userId and jobId
//     const appliedJob = await AppliedJobs.findOne({ jobId, "appliedUsers.user": userId });

//     if (!appliedJob) {
//       console.error("Applied job not found for userId:", userId, "and jobId:", jobId);
//       throw new Error("Applied job not found");
//     }

//     console.log("Applied job found:", appliedJob);

//     // Find the user's application within the applied job record
//     const userApplication = appliedJob.appliedUsers.find(userApp => userApp.user.equals(userId));

//     if (!userApplication) {
//       console.error("User application not found for userId:", userId, "and jobId:", jobId);
//       throw new Error("User application not found");
//     }

//     console.log("User application found:", userApplication);

//     // Extract matchScore and matchedSkills from the user's application
//     const { matchScore, matchedSkills } = userApplication;

//     console.log("Match score:", matchScore);
//     console.log("Matched skills:", matchedSkills);

//     return { success: true, message: "Resume data fetched successfully", data: { matchScore, matchedSkills } };
//   } catch (error) {
//     console.error("Error fetching resume:", error);
//     return { success: false, message: "Error fetching resume", error: error.message };
//   }
// },


getResume: async (userId, jobId) => {
  try {
    // Find the user document by userId
    const user = await User.findById(userId);

    if (!user) {
      console.error("User not found");
      throw new Error("User not found");
    }

    // Retrieve the resume file name from the user document
    const resumeFileName = user.resume;

    // Your existing code...
    // Find the applied job record for the given userId and jobId
    const appliedJob = await AppliedJobs.findOne({ jobId, "appliedUsers.user": userId });

    if (!appliedJob) {
      console.error("Applied job not found for userId:", userId, "and jobId:", jobId);
      throw new Error("Applied job not found");
    }

    console.log("Applied job found:", appliedJob);

    // Find the user's application within the applied job record
    const userApplication = appliedJob.appliedUsers.find(userApp => userApp.user.equals(userId));

    if (!userApplication) {
      console.error("User application not found for userId:", userId, "and jobId:", jobId);
      throw new Error("User application not found");
    }

    console.log("User application found:", userApplication);

    // Extract matchScore and matchedSkills from the user's application
    const { matchScore, matchedSkills } = userApplication;

    console.log("Match score:", matchScore);
    console.log("Matched skills:", matchedSkills);

    return { success: true, message: "Resume data fetched successfully", data: { matchScore, matchedSkills, resumeFileName } };
  } catch (error) {
    console.error("Error fetching resume:", error);
    return { success: false, message: "Error fetching resume", error: error.message };
  }
},




  // myJobs: async (userId) => {
  //   try {
  //     const user = await User.findOne({ _id: userId }).populate('appliedJobs.job');
  
  //     if (!user) {
  //       return { success: false, message: "User not found" };
  //     }
  
  //     const appliedJobsWithScores = user.appliedJobs.map(job => ({
  //       job: job.job,
  //       quizScore: job.quizScore
  //     }));
  
  //     return { success: true, message: "Retrieved jobs successfully", data: appliedJobsWithScores };
  //   } catch (error) {
  //     console.error("Error getting user's applied jobs with quiz scores:", error);
  //     return { success: false, message: "Error getting user's applied jobs with quiz scores", error: error.message };
  //   }
  // }
  // ,

//   myJobs: async (userId) => {
//     try {
//       const user = await User.findOne({ _id: userId }).populate('appliedJobs.job');
  
//       if (!user) {
//         return { success: false, message: "User not found" };
//       }
  
//       const appliedJobsWithUsers = await Promise.all(user.appliedJobs.map(async (job) => {
//         const appliedUsers = await AppliedJobs.find({ jobId: job.job._id })
//           .populate('user', 'firstName lastName email resume'); // Populate user details
  
//         return {
//           job: job.job,
//           quizScore: job.quizScore,
//           appliedUsers: appliedUsers.map(appliedUser => ({
//             user: appliedUser.user,
//             quizScore: appliedUser.quizScore
//           }))
//         };
//       }));
  
//       return { success: true, message: "Retrieved jobs successfully", data: appliedJobsWithUsers };
//     } catch (error) {
//       console.error("Error getting user's applied jobs with user information:", error);
//       return { success: false, message: "Error getting user's applied jobs with user information", error: error.message };
//     }
//   }
// ,  
  
myJobs : async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const appliedJobs = await AppliedJobs.find({ 'appliedUsers.user': userId })
      .populate({
        path: 'jobId',
        model: 'Jobs',
        select: 'jobTitle jobType location salary companyName',
      })
      .populate({
        path: 'appliedUsers.user',
        model: 'User',
        select: 'firstName lastName email resume',
      });

    // Filter appliedJobs to only include entries where the user ID matches
    const appliedJobsForUser = appliedJobs.map((appliedJob) => {
      const userApplication = appliedJob.appliedUsers.find(
        (application) => application.user._id.toString() === userId
      );

      return {
        jobTitle: appliedJob.jobId.jobTitle,
        jobType: appliedJob.jobId.jobType,
        location: appliedJob.jobId.location,
        salary: appliedJob.jobId.salary,
        companyName: appliedJob.jobId.companyName,
        quizScore: userApplication.quizScore,
        skillMatchScore: userApplication.matchScore,
        jobId: appliedJob.jobId._id
      };
    });

    console.log("Applied jobs for user:", appliedJobsForUser);

    return { success: true, message: "Retrieved jobs successfully", data: appliedJobsForUser };
  } catch (error) {
    console.error("Error getting user's applied jobs with details:", error);
    return { success: false, message: "Error getting user's applied jobs with details", error: error.message };
  }
},


// myJobs: async (userId) => {
//   try {
//     const user = await User.findOne({ _id: userId }).populate('appliedJobs.job');
  
//     if (!user) {
//       console.log("User not found");
//       return { success: false, message: "User not found" };
//     }

//     console.log("User found:", user);

//     // Extract applied jobs with required fields
//     const appliedJobsWithDetails = user.appliedJobs.map(appliedJob => {
//       const { job, quizScore } = appliedJob;
//       return {
//         jobTitle: job.jobTitle,
//         jobType: job.jobType,
//         location: job.location,
//         companyName: job.companyName,
//         contactInformation: job.contactInformation,
//         quizScore,
//         skillMatchScore: appliedJob.matchScore // Assuming matchScore is skill match score
//       };
//     });

//     console.log("Applied jobs with details:", appliedJobsWithDetails);

//     return { success: true, message: "Retrieved jobs successfully", data: appliedJobsWithDetails };
//   } catch (error) {
//     console.error("Error getting user's applied jobs with details:", error);
//     return { success: false, message: "Error getting user's applied jobs with details", error: error.message };
//   }
// },

  

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
