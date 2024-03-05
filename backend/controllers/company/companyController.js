const Jobs = require("../../models/jobModal");
const { successResponse, errorResponse } = require("../../constants/response");
const User = require("../../models/userModal");
module.exports = {
  addJob: (data) => {
    return new Promise((resolve, reject) => {
      Jobs.create(data).then(() => {
        resolve(successResponse);
      });
    });
  },
  getMyJobs: () => {
    return new Promise((resolve, reject) => {
      Jobs.find().then(async (result) => {
        let ids = [];
        let jobArr = [];
        if (result.length > 0) {
          let jobObj = {};
          for (let i = 0; i < result.length; i++) {
            const e = result[i];
            jobObj.job = e;
            const jobids = e?._id;
            ids.push(jobids);
          }
          if (ids.length > 0) {
            let appliedUser = await User.find({ appliedJobs: { $in: ids } });
            jobObj.applied_users = appliedUser;
          }
          jobArr.push(jobObj);
        }

        successResponse.data = jobArr;

        resolve(successResponse);
      });
    });
  },
};
