 
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

        // Configure PythonShell options
        let options = {
          mode: 'text', // Receive output as text/buffer
          pythonOptions: ['-u'], // Get print results in real-time
          args: [cvFilePath, JSON.stringify(jobSkills)], // Arguments for the Python script
        };

        // Run Python script using PythonShell
        const results = await PythonShell.run(pythonScriptPath, options);

        // Extract the output from the buffer
        const output = results;
        console.log("Output:", output)

        
        // Parse the second element as JSON
        const { matched_skills, match_score } = JSON.parse(output[1]);
        
        // Print the extracted values
        console.log("Matched Skills:", matched_skills);
        console.log("Match Score:", match_score);


        // Return success message along with the processed output
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

  getResume: async (data) => {
    try {
      console.log("Data received successfully:", data); // Print the data object
      const { resume, resumeFileName, jobId, userId } = data;
  
      // If all required fields are provided, proceed to process the resume data
      if (resume && resumeFileName && jobId && userId) {
        // Construct the resume object with the necessary fields
        const resumeObject = {
  
          resume,
          resumeFileName,
          jobId,
          userId,
        };
  
        console.log("Resume Object:", resumeObject); // Print the resume object
  
        // Here, you can further process the resume data as needed, such as saving it to a database or performing other operations.
  
        return { success: true, message: "Resume data retrieved successfully", data: resumeObject };
      } else {
        // If any required field is missing, handle the error
        throw new Error("Required fields are missing");
      }
    } catch (error) {
      console.error("Error getting resume data:", error);
      return { success: false, message: "Error getting resume data", error: error.message };
    }
  },


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
