import React, { useEffect, useState } from "react";
import { API_URL, getToken } from "../../services/auth";
import { useParams, Link } from "react-router-dom";
import Master from './../Master';

const JOB_API = "/jobs";

const ShowJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const token = getToken();

    const res = await fetch(`${API_URL}${JOB_API}/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setJob(data.job);
    setLoading(false);
  };

  if (loading) return <Master>Loading...</Master>;

  if (!job)
    return (
      <Master>
        <p>Job not found</p>
      </Master>
    );

  return (
    <Master>
      <h2>{job.title}</h2>

      <p><strong>Company:</strong> {job.company_name}</p>
      <p><strong>Category:</strong> {job.category?.name}</p>
      <p><strong>Type:</strong> {job.type?.name}</p>
      <p><strong>Location:</strong> {job.location?.city}</p>

      <p><strong>Description:</strong></p>
      <div dangerouslySetInnerHTML={{ __html: job.description }} />

      {job.cover_image && (
        <img
          src={`${API_URL}/storage/${job.cover_image}`}
          alt="cover"
          className="img-fluid mt-3"
        />
      )}

      <Link to="/manage-jobs" className="btn btn-secondary mt-3">
        Back
      </Link>
    </Master>
  );
};

export default ShowJob;
