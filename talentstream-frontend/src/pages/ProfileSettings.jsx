import React, { useState } from 'react';
import Navbar from './../component/Navbar';
import Sidebar from './../component/Sidebar';
import Footer from './../component/Footer';

const ProfileSettings = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    bio: user?.bio || '',
    education: user?.education || '',
    resume: null,
    profile_photo: null,
    company_name: user?.company_name || '',
    address: user?.address || '',
    website: user?.website || '',
    contact_number: user?.contact_number || '',
  });

  const isJobSeeker = user?.role === 'job_seeker';
  const isEmployer = user?.role === 'employer';

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
    // TODO: Send formData to API
    console.log('Submitting form:', formData);
    alert('Profile updated (demo only)');
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

    <div className="container mt-5">
      <div className="card shadow p-4">
        <h4 className="mb-4">Profile Settings</h4>
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email (read-only)</label>
            <input type="email" className="form-control" value={formData.email} disabled />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
          </div>

          {/* Profile Photo */}
          <div className="form-group">
            <label>Profile Photo</label>
            <input type="file" className="form-control-file" name="profile_photo" onChange={handleChange} />
          </div>

          {/* Job Seeker Fields */}
          {isJobSeeker && (
            <>
              <div className="form-group">
                <label>Bio</label>
                <textarea className="form-control" name="bio" value={formData.bio} onChange={handleChange}></textarea>
              </div>
              <div className="form-group">
                <label>Education</label>
                <input type="text" className="form-control" name="education" value={formData.education} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Resume</label>
                <input type="file" className="form-control-file" name="resume" onChange={handleChange} />
              </div>
            </>
          )}

          {/* Employer Fields */}
          {isEmployer && (
            <>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" className="form-control" name="company_name" value={formData.company_name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="text" className="form-control" name="contact_number" value={formData.contact_number} onChange={handleChange} />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
            </div>
      </div>
    </div>
    </div>
    <Footer/>
    </div>


  );
};

export default ProfileSettings;
