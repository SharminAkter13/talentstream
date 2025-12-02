import React, { useState } from "react";
import { Link } from "react-router-dom";
import { hasRole } from "../services/auth"; // adjust path if needed

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  // Role identifiers
  const isAdmin = hasRole(1);
  const isEmployer = hasRole(2);
  const isCandidate = hasRole(3);

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  // Close menu when clicking any sidebar link
  const handleCloseMenu = () => setOpenMenu(null);

  return (
    <div className="left-side-bar">
      <div className="brand-logo">
        <Link to="/" onClick={handleCloseMenu}>
          <img
            src="/assets/admin/vendors/images/deskapp-logo.svg"
            alt="dark logo"
            className="dark-logo"
          />
          <img
            src="/assets/admin/vendors/images/deskapp-logo-white.svg"
            alt="light logo"
            className="light-logo"
          />
        </Link>
        <div className="close-sidebar" data-toggle="left-sidebar-close">
          <i className="ion-close-round" />
        </div>
      </div>

      <div className="menu-block customscroll">
        <div className="sidebar-menu">
          <ul id="accordion-menu">

            {/* =====================
                COMMON DASHBOARD
            ====================== */}
            <li>
              <Link
                to="/dashboard"
                className="dropdown-toggle no-arrow"
                onClick={handleCloseMenu}
              >
                <span className="micon dw dw-house-1" />
                <span className="mtext">Dashboard</span>
              </Link>
            </li>

            {/* =====================
                ADMIN MENUS
            ====================== */}
            {isAdmin && (
              <>
                {/* Jobs */}
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("jobs")}>
                    <span className="micon dw dw-briefcase" />
                    <span className="mtext">Jobs</span>
                  </a>
                  <ul
                    className="submenu"
                    style={{ display: openMenu === "jobs" ? "block" : "none" }}
                  >
                    <li><Link to="/create-job" onClick={handleCloseMenu}>Create Job</Link></li>
                    <li><Link to="/job-list" onClick={handleCloseMenu}>Job Listings</Link></li>
                    <li><Link to="/categories" onClick={handleCloseMenu}>Job Categories</Link></li>
                  </ul>
                </li>

                {/* Candidates */}
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("candidates")}>
                    <span className="micon dw dw-user" />
                    <span className="mtext">Candidates</span>
                  </a>
                  <ul
                    className="submenu"
                    style={{ display: openMenu === "candidates" ? "block" : "none" }}
                  >
                    <li><Link to="/resume" onClick={handleCloseMenu}>Resume</Link></li>
                    <li><Link to="/application" onClick={handleCloseMenu}>Application</Link></li>
                    <li><Link to="/add-cat" onClick={handleCloseMenu}>Job Categories</Link></li>
                  </ul>
                </li>

                {/* Users */}
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("users")}>
                    <span className="micon dw dw-user1" />
                    <span className="mtext">Users</span>
                  </a>
                  <ul
                    className="submenu"
                    style={{ display: openMenu === "users" ? "block" : "none" }}
                  >
                    <li><Link to="/add-user" onClick={handleCloseMenu}>Create User</Link></li>
                    <li><Link to="/manage-user" onClick={handleCloseMenu}>Manage User</Link></li>
                  </ul>
                </li>

                {/* Skills */}
                <li>
                  <Link to="/skills" className="dropdown-toggle no-arrow" onClick={handleCloseMenu}>
                    <span className="micon dw dw-paint-brush" />
                    <span className="mtext">Skills</span>
                  </Link>
                </li>

                {/* Reports */}
                <li>
                  <Link to="/reports" className="dropdown-toggle no-arrow" onClick={handleCloseMenu}>
                    <span className="micon dw dw-analytics-21" />
                    <span className="mtext">Reports</span>
                  </Link>
                </li>

                {/* Settings */}
                <li>
                  <Link to="/settings" className="dropdown-toggle no-arrow" onClick={handleCloseMenu}>
                    <span className="micon dw dw-settings2" />
                    <span className="mtext">Settings</span>
                  </Link>
                </li>
              </>
            )}

            {/* =====================
                EMPLOYER MENUS
            ====================== */}
            {isEmployer && (
              <>
                <li>
                  <Link to="/add-job" onClick={handleCloseMenu}>
                    <span className="micon dw dw-briefcase" />
                    <span className="mtext">Post Job</span>
                  </Link>
                </li>

                <li>
                  <Link to="/manage-job" onClick={handleCloseMenu}>
                    <span className="micon dw dw-list" />
                    <span className="mtext">Manage Jobs</span>
                  </Link>
                </li>

                <li>
                  <Link to="/manage-application" onClick={handleCloseMenu}>
                    <span className="micon dw dw-file" />
                    <span className="mtext">Applications</span>
                  </Link>
                </li>

                <li>
                  <Link to="/browse-resume" onClick={handleCloseMenu}>
                    <span className="micon dw dw-user" />
                    <span className="mtext">Browse Resumes</span>
                  </Link>
                </li>
              </>
            )}

            {/* =====================
                CANDIDATE MENUS
            ====================== */}
            {isCandidate && (
              <>
                <li>
                  <Link to="/add-resume" className="dropdown-toggle no-arrow" onClick={handleCloseMenu}>
                    <span className="micon dw dw-file" />
                    <span className="mtext">Upload Resume</span>
                  </Link>
                </li>

                <li>
                  <Link to="/browse-job" className="dropdown-toggle no-arrow" onClick={handleCloseMenu}>
                    <span className="micon dw dw-list" />
                    <span className="mtext">Browse Jobs</span>
                  </Link>
                </li>

                <li>
                  <Link to="/browse-cat" className="dropdown-toggle no-arrow" onClick={handleCloseMenu}>
                    <span className="micon dw dw-menu" />
                    <span className="mtext">Browse Categories</span>
                  </Link>
                </li>
              </>
            )}

            {/* =====================
                COMMON MENUS FOR EMPLOYER & CANDIDATE
            ====================== */}
            {(isEmployer || isCandidate) && (
              <>
                <li>
                  <Link to="/messages" className="dropdown-toggle no-arrow" onClick={handleCloseMenu}>
                    <span className="micon dw dw-chat" />
                    <span className="mtext">Messages</span>
                  </Link>
                </li>

                <li>
                  <Link to="/applications" className="dropdown-toggle no-arrow" onClick={handleCloseMenu}>
                    <span className="micon dw dw-file" />
                    <span className="mtext">Applications</span>
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
