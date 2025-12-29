import React from "react";

const StepExperience = ({ resume, setResume, next, prev }) => {

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { company_name: "", title: "", exp_logo: null }
      ]
    }));
  };

  const updateExp = (i, field, val) => {
    const updated = [...resume.experiences];
    updated[i][field] = val;
    setResume(prev => ({ ...prev, experiences: updated }));
  };

  return (
    <div>
      <h4>Experience</h4>

      {resume.experiences.map((exp, i) => (
        <div key={i} className="border p-2 mb-2">
          <input className="form-control mb-1" placeholder="Company"
            value={exp.company_name} onChange={e => updateExp(i, "company_name", e.target.value)} />

          <input className="form-control mb-1" placeholder="Job Title"
            value={exp.title} onChange={e => updateExp(i, "title", e.target.value)} />

          <input type="file" className="form-control mb-1"
            onChange={e => updateExp(i, "exp_logo", e.target.files[0])} />
        </div>
      ))}

      <button className="btn btn-success mb-2" onClick={addExperience}>+ Add Experience</button>

      <br />
      <button className="btn btn-secondary" onClick={prev}>Back</button>
      <button className="btn btn-primary ms-2" onClick={next}>Next</button>
    </div>
  );
};

export default StepExperience;
