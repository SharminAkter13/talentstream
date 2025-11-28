import React from "react";
import PortalFooter from './../../portalComponent/PortalFooter';
import PortalNavbar from './../../portalComponent/PortalNavbar';

const jobsData = [
  {
    title: "We need a web designer",
    type: "Full-Time",
    img: "portal-assets/assets/img/jobs/img-1.jpg",
    category: "Art/Design",
    location: "Cupertino, CA, USA",
    rate: "60/Hour",
  },
  {
    title: "Front-end developer needed",
    type: "Full-Time",
    img: "portal-assets/assets/img/jobs/img-2.jpg",
    category: "Technologies",
    location: "Cupertino, CA, USA",
    rate: "60/Hour",
  },
  {
    title: "Software Engineer",
    type: "Part-Time",
    img: "portal-assets/assets/img/jobs/img-3.jpg",
    category: "Technologies",
    location: "Cupertino, CA, USA",
    rate: "60/Hour",
  },
  {
    title: "Fullstack web developer needed",
    type: "Full-Time",
    img: "portal-assets/assets/img/jobs/img-4.jpg",
    category: "Technologies",
    location: "Cupertino, CA, USA",
    rate: "60/Hour",
  },
];

const JobPage = () => {
  return (
    <>
      <PortalNavbar />

      {/* Page Header */}
      <div
        className="page-header"
        style={{ background: "url(portal-assets/assets/img/banner1.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumb-wrapper">
                <h2 className="product-title">Find Job</h2>
                <ol className="breadcrumb">
                  <li>
                    <a href="#">
                      <i className="ti-home"></i> Home
                    </a>
                  </li>
                  <li className="current">Find Job</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Find Job Section */}
      <section className="find-job section">
        <div className="container">
          <h2 className="section-title">Find good a Job</h2>
          <div className="row">
            <div className="col-md-12">
              {jobsData.map((job, index) => (
                <div className="job-list" key={index}>
                  <div className="thumb">
                    <a href="job-details.html">
                      <img src={job.img} alt={job.title} />
                    </a>
                  </div>
                  <div className="job-list-content">
                    <h4>
                      <a href="job-details.html">{job.title}</a>
                      <span className={job.type === "Full-Time" ? "full-time" : "part-time"}>
                        {job.type}
                      </span>
                    </h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Illum quaerat aut veniam molestiae atque dolorum omnis
                      temporibus consequuntur saepe...
                    </p>
                    <div className="job-tag d-flex justify-content-between">
                      <div className="meta-tag">
                        <span>
                          <a href="browse-categories.html">
                            <i className="ti-brush"></i> {job.category}
                          </a>
                        </span>
                        <span><i className="ti-location-pin"></i>{job.location}</span>
                        <span><i className="ti-time"></i>{job.rate}</span>
                      </div>
                      <div className="btn btn-common btn-rm">Apply Job</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-12 d-flex justify-content-between align-items-center mt-3">
              <div className="showing">
                <a href="#">Showing <span>6-10</span> Of 24 Jobs</a>
              </div>
              <ul className="pagination d-flex">
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
      </section>

      <PortalFooter />
    </>
  );
};

export default JobPage;
