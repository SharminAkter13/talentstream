import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // Helper component for the icon to ensure proper spacing
    const NavIcon = ({ className }) => <i className={className} style={{ marginRight: '8px' }} />;

    return (
        <div>
            {/* Header Start */}
            <div className="header">
                {/* Search Start */}
                <div className="header-left">
                    <div className="menu-icon dw dw-menu" />
                    <div className="search-toggle-icon dw dw-search2" data-toggle="header_search" />
                    <div className="header-search">
                        <form>
                            <div className="form-group mb-0">
                                <i className="dw dw-search2 search-icon" />
                                <input type="text" className="form-control search-input" placeholder="Search Here" />
                                <div className="dropdown">
                                    <a className="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown">
                                        <i className="ion-arrow-down-c" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <div className="form-group row">
                                            <label className="col-sm-12 col-md-2 col-form-label">From</label>
                                            <div className="col-sm-12 col-md-10">
                                                <input className="form-control form-control-sm form-control-line" type="text" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-12 col-md-2 col-form-label">To</label>
                                            <div className="col-sm-12 col-md-10">
                                                <input className="form-control form-control-sm form-control-line" type="text" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-12 col-md-2 col-form-label">Subject</label>
                                            <div className="col-sm-12 col-md-10">
                                                <input className="form-control form-control-sm form-control-line" type="text" />
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
                {/* Search End */}
                <div className="header-right">
                    <div className="dashboard-setting user-notification">
                        <div className="dropdown">
                            <a className="dropdown-toggle no-arrow" href="javascript:;" data-toggle="right-sidebar">
                                <i className="dw dw-settings2" />
                            </a>
                        </div>
                    </div>
                    {/* Notification Start */}
                    <div className="user-notification">
                        <div className="dropdown">
                            <a className="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown">
                                <i className="icon-copy dw dw-notification" />
                                <span className="badge notification-active" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="notification-list mx-h-350 customscroll">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <img src="/assets/admin/vendors/images/img.jpg" alt />
                                                <h3>John Doe</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="/assets/admin/vendors/images/photo1.jpg" alt />
                                                <h3>Lea R. Frith</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="/assets/admin/vendors/images/photo2.jpg" alt />
                                                <h3>Erik L. Richards</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="/assets/admin/vendors/images/photo3.jpg" alt />
                                                <h3>John Doe</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="/assets/admin/vendors/images/photo4.jpg" alt />
                                                <h3>Renee I. Hansen</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="/assets/admin/vendors/images/img.jpg" alt />
                                                <h3>Vicki M. Coleman</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Notification End */}

                    {/* User Info Start */}
                    <div className="user-info-dropdown">
                        <div className="dropdown">
                            <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                <span className="user-icon">
                                    <img src="/assets/admin/vendors/images/photo1.jpg" alt />
                                </span>
                                <span className="user-name">Sharmin Akter</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                {/* Corrected Link structure and added spacing to icons */}
                                
                                <Link to="/my-account" className="dropdown-item" >
                                    <NavIcon className="dw dw-key" /> My Account
                                </Link>
                                
                                <Link to="/profile" className="dropdown-item" >
                                    <NavIcon className="dw dw-user1" /> Profile
                                </Link>
                                
                                <Link to="/profile-setting" className="dropdown-item" >
                                    <NavIcon className="dw dw-settings2" /> Setting
                                </Link>
                                
                                <Link to="/reports" className="dropdown-item" >
                                    <NavIcon className="dw dw-bar-chart" /> Reports
                                </Link>
                                
                                <Link to="/help" className="dropdown-item">
                                    <NavIcon className="dw dw-help" /> Help
                                </Link>
                                
                                {/* LOGOUT LINK (Points to the session termination component) */}
                                <Link to="/logout" className="dropdown-item" >
                                    <NavIcon className="dw dw-logout" /> **Log Out**
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* User Info End */}
                </div>
            </div>
            {/* Header End */}

            {/* Right Sidebar Start */}
            <div className="right-sidebar">
                <div className="sidebar-title">
                    <h3 className="weight-600 font-16 text-blue">
                        Layout Settings
                        <span className="btn-block font-weight-400 font-12">User Interface Settings</span>
                    </h3>
                    <div className="close-sidebar" data-toggle="right-sidebar-close">
                        <i className="icon-copy ion-close-round" />
                    </div>
                </div>
                <div className="right-sidebar-body customscroll">
                    <div className="right-sidebar-body-content">
                        <h4 className="weight-600 font-18 pb-10">Header Background</h4>
                        <div className="sidebar-btn-group pb-30 mb-10">
                            <a href="javascript:void(0);" className="btn btn-outline-primary header-white active">White</a>
                            <a href="javascript:void(0);" className="btn btn-outline-primary header-dark">Dark</a>
                        </div>
                        <h4 className="weight-600 font-18 pb-10">Sidebar Background</h4>
                        <div className="sidebar-btn-group pb-30 mb-10">
                            <a href="javascript:void(0);" className="btn btn-outline-primary sidebar-light ">White</a>
                            <a href="javascript:void(0);" className="btn btn-outline-primary sidebar-dark active">Dark</a>
                        </div>
                        <h4 className="weight-600 font-18 pb-10">Menu Dropdown Icon</h4>
                        <div className="sidebar-radio-group pb-10 mb-10">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebaricon-1" name="menu-dropdown-icon" className="custom-control-input" defaultValue="icon-style-1" defaultChecked />
                                <label className="custom-control-label" htmlFor="sidebaricon-1"><i className="fa fa-angle-down" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebaricon-2" name="menu-dropdown-icon" className="custom-control-input" defaultValue="icon-style-2" />
                                <label className="custom-control-label" htmlFor="sidebaricon-2"><i className="ion-plus-round" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebaricon-3" name="menu-dropdown-icon" className="custom-control-input" defaultValue="icon-style-3" />
                                <label className="custom-control-label" htmlFor="sidebaricon-3"><i className="fa fa-angle-double-right" /></label>
                            </div>
                        </div>
                        <h4 className="weight-600 font-18 pb-10">Menu List Icon</h4>
                        <div className="sidebar-radio-group pb-30 mb-10">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-1" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-1" defaultChecked />
                                <label className="custom-control-label" htmlFor="sidebariconlist-1"><i className="ion-minus-round" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-2" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-2" />
                                <label className="custom-control-label" htmlFor="sidebariconlist-2"><i className="fa fa-circle-o" aria-hidden="true" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-3" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-3" />
                                <label className="custom-control-label" htmlFor="sidebariconlist-3"><i className="dw dw-check" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-4" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-4" defaultChecked />
                                <label className="custom-control-label" htmlFor="sidebariconlist-4"><i className="icon-copy dw dw-next-2" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-5" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-5" />
                                <label className="custom-control-label" htmlFor="sidebariconlist-5"><i className="dw dw-fast-forward-1" /></label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="sidebariconlist-6" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-6" />
                                <label className="custom-control-label" htmlFor="sidebariconlist-6"><i className="dw dw-next" /></label>
                            </div>
                        </div>
                        <div className="reset-options pt-30 text-center">
                            <button className="btn btn-danger" id="reset-settings">Reset Settings</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Sidebar End */}
        </div>
    );
};

export default Navbar;