import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { hasRole } from "../services/auth";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const isAdmin = hasRole(1);
  const isEmployer = hasRole(2);
  const isCandidate = hasRole(3);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeMenu = () => setOpenMenu(null);

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="left-side-bar">
      {/* LOGO */}
      <div className="brand-logo">
        <Link to="/" onClick={closeMenu}>
          <img
            src="/assets/admin/vendors/images/deskapp-logo.svg"
            alt="logo"
            className="dark-logo"
          />
          <img
            src="/assets/admin/vendors/images/deskapp-logo-white.svg"
            alt="logo"
            className="light-logo"
          />
        </Link>
      </div>

      <div className="menu-block customscroll">
        <div className="sidebar-menu">
          <ul id="accordion-menu">

            {/* ================= DASHBOARD ================= */}
            <li className={isActive("/dashboard")}>
              <Link
                to="/dashboard"
                className="dropdown-toggle no-arrow"
                onClick={closeMenu}
              >
                <span className="micon dw dw-house-1" />
                <span className="mtext">Dashboard</span>
              </Link>
            </li>

            {/* ================= ADMIN ================= */}
            {isAdmin && (
              <>
                {/* Jobs */}
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("adminJobs")}>
                    <span className="micon dw dw-briefcase" />
                    <span className="mtext">Jobs</span>
                  </a>
                  <ul className="submenu" style={{ display: openMenu === "adminJobs" ? "block" : "none" }}>
                    <li><Link to="/job-list" onClick={closeMenu}>Job Listings</Link></li>
                  </ul>
                </li>

                {/* Categories */}
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("categories")}>
                    <span className="micon dw dw-menu" />
                    <span className="mtext">Categories</span>
                  </a>
                  <ul className="submenu" style={{ display: openMenu === "categories" ? "block" : "none" }}>
                    <li><Link to="/manage-categories" onClick={closeMenu}>Manage Categories</Link></li>
                    <li><Link to="/add-cat" onClick={closeMenu}>Create Category</Link></li>
                  </ul>
                </li>

                {/* Candidates */}
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("candidates")}>
                    <span className="micon dw dw-user" />
                    <span className="mtext">Candidates</span>
                  </a>
                  <ul className="submenu" style={{ display: openMenu === "candidates" ? "block" : "none" }}>
                    <li><Link to="/resume" onClick={closeMenu}>Resumes</Link></li>
                    <li><Link to="/application" onClick={closeMenu}>Applications</Link></li>
                  </ul>
                </li>

                {/* Users */}
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("users")}>
                    <span className="micon dw dw-user1" />
                    <span className="mtext">Users</span>
                  </a>
                  <ul className="submenu" style={{ display: openMenu === "users" ? "block" : "none" }}>
                    <li><Link to="/add-user" onClick={closeMenu}>Create User</Link></li>
                    <li><Link to="/manage-user" onClick={closeMenu}>Manage Users</Link></li>
                  </ul>
                </li>

                {/* Single Admin Links */}
                <li>
                  <Link to="/skills" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-paint-brush" />
                    <span className="mtext">Skills</span>
                  </Link>
                </li>

                <li>
                  <Link to="/reports" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-analytics-21" />
                    <span className="mtext">Reports</span>
                  </Link>
                </li>

                <li>
                  <Link to="/settings" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-settings2" />
                    <span className="mtext">Settings</span>
                  </Link>
                </li>
              </>
            )}

            {/* ================= EMPLOYER ================= */}
            {isEmployer && (
              <>
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("employerJobs")}>
                    <span className="micon dw dw-briefcase" />
                    <span className="mtext">Jobs Management</span>
                  </a>
                  <ul className="submenu" style={{ display: openMenu === "employerJobs" ? "block" : "none" }}>
                    {/* Only Employer sees "Post a New Job" */}
                    <li><Link to="/create-job" onClick={closeMenu}>Post a New Job</Link></li>
                    {/* Employer sees "My Jobs" which calls /api/employer/jobs */}
                    <li><Link to="/job-list" onClick={closeMenu}>My Job Listings</Link></li>
                  </ul>
                </li>

                <li>
                  <Link to="/manage-application" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-file" />
                    <span className="mtext">Applications</span>
                  </Link>
                </li>

                <li>
                  <Link to="/browse-resume" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-user" />
                    <span className="mtext">Browse Resumes</span>
                  </Link>
                </li>
              </>
            )}

            {/* ================= CANDIDATE ================= */}
            {isCandidate && (
              <>
                <li>
                  <Link to="/add-resume" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-file" />
                    <span className="mtext">Upload Resume</span>
                  </Link>
                </li>

                <li>
                  <Link to="/browse-job" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-list" />
                    <span className="mtext">Browse Jobs</span>
                  </Link>
                </li>

                <li>
                  <Link to="/browse-cat" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-menu" />
                    <span className="mtext">Browse Categories</span>
                  </Link>
                </li>
              </>
            )}

            {/* ========== COMMON (EMPLOYER + CANDIDATE) ========== */}
            {(isEmployer || isCandidate) && (
              <>
                <li>
                  <Link to="/messages" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-chat" />
                    <span className="mtext">Messages</span>
                  </Link>
                </li>

                <li>
                  <Link to="/applications" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-file" />
                    <span className="mtext">My Applications</span>
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
