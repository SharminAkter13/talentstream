import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const PortalNavbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <section id="intro" class="section-intro">
      <div class="logo-menu">
    <nav className="navbar navbar-default main-navigation affix-top navbar-expand-lg" role="navigation">
      <div className="container">
        {/* Navbar Header */}
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            onClick={handleNavCollapse}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand logo" to="/">
            <img src="portal-assets//assets/img/logo.png" alt="Logo" />
          </Link>
        </div>

        {/* Navbar Collapse */}
        <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'in'}`} id="navbar">
          <ul className="nav navbar-nav">
            {/* Home */}
            <li className="drop">
              <Link className="active" to="/">Home </Link>
              
            </li>

            {/* Pages */}
            <li className="drop">
              <Link to="/about">Services <i className="fa fa-angle-down"></i></Link>
              <ul className="dropdown">
                <li><Link to="/job-page">Job Page</Link></li>
                <li><Link to="/job-details">Job Details</Link></li>
                <li><Link to="/browse-resume">Resume Page</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/pricing">Pricing Tables</Link></li>
              </ul>
            </li>

            {/* Candidates */}
            <li className="drop">
              <Link to="#">Candidates <i className="fa fa-angle-down"></i></Link>
              <ul className="dropdown">
                <li><Link to="/browse-jobs">Browse Jobs</Link></li>
                <li><Link to="/browse-categories">Browse Categories</Link></li>
                <li><Link to="/add-resume">Add Resume</Link></li>
                <li><Link to="/manage-resumes">Manage Resumes</Link></li>
                <li><Link to="/job-alerts">Job Alerts</Link></li>
              </ul>
            </li>

            {/* Employers */}
            <li className="drop">
              <Link to="#">Employers <i className="fa fa-angle-down"></i></Link>
              <ul className="dropdown">
                <li><Link to="/post-job">Add Job</Link></li>
                <li><Link to="/manage-jobs">Manage Jobs</Link></li>
                <li><Link to="/manage-applications">Manage Applications</Link></li>
                <li><Link to="/browse-resumes">Browse Resumes</Link></li>
              </ul>
            </li>

            {/* Blog */}
            <li className="drop">
              <Link to="/blog">Blog </Link>
            </li>
            
             <li className="drop">
              <Link to="/contact">Contact </Link>
              
            </li>
          </ul>

          {/* Right-side buttons */}
          <ul className="nav navbar-nav navbar-right float-right">
            <li className="left"><Link to="/post-job"><i className="ti-pencil-alt"></i> Post A Job</Link></li>
            <li className="right"><Link to="/my-account"><i className="ti-lock"></i> Log In</Link></li>
          </ul>
        </div>
      </div>
    </nav>
     {/* <!-- Off Canvas Navigation --> */}
        <div class="navmenu navmenu-default navmenu-fixed-left offcanvas">
          {/* <!--- Off Canvas Side Menu --> */}
          <div class="close" data-toggle="offcanvas" data-target=".navmenu">
            <i class="ti-close"></i>
          </div>
         
          {/* <!--- End Menu --> */}
        </div> 
    
      </div>
      {/* <!-- Header Section End --> */}

      <div class="search-container">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1>Find the job that fits your life</h1><br/>
              <h2>More than <strong>12,000</strong> jobs are waiting to Kickstart your career!</h2>
              <div class="content">
                <form method="" action="#">
                  <div class="row">
                    <div class="col-md-4 col-sm-6">
                      <div class="form-group">
                        <input class="form-control" type="text" placeholder="job title / keywords / company name"/>
                        <i class="ti-time"></i>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                      <div class="form-group">
                        <input class="form-control" type="email" placeholder="city / province / zip code"/>
                        <i class="ti-location-pin"></i>
                      </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                      <div class="search-category-container">
                        <label class="styled-select">
                          <select class="dropdown-product selectpicker">
                            <option>All Categories</option>
                            <option>Finance</option>
                            <option>IT & Engineering</option>
                            <option>Education/Training</option>
                            <option>Art/Design</option>
                            <option>Sale/Markting</option>
                            <option>Healthcare</option>
                            <option>Science</option>
                            <option>Food Services</option>
                          </select>
                        </label>
                      </div>
                    </div>
                    <div class="col-md-1 col-sm-6">
                      <button type="button" class="btn btn-search-icon"><i class="ti-search"></i></button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="popular-jobs">
                <b>Popular Keywords: </b>
                <a href="#">Web Design</a>
                <a href="#">Manager</a>
                <a href="#">Programming</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalNavbar;