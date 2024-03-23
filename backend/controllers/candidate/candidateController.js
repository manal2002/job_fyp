const { successResponse, errorResponse } = require("../../constants/response");
const AppliedJobs = require("../../models/appliedJobs");
const Jobs = require("../../models/jobModal");
const User = require("../../models/userModal");
const { sendEmailNotification } = require("../../utils/utils");
const { cloudinary } = require("../../utils/cloudinary");

const { PythonShell } = require('python-shell');
const path = require('path');

module.exports = {
  listAllJobs: () => {
    return new Promise((resolve, reject) => {
      Jobs.find().then((result) => {
        if (result) {
          successResponse.data = result;
          resolve(successResponse);
        } else {
          resolve(errorResponse);
        }
      });
    });
  },
  getJobDetails: (jobId) => {
    return new Promise((resolve, reject) => {
      Jobs.findOne({ _id: jobId }).then((result) => {
        if (result) {
          successResponse.data = result;
          resolve(successResponse);
        } else {
          resolve(errorResponse);
        }
      });
    });
  },
  uploadResume: (filename, userId) => {
    return new Promise((resolve, reject) => {
      // First, find the user to ensure they exist
      User.findOne({ _id: userId }).then((user) => {
        if (user) {
          // Update the user's resume field in the database
          User.updateOne({ _id: userId }, { $set: { resume: filename } })
            .then(() => {
              // Fetch job skills from MongoDB Atlas
              Jobs.findOne({}).then((job) => {
                if (job && job.skills_and_requirement) {
                  const jobSkills = JSON.parse(job.skills_and_requirement);

                  // After updating the resume field, proceed to call the Python script
                  const pythonScriptPath = path.join(__dirname, 'app.py');
                  const cvFilePath = path.join(__dirname, '..', '..', 'uploads', filename);
                  const options = {
                    pythonOptions: ['-u'], // unbuffered output
                    args: [cvFilePath, JSON.stringify(jobSkills)], // Pass CV file path and job skills as arguments
                  };

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
                } else {
                  reject(new Error("Job not found or skills_and_requirement field empty"));
                }
              }).catch((error) => {
                console.error('Error fetching job from database:', error);
                reject(error);
              });
            })
            .catch((error) => {
              // Reject if updating the user's resume in the database fails
              reject(error);
            });
        } else {
          reject(new Error("User not found"));
        }
      });
    });
  },
  applyJob: (data) => {
    return new Promise((resolve, reject) => {
      console.log("DATA-------------", data);
      let job_id = data.jobId;
      let company_id = data.companyId;
      delete data.jobId;
      delete data.companyId;
      let jobData = Jobs.findOne({_id : job_id})
      AppliedJobs.findOne({ jobId: data.jobId }).then(async(job) => {
        if (job) {
          AppliedJobs.updateOne(
            { jobId: job_id },
            { $push: { appliedUsers: data } }
          ).then(() => {
            resolve(successResponse);
          });
        } else {
          let applied_users = [];
          applied_users.push(data);
          let createdData = {
            jobId: job_id,
            companyId: company_id,
            appliedUsers: applied_users,
          };

          AppliedJobs.create(createdData).then(() => {
            resolve(successResponse);
          });
        }
        await sendEmailNotification(
          data.email,
          jobData?.jobTitle,
          "Your application submitted successfullyyy..."
        );
      });
      // AppliedJobs.create(data).then(async (result) => {
      //   if (result) {
      //     let jobData = await Jobs.findOne({ _id: data.jobId });
      //     const updatedUser = await User.findOneAndUpdate(
      //       { email: data.email },
      //       { $push: { appliedJobs: jobData?._id } },
      //       { new: true }
      //     ).then(async () => {
      //       await sendEmailNotification(
      //         data.email,
      //         jobData?.jobTitle,
      //         "Your application submitted successfullyyy..."
      //       );
      //       resolve(successResponse);
      //     });
      //   }
      // });
    });
  },
  getMyJobs: (userId) => {
    return new Promise((resolve, reject) => {
      let appliedJobs = [];
      let userDetails = User.findOne({ _id: userId }).then(async (user) => {
        if (user) {
          appliedJobs = user.appliedJobs;
          await AppliedJobs.find({ _id: { $in: appliedJobs } }).then(
            async (jobs) => {
              if (jobs.length > 0) {
                let ids = [];
                for (let i = 0; i < jobs.length; i++) {
                  const e = jobs[i];
                  ids.push(e.jobId);
                }
                ids = [...new Set(ids)];

                await Jobs.find({ _id: { $in: ids } }).then((yourJobs) => {
                  successResponse.data = yourJobs;
                });
              }
            }
          );
          resolve(successResponse);
        }
      });
    });
  },
  editProfile: (userId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const imageResponse = await cloudinary.uploader.upload(
          data?.profileImage,
          {
            upload_preset: "hiring_application",
          }
        );
        console.log("image from cloudinary : ", imageResponse?.url);
        data.profileImage = imageResponse?.url;
        console.log("DATA : ", data);
        const updatedUser = await User.updateOne(
          { _id: userId },
          { $set: data }
        );

        resolve(updatedUser);
      } catch (error) {
        console.error("Error in editProfile:", error);
        reject(error);
      }
    });
  },
  getProfile: (userId) => {
    return new Promise((resolve, reject) => {
      User.findOne({ _id: userId }).then((result) => {
        successResponse.data = result;
        resolve(successResponse);
      });
    });
  },
};
