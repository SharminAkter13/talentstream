import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from './../component/Footer';
import Navbar from './../component/Navbar';
import Sidebar from './../component/Sidebar';

class Reports extends Component {
  render() {
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
              <h1 className="text-center mb-4">Job Portal Reports</h1>

              {/* Summary Cards */}
              <div className="row mb-4">
                <div className="col-md-3">
                  <div className="card text-white bg-primary mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Total Jobs</h5>
                      <h2>120</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Applications</h5>
                      <h2>450</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white bg-warning mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Interviews</h5>
                      <h2>75</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-white bg-danger mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Candidates</h5>
                      <h2>300</h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Reports */}
              <div className="mb-4">
                <h4>Applications Status Overview</h4>
                <div className="mb-3">
                  <label>Accepted</label>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "45%" }}
                    >
                      45%
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label>Pending</label>
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "35%" }}
                    >
                      35%
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label>Rejected</label>
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "20%" }}
                    >
                      20%
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Report */}
              <h4 className="mt-4">Recent Job Statistics</h4>
              <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>Job Title</th>
                    <th>Applications</th>
                    <th>Interviews</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Frontend Developer</td>
                    <td>80</td>
                    <td>15</td>
                    <td>
                      <span className="badge bg-success">Open</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Backend Developer</td>
                    <td>65</td>
                    <td>10</td>
                    <td>
                      <span className="badge bg-warning">In Review</span>
                    </td>
                  </tr>
                  <tr>
                    <td>UI/UX Designer</td>
                    <td>40</td>
                    <td>8</td>
                    <td>
                      <span className="badge bg-danger">Closed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </div>
    );
  }
}

export default Reports;
