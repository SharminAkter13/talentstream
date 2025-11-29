import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PortalNavbar from "../portalComponent/PortalNavbar";
import PortalFooter from "../portalComponent/PortalFooter";
// Assuming you will create a CSS file (e.g., MyAccount.css) 
// for the necessary styles from main.css and my-account.html.
// import './MyAccount.css'; 
// NOTE: For the 'ti-*' icons (Themify Icons) to show, you must 
// have the Themify Icons CSS file linked in your main HTML file or React entry point.

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", repeatPassword: "" });
  const navigate = useNavigate();

  // Handle input changes for Login
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // Handle input changes for Register
  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  // LOGIN Function
  const login = async (e) => {
    e.preventDefault();
    try {
      // NOTE: You are currently using 'email' in your state but the HTML input has placeholder 'Username'.
      // If your API expects 'email' or 'username', adjust the placeholder or state accordingly.
      const res = await axios.post("http://127.0.0.1:8000/api/login", loginForm);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      // Navigate to the correct home route, which is '/' or '/home' depending on your App.jsx
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
    
    // Create payload without the 'repeatPassword' field for the API call
    const payload = {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password
    };
    
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", payload);
      localStorage.setItem("token", res.data.token);
      alert("Registration Successful!");
      // Navigate to the correct home route
      navigate("/"); 
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  // --- JSX Rendering (Styled to match my-account.html) ---

  return (

    <div>
      <PortalNavbar/>
    // Outer container matching the HTML structure
    <div id="content" className="my-account">
      <div className="container">
        <div className="row">
          {/* Main login/register box alignment */}
          <div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-6 cd-user-modal">
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
                    REGITER
                  </a>
                </li>
              </ul>

              {/* Login Form Section */}
              <div id="cd-login" className={activeTab === "login" ? "is-selected" : ""}>
                <div className="page-login-form">
                  <form role="form" className="login-form" onSubmit={login}>
                    {/* Username/Email Input */}
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="ti-user"></i>
                        <input
                          type="text" // Changed to 'text' to match HTML for "Username" or keep as 'email' if API requires it
                          id="sender-email"
                          className="form-control"
                          name="email"
                          placeholder="Username" // Matches HTML placeholder
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

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-common log-btn">
                      Login
                    </button>

                    {/* Remember Me / Lost Password */}
                    <div className="checkbox-item">
                      <div className="checkbox">
                        <label htmlFor="rememberme" className="rememberme">
                          {/* Note: Checkbox logic for "Remember Me" is not implemented here */}
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
                    {/* Name Input */}
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

                    {/* Email Input */}
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

                    {/* Password Input */}
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
                    
                    {/* Repeat Password Input (Added for full validation) */}
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
              
              {/* NOTE: I did not include the "Reset Password" form here, 
                 as it's often a separate modal or component in React. */}
            </div>
          </div>
        </div>
      </div>
    </div>
                <PortalFooter/>
    </div>
  );
};

export default MyAccount;