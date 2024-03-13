import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import "./AllJob.css";
import OutlinedCard from "../Components/Card/Card";
import axios from "axios";
import API_ENDPOINTS from "../Api";
import Loader from "../Components/Loader";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import JobSeekerSidebar from "../Components/Sidebar/Jobseekersidebar";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  // const fetchJobsData = async () => {
  //   // Simulating data fetching delay
  //   setLoading(true);
  //   const response = await fetch("your-api-endpoint");
  //   const data = await response.json();
  //   setLoading(false);
  //   return data;
  // };

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        let res = await axios.get(API_ENDPOINTS.getAllJobs);

        if (res && res.data) {
          setLoading(false);
          setJobs(res?.data?.data);
        }
      };
      fetchData();
    } catch (error) {
      setError(true);
    }
  }, []);

  const handleSearch = async () => {
    const allJobs = jobs;

    // Filter jobs based on search query and sort by jobTitle
    const filteredAndSortedJobs = allJobs
      .filter((job) => {
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));

    setFilteredJobs(filteredAndSortedJobs);
  };

  return (
    <>
    
    <div className="main-content-wrapper" style={{ backgroundColor: "whitesmoke" }}></div>
    {/* <div style={{ backgroundColor: "whitesmoke" }}> */}
      <Navbar />
      <div className="mt-5">
        <div className="container-fluid">
        <JobSeekerSidebar />
          <div class="overlay" style={{ display: "none" }}></div>
          <div class="search-section">
            <div class="container-fluid container-xl">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <input
                  type="search"
                  placeholder="Search by keywords (.Net, Nodejs ... etc)"
                  className="form-control search-input p-4"
                  style={{
                    boxShadow:
                      "0 4px 8px 0 rgba(235, 243, 241, 0.2), 0 6px 20px 0 rgba(119, 138, 129, 0.19)",
                    height: "40px",
                  }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="searchBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
              <div class="row main-content ml-md-0 mt-4">
              
                <div class="sidebar col-md-3 px-0">
                  <h1 class="border-bottom filter-header d-flex d-md-none p-3 mb-0 align-items-center">
                    <span class="mr-2 filter-close-btn">X</span>
                    Filters
                    <span class="ml-auto text-uppercase">Reset Filters</span>
                  </h1>
                  <div class="sidebar__inner ">
                    <div class="filter-body">
                      <div className="filtercard p-2">
                        <h2 class="border-bottom filter-title">Job Options</h2>
                        <div class="mb-30 filter-options">
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Indoor"
                              checked
                            />
                            <label class="custom-control-label" for="Indoor">
                              Night Shift
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Outdoor"
                            />
                            <label class="custom-control-label" for="Outdoor">
                              Day Shift
                            </label>
                          </div>
                        </div>

                        <h2 class="font-xbold body-font border-bottom filter-title">
                          Location
                        </h2>
                        <div class="mb-3 filter-options" id="cusine-options">
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Chinese"
                              checked
                            />
                            <label class="custom-control-label" for="Chinese">
                              Kerala
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Italian"
                            />
                            <label class="custom-control-label" for="Italian">
                              Banglore
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Mexican"
                            />
                            <label class="custom-control-label" for="Mexican">
                              Trivandrum
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Thai"
                            />
                            <label class="custom-control-label" for="Thai">
                              Kottayam
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Gujarati"
                            />
                            <label class="custom-control-label" for="Gujarati">
                              Ernakulam
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Panjabi"
                            />
                            <label class="custom-control-label" for="Panjabi">
                              Panjab
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="South-Indian"
                            />
                            <label
                              class="custom-control-label"
                              for="South-Indian"
                            >
                              South Indian
                            </label>
                          </div>
                        </div>

                        <h2 class="font-xbold body-font border-bottom filter-title">
                          Salary Range Range
                        </h2>
                        <div class="mb-3 theme-clr xs2-font d-flex justify-content-between">
                          <span id="slider-range-value1">Min $100</span>
                          <span id="slider-range-value2">Max $10,000</span>
                        </div>
                        <div class="mb-30 filter-options">
                          <div>
                            <div id="slider-range">
                              <form>
                                <div class="form-group">
                                  <input
                                    type="range"
                                    class="form-control-range"
                                    id=""
                                  />
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <h2 class="border-bottom filter-title">Skills</h2>
                        <div class="mb-3 filter-options" id="services-options">
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Breakfast"
                              checked
                            />
                            <label class="custom-control-label" for="Breakfast">
                              React JS
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Lunch"
                            />
                            <label class="custom-control-label" for="Lunch">
                              Node JS
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Donner"
                            />
                            <label class="custom-control-label" for="Donner">
                              Mongodb
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Cafe"
                            />
                            <label class="custom-control-label" for="Cafe">
                              Php
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="Brunch"
                            />
                            <label class="custom-control-label" for="Brunch">
                              Express JS
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="other"
                            />
                            <label class="custom-control-label" for="other">
                              Other
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="content col-md-9">
                  {/* <div>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search job"
                    />
                    <i className="fa fa-search" style={{ float: "right" }}></i>
                  </div> */}
                  <div class="d-flex justify-content-between border-bottom align-items-center mt-2">
                    <h2 class="title">All Jobs</h2>

                    <div class="filters-actions">
                      <div>
                        <button class="btn filter-btn d-md-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-2"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#000000"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
                          </svg>
                          Filter
                        </button>
                      </div>
                      <div class="d-flex align-items-center">
                        <div class="dropdown position-relative sort-drop">
                          <button
                            type="button"
                            class="btn btn-transparent dropdown-toggle body-clr p-0 py-1 sm-font fw-400 sort-toggle"
                            data-toggle="dropdown"
                          >
                            <span class="mr-2 d-md-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                enable-background="new 0 0 24 24"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#000000"
                              >
                                <g>
                                  <path d="M0,0h24 M24,24H0" fill="none" />
                                  <path d="M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" />
                                  <path d="M0,0h24v24H0V0z" fill="none" />
                                </g>
                              </svg>
                            </span>
                            <span class="d-md-inline-block ml-md-2 font-semibold">
                              Newest First
                            </span>
                          </button>
                          <div class="dropdown-menu dropdown-menu-right p-0 no-caret">
                            <a
                              class="dropdown-item selected"
                              href="javascript:void(0)"
                            >
                              Newest First
                            </a>
                            <a class="dropdown-item" href="javascript:void(0)">
                              Lowest First
                            </a>
                            <a class="dropdown-item" href="javascript:void(0)">
                              Highest First
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" style={{ marginLeft: "10px" }}>
                    {loading ? (
                      <Loader class="text-center" />
                    ) : (
                      <div className="row col-md-12">
                        <OutlinedCard data={jobs} className="w-100" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </>
  );
}

export default AllJobs;
