import React, { useEffect, useState } from "react";
import { api } from "../../services/auth"; 
import Master from "../Master";

export default function CompanyCRUD() {
  const [companies, setCompanies] = useState([]);

  const initialState = {
    name: "",
    industry: "",
    description: "",
    website: "",
    address: "",
    contact_email: "",
    contact_phone: "",
    logo: null, // IMPORTANT: file
    established_year: "",
    size: "",
  };

  const [form, setForm] = useState(initialState);
  const [editingId, setEditingId] = useState(null);

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/employer/companies");
      setCompanies(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setForm({ ...form, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    try {
      if (editingId) {
        await api.post(`/employer/companies/${editingId}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/employer/companies", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm(initialState);
      setEditingId(null);
      fetchCompanies();
    } catch (error) {
      console.error("Error saving company:", error);
    }
  };

  const editCompany = (company) => {
    setForm({
      ...company,
      logo: null, // reset file input
    });
    setEditingId(company.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCompany = async (id) => {
    if (!window.confirm("Delete this company?")) return;
    try {
      await api.delete(`/employer/companies/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <Master>
      <div className="container py-4">

        <h2 className="mb-4 fw-semibold">Company Management</h2>

        {/* Form Card */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">
              {editingId ? "Edit Company" : "Create Company"}
            </h5>

            <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">

              {/* Text Fields */}
              {Object.keys(initialState).map(
                (key) =>
                  key !== "logo" && (
                    <div className="col-md-6 col-lg-4" key={key}>
                      <label className="form-label text-uppercase small">
                        {key.replace("_", " ")}
                      </label>
                      <input
                        type={key === "established_year" ? "number" : "text"}
                        name={key}
                        value={form[key] || ""}
                        onChange={handleChange}
                        required={key === "name"}
                        className="form-control"
                      />
                    </div>
                  )
              )}

              {/* Logo Upload */}
              <div className="col-md-6 col-lg-4">
                <label className="form-label text-uppercase small">
                  Company Logo
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Update Company" : "Create Company"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Table Card */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">Company List</h5>

            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Industry</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length > 0 ? (
                    companies.map((c) => (
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.industry}</td>
                        <td>{c.contact_email}</td>
                        <td>{c.website}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => editCompany(c)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteCompany(c.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No company data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </Master>
  );
}
