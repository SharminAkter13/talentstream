import React from "react";

const StepEducation = ({ resume, setResume, next, prev }) => {

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      educations: [...prev.educations, { degree: "", school: "", edu_logo: null }]
    }));
  };

  const updateEdu = (index, field, value) => {
    const updated = [...resume.educations];
    updated[index][field] = value;
    setResume(prev => ({ ...prev, educations: updated }));
  };

  return (
    <div>
      <h4>Education</h4>

      {resume.educations.map((edu, i) => (
        <div className="border p-2 mb-2" key={i}>
          <input className="form-control mb-1" placeholder="Degree"
            value={edu.degree} onChange={e => updateEdu(i, "degree", e.target.value)} />

          <input className="form-control mb-1" placeholder="School"
            value={edu.school} onChange={e => updateEdu(i, "school", e.target.value)} />

          <input type="file" className="form-control mb-1"
            onChange={e => updateEdu(i, "edu_logo", e.target.files[0])} />
        </div>
      ))}

      <button className="btn btn-success mb-2" onClick={addEducation}>+ Add Education</button>

      <br />
      <button className="btn btn-secondary" onClick={prev}>Back</button>
      <button className="btn btn-primary ms-2" onClick={next}>Next</button>
    </div>
  );
};

export default StepEducation;
