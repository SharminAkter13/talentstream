import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Note: Removed external imports for PortalNavbar and PortalFooter

// --- MOCK COMPONENTS ADDED TO RESOLVE IMPORTS ERROR ---
// Defined simple mock components to replace the external files.
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
// --- END MOCK COMPONENTS ---


// Define the role options (assuming these correspond to your database role IDs)
const ROLE_OPTIONS = [
  // Assuming 1: Admin, 2: Employer, 3: Candidate
  { id: 2, name: "Employer" },
  { id: 3, name: "Candidate" },
];

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    repeatPassword: "", 
    role_id: 3 // Default role: Candidate (ID 3)
  }); 
  const navigate = useNavigate();

  // Define the Role to Path mapping
  const ROLE_REDIRECT_MAP = {
    1: "/dashboard/admin",       // Role ID 1: Admin
    2: "/dashboard/employer",    // Role ID 2: Employer
    3: "/dashboard/candidate",   // Role ID 3: Candidate
    default: "/",                // Default fallback
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    // Ensure role_id is stored as a number when selected from the dropdown
    const value = e.target.name === 'role_id' ? parseInt(e.target.value) : e.target.value;
    setRegisterForm({ ...registerForm, [e.target.name]: value });
  };

  /**
   * Helper function to handle redirection based on the role_id returned from the API.
   * @param {number} roleId The role_id received from the server.
   */
  const handleRoleBasedRedirect = (roleId) => {
    const path = ROLE_REDIRECT_MAP[roleId] || ROLE_REDIRECT_MAP.default;
    navigate(path);
  };

  // LOGIN Function (UPDATED)
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", loginForm);
      
      // Destructure 'token' and 'user' from the response data
      const { token, user } = res.data; 

      // 1. Store token
      localStorage.setItem("token", token);
      
      // 2. Store user data (e.g., for showing user name/role later)
      localStorage.setItem("user", JSON.stringify(user));

      // Optional: Set default auth header for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      alert("Login Successful!");
      
      // 3. Redirect based on role ID
      handleRoleBasedRedirect(user.role_id);

    } catch (err) {
      // Use err.response.data.errors for validation messages if available
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  // REGISTER Function (UPDATED)
  const register = async (e) => {
    e.preventDefault();
    
    // Note: Laravel validation handles password confirmation, but a client-side check is still good UX
    if (registerForm.password !== registerForm.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // Include password_confirmation for Laravel's 'confirmed' rule
    const payload = {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      password_confirmation: registerForm.repeatPassword, // Required by Laravel 'confirmed' rule
      role_id: registerForm.role_id
    };
    
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", payload);
      
      // Destructure 'token' and 'user' from the response data
      const { token, user } = res.data; 

      // 1. Store token
      localStorage.setItem("token", token);
      
      // 2. Store user data
      localStorage.setItem("user", JSON.stringify(user));
      
      // Optional: Set default auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      alert("Registration Successful!");
      
      // 3. Redirect based on role ID
      handleRoleBasedRedirect(user.role_id);

    } catch (err) {
      // Handle validation errors or general failure
      const errorMessage = err.response?.data?.message || "Registration Failed. Check the server response.";
      alert(errorMessage);
    }
  };

  // --- JSX Rendering ---

  return (
    <> 
      {/* Using the locally defined mock component */}
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

                {/* Login Form Section */}
                <div id="cd-login" className={activeTab === "login" ? "is-selected" : ""}>
                  <div className="page-login-form">
                    <form role="form" className="login-form" onSubmit={login}>
                      {/* Email Input */}
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-user"></i>
                          <input
                            type="text" 
                            id="sender-email"
                            className="form-control"
                            name="email"
                            placeholder="Email" 
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Password Input */}
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

                {/* Register Form Section */}
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

                      {/* Role Dropdown */}
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-id-badge"></i> 
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
      
      {/* Using the locally defined mock component */}
      <PortalFooter/> 
    </>
  );
};

export default MyAccount;