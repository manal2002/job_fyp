// import React, { useState } from "react";
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Typography,
//   TextField,
// } from "@material-ui/core";
// import axios from "axios";
// import API_ENDPOINTS from "../../Api";
// import Swal from "sweetalert2";

// const MultistepForm = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({
//     jobTitle: "",
//     jobDescription: "",
//     companyName: "",
//     location: "",
//     jobType: "",
//     salary: "",
//     applicationDeadline: "",
//     jobCategory: "",
//     experienceLevel: "",
//     educationLevel: "",
//     skills_and_requirement: "",
//     contactInformation: "",
//     companyDescription: "",
//     companyWebsite: "",
//     social_media_links: [],
//     additional_features: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleNext = () => {
//     const currentStepErrors = validateStep(activeStep);
//     if (Object.keys(currentStepErrors).length === 0) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//       setErrors({});
//     } else {
//       setErrors(currentStepErrors);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     setErrors({});
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validateStep = (step) => {
//     let stepErrors = {};

//     switch (step) {
//       case 0:
//         if (
//           !formData.jobTitle ||
//           !formData.jobDescription ||
//           !formData.companyName ||
//           !formData.location ||
//           !formData.jobType
//         ) {
//           stepErrors = {
//             jobTitle: !formData.jobTitle ? "Job Title is required" : "",
//             jobDescription: !formData.jobDescription
//               ? "Job Description is required"
//               : "",
//             companyName: !formData.companyName
//               ? "Company Name is required"
//               : "",
//             location: !formData.location ? "Location is required" : "",
//             jobType: !formData.jobType ? "Job Type is required" : "",
//           };
//         }
//         break;
//       case 1:
//         if (
//           !formData.salary ||
//           !formData.applicationDeadline ||
//           !formData.jobCategory ||
//           !formData.experienceLevel ||
//           !formData.educationLevel
//         ) {
//           stepErrors = {
//             salary: !formData.salary ? "Salary is required" : "",
//             applicationDeadline: !formData.applicationDeadline
//               ? "Application Deadline is required"
//               : "",
//             jobCategory: !formData.jobCategory
//               ? "Job Category is required"
//               : "",
//             experienceLevel: !formData.experienceLevel
//               ? "Experience Level is required"
//               : "",
//             educationLevel: !formData.educationLevel
//               ? "Education Level is required"
//               : "",
//           };
//         }
//         break;
//       case 2:
//         if (
//           !formData.skills_and_requirement ||
//           !formData.contactInformation ||
//           !formData.companyWebsite ||
//           !formData.additional_features
//         ) {
//           stepErrors = {
//             skills_and_requirement: !formData.skills_and_requirement
//               ? "Skills and Requirements are required"
//               : "",
//             contactInformation: !formData.contactInformation
//               ? "Contact Information is required"
//               : "",
//             companyWebsite: !formData.companyWebsite
//               ? "Company Website is required"
//               : "",
//             additional_features: !formData.additional_features
//               ? "Additional Features are required"
//               : "",
//           };
//         }
//         break;
//       // Add more cases for additional steps if needed
//       default:
//         break;
//     }

//     return stepErrors;
//   };

//   const handleSubmit = async () => {
//     const finalErrors = validateStep(activeStep);
//     if (Object.keys(finalErrors).length === 0) {
//       console.log(formData);
//       await axios.post(API_ENDPOINTS.postJob, formData).then((resp) => {
//         if (resp.status == 200) {
//           Swal.fire({
//             icon: "success",
//             title: "Success!",
//             text: "Job added successfully.",
//           }).then(() => {
//             window.location.href = "/company/dashboard";
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Error!",
//             text: "Something went wrong.",
//           });
//         }
//       });
//       // Perform submit logic here
//       setFormData({
//         jobTitle: "",
//         jobDescription: "",
//         companyName: "",
//         location: "",
//         jobType: "",
//         salary: "",
//         applicationDeadline: "",
//         jobCategory: "",
//         experienceLevel: "",
//         educationLevel: "",
//         skills_and_requirement: "",
//         contactInformation: "",
//         companyDescription: "",
//         companyWebsite: "",
//         social_media_links: [],
//         additional_features: "",
//       });
//       setActiveStep(0);
//       setErrors({});
//     } else {
//       setErrors(finalErrors);
//     }
//   };

//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <div className="step-form p-5">
//             <div className="container-fluid p-5">
//               <div className="row">
//                 <div className="col-md-6">
//                   <p>Job Title</p>
//                   <TextField
//                     name="jobTitle"
//                     value={formData.jobTitle}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Description</p>
//                   <TextField
//                     name="jobDescription"
//                     value={formData.jobDescription}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Company Name</p>
//                   <TextField
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Location</p>
//                   <TextField
//                     name="location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Job Type</p>
//                   <TextField
//                     name="jobType"
//                     value={formData.jobType}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="step-form p-5">
//             <div className="container-fluid">
//               <h1>Step 2</h1>
//               <div className="row">
//                 <div className="col-md-6">
//                   <p>Salary</p>
//                   <TextField
//                     name="salary"
//                     value={formData.salary}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Application Deadline</p>
//                   <TextField
//                     name="applicationDeadline"
//                     type="date"
//                     value={formData.applicationDeadline}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Job Category</p>
//                   <TextField
//                     name="jobCategory"
//                     value={formData.jobCategory}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Experience Level</p>
//                   <TextField
//                     name="experienceLevel"
//                     value={formData.experienceLevel}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Education Level</p>
//                   <TextField
//                     name="educationLevel"
//                     value={formData.educationLevel}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="step-form p-5">
//             <div className="container-fluid">
//               <div className="row">
//                 <div className="col-md-6">
//                   <p>Skills and Requirements</p>
//                   <TextField
//                     name="skills_and_requirement"
//                     value={formData.skills_and_requirement}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Contact Information</p>
//                   <TextField
//                     name="contactInformation"
//                     value={formData.contactInformation}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Company Website</p>
//                   <TextField
//                     name="companyWebsite"
//                     value={formData.companyWebsite}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <p>Additional Features</p>
//                   <TextField
//                     name="additional_features"
//                     value={formData.additional_features}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div>
//             <h1>Step 4</h1>
//             <div className="statement p-4">
//               <p>
//                 In publishing and graphic design, Lorem ipsum is a placeholder
//                 text commonly used to demonstrate the visual form of a document
//                 or a typeface without relying on meaningful content. Lorem ipsum
//                 may be used as a placeholder before final copy is available
//               </p>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="mt-5">
//       <div className="container-fluid">
//         <h2 style={{ fontWeight: "bold" }}>Create new Job</h2>
//         <Stepper activeStep={activeStep} alternativeLabel className="mt-5">
//           <Step key="Personal Info">
//             <StepLabel>Personal Info</StepLabel>
//           </Step>
//           <Step key="Contact Info">
//             <StepLabel>Contact Info</StepLabel>
//           </Step>
//           <Step key="Additional Info">
//             <StepLabel>Additional Info</StepLabel>
//           </Step>
//         </Stepper>
//         <div>
//           {activeStep === 3 ? (
//             <div>
//               <Typography>All steps completed</Typography>
//               <Button onClick={handleSubmit}>Submit</Button>
//             </div>
//           ) : (
//             <div>
//               {getStepContent(activeStep)}
//               <div
//                 style={{
//                   float: "right",
//                   top: "-50px",
//                   left: "-20px",
//                   position: "relative",
//                 }}
//               >
//                 <Button disabled={activeStep === 0} onClick={handleBack}>
//                   Back
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleNext}
//                 >
//                   {activeStep === 2 ? "Finish" : "Next"}
//                 </Button>
//               </div>

//               {Object.keys(errors).length > 0 && (
//                 <>
//                   <div className="error-box">
//                     <h4 style={{ color: "red" }}>Instructions</h4>
//                     {Object.keys(errors).map((key) => (
//                       <Typography key={key} color="error">
//                         {errors[key]}
//                       </Typography>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultistepForm;







import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  Box,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import API_ENDPOINTS from "../../Api";
import Swal from "sweetalert2";
import { Business, Assignment, Send } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(4),
    borderRadius: 10,
    borderColor: "#63018e",
    border: "3px solid",
    boxShadow: "0px 0px 10px 0px #63018e",
    marginTop: "50px",
  },
  formContainer: {
    marginTop: theme.spacing(2),
    borderColor: "#63018e",
  },
  stepContainer: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
    borderColor: "#63018e",
  },
  backButton: {
    marginRight: theme.spacing(3),
  },
  submitButton: {
    marginLeft: theme.spacing(3),
  },
}));

const MultistepForm = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    location: "",
    jobType: "",
    salary: "",
    applicationDeadline: "",
    experienceLevel: "",
    educationLevel: "",
    jobSkills: "",
    jobRequirements: "",
    contactInformation: "",
    companyDescription: "",
    companyWebsite: "",
    social_media_links: [],
    additional_features: "",
  });

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    console.log("Next button clicked"); // Add this line for debugging
    const currentStepErrors = validateStep(activeStep);
    if (Object.keys(currentStepErrors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setErrors({});
    } else {
      setErrors(currentStepErrors);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateStep = (step) => {
    let stepErrors = {};

    switch (step) {
      case 0:
        if (!formData.jobTitle || !formData.jobDescription || !formData.location || !formData.jobType || !formData.salary || !formData.experienceLevel || !formData.educationLevel || !formData.jobSkills|| !formData.jobRequirements || !formData.applicationDeadline) {
          stepErrors = {
            jobTitle: !formData.jobTitle ? "Job Title is required" : "",
            jobDescription: !formData.jobDescription? "Job Description is required": "",
            location: !formData.location ? "Location is required" : "",
            jobType: !formData.jobType ? "Job Type is required" : "",
            salary: !formData.salary ? "Salary is required" : "",
            experienceLevel: !formData.experienceLevel ? "Experience Level is required" : "",
            educationLevel: !formData.educationLevel ? "Education Level is required" : "",
            jobSkills: !formData.jobSkills ? "Skills are required" : "",
            jobRequirements: !formData.jobRequirements? "Requirements are required" : "",
            applicationDeadline: !formData.applicationDeadline? "Application Deadline is required" : "",



          };
        }
        break;
      case 1:
        if (
          !formData.companyName ||
          !formData.companyDescription ||
          !formData.companyWebsite ||
          !formData.contactInformation
          
        ) {
          stepErrors = {
            companyName: !formData.companyName
              ? "Company Name is required"
              : "",
            companyDescription: !formData.companyDescription
              ? "Company Description is required"
              : "",
            companyWebsite: !formData.companyWebsite
              ? "Company Website is required"
              : "",

            contactInformation: !formData.contactInformation
              ? "Contact Information is required"
              : "",
          };
        }
        break;
      default:
        break;
    }

    return stepErrors;
  };

  const handleSubmit = async () => {
    const finalErrors = validateStep(activeStep);
    if (Object.keys(finalErrors).length === 0) {
      console.log(formData);
      await axios.post(API_ENDPOINTS.postJob, formData).then((resp) => {
        if (resp.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Job added successfully.",
          }).then(() => {
            window.location.href = "/company/dashboard";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Something went wrong.",
          });
        }
      });
      setFormData({
        jobTitle: "",
        jobDescription: "",
        companyName: "",
        location: "",
        jobType: "",
        salary: "",
        applicationDeadline: "",
        experienceLevel: "",
        educationLevel: "",
        jobSkills: "",
        jobRequirements: "",
        contactInformation: "",
        companyDescription: "",
        companyWebsite: "",
        social_media_links: [],
        additional_features: "",
      });
      setActiveStep(0);
      setErrors({});
    } else {
      setErrors(finalErrors);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jobTitle"
                label="Job Title"
                variant="outlined"
                fullWidth
                value={formData.jobTitle}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jobDescription"
                label="Job Description"
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                value={formData.jobDescription}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="location"
                label="Location"
                variant="outlined"
                fullWidth
                value={formData.location}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jobType"
                label="Job Type"
                variant="outlined"
                fullWidth
                value={formData.jobType}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="salary"
                label="Salary"
                variant="outlined"
                fullWidth
                value={formData.salary}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="experienceLevel"
                label="Experience Level"
                variant="outlined"
                fullWidth
                value={formData.experienceLevel}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="educationLevel"
                label="Education Level"
                variant="outlined"
                fullWidth
                value={formData.educationLevel}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jobSkills"
                label="Skills"
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                value={formData.jobSkills}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jobRequirements"
                label="Requirements"
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                value={formData.jobRequirements}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="applicationDeadline"
                type="date"
                label="Application Deadline"
                variant="outlined"
                fullWidth
                value={formData.applicationDeadline}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="companyName"
                label="Company Name"
                variant="outlined"
                fullWidth
                value={formData.companyName}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="companyDescription"
                label="Company Description"
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                value={formData.companyDescription}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="companyWebsite"
                label="Company Website"
                variant="outlined"
                fullWidth
                value={formData.companyWebsite}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="contactInformation"
                label="Contact Information"
                variant="outlined"
                fullWidth
                value={formData.contactInformation}
                onChange={handleChange}
                className={classes.textField}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="additional_features"
                label="Additional Features"
                variant="outlined"
                fullWidth
                value={formData.additional_features}
                onChange={handleChange}
                className={classes.textField}
                //required
              />
            </Grid>
            
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom >
        Create New Job
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepContainer}>
        <Step>
          <StepLabel>Job Information</StepLabel>
        </Step>
        <Step>
          <StepLabel>Company Information</StepLabel>
        </Step>
        <Step>
          <StepLabel>Submit Form</StepLabel>
        </Step>
      </Stepper>
      <div className={classes.formContainer}>
        {activeStep === 2 ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.submitButton}
            >
              <Send />
              Submit
            </Button>
          </div>
        ) : (
          <div>
            <Box mb={3}>{getStepContent(activeStep)}</Box>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === 1 ? (
                  <>
                    <Send />
                    Finish
                  </>
                ) : (
                  <>
                    <Assignment />
                    Next
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        {Object.keys(errors).length > 0 && (
          <Box mt={3}>
            <Typography color="error">
              Please fill in all required fields.
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

export default MultistepForm;
