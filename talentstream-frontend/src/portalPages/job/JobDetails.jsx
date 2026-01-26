import React from "react";
import PortalFooter from './../../portalComponent/PortalFooter';
import PortalNavbar from './../../portalComponent/PortalNavbar';

const JobDetails = () => {
  const relatedJobs = [
    {
      title: "We need a web designer",
      type: "Full-Time",
      img: "assets/img/jobs/img-1.jpg",
      category: "Art/Design",
      location: "Cupertino, CA, USA",
      rate: "60/Hour",
    },
    {
      title: "Front-end developer needed",
      type: "Full-Time",
      img: "assets/img/jobs/img-2.jpg",
      category: "Technologies",
      location: "Cupertino, CA, USA",
      rate: "60/Hour",
    },
    {
      title: "Software Engineer",
      type: "Part-Time",
      img: "assets/img/jobs/img-3.jpg",
      category: "Technologies",
      location: "Cupertino, CA, USA",
      rate: "60/Hour",
    },
  ];

  return (
    <>
      <PortalNavbar />

      {/* Page Header */}
      <div
        className="page-header p-5 m-5"
        style={{ background: "url(assets/img/banner1.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumb-wrapper">
                <h2 className="product-title">Job Details</h2>
                <ol className="breadcrumb">
                  <li>
                    <a href="#">
                      <i className="ti-home"></i> Home
                    </a>
                  </li>
                  <li className="current">Job Details</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Detail Section */}
      <section className="job-detail section">
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="content-area">
                <div className="header-detail d-flex justify-content-between align-items-start">
                  <div className="header-content">
                    <h3>Front-end developer</h3>
                    <p>
                      <span>Date Posted: Feb 20, 2018</span>
                    </p>
                    <p>
                      Monthly Salary: <strong className="price">$7000 - $7500</strong>
                    </p>
                  </div>
                  <div className="detail-company text-right">
                    <div className="img-thum">
                      <img
                        className="img-responsive"
                        src="assets/img/jobs/recent-job-detail.jpg"
                        alt="Company"
                      />
                    </div>
                    <div className="name">
                      <h4>LemonKids LLC</h4>
                      <h5>New York, NY</h5>
                      <p>8 Current jobs openings</p>
                    </div>
                  </div>
                </div>

                <div className="meta mb-3">
                  <span className="btn btn-border btn-sm">
                    <i className="ti-email"></i> Email
                  </span>
                  <span className="btn btn-border btn-sm">
                    <i className="ti-info-alt"></i> Job Alert
                  </span>
                  <span className="btn btn-border btn-sm">
                    <i className="ti-save"></i> Save This Job
                  </span>
                  <span className="btn btn-border btn-sm">
                    <i className="ti-alert"></i> Report Abuse
                  </span>
                </div>

                <div className="box">
                  <h4>Job Description</h4>
                  <p>
                    LemonKids LLC. In marketing communications, we dream it and create it. All
                    of the company’s promotional and communication needs are completed in-house
                    by these “creatives” in an advertising agency-based set-up...
                  </p>

                  <h4>Qualification</h4>
                  <ul>
                    <li>Demonstrated strong verbal, written, and interpersonal communication skills</li>
                    <li>Team-oriented, positive attitude, work well with others</li>
                    <li>Ability to prioritize and multi-task in a fast-paced environment</li>
                  </ul>

                  <h4>Key responsibilities also include</h4>
                  <ul>
                    <li>Provide technical health advice to Head of Country Programmes</li>
                    <li>Technical strategy, design, and sector-specific monitoring</li>
                    <li>Travel to field programmes and review proposals/reports</li>
                  </ul>

                  <h4>Requirements</h4>
                  <ul>
                    <li>Minimum 3 years experience with equipment operation (bulldozers, loaders, etc.)</li>
                    <li>High School Diploma preferred</li>
                  </ul>

                  <h4>Benefits</h4>
                  <ul>
                    <li>Minimum 3 years experience running equipment</li>
                    <li>High School Diploma preferred</li>
                  </ul>

                  <a href="#" className="btn btn-common">
                    Apply for this Job Now
                  </a>
                </div>

                {/* Related Jobs */}
                <h2 className="medium-title">Related Jobs</h2>
                <div className="job-post-wrapper">
                  {relatedJobs.map((job, index) => (
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
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
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-4 col-sm-12 col-xs-12">
              <aside>
                <div className="sidebar">
                  <div className="box">
                    <h2 className="small-title">Job Details</h2>
                    <ul className="detail-list">
                      <li>Job Id: <span className="type-posts">Jb1246789</span></li>
                      <li>Location: <span className="type-posts">New York, NY</span></li>
                      <li>Company: <span className="type-posts">LemonKids LLC</span></li>
                      <li>Type: <span className="type-posts">Private</span></li>
                      <li>Employment Status: <span className="type-posts">Permanent</span></li>
                      <li>Employment Type: <span className="type-posts">Manager</span></li>
                      <li>Positions: <span className="type-posts">5</span></li>
                      <li>Career Level: <span className="type-posts">Experience</span></li>
                      <li>Experience: <span className="type-posts">3 Years</span></li>
                      <li>Gender: <span className="type-posts">Male</span></li>
                      <li>Nationality: <span className="type-posts">United States</span></li>
                      <li>Degree: <span className="type-posts">Masters</span></li>
                    </ul>
                  </div>

                  <div className="box">
                    <h2 className="small-title">Featured Jobs</h2>
                    <div className="thumb">
                      <a href="#"><img src="assets/img/jobs/features-img-1.jpg" alt="img" /></a>
                    </div>
                    <div className="text-box">
                      <h4><a href="#">Web Development</a></h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                      <strong className="price">$4000 - $5000</strong>
                      <a href="#" className="btn btn-common btn-sm">Apply for this Job</a>
                    </div>
                  </div>

                  <div className="sidebar-jobs box">
                    <h2 className="small-title">Jobs Gallery</h2>
                    <ul>
                      <li>General Compliance Officer - Arlington, VA</li>
                      <li>Medical Transcription - San Francisco, CA</li>
                      <li>Support Coordinator - Moorgate, London</li>
                      <li>General Compliance Officer - Arlington, VA</li>
                      <li>Medical Transcription - San Francisco, CA</li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <PortalFooter />
    </>
  );
};

export default JobDetails;
