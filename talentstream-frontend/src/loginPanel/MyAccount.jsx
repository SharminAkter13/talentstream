import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import from your auth file
import api, { API_URL } from "../services/auth"; 

import PortalNavbar from '../portalComponent/PortalNavbar';
import PortalFooter from '../portalComponent/PortalFooter';

const ROLE_REDIRECT_MAP = {
  1: "/admin/dashboard",
  2: "/employer/dashboard",
  3: "/candidate/dashboard",
  default: "/",
};

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "", email: "", password: "", repeatPassword: "", role_id: 3,
  });

  const navigate = useNavigate();

  const handleRoleBasedRedirect = (roleId) => {
    const path = ROLE_REDIRECT_MAP[roleId] || ROLE_REDIRECT_MAP.default;
    navigate(path, { replace: true });
  };

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => {
    const value = e.target.name === "role_id" ? parseInt(e.target.value) : e.target.value;
    setRegisterForm({ ...registerForm, [e.target.name]: value });
  };

  // LOGIN HANDLER using Auth File
  const login = async (e) => {
    e.preventDefault();
    try {
      // Using the api instance and API_URL constant
      const res = await api.post(`${API_URL}/login`, loginForm);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful!");
      handleRoleBasedRedirect(user.role_id);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  // REGISTER HANDLER using Auth File
  const register = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await api.post(`${API_URL}/register`, {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        password_confirmation: registerForm.repeatPassword,
        role_id: registerForm.role_id,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Registration Successful!");
      handleRoleBasedRedirect(user.role_id);
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <>
      <PortalNavbar />
      <div className="py-5 m-5" style={{ background: "#f7f9fc" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg border-0">
                <div className="card-header bg-white p-0 d-flex">
                  <button className={`flex-fill py-3 border-0 ${activeTab === "login" ? "bg-info text-white" : "bg-light"}`} onClick={() => setActiveTab("login")}>LOGIN</button>
                  <button className={`flex-fill py-3 border-0 ${activeTab === "register" ? "bg-info text-white" : "bg-light"}`} onClick={() => setActiveTab("register")}>REGISTER</button>
                </div>
                <div className="card-body p-4">
                  {activeTab === "login" ? (
                    <form onSubmit={login}>
                      <input type="email" name="email" className="form-control mb-3" placeholder="Email" onChange={handleLoginChange} required />
                      <input type="password" name="password" className="form-control mb-3" placeholder="Password" onChange={handleLoginChange} required />
                      <button className="btn btn-info w-100">Login</button>
                    </form>
                  ) : (
                    <form onSubmit={register}>
                      <input type="text" name="name" className="form-control mb-3" placeholder="Full Name" onChange={handleRegisterChange} required />
                      <input type="email" name="email" className="form-control mb-3" placeholder="Email" onChange={handleRegisterChange} required />
                      <select name="role_id" className="form-select mb-3" onChange={handleRegisterChange}>
                        <option value="3">Candidate</option>
                        <option value="2">Employer</option>
                      </select>
                      <input type="password" name="password" className="form-control mb-3" placeholder="Password" onChange={handleRegisterChange} required />
                      <input type="password" name="repeatPassword" className="form-control mb-3" placeholder="Confirm Password" onChange={handleRegisterChange} required />
                      <button className="btn btn-info w-100">Register</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PortalFooter />
    </>
  );
};

export default MyAccount;