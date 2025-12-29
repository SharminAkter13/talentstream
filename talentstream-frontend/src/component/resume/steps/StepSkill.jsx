import React from "react";

const StepSkill = ({ resume, setResume, prev, submit }) => {
  const addSkill = () => {
    setResume(prev => ({
      ...prev,
      skills: [...prev.skills, { skill_name: "", skill_percent: "" }]
    }));
  };

  const updateSkill = (i, field, val) => {
    const updated = [...resume.skills];
    updated[i][field] = val;
    setResume(prev => ({ ...prev, skills: updated }));
  };

  return (
    <div>
      <h4>Skills</h4>

      {resume.skills.map((skill, i) => (
        <div className="border p-2 mb-2" key={i}>
          <input className="form-control mb-1" placeholder="Skill"
            value={skill.skill_name} onChange={e => updateSkill(i, "skill_name", e.target.value)} />

          <input className="form-control mb-1" placeholder="Percent"
            type="number" value={skill.skill_percent}
            onChange={e => updateSkill(i, "skill_percent", e.target.value)} />
        </div>
      ))}

      <button className="btn btn-success mb-3" onClick={addSkill}>+ Add Skill</button>
      <br />

      <button className="btn btn-secondary" onClick={prev}>Back</button>
      <button className="btn btn-primary ms-2" onClick={submit}>Submit Resume</button>
    </div>
  );
};

export default StepSkill;
