import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeDetail, ASSET_URL } from "../../services/auth";
import "./PreviewResume.css"; 
import Master from './../Master';

const ViewResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getResumeDetail(id);
      setResume(data);
    };
    load();
  }, [id]);

  if (!resume) return <Master><p>Loading...</p></Master>;

  return (
    <Master>
      <div className="resume-wrapper bg-white shadow-sm p-5">
        <div className="resume-header text-center mb-4">
          {resume.cover_image && (
            <img 
              src={`${ASSET_URL}/storage/${resume.cover_image}`} 
              alt="Profile" 
              className="profile-pic" 
            />
          )}
          <h1>{resume.name}</h1>
          <p className="lead">{resume.profession_title}</p>
          <p className="text-muted">{resume.email} • {resume.location}</p>
        </div>

        <div className="row">
          <div className="col-md-4 border-end">
            <h4>Skills</h4>
            <ul className="list-unstyled">
              {resume.skills?.map((s, i) => (
                <li key={i} className="mb-2">
                  <strong>{s.skill_name}</strong>
                  <div className="progress" style={{height: '5px'}}>
                    <div className="progress-bar" style={{width: `${s.skill_percent}%`}}></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-8 ps-4">
            <h4>Education</h4>
            {resume.educations?.map((e, i) => (
              <div key={i} className="mb-3">
                <h5>{e.degree} <small className="text-muted">at {e.school}</small></h5>
                <p className="small text-primary">{e.edu_from} - {e.edu_to}</p>
                <p>{e.edu_description}</p>
              </div>
            ))}
            <hr />
            <h4>Experience</h4>
            {resume.experiences?.map((e, i) => (
              <div key={i} className="mb-3">
                <h5>{e.title} <small className="text-muted">at {e.company_name}</small></h5>
                <p className="small text-primary">{e.exp_from} - {e.exp_to}</p>
                <p>{e.exp_description}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => window.print()} className="btn btn-primary print-btn no-print">Print Resume</button>
      </div>
    </Master>
  );
};

export default ViewResume;