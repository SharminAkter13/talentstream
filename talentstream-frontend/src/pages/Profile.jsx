import React from "react";
import Navbar from './../component/Navbar';
import Sidebar from './../component/Sidebar';
import Footer from './../component/Footer';

function Profile() {
  return (
            <div>
            {/* Navbar */}
            <Navbar/>
            {/* Sidebar */}
            <Sidebar/>
  <div className="main-container">
    <div className="pd-ltr-20 xs-pd-20-10">
      <div className="min-height-200px">
        <div className="page-header">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="title">
                <h4>blank</h4>
              </div>
              <nav aria-label="breadcrumb" role="navigation">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">blank</li>
                </ol>
              </nav>
            </div>
            
          </div>
        </div>
        <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">

    <div className="main-container">
      <div className="pd-ltr-20 xs-pd-20-10">
        <div className="min-height-200px">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="title">
                  <h4>Profile</h4>
                </div>
                <nav aria-label="breadcrumb" role="navigation">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                    >
                      Profile
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Left Section */}
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-30">
              <div className="pd-20 card-box height-100-p">
                <div className="profile-photo">
                  <a
                    href="#modal"
                    data-toggle="modal"
                    data-target="#modal"
                    className="edit-avatar"
                  >
                    <i className="fa fa-pencil"></i>
                  </a>
                  <img
                    src="vendors/images/photo1.jpg"
                    alt="avatar"
                    className="avatar-photo"
                  />
                  {/* Modal */}
                  <div
                    className="modal fade"
                    id="modal"
                    tabIndex="-1"
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-body pd-5">
                          <div className="img-container">
                            <img
                              id="image"
                              src="vendors/images/photo2.jpg"
                              alt="Preview"
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <input
                            type="submit"
                            value="Update"
                            className="btn btn-primary"
                          />
                          <button
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h5 className="text-center h5 mb-0">Ross C. Lopez</h5>
                <p className="text-center text-muted font-14">
                  Lorem ipsum dolor sit amet
                </p>

                {/* Contact Info */}
                <div className="profile-info">
                  <h5 className="mb-20 h5 text-blue">
                    Contact Information
                  </h5>
                  <ul>
                    <li>
                      <span>Email Address:</span> FerdinandMChilds@test.com
                    </li>
                    <li>
                      <span>Phone Number:</span> 619-229-0054
                    </li>
                    <li>
                      <span>Country:</span> America
                    </li>
                    <li>
                      <span>Address:</span> 1807 Holden Street <br /> San
                      Diego, CA 92115
                    </li>
                  </ul>
                </div>

                {/* Social Links */}
                <div className="profile-social">
                  <h5 className="mb-20 h5 text-blue">Social Links</h5>
                  <ul className="clearfix">
                    <li>
                      <a
                        href="#"
                        className="btn"
                        data-bgcolor="#3b5998"
                        data-color="#ffffff"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="btn"
                        data-bgcolor="#1da1f2"
                        data-color="#ffffff"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="btn"
                        data-bgcolor="#007bb5"
                        data-color="#ffffff"
                      >
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Skills */}
                <div className="profile-skills">
                  <h5 className="mb-20 h5 text-blue">Key Skills</h5>

                  <h6 className="mb-5 font-14">HTML</h6>
                  <div className="progress mb-20" style={{ height: "6px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "90%" }}
                    ></div>
                  </div>

                  <h6 className="mb-5 font-14">CSS</h6>
                  <div className="progress mb-20" style={{ height: "6px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section (Tabs) */}
            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 mb-30">
              <div className="card-box height-100-p overflow-hidden">
                <div className="profile-tab height-100-p">
                  <div className="tab height-100-p">
                    <ul className="nav nav-tabs customtab" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#timeline"
                          role="tab"
                        >
                          Timeline
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#tasks"
                          role="tab"
                        >
                          Tasks
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#setting"
                          role="tab"
                        >
                          Settings
                        </a>
                      </li>
                    </ul>

                    {/* Tab Contents */}
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="timeline"
                        role="tabpanel"
                      >
                        <div className="pd-20">
                          <div className="profile-timeline">
                            <div className="timeline-month">
                              <h5>August, 2020</h5>
                            </div>
                            <div className="profile-timeline-list">
                              <ul>
                                <li>
                                  <div className="date">12 Aug</div>
                                  <div className="task-name">
                                    <i className="ion-android-alarm-clock"></i>{" "}
                                    Task Added
                                  </div>
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit.
                                  </p>
                                  <div className="task-time">09:30 am</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tasks tab */}
                      <div
                        className="tab-pane fade"
                        id="tasks"
                        role="tabpanel"
                      >
                        <div className="pd-20">
                          <p>Tasks go here...</p>
                        </div>
                      </div>

                      {/* Settings tab */}
                      <div
                        className="tab-pane fade"
                        id="setting"
                        role="tabpanel"
                      >
                        <div className="pd-20">
                          <form>
                            <div className="form-group">
                              <label htmlFor="fullName">Full Name</label>
                              <input
                                type="text"
                                id="fullName"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                id="email"
                                className="form-control"
                              />
                            </div>
                            <button className="btn btn-primary">
                              Update
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* Tab Contents End */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
            </div>
          </div>
        </div>
        </div>
        <Footer/>
        </div>
    
  );
}

export default Profile;
