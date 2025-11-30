import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PortalNavbar from "../portalComponent/PortalNavbar";
import PortalFooter from "../portalComponent/PortalFooter";

// Define the role options (assuming these correspond to your database role IDs)
const ROLE_OPTIONS = [
  { id: 2, name: "Employer" },
  { id: 3, name: "Candidate" },
];

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  // Initialize registerForm with role_id set to the first role's ID (e.g., Candidate: 3)
  const [registerForm, setRegisterForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    repeatPassword: "", 
    // Default role: Candidate (ID 3). Change as per your preference or DB setup.
    role_id: 3 
  }); 
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  // LOGIN Function
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", loginForm);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      navigate("/"); 
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  // REGISTER Function
  const register = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // Include the role_id in the payload
    const payload = {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      role_id: registerForm.role_id // <--- NEW FIELD
    };
    
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", payload);
      localStorage.setItem("token", res.data.token);
      alert("Registration Successful!");
      navigate("/"); 
    } catch (err) {
      // You might want to log the error response for debugging
      // console.error("Registration Error:", err.response?.data); 
      alert(err.response?.data?.message || "Registration Failed. Check the server response and form data.");
    }
  };

  // --- JSX Rendering ---

  return (
    <> 
      <PortalNavbar/>
      
      <div id="content" className="my-account">
        <div className="container">
          <div className="row justify-content-center"> 
            <div className="col-12 col-md-8 col-lg-6 cd-user-modal">
              
              <div className="my-account-form">
                {/* Login/Register Tabs (cd-switcher) */}
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

                {/* Login Form Section (no change) */}
                <div id="cd-login" className={activeTab === "login" ? "is-selected" : ""}>
                  <div className="page-login-form">
                    <form role="form" className="login-form" onSubmit={login}>
                      {/* ... Login Form Fields (omitted for brevity, assume they are correct) ... */}
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-user"></i>
                          <input
                            type="text" 
                            id="sender-email"
                            className="form-control"
                            name="email"
                            placeholder="Username" 
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-lock"></i>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn btn-common log-btn">
                        Login
                      </button>

                      <div className="checkbox-item">
                        <div className="checkbox">
                          <label htmlFor="rememberme" className="rememberme">
                            <input name="rememberme" id="rememberme" value="forever" type="checkbox" />{" "}
                            Remember Me
                          </label>
                        </div>
                        <p className="cd-form-bottom-message">
                          <a href="#0">Lost your password?</a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Register Form Section (UPDATED) */}
                <div id="cd-signup" className={activeTab === "register" ? "is-selected" : ""}>
                  <div className="page-login-form register">
                    <form role="form" className="login-form" onSubmit={register}>
                      
                      {/* Name Field */}
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-user"></i>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Username"
                            value={registerForm.name}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-email"></i>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            value={registerForm.email}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Role Dropdown (NEW FIELD) */}
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-id-badge"></i> {/* Icon suggestion */}
                          <select
                            className="form-control"
                            name="role_id"
                            value={registerForm.role_id}
                            onChange={handleRegisterChange}
                            required
                          >
                            <option value="" disabled>Select Role</option>
                            {ROLE_OPTIONS.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      {/* Password Field */}
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-lock"></i>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={registerForm.password}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Repeat Password Field */}
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-lock"></i>
                          <input
                            type="password"
                            className="form-control"
                            name="repeatPassword"
                            placeholder="Repeat Password"
                            value={registerForm.repeatPassword}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button type="submit" className="btn btn-common log-btn">
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <PortalFooter/>
    </>
  );
};

export default MyAccount;