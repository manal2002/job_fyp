import { BASE_URL } from "./constants/url";

const urls = {
  allJobs: `api/candidate/all-jobs`,
  jobDetail: `api/candidate/job`,
  uploadResume: `api/candidate/upload-resume`,
  applyJob: `api/candidate/apply-job`,
  postResume: `api/candidate/post-resume`,
  getResume: `api/candidate/get-resume`,
  myJobs: `api/candidate/my-jobs`,
  editProfile: `api/candidate/edit-profile`,
  getProfile: `api/candidate/profile`,
  downloadResume:`api/candidate/download-resume`,
  // Auth routes
  register: `api/auth/register`,
  login: "api/auth/login",
  // End auth routes

  // Company routes
  postJob: `api/company/add-job`,
  postedJobs: `api/company/my-jobs`,
  openResume: `api/company/open-resume`,

  // end Company routes
};

const API_ENDPOINTS = {
  getAllJobs: `${BASE_URL}/${urls.allJobs}`,
  getJobDetails: `${BASE_URL}/${urls.jobDetail}`,
  uploadResume: `${BASE_URL}/${urls.uploadResume}`,
  downloadResume: `${BASE_URL}/${urls.downloadResume}`,
  applyJob: `${BASE_URL}/${urls.applyJob}`,
  postResume: `${BASE_URL}/${urls.postResume}`,
  getResume: `${BASE_URL}/${urls.getResume}`,
  myJobs: `${BASE_URL}/${urls.myJobs}`,
  editProfile: `${BASE_URL}/${urls.editProfile}`,
  getProfile: `${BASE_URL}/${urls.getProfile}`,
  // Auth routes
  createAccount: `${BASE_URL}/${urls.register}`,
  loginAccount: `${BASE_URL}/${urls.login}`,
  // End routes auth routes

  // Company routes
  postJob: `${BASE_URL}/${urls.postJob}`,
  postedJobs: `${BASE_URL}/${urls.postedJobs}`,
  openResume: `${BASE_URL}/${urls.downloadResume}`,

  // End company routes
};

export default API_ENDPOINTS;
