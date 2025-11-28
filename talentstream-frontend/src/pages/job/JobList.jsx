import React from 'react';
import Navbar from './../../component/Navbar';
import Sidebar from './../../component/Sidebar';
import Footer from './../../component/Footer';

const JobList = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Dhaka, Bangladesh",
      type: "Full-Time",
      salary: "$800 - $1000",
      posted: "2025-09-20",
      status: "Open",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "CodeWorks",
      location: "Chittagong, Bangladesh",
      type: "Contract",
      salary: "$1200",
      posted: "2025-09-22",
      status: "Closed",
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Sidebar */}
      <Sidebar />

      <div className="main-container">
        <div className="pd-ltr-20 xs-pd-20-10">
          <div className="min-height-200px">
            <div className="page-header">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="title">
                    <h4>Job Listings</h4>
                  </div>
                  <nav aria-label="breadcrumb" role="navigation">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#">Home</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Jobs</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>

            <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
              <h3 className="mb-4">Job Listings</h3>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Salary</th>
                      <th>Posted</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, index) => (
                      <tr key={job.id}>
                        <td>{index + 1}</td>
                        <td>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.location}</td>
                        <td>
                          <span className="badge bg-primary">{job.type}</span>
                        </td>
                        <td>{job.salary}</td>
                        <td>{job.posted}</td>
                        <td>
                          <span
                            className={`badge ${
                              job.status === "Open"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-info me-2 text-white">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-warning me-2">
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button className="btn btn-sm btn-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobList;
