import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

// ✅ FIXED: Component moved outside render
const NavIcon = ({ className }) => (
    <i className={`${className} pe-4`} />
);

const Navbar = () => {
    return (
        <div>
            {/* Header Start */}
            <div className="header">
                {/* Search Start */}
                <div className="header-left">
                    <div className="menu-icon">
                        <i className="bi bi-list" />
                    </div>

                    <div className="search-toggle-icon" data-toggle="header_search">
                        <i className="bi bi-search" />
                    </div>

                    <div className="header-search">
                        <form>
                            <div className="form-group mb-0">
                                <i className="bi bi-search search-icon" />

                                <input
                                    type="text"
                                    className="form-control search-input"
                                    placeholder="Search Here"
                                />

                                <div className="dropdown">
                                    <a className="dropdown-toggle no-arrow" href="#" data-toggle="dropdown">
                                        <i className="bi bi-caret-down-fill" />
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right">
                                        {/* Form Fields */}
                                        <div className="form-group row">
                                            <label className="col-sm-12 col-md-2 col-form-label">From</label>
                                            <div className="col-sm-12 col-md-10">
                                                <input className="form-control form-control-sm" type="text" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-12 col-md-2 col-form-label">To</label>
                                            <div className="col-sm-12 col-md-10">
                                                <input className="form-control form-control-sm" type="text" />
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <button className="btn btn-primary">Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Elements */}
                <div className="header-right">
                    {/* Settings */}
                    <div className="dashboard-setting user-notification">
                        <div className="dropdown">
                            <a className="dropdown-toggle no-arrow" href="#" data-toggle="right-sidebar">
                                <i className="bi bi-gear" />
                            </a>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="user-notification">
                        <div className="dropdown">
                            <a className="dropdown-toggle no-arrow" href="#" data-toggle="dropdown">
                                <i className="bi bi-bell" />
                                <span className="badge notification-active" />
                            </a>

                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="notification-list mx-h-350 customscroll">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <img src="/assets/admin/vendors/images/img.jpg" alt="" />
                                                <h3>John Doe</h3>
                                                <p>Lorem ipsum dolor sit amet...</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Dropdown */}
                    <div className="user-info-dropdown">
                        <div className="dropdown">
                            <a className="dropdown-toggle" href="#" data-toggle="dropdown">
                                <span className="user-icon">
                                    <img src="/assets/admin/vendors/images/photo1.jpg" alt="" />
                                </span>
                                <span className="user-name">Sharmin Akter</span>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">

                                <Link to="/my-account" className="dropdown-item">
                                    <NavIcon className="bi bi-key" /> <span style={{ marginLeft: 17 }}>My Account</span>

                                </Link>

                                <Link to="/profile" className="dropdown-item">
                                    <NavIcon className="bi bi-person" /><span style={{ marginLeft: 17 }}>Profile </span>
                                </Link>

                                <Link to="/profile-setting" className="dropdown-item">
                                    <NavIcon className="bi bi-gear" /><span style={{ marginLeft: 17 }}> Setting</span>
                                </Link>

                                <Link to="/reports" className="dropdown-item">
                                    <NavIcon className="bi bi-bar-chart-line" /><span style={{ marginLeft: 17 }}> Reports</span>
                                </Link>

                                <Link to="/help" className="dropdown-item">
                                    <NavIcon className="bi bi-question-circle" /><span style={{ marginLeft: 17 }}> Help</span>
                                </Link>

                                <Link to="/logout" className="dropdown-item">
                                    <NavIcon className="bi bi-box-arrow-right" /><span style={{ marginLeft: 17 }}> Log Out</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="right-sidebar">
                <div className="sidebar-title">
                    <h3 className="weight-600 font-16 text-blue">
                        Layout Settings
                        <span className="btn-block font-weight-400 font-12">User Interface Settings</span>
                    </h3>
                    <div className="close-sidebar" data-toggle="right-sidebar-close">
                        <i className="bi bi-x-lg" />
                    </div>
                </div>

                <div className="right-sidebar-body customscroll">
                    <div className="right-sidebar-body-content">
                        {/* Settings sections (unchanged) */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
