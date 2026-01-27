import React, { useEffect, useState } from "react";
import axios from "axios";
import PortalNavbar from "../portalComponent/PortalNavbar";
import PortalFooter from "../portalComponent/PortalFooter";

const PostJob = () => {
  // =============================
  // FORM STATE (JOB TABLE FIELDS)
  // =============================
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    job_type_id: "",
    job_skill_id: "",
    job_location_id: "",
    description: "",
    salary_min: "",
    salary_max: "",
    num_vacancies: "",
    application_deadline: "",
    status: "active",
  });

  // =============================
  // DROPDOWNS + FK DISPLAY
  // =============================
  const [options, setOptions] = useState({
    categories: [],
    locations: [],
    types: [],
    skills: [],
  });

  const [company, setCompany] = useState({});
  const [employer, setEmployer] = useState({});

  // =============================
  // FETCH INITIAL DATA
  // =============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/employer/jobs/create",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOptions({
          categories: res.data.categories || [],
          locations: res.data.locations || [],
          types: res.data.types || [],
          skills: res.data.skills || [],
        });

        setCompany(res.data.company || {});
        setEmployer(res.data.employer || {});
      } catch (error) {
        console.error("Init error:", error);
      }
    };

    fetchData();
  }, []);

  // =============================
  // HANDLE INPUT CHANGE
  // =============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =============================
  // SUBMIT FORM
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await axios.post(
        "http://localhost:8000/api/employer/jobs",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Job posted successfully!");
    } catch (error) {
      console.error("Submit error:", error.response?.data || error);
      alert("Something went wrong. Check console.");
    }
  };

  // =============================
  // JSX
  // =============================
  return (
    <>
      <PortalNavbar />

      <div className="container m-5 p-5">
        <h2 className="mt-5">Post A Job</h2>

        <form onSubmit={handleSubmit}>
          {/* COMPANY + EMPLOYER (FK DISPLAY) */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Company</label>
              <input
                type="text"
                className="form-control"
                value={company.name || ""}
                readOnly
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Employer Email</label>
              <input
                type="email"
                className="form-control"
                value={employer.email || ""}
                readOnly
              />
            </div>
          </div>

          {/* JOB TITLE */}
          <div className="mb-3">
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          {/* CATEGORY / TYPE / LOCATION / SKILL */}
          <div className="row">
            <div className="col-md-3 mb-3">
              <label>Category</label>
              <select
                name="category_id"
                className="form-control"
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {options.categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label>Job Type</label>
              <select
                name="job_type_id"
                className="form-control"
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                {options.types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label>Location</label>
              <select
                name="job_location_id"
                className="form-control"
                onChange={handleChange}
                required
              >
                <option value="">Select Location</option>
                {options.locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label>Primary Skill</label>
              <select
                name="job_skill_id"
                className="form-control"
                onChange={handleChange}
              >
                <option value="">Select Skill</option>
                {options.skills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="5"
              onChange={handleChange}
              required
            />
          </div>

          {/* SALARY */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Salary Min</label>
              <input
                type="number"
                name="salary_min"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Salary Max</label>
              <input
                type="number"
                name="salary_max"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DEADLINE / VACANCIES / STATUS */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Application Deadline</label>
              <input
                type="date"
                name="application_deadline"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Vacancies</label>
              <input
                type="number"
                name="num_vacancies"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Status</label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* SUBMIT */}
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Post Job
          </button>
        </form>
      </div>

      <PortalFooter />
    </>
  );
};

export default PostJob;
