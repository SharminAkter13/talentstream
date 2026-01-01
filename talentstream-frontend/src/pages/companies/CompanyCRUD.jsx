import React, { useEffect, useState } from "react";
import axios from "axios";
import Master from "../Master";
// import Master from './../Master';

const API_URL = "http://127.0.0.1:8000/api/companies";

export default function CompanyCRUD() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
    website: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Load all companies
  const fetchCompanies = async () => {
    const res = await axios.get(API_URL);
    setCompanies(res.data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update Company
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
    } else {
      await axios.post(API_URL, form);
    }

    setForm({ name: "", industry: "", description: "", website: "" });
    setEditingId(null);
    fetchCompanies();
  };

  // Edit Mode
  const editCompany = (company) => {
    setForm(company);
    setEditingId(company.id);
  };

  // Delete Company
  const deleteCompany = async (id) => {
    if (!window.confirm("Delete this company?")) return;
    await axios.delete(`${API_URL}/${id}`);
    fetchCompanies();
  };

  return (
    <Master>
    <div className="container" style={{ padding: 20 }}>
      <h2>Company CRUD</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={form.industry}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      {/* Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Website</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.industry}</td>
              <td>{c.website}</td>
              <td>{c.description}</td>
              <td>
                <button onClick={() => editCompany(c)}>Edit</button>
                <button onClick={() => deleteCompany(c.id)} style={{ color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Master>
  );
}
