import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company_name: "", // Required by your Controller store method
    category_id: "",
    job_type_id: "",
    job_location_id: "",
    description: "",
    salary_min: "",
    salary_max: "",
    num_vacancies: "",
    application_deadline: "",
    status: "active", // Required by Controller validation
    cover_image: null,
  });

  const [options, setOptions] = useState({ categories: [], locations: [], types: [] });

  // Fetch dropdown data from the EMPLOYER prefixed route
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get("http://localhost:8000/api/employer/jobs/create", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOptions(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // Append all text fields and the image
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
      {/* Navbar */}
            <Navbar/>
            {/* Sidebar */}
            <Sidebar/>
      <div className="container mt-4 mb-5">
        <h2>Post A Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Job Title</label>
              <input type="text" name="title" className="form-control" onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label>Company Name</label>
              <input type="text" name="company_name" className="form-control" onChange={handleChange} required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Category</label>
              <select name="category_id" className="form-control" onChange={handleChange} required>
                <option value="">Select Category</option>
                {options.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label>Location</label>
              <select name="job_location_id" className="form-control" onChange={handleChange} required>
                <option value="">Select Location</option>
                {options.locations.map(l => <option key={l.id} value={l.id}>{l.city}</option>)}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label>Job Type</label>
              <select name="job_type_id" className="form-control" onChange={handleChange} required>
                <option value="">Select Type</option>
                {options.types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Min Salary</label>
              <input type="number" name="salary_min" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Max Salary</label>
              <input type="number" name="salary_max" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Vacancies</label>
              <input type="number" name="num_vacancies" className="form-control" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group mb-3">
            <label>Description</label>
            <textarea name="description" className="form-control" rows="5" onChange={handleChange} required></textarea>
          </div>

          <div className="form-group mb-3">
            <label>Cover Image</label>
            <input type="file" name="cover_image" className="form-control" onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary">Submit Job</button>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default CreateJob;