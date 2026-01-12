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

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className="left-side-bar">
      <div className="brand-logo">
        <Link to="/" onClick={closeMenu}>
          <img src="/portal-assets/assets/img/logosbg.png" alt="logo" className="dark-logo"  style={{ height: '40px', width: 'auto', objectFit: 'contain' }}  />
          <img src="/portal-assets/assets/img/logosbg.png" alt="logo" className="light-logo"  style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
        </Link>
      </div>

      <div className="menu-block customscroll">
        <div className="sidebar-menu">
          <ul id="accordion-menu">
            
            {/* ================= DASHBOARD ================= */}
            <li className={isActive(isAdmin ? "/admin/dashboard" : isEmployer ? "/employer/dashboard" : "/candidate/dashboard")}>
              <Link
                to={isAdmin ? "/admin/dashboard" : isEmployer ? "/employer/dashboard" : "/candidate/dashboard"}
                className="dropdown-toggle no-arrow"
                onClick={closeMenu}
              >
                <span className="micon dw dw-house-1" />
                <span className="mtext">Dashboard</span>
              </Link>
            </li>

            {/* ================= ADMIN ONLY ================= */}
            {isAdmin && (
              <>
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("adminUsers")}>
                    <span className="micon dw dw-user1" />
                    <span className="mtext">User Management</span>
                  </a>
                  <ul className="submenu" style={{ display: openMenu === "adminUsers" ? "block" : "none" }}>
                    <li><Link to="/add-user" onClick={closeMenu}>Create User</Link></li>
                    <li><Link to="/manage-user" onClick={closeMenu}>Manage Users</Link></li>
                  </ul>
                </li>

                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("adminSetup")}>
                    <span className="micon dw dw-settings" />
                    <span className="mtext">Site Setup</span>
                  </a>
                  <ul className="submenu" style={{ display: openMenu === "adminSetup" ? "block" : "none" }}>
                    <li><Link to="/manage-categories" onClick={closeMenu}>Categories</Link></li>
                    <li><Link to="/manage-location" onClick={closeMenu}>Locations</Link></li>
                    <li><Link to="/manage-skill" onClick={closeMenu}>Skills</Link></li>
                    <li><Link to="/manage-job-type" onClick={closeMenu}>Job Types</Link></li>
                  </ul>
                </li>

                <li>
                  <Link to="/job-list" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-briefcase" />
                    <span className="mtext">All Job Listings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/manage-application-admin" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-file" />
                    <span className="mtext">Applications</span>
                  </Link>
                </li>

                <li>
                  <Link to="/reports" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-analytics-21" />
                    <span className="mtext">Reports</span>
                  </Link>
                </li>

              </>
            )}

            {/* ================= EMPLOYER ONLY ================= */}
            {isEmployer && (
              <>
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("employerJobs")}>
                    <span className="micon dw dw-briefcase" />
                    <span className="mtext">Jobs Management</span>
                  </a>
                  <ul className="submenu" style={{ display: openMenu === "employerJobs" ? "block" : "none" }}>
                    <li><Link to="/create-job" onClick={closeMenu}>Post New Job</Link></li>
                    <li><Link to="/manage-job" onClick={closeMenu}>Manage My Jobs</Link></li>
                    <li><Link to="/my-job-stats" onClick={closeMenu}>Job Statistics</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/manage-company" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-building" />
                    <span className="mtext">Company Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/employer/applications" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-file" />
                    <span className="mtext">Candidate Applications</span>
                  </Link>
                </li>
              </>
            )}

            {/* ================= CANDIDATE ONLY ================= */}
            {isCandidate && (
              <>
                <li className="dropdown">
                  <a href="#!" className="dropdown-toggle" onClick={() => toggleMenu("candidateResume")}>
                    <span className="micon dw dw-file" />
                    <span className="mtext">My Resumes</span>
                  </a>
                  <ul className="submenu" style={{ display: openMenu === "candidateResume" ? "block" : "none" }}>
                    <li><Link to="/resume-create" onClick={closeMenu}>Build Resume</Link></li>
                    <li><Link to="/candidate-resume" onClick={closeMenu}>Manage Resumes</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/browse-jobs" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-search" />
                    <span className="mtext">Browse Jobs</span>
                  </Link>
                </li>
                <li>
                  <Link to="/job-alerts" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-notification" />
                    <span className="mtext">Job Alerts</span>
                  </Link>
                </li>
                <li>
                  <Link to="/candidate/applications" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                    <span className="micon dw dw-file" />
                    <span className="mtext">My Applications</span>
                  </Link>
                </li>

              </>
            )}

            {/* ================= SHARED AUTH ROUTES ================= */}
            <li>
              <Link to="/messages" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                <span className="micon dw dw-chat" />
                <span className="mtext">Messages</span>
              </Link>
            </li>

            <li>
              <Link to="/profile" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                <span className="micon dw dw-user" />
                <span className="mtext">Profile</span>
              </Link>
            </li>

            <li>
              <Link to="/help" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                <span className="micon dw dw-help" />
                <span className="mtext">Help & Support</span>
              </Link>
            </li>

            <li>
              <Link to="/logout" className="dropdown-toggle no-arrow" onClick={closeMenu}>
                <span className="micon dw dw-logout" />
                <span className="mtext">Logout</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;