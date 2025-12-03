import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// ===============================
// AUTH STATUS FROM LOCAL STORAGE
// ===============================
const useAuthStatus = () => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    isAuthenticated: !!token,
    userRole: user?.role_id || null,   // 1 = Admin, 2 = Employer, 3 = Candidate
    isLoaded: true
  };
};

// =============================
// NAVBAR COMPONENT
// =============================
const PortalNavbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const { isAuthenticated, userRole, isLoaded } = useAuthStatus();

  const navId = "main-navbar";

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNav = () => {
    setIsNavCollapsed(true);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // ===============================
  // DASHBOARD LINK BASED ON ROLE
  // ===============================
  const getDashboardLink = () => {
    switch (userRole) {
      case 1:
        return "/admin/dashboard";
      case 2:
        return "/employer/dashboard";
      case 3:
        return "/candidate/dashboard";
      default:
        return "/my-account";
    }
  };

  if (!isLoaded) return null;

  return (
    <header id="home">
      <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar">
        <div className="container">
          <div className="theme-header clearfix">

            {/* BRAND / LOGO */}
            <div className="navbar-header">
              <button
                className="navbar-toggler"
                type="button"
                onClick={handleNavCollapse}
                aria-expanded={!isNavCollapsed}
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <Link to="/" className="navbar-brand" onClick={closeNav}>
                <img src="/assets/img/logo.png" alt="Company Logo" />
              </Link>
            </div>

            {/* NAVBAR MENU */}
            <div className={`${isNavCollapsed ? "collapse" : "show"} navbar-collapse`} id={navId}>
              <ul className="navbar-nav ml-auto">

                {/* HOME */}
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={closeNav}>Home</Link>
                </li>

                {/* ========================== */}
                {/* CANDIDATE SERVICES MENU   */}
                {/* ========================== */}
                {isAuthenticated && userRole === 3 && (
                  <li className={`nav-item dropdown ${openDropdown === "candidate" ? "show" : ""}`}>
                    <a href="#" className="nav-link dropdown-toggle"
                      onClick={(e) => { e.preventDefault(); toggleDropdown("candidate"); }}>
                      Services
                    </a>

                    <ul className={`dropdown-menu ${openDropdown === "candidate" ? "show" : ""}`}>
                      <li><Link className="dropdown-item" to="/browse-job" onClick={closeNav}>Browse Jobs</Link></li>
                      <li><Link className="dropdown-item" to="/browse-cat" onClick={closeNav}>Job Categories</Link></li>
                      <li><Link className="dropdown-item" to="/add-resume" onClick={closeNav}>Add Resume</Link></li>
                      <li><Link className="dropdown-item" to="/my-applications" onClick={closeNav}>My Applications</Link></li>
                    </ul>
                  </li>
                )}

                {/* ========================== */}
                {/* EMPLOYER SERVICES MENU    */}
                {/* ========================== */}
                {isAuthenticated && userRole === 2 && (
                  <li className={`nav-item dropdown ${openDropdown === "employer" ? "show" : ""}`}>
                    <a href="#" className="nav-link dropdown-toggle"
                      onClick={(e) => { e.preventDefault(); toggleDropdown("employer"); }}>
                      Services
                    </a>

                    <ul className={`dropdown-menu ${openDropdown === "employer" ? "show" : ""}`}>
                      <li><Link className="dropdown-item" to="/add-job" onClick={closeNav}>Post New Job</Link></li>
                      <li><Link className="dropdown-item" to="/manage-job" onClick={closeNav}>Manage Jobs</Link></li>
                      <li><Link className="dropdown-item" to="/manage-application" onClick={closeNav}>Applications</Link></li>
                      <li><Link className="dropdown-item" to="/browse-resume" onClick={closeNav}>Browse Resumes</Link></li>
                    </ul>
                  </li>
                )}

                {/* ========================== */}
                {/* GUEST MENU (EXPLORE)      */}
                {/* ========================== */}
                {!isAuthenticated && (
                  <li className={`nav-item dropdown ${openDropdown === "explore" ? "show" : ""}`}>
                    <a href="#" className="nav-link dropdown-toggle"
                      onClick={(e) => { e.preventDefault(); toggleDropdown("explore"); }}>
                      Explore
                    </a>

                    <ul className={`dropdown-menu ${openDropdown === "explore" ? "show" : ""}`}>
                      <li><Link className="dropdown-item" to="/browse-job" onClick={closeNav}>Browse Jobs</Link></li>
                      <li><Link className="dropdown-item" to="/browse-resume" onClick={closeNav}>Browse Resumes</Link></li>
                      <li><Link className="dropdown-item" to="/browse-cat" onClick={closeNav}>Job Categories</Link></li>
                    </ul>
                  </li>
                )}

                {/* STATIC LINKS */}
                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={closeNav}>About</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/contact" onClick={closeNav}>Contact</Link>
                </li>

                {/* ========================== */}
                {/* AUTH SECTION               */}
                {/* ========================== */}

                {!isAuthenticated ? (
                  // GUEST → SHOW SIGN IN
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-account" onClick={closeNav}>Sign In</Link>
                  </li>
                ) : (
                  // AUTHENTICATED USER → MY ACCOUNT DROPDOWN
                  <li className={`nav-item dropdown ${openDropdown === "account" ? "show" : ""}`}>
                    <a href="#" className="nav-link dropdown-toggle"
                      onClick={(e) => { e.preventDefault(); toggleDropdown("account"); }}>
                      My Account
                    </a>

                    <ul className={`dropdown-menu ${openDropdown === "account" ? "show" : ""}`}>
                      <li>
                        <Link className="dropdown-item" to={getDashboardLink()} onClick={closeNav}>
                          Dashboard
                        </Link>
                      </li>

                      <li>
                        <button className="dropdown-item"
                          onClick={() => {
                            localStorage.removeItem("authToken");
                            localStorage.removeItem("user");
                            window.location.href = "/my-account";
                          }}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                )}

                {/* ========================== */}
                {/* POST JOB BUTTON           */}
                {/* Only Employer + Guests    */}
                {/* ========================== */}
                {(userRole === 2 || !isAuthenticated) && (
                  <li className="button-group p-2">
                    <Link to="/post-job" className="btn btn-common" onClick={closeNav}>
                      Post a Job
                    </Link>
                  </li>
                )}

              </ul>
            </div>

          </div>
        </div>

        <div className="mobile-menu" data-logo="/assets/img/logo-mobile.png"></div>
      </nav>
    </header>
  );
};

export default PortalNavbar;
