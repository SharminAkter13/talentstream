import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// ⚠️ Placeholder for a custom hook that fetches/provides auth status and role.
// You will need to implement this based on your state management solution (Context/Redux)
// and your Laravel API integration.
const useAuthStatus = () => {
  // Example state for an unauthenticated user (Guest)
  // return { isAuthenticated: false, userRole: null, isLoaded: true };
  
  // Example state for a Candidate user
  // return { isAuthenticated: true, userRole: 'candidate', isLoaded: true };

  // Example state for an Employer user
  // return { isAuthenticated: true, userRole: 'employer', isLoaded: true };
  
  // For demonstration, let's assume we are logged in as a 'candidate' for now.
  // *** Change this value to test different roles: 'candidate', 'employer', or null ***
  const isAuthenticated = true; // Set to true if logged in
  const userRole = 'candidate'; // Set to 'candidate', 'employer', or null if not logged in

  return { isAuthenticated, userRole, isLoaded: true }; 
};


const PortalNavbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null); 
  const navId = 'main-navbar'; 
  
  // --- Auth/Role Integration ---
  const { isAuthenticated, userRole, isLoaded } = useAuthStatus();
  // -----------------------------

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const closeNav = () => {
    if (!isNavCollapsed) {
      setIsNavCollapsed(true);
    }
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Helper to determine the dashboard link based on the role
  const getDashboardLink = () => {
    switch (userRole) {
      case 'candidate':
        return '/candidate/dashboard'; // Replace with actual route
      case 'employer':
        return '/employer/dashboard'; // Replace with actual route
      case 'admin':
        return '/admin/dashboard'; // Replace with actual route
      default:
        return '/my-account';
    }
  };

  if (!isLoaded) {
    // You might want a simple spinner or null while auth status is loading
    return null; 
  }

  return (
    <header id="home" >
      <nav className="navbar navbar-expand-lg fixed-top scrolling-navba">
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
              
                {/* 1. Candidate Menu (Authenticated Candidate Only) */}
                {isAuthenticated && userRole === 'candidate' && (
                  <li className={`nav-item dropdown ${openDropdown === 'candidate' ? 'show' : ''}`}>
                    <a 
                      className="nav-link dropdown-toggle" 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); toggleDropdown('candidate'); }}
                      aria-expanded={openDropdown === 'candidate'}
                    >
                      Services
                    </a>
                    <ul className={`dropdown-menu ${openDropdown === 'candidate' ? 'show' : ''}`}>
                      <li><Link className="dropdown-item" to="/browse-job" onClick={closeNav}>Browse Jobs</Link></li>
                      <li><Link className="dropdown-item" to="/browse-cat" onClick={closeNav}>Job Categories</Link></li>
                      <li><Link className="dropdown-item" to="/add-resume" onClick={closeNav}>Add Resume</Link></li>
                      <li><Link className="dropdown-item" to="/manage-resumes" onClick={closeNav}>Manage Resumes</Link></li>
                      <li><Link className="dropdown-item" to="/job-alerts" onClick={closeNav}>Job Alerts</Link></li>
                      <li><Link className="dropdown-item" to="/my-applications" onClick={closeNav}>My Applications</Link></li>
                    </ul>
                  </li>
                )}
                
                {/* 2. Employer Menu (Authenticated Employer Only) */}
                {isAuthenticated && userRole === 'employer' && (
                  <li className={`nav-item dropdown ${openDropdown === 'employer' ? 'show' : ''}`}>
                    <a 
                      className="nav-link dropdown-toggle" 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); toggleDropdown('employer'); }}
                      aria-expanded={openDropdown === 'employer'}
                    >
                      Services
                    </a>
                    <ul className={`dropdown-menu ${openDropdown === 'employer' ? 'show' : ''}`}>
                      <li><Link className="dropdown-item" to="/add-job" onClick={closeNav}>Post New Job</Link></li>
                      <li><Link className="dropdown-item" to="/manage-job" onClick={closeNav}>Manage Jobs</Link></li>
                      {/* Note: In React, you'll need the job ID in the route, or link to a general applications page */}
                      <li><Link className="dropdown-item" to="/manage-application" onClick={closeNav}>Applications</Link></li> 
                      <li><Link className="dropdown-item" to="/browse-resume" onClick={closeNav}>Browse Resumes</Link></li>
                    </ul>
                  </li>
                )}

                {/* 3. Guest Menu (Unauthenticated Users Only) - Matches your Laravel 'Explore' */}
                {!isAuthenticated && (
                  <li className={`nav-item dropdown ${openDropdown === 'explore' ? 'show' : ''}`}>
                    <a 
                      className="nav-link dropdown-toggle" 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); toggleDropdown('explore'); }}
                      aria-expanded={openDropdown === 'explore'}
                    >
                      Explore
                    </a>
                    <ul className={`dropdown-menu ${openDropdown === 'explore' ? 'show' : ''}`}>
                      <li><Link className="dropdown-item" to="/browse-job" onClick={closeNav}>Browse Jobs</Link></li>
                      <li><Link className="dropdown-item" to="/browse-resume" onClick={closeNav}>Browse Resumes</Link></li>
                      <li><Link className="dropdown-item" to="/browse-cat" onClick={closeNav}>Job Categories</Link></li>
                    </ul>
                  </li>
                )}
              
                {/* Static Links */}
                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={closeNav}>About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact" onClick={closeNav}>Contact</Link>
                </li>
                
                {/* --- RIGHT SIDE: Auth/Account and Button --- */}
                
                {/* Authentication Links */}
                {!isAuthenticated ? (
                  // Sign In (Guest)
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={closeNav}>Sign In</Link>
                  </li>
                ) : (
                  // My Account / Dashboard (Authenticated User)
                  <li className={`nav-item dropdown ${openDropdown === 'account' ? 'show' : ''}`}>
                    <a 
                      className="nav-link dropdown-toggle" 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); toggleDropdown('account'); }}
                      aria-expanded={openDropdown === 'account'}
                    >
                      My Account
                    </a>
                    <ul className={`dropdown-menu ${openDropdown === 'account' ? 'show' : ''}`}>
                      <li><Link className="dropdown-item" to={getDashboardLink()} onClick={closeNav}>Dashboard</Link></li>
                      {/* Logout is typically an action, not a link. In React, this would trigger an API call and state reset. */}
                      <li><button className="dropdown-item" onClick={() => { console.log('Logout action triggered'); closeNav(); }}>Logout</button></li>
                    </ul>
                  </li>
                )}
                
                {/* Post a Job Button (Employer/Guest) */}
                {(userRole === 'employer' || !isAuthenticated) && (
                  <li className="button-group">
                    <Link 
                      to="/post-job" 
                      className="button btn btn-common" 
                      onClick={closeNav}
                    >
                      Post a Job
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="mobile-menu" data-logo="assets/img/logo-mobile.png"></div>
      </nav>
    </header>
  );
};

export default PortalNavbar;