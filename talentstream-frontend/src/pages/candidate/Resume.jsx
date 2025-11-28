import React, { useState } from "react";
// import React, { useState, useEffect } from "react";
import Navbar from './../../component/Navbar';
import Sidebar from './../../component/Sidebar';
import Footer from './../../component/Footer';

// const Resume = ({ user }) => {
const Resume = () => {
  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
    resume: null,
  });
  const [editing, setEditing] = useState(true);

  // Load existing data (could be fetched from API/PHP backend)
//   useEffect(() => {
//     // Example: fetch(`/api/get_candidate.php?user_id=${user.id}`)
//     //   .then(res => res.json())
//     //   .then(data => setCandidate(data));
//   }, [user.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCandidate((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);

    // Example API call to save/update resume
    // const formData = new FormData();
    // Object.keys(candidate).forEach(key => formData.append(key, candidate[key]));
    // fetch("/api/save_resume.php", { method: "POST", body: formData });

    alert("Resume saved!");
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
      <h2>Candidate Resume</h2>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={candidate.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={candidate.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={candidate.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              value={candidate.skills}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Experience</label>
            <textarea
              name="experience"
              value={candidate.experience}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Education</label>
            <textarea
              name="education"
              value={candidate.education}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Upload Resume</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              className="form-control"
            />
            {candidate.resume && <p>Selected file: {candidate.resume.name}</p>}
          </div>
          <button className="btn btn-primary">Save Resume</button>
        </form>
      ) : (
        <div className="border p-3 rounded">
          <p><strong>Name:</strong> {candidate.name}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
          <p><strong>Phone:</strong> {candidate.phone}</p>
          <p><strong>Skills:</strong> {candidate.skills}</p>
          <p><strong>Experience:</strong> {candidate.experience}</p>
          <p><strong>Education:</strong> {candidate.education}</p>
          <p>
            <strong>Resume:</strong>{" "}
            {candidate.resume ? candidate.resume.name : "No resume uploaded"}
          </p>
          <button className="btn btn-secondary" onClick={() => setEditing(true)}>
            Edit Resume
          </button>
        </div>
      )}
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Resume;
