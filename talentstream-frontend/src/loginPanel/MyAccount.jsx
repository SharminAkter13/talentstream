import React, { useState } from 'react';

// NOTE: This component is a conceptual structural conversion.
// It will NOT look or function correctly without all the original CSS and JavaScript files imported into your React project.
import { Link } from 'react-router-dom';
import PortalNavbar from '../portalComponent/PortalNavbar';
import PortalFooter from '../portalComponent/PortalFooter';

const MyAccount = () => {
  // Use state to manage which tab is active: 'login' or 'register'
  const [activeTab, setActiveTab] = useState('login');

  return (
    <>
    <PortalNavbar/>
      {/* Page Header (Jumbotron/Banner) */}
      <div className="page-header" style={{ backgroundImage: 'url(assets/img/banner1.jpg)' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumb-wrapper">
                <h2 className="product-title">My Account</h2>
                <ol className="breadcrumb">
                  <li><a href="#"><i className="ti-home"></i> Home</a></li>
                  <li className="current">My Account</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      <div id="content" className="my-account">
        <div className="container">
          <div className="row">
            {/* Main Form Container */}
            <div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-6 cd-user-modal">
              <div className="my-account-form">
                {/* Tab Switcher (The main difference here is using state and onClick in React) */}
                <ul className="cd-switcher">
                  <li>
                    <a
                      className={activeTab === 'login' ? 'selected' : ''}
                      href="#0"
                      onClick={() => setActiveTab('login')}
                    >
                      LOGIN
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeTab === 'register' ? 'selected' : ''}
                      href="#0"
                      onClick={() => setActiveTab('register')}
                    >
                      REGISTER
                    </a>
                  </li>
                </ul>

                {/* --- Login Form --- */}
                <div id="cd-login" className={activeTab === 'login' ? 'is-selected' : ''}>
                  <div className="page-login-form">
                    {/* In a real React app, you would use state for form inputs and handle onSubmit */}
                    <form role="form" className="login-form" onSubmit={(e) => e.preventDefault()}>
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-user"></i>
                          <input type="text" id="sender-email" className="form-control" name="email" placeholder="Username" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-lock"></i>
                          <input type="password" className="form-control" placeholder="Password" />
                        </div>
                      </div>
                       <Link to="/dashboard">
                      <button className="btn btn-danger log-btn">Login</button>
                      </Link>
                      <div className="checkbox-item">
                        <div className="checkbox">
                          <label htmlFor="rememberme" className="rememberme">
                            <input name="rememberme" id="rememberme" value="forever" type="checkbox" /> Remember Me
                          </label>
                        </div>
                        <p className="cd-form-bottom-message"><a href="#0">Lost your password?</a></p>
                      </div>
                    </form>
                  </div>
                </div>

                {/* --- Register Form --- */}
                <div id="cd-signup" className={activeTab === 'register' ? 'is-selected' : ''}>
                  <div className="page-login-form register">
                    <form role="form" className="login-form" onSubmit={(e) => e.preventDefault()}>
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-user"></i>
                          <input type="text" className="form-control" name="name" placeholder="Username" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-email"></i>
                          <input type="text" className="form-control" name="email" placeholder="Email" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-lock"></i>
                          <input type="password" className="form-control" placeholder="Password" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-icon">
                          <i className="ti-lock"></i>
                          <input type="password" className="form-control" placeholder="Repeat Password" />
                        </div>
                      </div>
                      <Link to="/dashboard">
                      <button className="btn btn-danger log-btn">Register</button>
                      </Link>
                    </form>
                  </div>
                </div>

                {/* --- Reset Password Form --- */}
                <div className="page-login-form" id="cd-reset-password">
                  <p className="cd-form-message">Lost your password? Please enter your email address. You will receive a link to create a new password.</p>
                  <form className="cd-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="ti-email"></i>
                        <input type="text" className="form-control" name="email" placeholder="Email" />
                      </div>
                    </div>
                    <p className="fieldset">
                      <button className="btn btn-common log-btn" type="submit">Reset password</button>
                    </p>
                  </form>
                  <p className="cd-form-bottom-message"><Link to="/">Home</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PortalFooter/>

      {/* Footer component would go here */}
    </>
  );
};

export default MyAccount;