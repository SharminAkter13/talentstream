import React from "react";
import PortalNavbar from './../../portalComponent/PortalNavbar';
import PortalFooter from './../../portalComponent/PortalFooter';

const resumes = [
  {
    id: 1,
    name: "John Doe",
    title: "Front-end developer",
    location: "Cupertino, CA, USA",
    rate: "$55 per hour",
    img: "portal-assets/assets/img/jobs/avatar.jpg",
    skills: ["HTML5", "CSS3", "Bootstrap", "Wordpress"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, qui aspernatur accusantium! Molestiae, cum cupiditate nam optio dignissimos magnam velit, perspiciatis amet qui aut nobis, quisquam, laudantium vitae eos ipsam.",
  },
  {
    id: 2,
    name: "Bikesh Soltaniane",
    title: "Java developer",
    location: "Cupertino, CA, USA",
    rate: "$55 per hour",
    img: "portal-assets/assets/img/jobs/avatar-1.jpg",
    skills: ["HTML5", "CSS3", "Bootstrap", "Wordpress"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, qui aspernatur accusantium! Molestiae, cum cupiditate nam optio dignissimos magnam velit, perspiciatis amet qui aut nobis, quisquam, laudantium vitae eos ipsam.",
  },
  {
    id: 3,
    name: "Chris Hernandeziyan",
    title: ".Net developer",
    location: "Cupertino, CA, USA",
    rate: "$55 per hour",
    img: "portal-assets/assets/img/jobs/avatar-2.jpg",
    skills: ["HTML5", "CSS3", "Bootstrap", "Wordpress"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, qui aspernatur accusantium! Molestiae, cum cupiditate nam optio dignissimos magnam velit, perspiciatis amet qui aut nobis, quisquam, laudantium vitae eos ipsam.",
  },
  {
    id: 4,
    name: "Mary Amiri",
    title: "Quality assurance",
    location: "Cupertino, CA, USA",
    rate: "$55 per hour",
    img: "portal-assets/assets/img/jobs/avatar-3.jpg",
    skills: ["HTML5", "CSS3", "Bootstrap", "Wordpress"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, qui aspernatur accusantium! Molestiae, cum cupiditate nam optio dignissimos magnam velit, perspiciatis amet qui aut nobis, quisquam, laudantium vitae eos ipsam.",
  },
  {
    id: 5,
    name: "Sarah Luizgarden",
    title: "UI/UX developer",
    location: "Cupertino, CA, USA",
    rate: "$55 per hour",
    img: "portal-assets/assets/img/jobs/avatar-4.jpg",
    skills: ["HTML5", "CSS3", "Bootstrap", "Wordpress"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, qui aspernatur accusantium! Molestiae, cum cupiditate nam optio dignissimos magnam velit, perspiciatis amet qui aut nobis, quisquam, laudantium vitae eos ipsam.",
  },
];

const BrowseResumes = () => {
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
                <h2 className="product-title">Browse resumes</h2>
                <ol className="breadcrumb">
                  <li>
                    <a href="#">
                      <i className="ti-home"></i> Home
                    </a>
                  </li>
                  <li className="current">Browse resumes</li>
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
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="col-md-6 col-sm-6 col-xs-12"
                style={{ marginBottom: "30px" }}
              >
                <div className="manager-resumes-item">
                  <div className="manager-content">
                    <a href="resume.html">
                      <img
                        className="resume-thumb"
                        src={resume.img}
                        alt={resume.name}
                      />
                    </a>
                    <div className="manager-info">
                      <div className="manager-name">
                        <h4>
                          <a href="#">{resume.name}</a>
                        </h4>
                        <h5>{resume.title}</h5>
                      </div>
                      <div className="manager-meta">
                        <span className="location">
                          <i className="ti-location-pin"></i> {resume.location}
                        </span>
                        <span className="rate">
                          <i className="ti-time"></i> {resume.rate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="item-body">
                    <p>{resume.description}</p>
                    <div className="tag-list">
                      {resume.skills.map((skill, idx) => (
                        <span key={idx}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PortalFooter />
    </>
  );
};

export default BrowseResumes;
