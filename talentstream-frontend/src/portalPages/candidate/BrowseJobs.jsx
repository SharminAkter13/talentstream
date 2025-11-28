import React from "react";
import PortalNavbar from './../../portalComponent/PortalNavbar';
import PortalFooter from './../../portalComponent/PortalFooter';

const jobs = [
  {
    id: 1,
    title: "We need a web designer",
    type: "Full-Time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quaerat aut veniam molestiae atque dolorum omnis temporibus consequuntur saepe.",
    category: "Art/Design",
    location: "Cupertino, CA, USA",
    salary: "60/Hour",
    img: "assets/img/jobs/img-1.jpg",
  },
  {
    id: 2,
    title: "Front-end developer needed",
    type: "Full-Time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quaerat aut veniam molestiae atque dolorum omnis temporibus consequuntur saepe.",
    category: "Technologies",
    location: "Cupertino, CA, USA",
    salary: "60/Hour",
    img: "assets/img/jobs/img-2.jpg",
  },
  {
    id: 3,
    title: "Software Engineer",
    type: "Part-Time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quaerat aut veniam molestiae atque dolorum omnis temporibus consequuntur saepe.",
    category: "Technologies",
    location: "Cupertino, CA, USA",
    salary: "60/Hour",
    img: "assets/img/jobs/img-3.jpg",
  },
  {
    id: 4,
    title: "Fullstack web developer needed",
    type: "Full-Time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quaerat aut veniam molestiae atque dolorum omnis temporibus consequuntur saepe.",
    category: "Technologies",
    location: "Cupertino, CA, USA",
    salary: "60/Hour",
    img: "assets/img/jobs/img-4.jpg",
  },
];

const sidebarFilters = {
  categories: [
    { name: "Finance", jobs: 4287 },
    { name: "Technologies", jobs: 4256 },
    { name: "Art/Design", jobs: 3245 },
    { name: "Science", jobs: 4256 },
    { name: "Education Training", jobs: 4560 },
    { name: "Logistics", jobs: 3256 },
    { name: "Food Services", jobs: 1256 },
  ],
  status: [
    { name: "Full Time", jobs: 12256 },
    { name: "Part Time", jobs: 6510 },
    { name: "Freelancer", jobs: 1171 },
    { name: "Internship", jobs: 876 },
  ],
  locations: [
    { name: "New York", jobs: 4197 },
    { name: "San Francisco", jobs: 2256 },
    { name: "San Diego", jobs: 3278 },
    { name: "Los Angeles", jobs: 5294 },
    { name: "Chicago", jobs: 1746 },
    { name: "Houston", jobs: 871 },
    { name: "New Orleans", jobs: 2163 },
  ],
};

const BrowseJobs = () => {
  return (
    <>
      <PortalNavbar />

      <section className="job-browse section">
        <div className="container">
          <div className="row">
            {/* Job Listings */}
            <div className="col-md-9 col-sm-8">
              {jobs.map((job) => (
                <div key={job.id} className="job-list">
                  <div className="thumb">
                    <a href="/job-details">
                      <img src={job.img} alt={job.title} />
                    </a>
                  </div>
                  <div className="job-list-content">
                    <h4>
                      <a href="/job-details">{job.title}</a>
                      <span className={job.type === "Full-Time" ? "full-time" : "part-time"}>
                        {job.type}
                      </span>
                    </h4>
                    <p>{job.description}</p>
                    <div className="job-tag">
                      <div className="pull-left">
                        <div className="meta-tag">
                          <span>
                            <a href="/browse-categories">
                              <i className="ti-desktop"></i>
                              {job.category}
                            </a>
                          </span>
                          <span>
                            <i className="ti-location-pin"></i>
                            {job.location}
                          </span>
                          <span>
                            <i className="ti-time"></i>
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <div className="pull-right">
                        <div className="icon">
                          <i className="ti-heart"></i>
                        </div>
                        <div className="btn btn-common btn-rm">Apply Job</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <ul className="pagination">
                <li className="active">
                  <a href="#" className="btn btn-common">
                    <i className="ti-angle-left"></i> Prev
                  </a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li className="active">
                  <a href="#" className="btn btn-common">
                    Next <i className="ti-angle-right"></i>
                  </a>
                </li>
              </ul>
            </div>

            {/* Sidebar Filters */}
            <div className="col-md-3 col-sm-4">
              <aside>
                <div className="sidebar">
                  {/* Categories */}
                  <div className="inner-box">
                    <h3>Categories</h3>
                    <ul className="cat-list">
                      {sidebarFilters.categories.map((cat, idx) => (
                        <li key={idx}>
                          <a href="#">{cat.name} <span className="num-posts">{cat.jobs} Jobs</span></a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Job Status */}
                  <div className="inner-box">
                    <h3>Job Status</h3>
                    <ul className="cat-list">
                      {sidebarFilters.status.map((status, idx) => (
                        <li key={idx}>
                          <a href="#">{status.name} <span className="num-posts">{status.jobs} Jobs</span></a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Locations */}
                  <div className="inner-box">
                    <h3>Locations</h3>
                    <ul className="cat-list">
                      {sidebarFilters.locations.map((loc, idx) => (
                        <li key={idx}>
                          <a href="#">{loc.name} <span className="num-posts">{loc.jobs} Jobs</span></a>
                        </li>
                      ))}
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

export default BrowseJobs;
