import React, { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../Api";
import Loader from "../../Components/Loader";

const itemsPerPage = 2;

const Table2 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios.get(API_ENDPOINTS.postedJobs).then((resp) => {
        if (resp && resp.status === 200) {
          setJobs(resp.data.data);
          setLoading(false);
        }
      });
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobs?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Job Title
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Location
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Experience Level
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Applied Candidates Count
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {index + 1}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedJob(item)}
                    >
                      {item?.job?.jobTitle}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item?.job?.location}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item?.job?.experienceLevel}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {item?.applied_users?.length}
                    </td>
                  </tr>
                  {selectedJob && selectedJob.job._id === item.job._id && (
                    <>
                      <h6>Applied candiates</h6>
                      <tr>
                        <td colSpan="5">
                          {/* Render the expanded table with applied candidates */}
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              marginTop: "10px",
                            }}
                          >
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Actions</th>
                                {/* Add more columns as needed */}
                              </tr>
                            </thead>
                            <tbody>
                              {selectedJob.applied_users.map((user) => (
                                <>
                                  <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                      <div class="dropdown">
                                        <button
                                          class="actionBtn dropdown-toggle"
                                          type="button"
                                          data-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          Dropdown button
                                        </button>
                                        <div class="dropdown-menu">
                                          <a
                                            class="dropdown-item"
                                            href={`/profile/${user?._id}`}
                                          >
                                            View Profile
                                          </a>
                                          <a class="dropdown-item">Select</a>
                                          <a class="dropdown-item">Reject</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px", float: "right" }}>
            <button
              className="prevBtn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                style={{ marginLeft: "5px" }}
                className="page-list-btn"
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "5px" }}
              className="nextBtn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Table2;
