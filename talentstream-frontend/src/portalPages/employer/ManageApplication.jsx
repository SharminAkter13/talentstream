import React from "react";
import PortalFooter from './../../portalComponent/PortalFooter';

const applicationsData = [
  {
    title: "Web Designer Meeded",
    company: "Quick Studio",
    type: "Full-Time",
    date: "Nov 14th, 2017",
    status: "Rejected",
    img: "assets/img/jobs/img-1.jpg",
  },
  {
    title: "Front-end developer needed",
    company: "Quick Studio",
    type: "Full-Time",
    date: "Nov 14th, 2017",
    status: "Processed",
    img: "assets/img/jobs/img-1.jpg",
  },
  {
    title: "We're looking for an Art Director",
    company: "Quick Studio",
    type: "Part-Time",
    date: "Nov 14th, 2017",
    status: "Rejected",
    img: "assets/img/jobs/img-1.jpg",
  },
  {
    title: "Web designer needed",
    company: "Quick Studio",
    type: "Full-Time",
    date: "Nov 14th, 2017",
    status: "Approved",
    img: "assets/img/jobs/img-1.jpg",
  },
  {
    title: "Looking for a Project Leader",
    company: "Quick Studio",
    type: "Full-Time",
    date: "Nov 14th, 2017",
    status: "Rejected",
    img: "assets/img/jobs/img-1.jpg",
  },
  {
    title: "We're hiring a fullstack designer",
    company: "Quick Studio",
    type: "Part-Time",
    date: "Nov 14th, 2017",
    status: "Rejected",
    img: "assets/img/jobs/img-1.jpg",
  },
];

const ManageApplication = () => {
  return (
    <>
      <PortalNavbar />

      {/* Page Header */}
      <div
        className="page-header"
        style={{ background: "url(assets/img/banner1.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumb-wrapper">
                <h2 className="product-title">Manage Applications</h2>
                <ol className="breadcrumb">
                  <li>
                    <a href="#">
                      <i className="ti-home"></i> Home
                    </a>
                  </li>
                  <li className="current">Manage Applications</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div id="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="right-sideabr">
                <div className="inner-box">
                  <h4>Manage Account</h4>
                  <ul className="lest item">
                    <li><a href="resume.html">My Resume</a></li>
                    <li><a href="bookmarked.html">Bookmarked Jobs</a></li>
                    <li><a href="notifications.html">Notifications <span className="notinumber">2</span></a></li>
                  </ul>
                  <h4>Manage Job</h4>
                  <ul className="lest item">
                    <li><a className="active" href="manage-applications.html">Manage Applications</a></li>
                    <li><a href="job-alerts.html">Job Alerts</a></li>
                  </ul>
                  <ul className="lest">
                    <li><a href="change-password.html">Change Password</a></li>
                    <li><a href="index.html">Sign Out</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Applications List */}
            <div className="col-md-8 col-sm-8 col-xs-12">
              <div className="job-alerts-item">
                <h3 className="alerts-title">Manage Applications</h3>
                {applicationsData.map((app, index) => (
                  <div className="applications-content" key={index}>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="thums">
                          <img src={app.img} alt={app.title} />
                        </div>
                        <h3>{app.title}</h3>
                        <span>{app.company}</span>
                      </div>
                      <div className="col-md-3">
                        <p><span className={app.type === "Full-Time" ? "full-time" : "part-time"}>{app.type}</span></p>
                      </div>
                      <div className="col-md-2">
                        <p>{app.date}</p>
                      </div>
                      <div className="col-md-2">
                        <p>{app.status}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <br />
                <ul className="pagination">
                  <li className="active">
                    <a href="#" className="btn btn-common">
                      <i className="ti-angle-left"></i> prev
                    </a>
                  </li>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <li key={page}><a href="#">{page}</a></li>
                  ))}
                  <li className="active">
                    <a href="#" className="btn btn-common">
                      Next <i className="ti-angle-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PortalFooter/>
    </>
  );
};

export default ManageApplication;
