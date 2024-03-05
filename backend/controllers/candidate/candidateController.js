const { successResponse, errorResponse } = require("../../constants/response");
const AppliedJobs = require("../../models/appliedJobs");
const Jobs = require("../../models/jobModal");
const User = require("../../models/userModal");
const { sendEmailNotification } = require("../../utils/utils");
const { cloudinary } = require("../../utils/cloudinary");

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
      User.findOne({ _id: userId }).then((user) => {
        if (user) {
          if (user.resume) {
            User.updateOne({ _id: userId }, { $set: { resume: filename } })
              .then(() => resolve())
              .catch((error) => reject(error));
          } else {
            User.updateOne({ _id: userId }, { $set: { resume: filename } })
              .then(() => resolve())
              .catch((error) => reject(error));
          }
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
