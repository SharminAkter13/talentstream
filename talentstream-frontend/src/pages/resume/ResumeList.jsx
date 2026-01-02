import React, { useEffect, useState } from "react";
import { getCandidateResumes, deleteResume } from "../../services/auth";
import Master from './../Master';
import { Link } from "react-router-dom";

const ResumeList = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getCandidateResumes();
      // Since it's one-to-one, we take the first item if it's an array
      setResume(Array.isArray(data) ? data[0] : data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const removeResume = async (id) => {
    if (!confirm("Are you sure you want to delete your resume?")) return;
    try {
      await deleteResume(id);
      setResume(null);
      alert("Resume deleted.");
    } catch (err) {
      alert("Delete failed.");
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <Master><div className="p-5 text-center">Loading...</div></Master>;

  return (
    <Master>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>My Resume</h3>
          {!resume && <Link to="/resume-create" className="btn btn-primary">Create Resume</Link>}
        </div>

        {!resume ? (
          <div className="card p-5 text-center shadow-sm">
            <p className="text-muted">You haven't created a resume yet.</p>
          </div>
        ) : (
          <div className="card shadow-sm">
            <table className="table m-0">
              <thead className="table-light">
                <tr>
                  <th>Profession</th>
                  <th>Email</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{resume.profession_title}</td>
                  <td>{resume.email}</td>
                  <td className="text-end">
                    <Link to={`/resume-view/${resume.id}`} className="btn btn-info btn-sm me-2">View</Link>
                    <Link to={`/resume-edit/${resume.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => removeResume(resume.id)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Master>
  );
};

export default ResumeList;