import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const PortalNavbar = () => {
 const [isNavCollapsed, setIsNavCollapsed] = useState(true);

 // State to manage the open/closed status of each dropdown
 const [openDropdown, setOpenDropdown] = useState(null); // 'pages', 'candidates', 'employers', 'blog'

 const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

 const closeNav = () => {
  if (!isNavCollapsed) {
   setIsNavCollapsed(true);
  }
  setOpenDropdown(null); // Close any open dropdowns when navigating
 };

 // Toggles a specific dropdown
 const toggleDropdown = (dropdownName) => {
  setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
 };

 const navId = 'main-navbar'; 

 return (
  <header id="home" className="hero-area">
   <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar">
    <div className="container">
     <div className="theme-header clearfix">
      {/* Brand and toggle button */}
      <div className="navbar-header">
       <button
        className="navbar-toggler"
        type="button"
        data-target={`#${navId}`}
        aria-controls={navId}
        aria-expanded={!isNavCollapsed}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
       >
        {/* Icons omitted for brevity, ensure your CSS handles the toggler-icon */}
        <span className="navbar-toggler-icon"></span>
       </button>
      
       <Link to="/" className="navbar-brand" onClick={closeNav}>
        <img src="assets/img/logo.png" alt="Company Logo" />
       </Link>
      </div>

      {/* Navbar Links - Controlled by isNavCollapsed state */}
      <div
       className={`${isNavCollapsed ? 'collapse' : 'show'} navbar-collapse`}
       id={navId}
      >
       <ul className="navbar-nav mr-auto w-100 justify-content-end">
        
        {/* Home Link */}
        <li className="nav-item active">
         <Link className="nav-link" to="/" onClick={closeNav}>
          Home
         </Link>
        </li>
       
        {/* Pages Dropdown */}
        <li className={`nav-item dropdown ${openDropdown === 'pages' ? 'show' : ''}`}>
         <a 
                        className="nav-link dropdown-toggle" 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); toggleDropdown('pages'); }}
                        aria-expanded={openDropdown === 'pages'}
                    >
          Pages
         </a>
         <ul className={`dropdown-menu ${openDropdown === 'pages' ? 'show' : ''}`}>
          {/* The path from App.jsx is used in the 'to' prop */}
          <li><Link className="dropdown-item" to="/about" onClick={closeNav}>About</Link></li>
          <li><Link className="dropdown-item" to="/job-page" onClick={closeNav}>Job Page</Link></li>
          {/* Assuming job-details needs a new route: */}
          <li><Link className="dropdown-item" to="/job-details" onClick={closeNav}>Job Details</Link></li> 
          <li><Link className="dropdown-item" to="/resume" onClick={closeNav}>Resume Page</Link></li>
          <li><Link className="dropdown-item" to="/privacy" onClick={closeNav}>Privacy Policy</Link></li>
          {/* Assuming FAQ, Pricing Tables, etc. need corresponding routes */}
          <li><Link className="dropdown-item" to="/faq" onClick={closeNav}>FAQ</Link></li>
          <li><Link className="dropdown-item" to="/pricing" onClick={closeNav}>Pricing Tables</Link></li>
          <li><Link className="dropdown-item" to="/contact" onClick={closeNav}>Contact</Link></li>
         </ul>
        </li>

        {/* Candidates Dropdown - Paths checked against App.jsx */}
        <li className={`nav-item dropdown ${openDropdown === 'candidates' ? 'show' : ''}`}>
         <a 
                        className="nav-link dropdown-toggle" 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); toggleDropdown('candidates'); }}
                        aria-expanded={openDropdown === 'candidates'}
                    >
          Candidates
         </a>
         <ul className={`dropdown-menu ${openDropdown === 'candidates' ? 'show' : ''}`}>
          <li><Link className="dropdown-item" to="/browse-job" onClick={closeNav}>Browse Jobs</Link></li>
          <li><Link className="dropdown-item" to="/browse-cat" onClick={closeNav}>Browse Categories</Link></li>
          <li><Link className="dropdown-item" to="/add-resume" onClick={closeNav}>Add Resume</Link></li>
          {/* Assuming these links also need specific routes */}
          <li><Link className="dropdown-item" to="/manage-resumes" onClick={closeNav}>Manage Resumes</Link></li>
          <li><Link className="dropdown-item" to="/job-alerts" onClick={closeNav}>Job Alerts</Link></li>
         </ul>
        </li>
       
        {/* Employers Dropdown - Paths checked against App.jsx */}
        <li className={`nav-item dropdown ${openDropdown === 'employers' ? 'show' : ''}`}>
         <a 
                        className="nav-link dropdown-toggle" 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); toggleDropdown('employers'); }}
                        aria-expanded={openDropdown === 'employers'}
                    >
          Employers
         </a>
         <ul className={`dropdown-menu ${openDropdown === 'employers' ? 'show' : ''}`}>
          <li><Link className="dropdown-item" to="/add-job" onClick={closeNav}>Add Job</Link></li>
          <li><Link className="dropdown-item" to="/manage-job" onClick={closeNav}>Manage Jobs</Link></li>
          <li><Link className="dropdown-item" to="/manage-application" onClick={closeNav}>Manage Applications</Link></li>
          <li><Link className="dropdown-item" to="/browse-resume" onClick={closeNav}>Browse Resumes</Link></li>
         </ul>
        </li>
       
        {/* Blog Dropdown - Paths checked against App.jsx */}
        <li className={`nav-item dropdown ${openDropdown === 'blog' ? 'show' : ''}`}>
         <a 
                        className="nav-link dropdown-toggle" 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); toggleDropdown('blog'); }}
                        aria-expanded={openDropdown === 'blog'}
                    >
          Blog
         </a>
         <ul className={`dropdown-menu ${openDropdown === 'blog' ? 'show' : ''}`}>
          <li><Link className="dropdown-item" to="/blog" onClick={closeNav}>Blog - Right Sidebar</Link></li>
          {/* Assuming these blog layouts need specific routes */}
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
         <Link className="nav-link" to="/my-account" onClick={closeNav}>Sign In</Link>
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
   {/* Hero Content Section (kept for context, but not navigation-related) */}
        <div className="container">
            <div className="row space-100 justify-content-center">
                <div className="col-lg-10 col-md-12 col-xs-12">
                    <div className="contents">
                        <h2 className="head-title">Find the job that fits your life</h2>
                        {/* ... search form content ... */}
                    </div>
                </div>
            </div>
        </div>
  </header>
 );
};

export default PortalNavbar;