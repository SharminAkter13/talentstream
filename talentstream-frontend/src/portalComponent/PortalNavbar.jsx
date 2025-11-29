import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const PortalNavbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Function to toggle the collapse state
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // A helper function to close the menu after a link is clicked on mobile
  const closeNav = () => {
    if (!isNavCollapsed) {
      setIsNavCollapsed(true);
    }
  };

  const navId = 'main-navbar'; // Consistent ID for targetting the collapse

  return (
    <header id="home" className="hero-area">
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar">
        <div className="container">
          <div className="theme-header clearfix">
            {/* Brand and toggle button */}
            <div className="navbar-header">
              {/* Toggle Button: Use the state and handler */}
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target={`#${navId}`}
                aria-controls={navId}
                aria-expanded={!isNavCollapsed} // Control expanded state via React state
                aria-label="Toggle navigation"
                onClick={handleNavCollapse} // Attach the click handler
              >
                {/* Ensure correct icons are displayed based on your CSS/Bootstrap version. 
                    This example keeps your original lni-menu icons. */}
                <span className="navbar-toggler-icon"></span>
                <span className="lni-menu"></span>
                <span className="lni-menu"></span>
                <span className="lni-menu"></span>
              </button>
              
              {/* Logo Link: Using Link for SPA navigation or plain a for external */}
              <Link to="/" className="navbar-brand" onClick={closeNav}>
                <img src="assets/img/logo.png" alt="Company Logo" />
              </Link>
            </div>

            {/* Navbar Links: Use the state to control the 'show' class for Bootstrap 4/5 compatibility */}
            <div
              className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
              id={navId}
            >
              <ul className="navbar-nav mr-auto w-100 justify-content-end">
                {/* Home Link */}
                <li className="nav-item active">
                  {/* Use 'to' for React Router Link instead of 'href' */}
                  <Link className="nav-link" to="/" onClick={closeNav}>
                    Home
                  </Link>
                </li>
                
                {/* Pages Dropdown - Note: Bootstrap dropdowns usually require jQuery/JS 
                    to fully work. For pure React/Bootstrap components, consider using 
                    a library like react-bootstrap. */}
                <li className="nav-item dropdown">
                  {/* Retaining 'href="#"' and 'data-toggle' for a basic Bootstrap structure, 
                      but a pure React implementation is recommended. */}
                  <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Pages
                  </a>
                  <ul className="dropdown-menu">
                    {/* Using Link for internal navigation */}
                    <li><Link className="dropdown-item" to="/about" onClick={closeNav}>About</Link></li>
                    <li><Link className="dropdown-item" to="/job-page" onClick={closeNav}>Job Page</Link></li>
                    <li><Link className="dropdown-item" to="/job-details" onClick={closeNav}>Job Details</Link></li>
                    <li><Link className="dropdown-item" to="/resume" onClick={closeNav}>Resume Page</Link></li>
                    <li><Link className="dropdown-item" to="/privacy-policy" onClick={closeNav}>Privacy Policy</Link></li>
                    <li><Link className="dropdown-item" to="/faq" onClick={closeNav}>FAQ</Link></li>
                    <li><Link className="dropdown-item" to="/pricing" onClick={closeNav}>Pricing Tables</Link></li>
                    <li><Link className="dropdown-item" to="/contact" onClick={closeNav}>Contact</Link></li>
                  </ul>
                </li>

                {/* Candidates Dropdown (Similar refactoring for other dropdowns) */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Candidates
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/browse-jobs" onClick={closeNav}>Browse Jobs</Link></li>
                    <li><Link className="dropdown-item" to="/browse-categories" onClick={closeNav}>Browse Categories</Link></li>
                    <li><Link className="dropdown-item" to="/add-resume" onClick={closeNav}>Add Resume</Link></li>
                    <li><Link className="dropdown-item" to="/manage-resumes" onClick={closeNav}>Manage Resumes</Link></li>
                    <li><Link className="dropdown-item" to="/job-alerts" onClick={closeNav}>Job Alerts</Link></li>
                  </ul>
                </li>
                
                {/* Employers Dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Employers
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/post-job" onClick={closeNav}>Add Job</Link></li>
                    <li><Link className="dropdown-item" to="/manage-jobs" onClick={closeNav}>Manage Jobs</Link></li>
                    <li><Link className="dropdown-item" to="/manage-applications" onClick={closeNav}>Manage Applications</Link></li>
                    <li><Link className="dropdown-item" to="/browse-resumes" onClick={closeNav}>Browse Resumes</Link></li>
                  </ul>
                </li>
                
                {/* Blog Dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Blog
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/blog" onClick={closeNav}>Blog - Right Sidebar</Link></li>
                    <li><Link className="dropdown-item" to="/blog-left-sidebar" onClick={closeNav}>Blog - Left Sidebar</Link></li>
                    <li><Link className="dropdown-item" to="/blog-full-width" onClick={closeNav}>Blog full width</Link></li>
                    <li><Link className="dropdown-item" to="/single-post" onClick={closeNav}>Blog Single Post</Link></li>
                  </ul>
                </li>

                {/* Contact Link */}
                <li className="nav-item">
                  <Link className="nav-link" to="/contact" onClick={closeNav}>
                    Contact
                  </Link>
                </li>
                
                {/* Sign In Link */}
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={closeNav}>Sign In</Link>
                </li>
                
                {/* Post a Job Button */}
                <li className="button-group">
                  <Link to="/post-job" className="button btn btn-common" onClick={closeNav}>Post a Job</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mobile-menu" data-logo="assets/img/logo-mobile.png"></div>
      </nav>
      {/* Navbar End */}

      {/* Hero Content Section */}
      <div className="container">
        <div className="row space-100 justify-content-center">
          <div className="col-lg-10 col-md-12 col-xs-12">
            <div className="contents">
              <h2 className="head-title">Find the job that fits your life</h2>
              <p>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus, <br /> id tincidunt nisi porta sit amet. Suspendisse et sapien varius, pellentesque dui non.</p>
              <div className="job-search-form">
                {/* Search Form - Consider making this a separate component for cleaner code */}
                <form>
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-xs-12">
                      <div className="form-group">
                        <input className="form-control" type="text" placeholder="Job Title or Company Name" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-xs-12">
                      <div className="form-group">
                        <div className="search-category-container">
                          <label className="styled-select">
                            <select>
                              <option value="none">Locations</option>
                              <option value="New York">New York</option>
                              <option value="California">California</option>
                              <option value="Washington">Washington</option>
                              <option value="Birmingham">Birmingham</option>
                              <option value="Chicago">Chicago</option>
                              <option value="Phoenix">Phoenix</option>
                            </select>
                          </label>
                        </div>
                        <i className="lni-map-marker"></i>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-xs-12">
                      <div className="form-group">
                        <div className="search-category-container">
                          <label className="styled-select">
                            <select>
                              <option value="">All Categories</option>
                              <option value="Finance">Finance</option>
                              <option value="IT & Engineering">IT & Engineering</option>
                              <option value="Education/Training">Education/Training</option>
                              <option value="Art/Design">Art/Design</option>
                              <option value="Sale/Markting">Sale/Markting</option>
                              <option value="Healthcare">Healthcare</option>
                              <option value="Science">Science</option>
                              <option value="Food Services">Food Services</option>
                            </select>
                          </label>
                        </div>
                        <i className="lni-layers"></i>
                      </div>
                    </div>
                    <div className="col-lg-1 col-md-6 col-xs-12">
                      <button type="submit" className="button"><i className="lni-search"></i></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PortalNavbar;