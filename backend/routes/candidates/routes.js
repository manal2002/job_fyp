const express = require("express");
const {
  listAllJobs,
  getJobDetails,
  uploadResume,
  applyJob,
  myJobs,
  editProfile,
  getProfile,
  getResume,
  postResume,
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

// candidateRouter.post("/upload-resume", upload.single("resume"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded." });
//   }
//   const { filename } = req.file;
//   uploadResume(filename, req.body.userId);
//   return res.json({ filename });
// });

candidateRouter.post("/upload-resume", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  const { filename } = req.file;
  const { userId } = req.body;
  try {
    const uploadResult = await uploadResume(filename, userId);
    return res.json({ filename });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
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

candidateRouter.post("/post-resume", async (req, res) => {
  try {
    const { jobId, userId, formData } = req.body;
    console.log("Step 1 data received:", { jobId, userId, formData });

    // Call the postResume function to handle resume posting
    const postResumeResult = await postResume(req.body);

    // Send the response based on the result of posting the resume
    res.status(200).json(postResumeResult);
  } catch (error) {
    console.error("Error posting resume:", error);
    res.status(500).json({ success: false, message: "Error posting resume", error: error.message });
  }
});


// Route to fetch resume data based on userId and jobId
// candidateRouter.get("/get-resume/:userId/:jobId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const jobId = req.params.jobId;

//     // Call the controller function to get resume data
//     const resumeData = await getResume(userId, jobId);

//     // Send the resume data as response
//     res.status(200).json(resumeData);
//   } catch (error) {
//     console.error("Error fetching resume:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

candidateRouter.get("/get-resume/:userId/:jobId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const jobId = req.params.jobId;

    // Call the controller function to get resume data
    const resumeData = await getResume(userId, jobId);

    // Send the resume data as response
    res.status(200).json(resumeData);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


candidateRouter.get("/my-jobs/:id", (req, res) => {
  const userId = req.params.id;
  myJobs(userId)
    .then((result) => {
      console.log("myJobs result:", result);
      res.send(result);
    })
    .catch((error) => {
      console.error("Error calling myJobs:", error);
      res.status(500).send({ success: false, message: "Internal Server Error" });
    });
});

// candidateRouter.get("/my-jobs/:id", (req, res) => {
//   myJobs(req.params.id).then((result) => {
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

