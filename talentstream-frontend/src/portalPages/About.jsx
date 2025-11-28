import React from "react";
import PortalFooter from './../portalComponent/PortalFooter';
import PortalNavbar from './../portalComponent/PortalNavbar';

const About = () => {
  return (
    <>
      <PortalNavbar />

      {/* About Section */}
      <div className="about section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <img src="assets/img/about/img1.jpg" alt="About" className="img-fluid" />
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="about-content">
                <h2 className="medium-title">About Job Career</h2>
                <p className="desc">
                  Consecteture adipiscing elit sed diam nonummy nibh euismod tincidunt laoreet dolore magna aliquam erat volutpat utwisi veniam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est modi, saepe hic esse maxime quasi, sapiente ex debitis quis dolorum unde, neque quibusdam eveniet nobis enim porro repudiandae nesciunt quidem.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni delectus soluta adipisci beatae ullam quisquam, quia recusandae rem assumenda, praesentium porro sequi eaque doloremque tenetur incidunt officiis explicabo optio perferendis.
                </p>
                <a href="#" className="btn btn-common">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Section */}
      <section id="service-main" className="section">
        <div className="container">
          <h1 className="section-title text-center">
            Smart & Easy Place for Job Seekers, Posters & Recruiters
          </h1>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="service-item text-center">
                <div className="icon-wrapper">
                  <i className="ti-search"></i>
                </div>
                <h2>Search Millions of Jobs</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eligendi consequuntur assumenda perferendis natus dolorem facere mollitia eius.</p>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="service-item text-center">
                <div className="icon-wrapper">
                  <i className="ti-world"></i>
                </div>
                <h2>Location-Based Search</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eligendi consequuntur assumenda perferendis natus dolorem facere mollitia eius.</p>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="service-item text-center">
                <div className="icon-wrapper">
                  <i className="ti-stats-up"></i>
                </div>
                <h2>Top Careers</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eligendi consequuntur assumenda perferendis natus dolorem facere mollitia eius.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonial" className="section">
        <div className="container">
          <div className="row owl-carousel owl-theme">
            {[1, 2, 3].map((i) => (
              <div className="item text-center" key={i}>
                <img className="img-member" src={`assets/img/testimonial/img${i}.jpg`} alt={`Client ${i}`} />
                <div className="client-info">
                  <h2 className="client-name">"John Smith <span>(Project Manager)</span></h2>
                </div>
                <p>
                  <i className="fa fa-quote-left quote-left"></i>
                  The team that was assigned to our project were extremely professional throughout the project and assured that the owner expectations were met and often exceeded.
                  <i className="fa fa-quote-right quote-right"></i>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients section">
        <div className="container">
          <h2 className="section-title">Clients & Partners</h2>
          <div className="row" id="clients-scroller">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div className="items" key={i}>
                <img src={`assets/img/clients/img${i}.png`} alt={`Client ${i}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortalFooter/>
    </>
  );
};

export default About;
