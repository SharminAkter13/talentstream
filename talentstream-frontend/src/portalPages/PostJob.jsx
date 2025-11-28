import React, { useState } from "react";
import PortalFooter from "../portalComponent/PortalFooter";
import PortalNavbar from "../portalComponent/PortalNavbar";

const PostJob = () => {
  const [formData, setFormData] = useState({
    email: "",
    jobTitle: "",
    location: "",
    category: "All Categories",
    tags: "",
    description: "",
    application: "",
    closingDate: "",
    companyName: "",
    website: "",
    tagline: "",
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // You can replace this with an API call to your backend
  };

  return (
    <>
    <PortalNavbar/>
    <div className="container mt-4">
  
      <h2>Post A Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="mail@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Location (optional)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. London"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-control"
          >
            <option>All Categories</option>
            <option>Finance</option>
            <option>IT & Engineering</option>
            <option>Education/Training</option>
            <option>Art/Design</option>
            <option>Sale/Marketing</option>
            <option>Healthcare</option>
            <option>Science</option>
            <option>Food Services</option>
          </select>
        </div>
        <div className="form-group">
          <label>Job Tags (optional)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. PHP, Social Media, Management"
          />
          <small className="form-text text-muted">
            Comma separate tags for required skills or technologies.
          </small>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="5"
          />
        </div>
        <div className="form-group">
          <label>Application Email / URL</label>
          <input
            type="text"
            name="application"
            value={formData.application}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter an email address or website URL"
          />
        </div>
        <div className="form-group">
          <label>Closing Date (optional)</label>
          <input
            type="date"
            name="closingDate"
            value={formData.closingDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <h4>Company Details</h4>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Website (optional)</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="form-control"
            placeholder="http://"
          />
        </div>
        <div className="form-group">
          <label>Tagline (optional)</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className="form-control"
            placeholder="Briefly describe your company"
          />
        </div>
        <div className="form-group">
          <label>Upload Cover Image</label>
          <input
            type="file"
            name="coverImage"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit your job
        </button>
      </form>
    </div>
    <PortalFooter/>
    </>
  );
};

export default PostJob;
