import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import TotalAvatars from "../Components/TotalAvatars/TotalAvatars";
import Page1 from "./candidate/Page1";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid landing-page-container">
        <div className="row mt-5" style={{ top: "40px", position: "relative" }}>
          <div className="col-md-5 mt-5">
            <div className="container">
              <div className="title mt-5">
                <h2>
                  Its Easy to find your
                  <span>Dream Job</span>
                </h2>
              </div>
              <div>
                {/* <p className="about-desc mt-5">
                Welcome to{" "}
                <span style={{ color: "darkcyan" }}>CareerLinker</span>, where
                opportunities meet talent. Discover your next career move or
                find the perfect candidate with our intuitive job portal.
                Connecting companies and candidates seamlessly, we make the
                hiring process simple and efficient. Your journey to success
                starts here.
              </p> */}
              </div>
            </div>
          </div>
          <div className="col-md-7 mt-5">
            <img
              style={{ top: "-80px", position: "relative" }}
              src="https://img.freepik.com/free-photo/happy-young-man-using-laptop-computer_171337-19581.jpg"
              className="w-100"
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/software-developers-3896190-3239630.png"
                className="w-50"
              />
            </div>
            <div className="col-md-4">
              <div>
                <h4 style={{ fontWeight: "600" }}>
                  Find full time , part time and remote job.
                </h4>
                <br />
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <TotalAvatars />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row job-count-div">
                <div className="col-md-4">
                  <div>
                    <h3>Live Jobs</h3>
                    <h6 style={{ color: "orange" }}>25000</h6>
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                    <h3>Daily Job post</h3>
                    <h6 style={{ color: "darkcyan" }}>4000+</h6>
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                    <h3>Active Companies</h3>
                    <h6 style={{ color: "green" }}>1 Lakh</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <section className="container-fluid ">
          <Page1 />
        </section>

        <div className="advDiv">
          <h4>
            Find the Talent needed <br /> to get your Business growing
          </h4>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY7SBE57Fhwae1H6ViP378GsJGzvDULrFz4w&usqp=CAU" />
        </div>
        <section>
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <div>
                  <img
                    src="https://st.depositphotos.com/1144472/1971/i/450/depositphotos_19714321-stock-photo-young-happy-smiling-business-man.jpg"
                    className="w-100"
                  />
                </div>
              </div>
              <div className="col-md-6 mt-5">
                <h2>Our service to provide your career grows</h2>
                <div className="mt-4">
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                    Extremes of Good and Evil) by Cicero, written in 45 BC. This
                    book is a treatise on the theory of ethics, very popular
                    during the Renaissance. The first line of Lorem Ipsum,
                    "Lorem ipsum dolor sit amet..", comes from a line in section
                    1.10.32.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container">
          <h2>Browser Talent By Category</h2>
          <div className="row">
            <div className="col-md-3 col-12">
              <div className="card p-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2110/2110641.png"
                  className="w-100"
                />
                <h3 className="mt-3">Development</h3>
              </div>
            </div>
            <div className="col-md-3 col-12">
              <div className="card p-4">
                <img
                  src="https://w7.pngwing.com/pngs/32/586/png-transparent-customer-relationship-management-business-company-business.png"
                  className="w-100"
                />
                <h3 className="mt-3">Hr Executive</h3>
              </div>
            </div>
            <div className="col-md-3 col-12">
              <div className="card p-4">
                <img
                  src="data:image/jpeg;base64,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"
                  className="w-100"
                />
                <h3 className="mt-3">Development</h3>
              </div>
            </div>
            <div className="col-md-3 col-12">
              <div className="card p-4">
                <img
                  src="data:image/png;base64,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"
                  className="w-100"
                />
                <h3 className="mt-3">Embedded Programming</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
