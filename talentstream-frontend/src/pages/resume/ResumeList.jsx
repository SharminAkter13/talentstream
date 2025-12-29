import React, { useEffect, useState } from "react";
import axios from "axios";
import Master from "../../layout/Master";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  const load = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/resumes");
    setResumes(res.data);
  };

  const deleteResume = async (id) => {
    if (!confirm("Delete resume?")) return;
    await axios.delete(`http://127.0.0.1:8000/api/resumes/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <Master>
      <h3>All Resumes</h3>

      <table className="table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Action</th></tr>
        </thead>
        <tbody>
          {resumes.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>
                <a href={`/admin/resumes/edit/${r.id}`} className="btn btn-warning btn-sm">Edit</a>
                <button className="btn btn-danger btn-sm ms-1" onClick={() => deleteResume(r.id)}>
                  Delete
                </button>
                <a href={`/admin/resumes/${r.id}`} className="btn btn-info btn-sm ms-1">View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Master>
  );
};

export default ResumeList;
