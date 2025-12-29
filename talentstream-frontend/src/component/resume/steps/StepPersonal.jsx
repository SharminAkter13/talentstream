import React from "react";

const StepPersonal = ({ resume, setResume, next }) => {
  const handleChange = e => {
    const { name, value, files } = e.target;
    setResume(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div>
      <h4>Personal Information</h4>

      <input type="text" name="name" placeholder="Full Name"
        value={resume.name} onChange={handleChange} className="form-control mb-2" />

      <input type="email" name="email" placeholder="Email"
        value={resume.email} onChange={handleChange} className="form-control mb-2" />

      <input type="file" name="cover_image" onChange={handleChange} className="form-control mb-2" />

      <button className="btn btn-primary" onClick={next}>Next</button>
    </div>
  );
};

export default StepPersonal;
