import React, { useEffect, useState } from "react";
import { API_URL, getToken } from "../../services/auth";
import { Link } from "react-router-dom";
import Master from './../Master';

const JOB_API = "/jobs";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    const token = getToken();

    const res = await fetch(`${API_URL}${JOB_API}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setJobs(data.jobs || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    const token = getToken();

    await fetch(`${API_URL}${JOB_API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setJobs(jobs.filter((job) => job.id !== id));
  };

  if (loading) return <Master>Loading...</Master>;

  return (
    <Master>
      <h2>Manage Jobs</h2>

      <Link className="btn btn-primary mb-3" to="/create-job">
        + Create Job
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th width="200">Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No jobs found
              </td>
            </tr>
          )}

          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company_name}</td>
              <td>{job.type?.name}</td>
              <td>{job.location?.city}</td>
              <td>{job.status}</td>

              <td>
                <Link to={`/jobs/${job.id}`} className="btn btn-info btn-sm me-2">
                  View
                </Link>
                <Link to={`/jobs/${job.id}/edit`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteJob(job.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Master>
  );
};

export default JobList;
