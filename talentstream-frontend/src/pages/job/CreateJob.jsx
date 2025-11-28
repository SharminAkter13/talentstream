import React, { useState } from "react";
import Navbar from "./../../component/Navbar";
import Sidebar from "./../../component/Sidebar";
import Footer from "./../../component/Footer";

const CreateJob = () => {
  const [jobDetails, setJobDetails] = useState({
    email: "",
    title: "",
    location: "",
    category: "",
    tags: "",
    description: "",
    applyUrl: "",
    closingDate: "",
    companyName: "",
    website: "",
    tagline: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job details submitted:", jobDetails);
    alert("Job posted successfully!");
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

        {/* Main content */}
        <main className="flex-grow-1 p-4 bg-light">
          <div className="container bg-white p-4 rounded shadow-sm">
            <h1 className="text-center mb-4">Post a New Job</h1>

            <form onSubmit={handleSubmit}>
              {/* Contact Email */}
              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={jobDetails.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="mail@example.com"
                  required
                />
              </div>

              {/* Job Title */}
              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={jobDetails.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter job title"
                  required
                />
              </div>

              {/* Location + Category */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Location (optional)</label>
                  <input
                    type="text"
                    name="location"
                    value={jobDetails.location}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="e.g. London"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={jobDetails.category}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">All Categories</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-3 mt-3">
                <label className="form-label">Job Tags (optional)</label>
                <input
                  type="text"
                  name="tags"
                  value={jobDetails.tags}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. PHP, Social Media, Management"
                />
                <small className="text-muted">
                  Comma separate tags, such as required skills or technologies, for this job.
                </small>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={jobDetails.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Write a detailed job description..."
                ></textarea>
              </div>

              {/* Application Email / URL */}
              <div className="mb-3">
                <label className="form-label">Application email / URL</label>
                <input
                  type="text"
                  name="applyUrl"
                  value={jobDetails.applyUrl}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter an email address or website URL"
                />
              </div>

              {/* Closing Date */}
              <div className="mb-3">
                <label className="form-label">Closing Date (optional)</label>
                <input
                  type="date"
                  name="closingDate"
                  value={jobDetails.closingDate}
                  onChange={handleChange}
                  className="form-control"
                />
                <small className="text-muted">
                  Deadline for new applicants.
                </small>
              </div>

              {/* Company Details */}
              <h4 className="mt-4 mb-3 border-bottom pb-2">Company Details</h4>
              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={jobDetails.companyName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter the name of the company"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Website (optional)</label>
                <input
                  type="url"
                  name="website"
                  value={jobDetails.website}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="http://"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tagline (optional)</label>
                <input
                  type="text"
                  name="tagline"
                  value={jobDetails.tagline}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Briefly describe your company"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Company Logo (optional)</label>
                <input
                  type="file"
                  name="logo"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Submit Button */}
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Post Job
                </button>
              </div>
            </form>
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

export default CreateJob;
