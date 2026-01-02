import React from "react";

const StepPersonal = ({ resume, setResume, next }) => {
  const handleChange = e => {
    const { name, value, files, type } = e.target;
    
    setResume(prev => ({
      ...prev,
      // Handle file uploads, numbers for age, and strings for everything else
      [name]: files ? files[0] : (type === 'number' ? parseInt(value) : value),
    }));
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-4">Personal & Professional Information</h4>

      <div className="row">
        {/* Name */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="name" placeholder="e.g. John Doe"
            value={resume.name || ""} onChange={handleChange} className="form-control" />
        </div>

        {/* Email */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Email Address</label>
          <input type="email" name="email" placeholder="e.g. john@example.com"
            value={resume.email || ""} onChange={handleChange} className="form-control" />
        </div>

        {/* Profession Title */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Profession Title</label>
          <input type="text" name="profession_title" placeholder="e.g. Full Stack Developer"
            value={resume.profession_title || ""} onChange={handleChange} className="form-control" />
        </div>

        {/* Location */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Location</label>
          <input type="text" name="location" placeholder="e.g. New York, USA"
            value={resume.location || ""} onChange={handleChange} className="form-control" />
        </div>

        {/* Website / Portfolio */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Website (Web)</label>
          <input type="text" name="web" placeholder="e.g. https://portfolio.com"
            value={resume.web || ""} onChange={handleChange} className="form-control" />
        </div>

        {/* Hourly Rate (Pre Hour) */}
        <div className="col-md-3 mb-3">
          <label className="form-label">Hourly Rate ($)</label>
          <input type="text" name="pre_hour" placeholder="e.g. 50"
            value={resume.pre_hour || ""} onChange={handleChange} className="form-control" />
        </div>

        {/* Age */}
        <div className="col-md-3 mb-3">
          <label className="form-label">Age</label>
          <input type="number" name="age" placeholder="e.g. 25"
            value={resume.age || ""} onChange={handleChange} className="form-control" />
        </div>

        {/* Cover Image / Profile Pic */}
        <div className="col-12 mb-4">
          <label className="form-label">Profile Image (Cover Image)</label>
          <input type="file" name="cover_image" onChange={handleChange} className="form-control" />
          <small className="text-muted">Upload a professional headshot.</small>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary px-5" onClick={next}>
          Next Step <i className="bi bi-arrow-right ms-2"></i>
        </button>
      </div>
    </div>
  );
};

export default StepPersonal;