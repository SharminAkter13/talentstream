import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Mock Navbar/Footer (replace with real ones if available)
const PortalNavbar = () => (
  <header className="bg-gray-800 text-white p-4">
    <div className="container mx-auto">
      <h1 className="text-xl font-bold">Job Portal</h1>
    </div>
  </header>
);

const PortalFooter = () => (
  <footer className="bg-gray-800 text-white p-4 text-center mt-8">
    <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
  </footer>
);

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
    role_id: 3, // Default: Candidate
  });

  const navigate = useNavigate();

  const handleRoleBasedRedirect = (roleId) => {
    const path = ROLE_REDIRECT_MAP[roleId] || ROLE_REDIRECT_MAP.default;
    navigate(path);
  };
  // Persist login and set Axios auth header
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      handleRoleBasedRedirect(user.role_id);
    }
  }, []);


  // Form change handlers
  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) => {
    const value = e.target.name === "role_id" ? parseInt(e.target.value) : e.target.value;
    setRegisterForm({ ...registerForm, [e.target.name]: value });
  };

  // Login handler
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

  // Register handler
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

  return (
    <>
      <PortalNavbar />
      <div id="content" className="my-account">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 cd-user-modal">
              <div className="my-account-form">
                {/* Tabs */}
                <ul className="cd-switcher">
                  <li onClick={() => setActiveTab("login")}>
                    <a className={activeTab === "login" ? "selected" : ""} href="#0">
                      LOGIN
                    </a>
                  </li>
                  <li onClick={() => setActiveTab("register")}>
                    <a className={activeTab === "register" ? "selected" : ""} href="#0">
                      REGISTER
                    </a>
                  </li>
                </ul>

                {/* Login Form */}
                <div id="cd-login" className={activeTab === "login" ? "is-selected" : ""}>
                  <form onSubmit={login} className="page-login-form">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                    />
                    <button type="submit">Login</button>
                  </form>
                </div>

                {/* Register Form */}
                <div id="cd-signup" className={activeTab === "register" ? "is-selected" : ""}>
                  <form onSubmit={register} className="page-login-form register">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      required
                    />
                    <select
                      name="role_id"
                      value={registerForm.role_id}
                      onChange={handleRegisterChange}
                      required
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      required
                    />
                    <input
                      type="password"
                      name="repeatPassword"
                      placeholder="Repeat Password"
                      value={registerForm.repeatPassword}
                      onChange={handleRegisterChange}
                      required
                    />
                    <button type="submit">Register</button>
                  </form>
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
