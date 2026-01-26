import React, { useState, useEffect } from "react";
import axios from "axios";
import PortalFooter from "../portalComponent/PortalFooter";
import PortalNavbar from "../portalComponent/PortalNavbar";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company_name: "", // Will be auto-filled
    category_id: "",
    job_type_id: "",
    job_skill_id: "", // Added
    job_location_id: "",
    description: "",
    salary_min: "",
    salary_max: "",
    num_vacancies: "",
    application_deadline: "", // Added
    status: "active", 
    cover_image: null,
  });

  const [options, setOptions] = useState({ 
    categories: [], 
    locations: [], 
    types: [], 
    skills: [] // Ensure your backend returns skills too
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Fetch dropdown options
        const resOptions = await axios.get("http://localhost:8000/api/employer/jobs/create", { headers });
        setOptions(resOptions.data);

        // 2. Fetch User/Profile info to auto-fill Company Name
        const resUser = await axios.get("http://localhost:8000/api/user", { headers });
        if (resUser.data && resUser.data.company_name) {
          setFormData(prev => ({ ...prev, company_name: resUser.data.company_name }));
        }
      } catch (err) {
        console.error("Initialization error:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      const token = localStorage.getItem('token');
      await axios.post("http://localhost:8000/api/employer/jobs", data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      });
      alert("Job Posted Successfully!");
    } catch (err) {
      console.error("Submit error:", err.response?.data);
    }
  };

  return (
    <>
      <PortalNavbar />
      <div className="container mt-4 m-5 p-5">
        <h2 className="mt-5">Post A Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Job Title</label>
              <input type="text" name="title" className="form-control" onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label>Company Name (Auto-filled)</label>
              <input type="text" name="company_name" value={formData.company_name} className="form-control" readOnly />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 mb-3">
              <label>Category</label>
              <select name="category_id" className="form-control" onChange={handleChange} required>
                <option value="">Select Category</option>
                {options.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label>Location</label>
              <select name="job_location_id" className="form-control" onChange={handleChange} required>
                <option value="">Select Location</option>
                {options.locations.map(l => <option key={l.id} value={l.id}>{l.city}</option>)}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label>Job Type</label>
              <select name="job_type_id" className="form-control" onChange={handleChange} required>
                <option value="">Select Type</option>
                {options.types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label>Primary Skill</label>
              <select name="job_skill_id" className="form-control" onChange={handleChange}>
                <option value="">Select Skill</option>
                {options.skills?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Application Deadline</label>
              <input type="date" name="application_deadline" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Status</label>
              <select name="status" value={formData.status} className="form-control" onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label>Vacancies</label>
              <input type="number" name="num_vacancies" className="form-control" onChange={handleChange} />
            </div>
          </div>

          {/* ... existing Salary and Description fields ... */}
          
          <button type="submit" className="btn btn-primary w-100">Submit Job</button>
        </form>
      </div>
      <PortalFooter />
    </>
  );
};

export default PostJob;