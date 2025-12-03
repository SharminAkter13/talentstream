import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PortalNavbar from '../portalComponent/PortalNavbar';
import PortalFooter from '../portalComponent/PortalFooter';

// Role options
const ROLE_OPTIONS = [
  { id: 2, name: "Employer" },
  { id: 3, name: "Candidate" },
];

// Role to Dashboard Mapping
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
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    role_id: 3, // default = Candidate
  });

  const navigate = useNavigate();

  // ==========================
  // SAFE REDIRECT FUNCTION
  // ==========================
  const handleRoleBasedRedirect = (roleId) => {
    const path = ROLE_REDIRECT_MAP[roleId] || ROLE_REDIRECT_MAP.default;

    // 🚀 Prevent infinite redirects
    if (window.location.pathname !== path) {
      navigate(path, { replace: true });
    }
  };

  // ==========================
  // AUTO LOGIN CHECK (SAFE)
  // ==========================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) return;

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const expectedPath = ROLE_REDIRECT_MAP[user.role_id] || "/";

    // 🚀 Prevent redirect loop
    if (window.location.pathname !== expectedPath) {
      navigate(expectedPath, { replace: true });
    }
  }, []);

  // ==========================
  // FORM HANDLERS
  // ==========================
  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) => {
    const value = e.target.name === "role_id"
      ? parseInt(e.target.value)
      : e.target.value;

    setRegisterForm({ ...registerForm, [e.target.name]: value });
  };

  // ==========================
  // LOGIN HANDLER
  // ==========================
  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", loginForm);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      alert("Login Successful!");
      handleRoleBasedRedirect(user.role_id);

    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  // ==========================
  // REGISTER HANDLER
  // ==========================
  const register = async (e) => {
    e.preventDefault();

    if (registerForm.password !== registerForm.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      password_confirmation: registerForm.repeatPassword,
      role_id: registerForm.role_id,
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", payload);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      alert("Registration Successful!");
      handleRoleBasedRedirect(user.role_id);

    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  // ==========================
  // UI + RETURN
  // ==========================
  return (
    <>
      <PortalNavbar />

      <div id="content" className="py-5" style={{ background: "#f7f9fc" }}>
        <div className="container">
          <div className="row justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-lg border-0 rounded-4">

                {/* Tabs */}
                <div className="card-header bg-white p-0 border-0 rounded-4">
                  <div className="d-flex">
                    <button
                      className={`flex-fill py-3 fw-bold border-0 rounded-start-4 ${
                        activeTab === "login"
                          ? "bg-info text-white"
                          : "bg-light text-secondary"
                      }`}
                      onClick={() => setActiveTab("login")}
                    >
                      LOGIN
                    </button>

                    <button
                      className={`flex-fill py-3 fw-bold border-0 rounded-end-4 ${
                        activeTab === "register"
                          ? "bg-info text-white"
                          : "bg-light text-secondary"
                      }`}
                      onClick={() => setActiveTab("register")}
                    >
                      REGISTER
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="card-body p-4">

                  {/* LOGIN */}
                  {activeTab === "login" && (
                    <div>
                      <h4 className="text-center mb-4 fw-semibold">Welcome Back 👋</h4>
                      <form onSubmit={login}>
                        <div className="mb-3">
                          <label className="form-label fw-medium">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg rounded-3"
                            placeholder="name@example.com"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-medium">Password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg rounded-3"
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>

                        <button className="btn btn-info w-100 btn-lg mt-3 rounded-3 fw-semibold">
                          Login
                        </button>
                      </form>
                    </div>
                  )}

                  {/* REGISTER */}
                  {activeTab === "register" && (
                    <div>
                      <h4 className="text-center mb-4 fw-semibold">Create Your Account ✨</h4>

                      <form onSubmit={register}>
                        <div className="mb-3">
                          <label className="form-label fw-medium">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control form-control-lg rounded-3"
                            placeholder="Enter your name"
                            value={registerForm.name}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-medium">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg rounded-3"
                            placeholder="name@example.com"
                            value={registerForm.email}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-medium">Role</label>
                          <select
                            name="role_id"
                            className="form-select form-select-lg rounded-3"
                            value={registerForm.role_id}
                            onChange={handleRegisterChange}
                            required
                          >
                            {ROLE_OPTIONS.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-medium">Password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg rounded-3"
                            placeholder="Enter password"
                            value={registerForm.password}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-medium">Confirm Password</label>
                          <input
                            type="password"
                            name="repeatPassword"
                            className="form-control form-control-lg rounded-3"
                            placeholder="Confirm password"
                            value={registerForm.repeatPassword}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>

                        <button className="btn btn-info w-100 btn-lg mt-3 rounded-3 fw-semibold">
                          Register
                        </button>
                      </form>
                    </div>
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
