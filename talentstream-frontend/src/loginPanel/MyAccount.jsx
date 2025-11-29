import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PortalNavbar from "../portalComponent/PortalNavbar";
import PortalFooter from "../portalComponent/PortalFooter";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", repeatPassword: "" });
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
    
    const payload = {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password
    };
    
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", payload);
      localStorage.setItem("token", res.data.token);
      alert("Registration Successful!");
      navigate("/"); 
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  // --- JSX Rendering ---

  return (
    <> 
      <PortalNavbar/>
      
      <div id="content" className="my-account">
        <div className="container">
          {/* BS5 FIX: Use justify-content-center on the row to center the column */}
          <div className="row justify-content-center"> 
            
            {/* BS5 FIX: Use col-12 for full width on small screens, 
                col-md-8 for tablets, and col-lg-6 for desktops. 
                Removed all obsolete 'offset' classes. */}
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
                      REGITER
                    </a>
                  </li>
                </ul>

                {/* Login Form Section */}
                <div id="cd-login" className={activeTab === "login" ? "is-selected" : ""}>
                  <div className="page-login-form">
                    <form role="form" className="login-form" onSubmit={login}>
                      {/* Form Groups using form-group (assuming custom styles use it, otherwise mb-3 is preferred in pure BS5) */}
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

                      {/* Submit Button */}
                      <button type="submit" className="btn btn-common log-btn">
                        Login
                      </button>

                      {/* Remember Me / Lost Password */}
                      <div className="checkbox-item">
                        <div className="checkbox">
                          {/* Note: In BS5, form controls and labels should use form-check classes */}
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