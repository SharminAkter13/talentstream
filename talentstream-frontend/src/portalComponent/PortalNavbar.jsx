import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { isLoggedIn, getCurrentUser, logoutUser } from "../services/auth";

const PortalNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());
  const [userRole, setUserRole] = useState(getCurrentUser()?.role_id || null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(isLoggedIn());
      setUserRole(getCurrentUser()?.role_id || null);
    };
    window.addEventListener("storage", syncAuth);
    const interval = setInterval(syncAuth, 1000);
    return () => {
      window.removeEventListener("storage", syncAuth);
      clearInterval(interval);
    };
  }, []);

  const navId = "main-navbar";
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNav = () => {
    setIsNavCollapsed(true);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 1:
        return "/admin/dashboard";
      case 2:
        return "/employer/dashboard";
      case 3:
        return "/candidate/dashboard";
      default:
        return "/login";
    }
  };

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUserRole(null);
    closeNav();
    window.location.href = "/login";
  };

  return (
    <header id="home">
      <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar">
        <div className="container">
          <div className="theme-header clearfix w-100 d-flex align-items-center justify-content-between">
            <div className="navbar-header d-flex align-items-center">
              <button
                className="navbar-toggler"
                type="button"
                onClick={handleNavCollapse}
                aria-controls={navId}
                aria-expanded={!isNavCollapsed}
                aria-label="Toggle navigation"
              >
                <i className={isNavCollapsed ? "lni-menu" : "lni-close"}></i>
              </button>

              <Link to="/" className="navbar-brand" onClick={closeNav}>
                {/* FIX: Added style to constrain height. 
                  Adjust 40px to 30px if you want it even smaller (icon size). 
                */}
                <img
                  src="/portal-assets/assets/img/logosbg.ico"
                  alt="Company Logo"
                  className="navbar-logo img-fluid"
                />
              </Link>
            </div>

            <div
              className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""
                }`}
              id={navId}
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={closeNav}>
                    Home
                  </Link>
                </li>

                {/* CANDIDATE SERVICES */}
                {isAuthenticated && userRole === 3 && (
                  <li
                    className={`nav-item dropdown ${openDropdown === "candidate" ? "show" : ""
                      }`}
                  >
                    <a
                      href="#!"
                      className="nav-link dropdown-toggle"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown("candidate");
                      }}
                    >
                      Services
                    </a>
                    <ul
                      className={`dropdown-menu ${openDropdown === "candidate" ? "show" : ""
                        }`}
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/browse-job"
                          onClick={closeNav}
                        >
                          Browse Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/browse-cat"
                          onClick={closeNav}
                        >
                          Job Categories
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/add-resume"
                          onClick={closeNav}
                        >
                          Add Resume
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/my-applications"
                          onClick={closeNav}
                        >
                          My Applications
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                {/* EMPLOYER SERVICES */}
                {isAuthenticated && userRole === 2 && (
                  <li
                    className={`nav-item dropdown ${openDropdown === "employer" ? "show" : ""
                      }`}
                  >
                    <a
                      href="#!"
                      className="nav-link dropdown-toggle"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown("employer");
                      }}
                    >
                      Services
                    </a>
                    <ul
                      className={`dropdown-menu ${openDropdown === "employer" ? "show" : ""
                        }`}
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/add-job"
                          onClick={closeNav}
                        >
                          Post New Job
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/manage-job"
                          onClick={closeNav}
                        >
                          Manage Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/manage-application"
                          onClick={closeNav}
                        >
                          Applications
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/browse-resume"
                          onClick={closeNav}
                        >
                          Browse Resumes
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                {/* GUEST MENU */}
                {!isAuthenticated && (
                  <li
                    className={`nav-item dropdown ${openDropdown === "explore" ? "show" : ""
                      }`}
                  >
                    <a
                      href="#!"
                      className="nav-link dropdown-toggle"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown("explore");
                      }}
                    >
                      Explore
                    </a>
                    <ul
                      className={`dropdown-menu ${openDropdown === "explore" ? "show" : ""
                        }`}
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/browse-job"
                          onClick={closeNav}
                        >
                          Browse Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/browse-resume"
                          onClick={closeNav}
                        >
                          Browse Resumes
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/browse-cat"
                          onClick={closeNav}
                        >
                          Job Categories
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={closeNav}>
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact" onClick={closeNav}>
                    Contact
                  </Link>
                </li>

                {/* AUTH SECTION */}
                {!isAuthenticated ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={closeNav}>
                      Sign In
                    </Link>
                  </li>
                ) : (
                  <li
                    className={`nav-item dropdown ${openDropdown === "account" ? "show" : ""
                      }`}
                  >
                    <a
                      href="#!"
                      className="nav-link dropdown-toggle"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown("account");
                      }}
                    >
                      My Account
                    </a>
                    <ul
                      className={`dropdown-menu ${openDropdown === "account" ? "show" : ""
                        }`}
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={getDashboardLink()}
                          onClick={closeNav}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                )}

                {(userRole === 2 || !isAuthenticated) && (
                  <li className="button-group p-2">
                    <Link
                      to="/post-job"
                      className="btn btn-common"
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
      </nav>
    </header>
  );
};

export default PortalNavbar;
