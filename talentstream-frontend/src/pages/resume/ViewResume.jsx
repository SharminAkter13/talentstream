import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Master from "../../layout/Master";

const ViewResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/resumes/${id}`);
      setResume(res.data);
    };
    load();
  }, [id]);

  if (!resume) return <Master>Loading...</Master>;

  return (
    <Master>
      <h3>Resume Details</h3>

      <p><strong>Name:</strong> {resume.name}</p>
      <p><strong>Email:</strong> {resume.email}</p>

      <hr />

      <h4>Education</h4>
      {resume.educations.map((e, i) => (
        <div key={i} className="mb-2">
          <b>{e.degree}</b> - {e.school}
        </div>
      ))}

      <h4>Experience</h4>
      {resume.experiences.map((e, i) => (
        <div key={i} className="mb-2">
          <b>{e.company_name}</b> - {e.title}
        </div>
      ))}

      <h4>Skills</h4>
      {resume.skills.map((s, i) => (
        <div key={i}>{s.skill_name} - {s.skill_percent}%</div>
      ))}

      <hr />

      <a href={`/admin/resumes/preview/${resume.id}`} className="btn btn-primary">
        Preview CV
      </a>
    </Master>
  );
};

export default ViewResume;
