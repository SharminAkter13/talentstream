
import React, { useEffect, useState } from "react";
import { API_URL, getToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Master from './../Master';

const JOB_API = "/jobs";

const CreateJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_email: "",
    title: "",
    category_id: "",
    job_type_id: "",
    job_location_id: "",
    company_name: "",
    website: "",
    tagline: "",
    tags: "",
    description: "",
    application_email: "",
    application_url: "",
    closing_date: "",
    status: "active",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [lookups, setLookups] = useState({
    categories: [],
    types: [],
    locations: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCreateData = async () => {
      const token = getToken();

      const res = await fetch(`${API_URL}${JOB_API}/create`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load form data");
        setLoading(false);
        return;
      }

      setLookups({
        categories: data.categories,
        types: data.types,
        locations: data.locations,
      });

      setForm((prev) => ({
        ...prev,
        user_email: data.user?.email || "",
        company_name: data.company?.name || "",
        website: data.company?.website || "",
      }));

      setLoading(false);
    };

    fetchCreateData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFile = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const token = getToken();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });

    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

    const res = await fetch(`${API_URL}${JOB_API}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(
        data.errors
          ? Object.values(data.errors).flat().join(" | ")
          : data.message
      );
      setSubmitting(false);
      return;
    }

    navigate("/manage-jobs");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Master>
      <h2>Create Job</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="fw-bold">Employer Email</label>
          <input
            type="email"
            name="user_email"
            className="form-control"
            value={form.user_email}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Job Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Category</label>
          <select
            name="category_id"
            className="form-control"
            value={form.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {lookups.categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="fw-bold">Job Type</label>
          <select
            name="job_type_id"
            className="form-control"
            value={form.job_type_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Job Type</option>
            {lookups.types.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="fw-bold">Location</label>
          <select
            name="job_location_id"
            className="form-control"
            value={form.job_location_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>
            {lookups.locations.map((l) => (
              <option key={l.id} value={l.id}>{l.city}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="fw-bold">Company Name</label>
          <input
            type="text"
            name="company_name"
            className="form-control"
            value={form.company_name}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Company Website</label>
          <input
            type="text"
            name="website"
            className="form-control"
            value={form.website}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Tagline</label>
          <input
            type="text"
            name="tagline"
            className="form-control"
            value={form.tagline}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Tags</label>
          <input
            type="text"
            name="tags"
            className="form-control"
            value={form.tags}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="5"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="fw-bold">Application Email</label>
          <input
            type="email"
            name="application_email"
            className="form-control"
            value={form.application_email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Application URL</label>
          <input
            type="url"
            name="application_url"
            className="form-control"
            value={form.application_url}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Closing Date</label>
          <input
            type="date"
            name="closing_date"
            className="form-control"
            value={form.closing_date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Status</label>
          <select
            name="status"
            className="form-control"
            value={form.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="fw-bold">Cover Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFile}
          />
        </div>

        <button className="btn btn-success" disabled={submitting}>
          {submitting ? "Posting..." : "Create Job"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/manage-jobs")}
        >
          Cancel
        </button>

      </form>
    </Master>
  );
};

export default CreateJob;
