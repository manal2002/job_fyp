const express = require("express");
const {
  listAllJobs,
  getJobDetails,
  uploadResume,
  applyJob,
  getMyJobs,
  editProfile,
  getProfile,
} = require("../../controllers/candidate/candidateController");
const { data } = require("../../data");

const candidateRouter = express.Router();

const multer = require("multer");
const path = require("path");
const Jobs = require("../../models/jobModal");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const userId = req.body.userId;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });
const resumeFolder = path.join(__dirname, "../..", "uploads");

candidateRouter.get("/", async (req, res) => {
  let datas = data.jobs;
  await Jobs.create(datas);
  res.send("Candidate router called");
});

candidateRouter.get("/all-jobs", (req, res) => {
  listAllJobs().then((result) => {
    res.send(result);
  });
});

candidateRouter.get("/job/:jobId", (req, res) => {
  getJobDetails(req.params.jobId).then((result) => {
    res.send(result);
  });
});

candidateRouter.post("/upload-resume", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  const { filename } = req.file;
  uploadResume(filename, req.body.userId);
  return res.json({ filename });
});

candidateRouter.get("/download-resume/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(resumeFolder, filename);

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "application/pdf");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

candidateRouter.post("/apply-job", (req, res) => {
  applyJob(req.body.data).then((result) => {
    res.send(result);
  });
});

// candidateRouter.get("/my-jobs/:id", (req, res) => {
//   getMyJobs(req.params.id).then((result) => {
//     res.send(result);
//   });
// });

// candidateRouter.post("/apply-job", async (req, res) => {
//   try {
//     const applicationResult = await module.exports.applyJob(req.body);
//     res.json(applicationResult);
//   } catch (error) {
//     console.error("Error applying for job:", error);
//     res.status(500).json({ success: false, message: "Error applying for job", error: error.message });
//   }
// });

candidateRouter.post("/edit-profile/:id", (req, res) => {
  editProfile(req.params.id, req.body).then((result) => {
    console.log("result-----------", result);
    res.send(result);
  });
});

candidateRouter.get("/profile/:id", (req, res) => {
  getProfile(req.params.id).then((result) => {
    res.send(result);
  });
});


// Route to generate interview questions
// Route to generate interview questions
// candidateRouter.post('/generate-interview-questions', async (req, res) => {
//   const { jobDescription, matchedSkills } = req.body;

//   try {
//     // Call the function to generate interview questions
//     const questions = await generateInterviewQuestions(jobDescription, matchedSkills);

//     // Store the generated questions in the session
//     req.session.interviewQuestions = questions;

//     res.json({ success: true, message: 'Interview questions generated and stored in session' });
//   } catch (error) {
//     console.error('Error generating interview questions:', error);
//     res.status(500).json({ success: false, message: 'Error generating interview questions' });
//   }
// });

module.exports = candidateRouter;
