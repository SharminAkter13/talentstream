import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Email and Password are required.');
      return;
    }

    setErrorMsg('');
    console.log('Logging in with', { email, password });

    // Simulate login and redirect
    alert('Login successful!');
  };

  return (
    <>
      {/* Header */}
      <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="brand-logo">
            <a href="/login">
              <img src="vendors/images/deskapp-logo.svg" alt="Job Portal Logo" />
            </a>
          </div>
          <div className="login-menu">
            <ul>
              <li><a href="/login">Login</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="register-page-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-7">
              <img src="vendors/images/register-page-img.png" alt="Login Visual" />
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="register-box bg-white box-shadow border-radius-10">
                <div className="p-4">
                  <h5 className="mb-4 text-center">Login to Your Account</h5>

                  {errorMsg && (
                    <div className="alert alert-danger">{errorMsg}</div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">Email Address*</label>
                      <div className="col-sm-8">
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">Password*</label>
                      <div className="col-sm-8">
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-4"></div>
                      <div className="col-sm-8">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="rememberMe"
                          />
                          <label className="custom-control-label" htmlFor="rememberMe">
                            Remember me
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-4"></div>
                      <div className="col-sm-8">
                        <button type="submit" className="btn btn-primary btn-block w-100">
                            <NavLink to ="/master" className="btn btn-primary ">
                            Login Now
                            </NavLink>
                        </button>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-12 text-center">
                        Not register ? <NavLink to="/registration">Registration here </NavLink> <br /> or go to{" "}
                        <NavLink to="/">Home</NavLink>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
