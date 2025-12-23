import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";
import axios from "axios";
import { API_URL, getToken } from "../../services/auth";

const CreateUser = () => {
  // Static roles based on backend logic
  const [roles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Employer" },
    { id: 3, name: "Candidate" },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Retrieve token stored during login
    const token = localStorage.getItem("token");

    axios
      .post(`${API_URL}/admin/users`, form, {
        headers: { Authorization: `Bearer ${token}` } 
      })
      .then(() => alert("User created successfully"))
      .catch((err) => {
        const message = err.response?.data?.message || "Error creating user";
        alert(message);
      });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="main-container">
        <div className="pd-ltr-20 xs-pd-20-10">
          <div className="page-header">
            <h4>Create User</h4>
          </div>

          <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mt-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mt-2">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mt-2">
                <label>Assign Role</label>
                <select
                  name="role_id"
                  className="form-control"
                  value={form.role_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateUser;