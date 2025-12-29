import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PreviewResume.css"; // external style

import { useParams } from "react-router-dom";

const PreviewResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/resumes/${id}`);
      setResume(res.data);
    };
    load();
  }, [id]);

  if (!resume) return <p>Loading...</p>;

  return (
    <div className="resume-wrapper">

      <div className="resume-header">
        {resume.cover_image && (
          <img
            src={`http://127.0.0.1:8000/storage/${resume.cover_image}`}
            alt=""
            className="profile-pic"
          />
        )}

        <h1>{resume.name}</h1>
        <p>{resume.profession_title}</p>
        <p>{resume.email} • {resume.location}</p>
      </div>

      <div className="resume-body">
        <div className="left-col">
          <h3>Skills</h3>
          <ul>
            {resume.skills.map((s, i) => (
              <li key={i}>
                <b>{s.skill_name}</b> – {s.skill_percent}%
              </li>
            ))}
          </ul>

          <h3>Contact</h3>
          <p><b>Email:</b> {resume.email}</p>
          <p><b>Website:</b> {resume.web}</p>
        </div>

        <div className="right-col">
          <h3>Education</h3>
          {resume.educations.map((e, i) => (
            <div className="section" key={i}>
              <b>{e.degree}</b> – {e.school}
              <p>{e.edu_from} - {e.edu_to}</p>
              <p>{e.edu_description}</p>
            </div>
          ))}

          <h3>Experience</h3>
          {resume.experiences.map((e, i) => (
            <div className="section" key={i}>
              <b>{e.company_name}</b> – {e.title}
              <p>{e.exp_from} - {e.exp_to}</p>
              <p>{e.exp_description}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="print-btn" onClick={() => window.print()}>
        Print / Save as PDF
      </button>
    </div>
  );
};

export default PreviewResume;
