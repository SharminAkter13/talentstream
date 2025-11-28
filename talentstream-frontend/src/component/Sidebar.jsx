import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  // Optional: Close menu on route change
  React.useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname]);

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="left-side-bar">
      <div className="brand-logo">
        <Link to="/">
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
            <li>
              <Link to="/dashboard" className="dropdown-toggle no-arrow">
                <span className="micon dw dw-house-1" />
                <span className="mtext">Dashboard</span>
              </Link>
            </li>

            {/* Jobs Section */}
            <li className="dropdown">
              <a
                href="#!"
                className="dropdown-toggle"
                onClick={() => toggleMenu("jobs")}
              >
                <span className="micon dw dw-briefcase" />
                <span className="mtext">Jobs</span>
              </a>
              <ul
                className="submenu"
                style={{ display: openMenu === "jobs" ? "block" : "none" }}
              >
                <li><Link to="/create-job">Create Job</Link></li>
                <li><Link to="/job-list">Job Listings</Link></li>
                <li><Link to="/categories">Job Categories</Link></li>
              </ul>
            </li>

            {/* Candidates */}
            <li className="dropdown">
              <a
                href="#!"
                className="dropdown-toggle"
                onClick={() => toggleMenu("candidates")}
              >
                <span className="micon dw dw-briefcase" />
                <span className="mtext">Candidates</span>
              </a>
              <ul
                className="submenu"
                style={{ display: openMenu === "candidates" ? "block" : "none" }}
              >
                <li><Link to="/resume">Resume</Link></li>
                <li><Link to="/application">Application</Link></li>
                <li><Link to="/add-cat">Job Categories</Link></li>
              </ul>
            </li>

            {/* More menu items (you can repeat same pattern) */}
            {/* Users Section */}
            <li className="dropdown">
              <a
                href="#!"
                className="dropdown-toggle"
                onClick={() => toggleMenu("users")}
              >
                <span className="micon dw dw-user1" />
                <span className="mtext">Users</span>
              </a>
              <ul
                className="submenu"
                style={{ display: openMenu === "users" ? "block" : "none" }}
              >
                <li><Link to="/add-user">CreatUser</Link></li>
                <li><Link to="/manage-user">Manage User</Link></li>
              
              </ul>
            </li>

            {/* Non-dropdown items */}
            <li>
              <Link to="/skills" className="dropdown-toggle no-arrow">
                <span className="micon dw dw-paint-brush" />
                <span className="mtext">Skills</span>
              </Link>
            </li>

            <li>
              <Link to="/packages" className="dropdown-toggle no-arrow">
                <span className="micon dw dw-invoice" />
                <span className="mtext">Employer <br /> Packages</span>
              </Link>
            </li>

            <li>
              <Link to="/notifications" className="dropdown-toggle no-arrow">
                <span className="micon dw dw-bell" />
                <span className="mtext">Notifications</span>
              </Link>
            </li>

            <li>
              <Link to="/reports" className="dropdown-toggle no-arrow">
                <span className="micon dw dw-analytics-21" />
                <span className="mtext">Reports</span>
              </Link>
            </li>

            <li>
              <Link to="/settings" className="dropdown-toggle no-arrow">
                <span className="micon dw dw-settings2" />
                <span className="mtext">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
