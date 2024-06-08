const express = require("express");
const {
  addJob,
  getMyJobs,
  openResume,
} = require("../../controllers/company/companyController");
const path = require("path");
const fs = require("fs");
const multer = require("multer");




const companyRouter = express.Router();

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

companyRouter.get("/open-resume/:filename", (req, res) => {
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

// Route for adding a job
companyRouter.post("/add-job", (req, res) => {
  addJob(req.body).then((result) => {
    res.send(result);
  });
});

// Route for retrieving all jobs posted by the company
companyRouter.get("/my-jobs", (req, res) => {
  getMyJobs().then((result) => {
    res.send(result);
  });
});

// Route for opening and streaming candidate resumes
// companyRouter.get("/open-resume/:resumeFilename", async (req, res) => {
//   try {
//     const result = await openResume(req.params.resumeFilename);
//     if (result.success) {
//       res.setHeader("Content-Disposition", `attachment; filename=${result.filename}`);
//       res.setHeader("Content-Type", "application/pdf");
//       result.fileStream.pipe(res);
//     } else {
//       res.status(404).json({ error: result.message });
//     }
//   } catch (error) {
//     console.error("Error opening resume:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = companyRouter;
