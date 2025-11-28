import React from "react";
import PortalFooter from './../../portalComponent/PortalFooter';
import PortalNavbar from './../../portalComponent/PortalNavbar';

const JobAlerts = () => {
  const alerts = [
    {
      title: "Web Designer",
      keywords: "Web Designer",
      type: "Full-Time",
      location: "Manhattan, NYC",
      frequency: "Daily",
    },
    {
      title: "UI/UX Designer",
      keywords: "UI/UX Designer",
      type: "Full-Time",
      location: "Manhattan, NYC",
      frequency: "Daily",
    },
    {
      title: "Developer",
      keywords: "Developer",
      type: "Part-Time",
      location: "Manhattan, NYC",
      frequency: "Daily",
    },
    {
      title: "Senior UX Designer",
      keywords: "Senior UX Designer",
      type: "Full-Time",
      location: "Manhattan, NYC",
      frequency: "Daily",
    },
  ];

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
                <h2 className="product-title">Job Alerts</h2>
                <ol className="breadcrumb">
                  <li>
                    <a href="#">
                      <i className="ti-home"></i> Home
                    </a>
                  </li>
                  <li className="current">Job Alerts</li>
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
              <div className="right-sidebar">
                <div className="inner-box">
                  <h4>Manage Account</h4>
                  <ul className="list-item">
                    <li><a href="resume.html">My Resume</a></li>
                    <li><a href="bookmarked.html">Bookmarked Jobs</a></li>
                    <li>
                      <a href="notifications.html">
                        Notifications <span className="notinumber">2</span>
                      </a>
                    </li>
                  </ul>
                  <h4>Manage Job</h4>
                  <ul className="list-item">
                    <li><a href="manage-applications.html">Manage Applications</a></li>
                    <li><a className="active" href="job-alerts.html">Job Alerts</a></li>
                  </ul>
                  <ul className="list-item">
                    <li><a href="change-password.html">Change Password</a></li>
                    <li><a href="index.html">Sign Out</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Job Alerts */}
            <div className="col-md-8 col-sm-8 col-xs-12">
              <div className="job-alerts-item">
                <h3 className="alerts-title">Job Alerts</h3>

                {/* Table Header */}
                <div className="alerts-list">
                  <div className="row font-weight-bold">
                    <div className="col-md-3">Name</div>
                    <div className="col-md-3">Keywords</div>
                    <div className="col-md-3">Contract Type</div>
                    <div className="col-md-3">Frequency</div>
                  </div>
                </div>

                {/* Alerts Content */}
                {alerts.map((alert, index) => (
                  <div className="alerts-content" key={index}>
                    <div className="row">
                      <div className="col-md-3">
                        <h3>{alert.title}</h3>
                        <span className="location">
                          <i className="ti-location-pin"></i> {alert.location}
                        </span>
                      </div>
                      <div className="col-md-3">
                        <p>{alert.keywords}</p>
                      </div>
                      <div className="col-md-3">
                        <p>
                          <span className={alert.type === "Full-Time" ? "full-time" : "part-time"}>
                            {alert.type}
                          </span>
                        </p>
                      </div>
                      <div className="col-md-3">
                        <p>{alert.frequency}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <br />
                <ul className="pagination">
                  <li className="active">
                    <a href="#" className="btn btn-common">
                      <i className="ti-angle-left"></i> Prev
                    </a>
                  </li>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num}>
                      <a href="#">{num}</a>
                    </li>
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

      <PortalFooter />
    </>

  );
};

export default JobAlerts;
