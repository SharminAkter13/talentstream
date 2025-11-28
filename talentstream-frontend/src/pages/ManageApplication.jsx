import React, { useState } from "react";

// ✅ Bootstrap CSS + JS bundle
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from './../component/Navbar';
import Sidebar from './../component/Sidebar';
import Footer from './../component/Footer';

const ManageApplications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      jobTitle: "Frontend Developer",
      email: "john@example.com",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      jobTitle: "Backend Developer",
      email: "jane@example.com",
      status: "Reviewed",
    },
  ]);

  const [selectedApp, setSelectedApp] = useState(null);

  const handleDelete = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const handleView = (app) => {
    setSelectedApp(app);
    const modal = new window.bootstrap.Modal(
      document.getElementById("viewModal")
    );
    modal.show();
  };

  const handleUpdateStatus = (newStatus) => {
    if (!selectedApp) return;
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApp.id ? { ...app, status: newStatus } : app
      )
    );
    setSelectedApp({ ...selectedApp, status: newStatus });
  };

  return (
        <div>
            {/* Navbar */}
            <Navbar/>
            {/* Sidebar */}
            <Sidebar/>
  <div className="main-container">
    <div className="pd-ltr-20 xs-pd-20-10">
      <div className="min-height-200px">
        <div className="page-header">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="title">
                <h4>blank</h4>
              </div>
              <nav aria-label="breadcrumb" role="navigation">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">blank</li>
                </ol>
              </nav>
            </div>
            
          </div>
        </div>
        <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
        <main className="flex-grow-1 p-4 bg-light">
          <div className="container bg-white p-4 rounded shadow-sm">
            <h1 className="text-center mb-4">Manage Applications</h1>
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Job Title</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.name}</td>
                    <td>{app.jobTitle}</td>
                    <td>{app.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          app.status === "Pending"
                            ? "bg-warning text-dark"
                            : app.status === "Accepted"
                            ? "bg-success"
                            : app.status === "Rejected"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleView(app)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(app.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View Modal */}
          <div
            className="modal fade"
            id="viewModal"
            tabIndex="-1"
            aria-labelledby="viewModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="viewModalLabel">
                    Application Details
                  </h5>
                  {/* ✅ close button works automatically */}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {selectedApp ? (
                    <>
                      <p>
                        <strong>Name:</strong> {selectedApp.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedApp.email}
                      </p>
                      <p>
                        <strong>Job Title:</strong> {selectedApp.jobTitle}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${
                            selectedApp.status === "Pending"
                              ? "bg-warning text-dark"
                              : selectedApp.status === "Accepted"
                              ? "bg-success"
                              : selectedApp.status === "Rejected"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {selectedApp.status}
                        </span>
                      </p>

                      {/* ✅ Status Update Buttons */}
                      <div className="mt-3">
                        <button
                          className="btn btn-success me-2"
                          onClick={() => handleUpdateStatus("Accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleUpdateStatus("Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>No data available</p>
                  )}
                </div>
                <div className="modal-footer">
                  {/* ✅ cancel button dismisses modal */}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ManageApplications;
