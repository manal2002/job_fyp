import React, { useState } from "react";
import PropTypes from "prop-types";

// Add PropTypes for updateFormData
AdditionalInformationForm.propTypes = {
  updateFormData: PropTypes.func.isRequired,
};

function AdditionalInformationForm({ updateFormData }) {
  const [yearsofExp, setYearsofExp] = useState(0);
  const [noticePeriod, setNoticePeriod] = useState(0);
  const [dates, setDates] = useState("");
  const [cctc, setCctc] = useState("");
  const [ectc, setEctc] = useState("");
  const [report, setReport] = useState("");
  const [disableBtn, setDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... (your existing code)

    // Call updateFormData to update the parent state
    updateFormData("additionalInformation", {
      test: "testdata",
    });
  };

  const submitAdditionalDetails = (e) => {
    e.preventDefault();
    let data = {
      yearsofExp,
      noticePeriod,
      dates,
      cctc,
      ectc,
      report,
    };
    localStorage.setItem("additionalDetails", JSON.stringify(data));
  };

  return (
    <div>
      <div className="container-fluid p-5">
        <h2
          className="form-title"
          style={{ left: "28px", position: "relative" }}
        >
          Additional Informations
        </h2>
        <div className="card-lg p-4">
          <form>
            <div className="row">
              <div className="col-md-6">
                <label>
                  How many years of total work experience do you have?
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  required
                  onChange={(e) => setYearsofExp(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>"What is your notice period?"(optional)</label>
                <input
                  type="text"
                  className="form-control w-100"
                  required
                  onChange={(e) => setNoticePeriod(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label>
                  Please list 2-3 dates and time ranges that you could do an
                  interview.(optional)
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  required
                  onChange={(e) => setDates(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>"What is your current CTC?"(optional)</label>
                <textarea
                  onChange={(e) => setCctc(e.target.value)}
                  className="form-control w-100"
                  required
                />
              </div>

              <div className="col-md-6">
                <label>"What is your expected CTC?"(optional)</label>
                <input
                  type="text"
                  className="form-control w-100"
                  onChange={(e) => setEctc(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label>
                  This is an employer-written question. You can report
                  inappropriate questions to Indeed through the "Report Job"
                  link at the bottom of the job description.
                </label>
                <textarea
                  onChange={(e) => setReport(e.target.value)}
                  className="form-control w-100"
                />
              </div>
              <div className="ml-auto">
                <button
                  disabled={disableBtn}
                  className="btn btn-primary mt-5"
                  onClick={submitAdditionalDetails}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInformationForm;
