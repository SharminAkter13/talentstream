import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  getLatestJobs,
  ASSET_URL,
} from "../services/auth"; 

import HeroSection from "./../portalComponent/HeroSection";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   // Inside Home.jsx useEffect
const loadHomeData = async () => {
  try {
    const [catRes, jobRes, ] = await Promise.all([
      getCategories(), // This returns { categories: [...] }
      getLatestJobs(),
    ]);
    
    // Fix: Access the .categories property from the response
    setCategories(catRes.categories || []); 
    setJobs(jobRes || []);
  } catch (err) {
    console.error("Home data load error", err);
  } finally {
    setLoading(false);
  }
};
    loadHomeData();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div>
      <HeroSection />

  {/* Service Section (Retaining BS3 structure but replacing classes) */}
      <section id="service-main" className="section">
        <div className="container">
          <div className="row">        
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="service-item text-center">
                <div className="icon-wrapper">
                  <i className="ti-search" style={{ fontSize: '2.5rem'}}></i>
                </div>
                <h2>Search Millions of jobs</h2>
                <p>Explore a vast database of career opportunities across every industry. Our intelligent filters help you find the perfect role tailored to your expertise and career goals in seconds.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="service-item text-center">
                <div className="icon-wrapper">
                  <i className="ti-world" style={{ fontSize: '2.5rem'}}></i>
                </div>
                <h2>Location Base Search</h2>
                <p>Find opportunities right in your neighborhood or plan your next big move. Search by city, state, or zip code to discover top-rated companies hiring near you.</p>
              </div>             
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="service-item text-center">
                <div className="icon-wrapper">
                  <i className="ti-stats-up" style={{ fontSize: '2.5rem'}}></i>
                </div>
                <h2>Top Careers</h2>
                <p>Take the next step in your professional journey by browsing trending roles and high-growth industries. Get insights into the most sought-after skills and highest-paying positions available today.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Service Main Section Ends */}

      {/* --- Category Section (DYNAMIC) --- */}
      <section className="category section bg-gray">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Browse Categories</h2>
          </div>
          <div className="row">
            {categories.map((cat, index) => (
            <div className="col-lg-3 col-md-6 f-category" key={cat.id}>
              <Link to={`/browse-jobs?category=${cat.id}`}>
                <div className={`icon bg-color-${(index % 8) + 1}`}>
                  {/* If image_path exists, show image, otherwise show default icon */}
                  {cat.image_path ? (
                    <img 
                      src={`${ASSET_URL}/storage/${cat.image_path}`} 
                      alt={cat.name} 
                      style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                    />
                  ) : (
                    <i className="lni-layers"></i>
                  )}
                </div>
                <h3>{cat.name}</h3>
                {/* Ensure your backend query includes job counts, or default to 0 */}
                <p>({cat.jobs_count || 0} jobs)</p>
              </Link>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* --- Latest Jobs Section (DYNAMIC) --- */}
      <section id="latest-jobs" className="section bg-gray">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Latest Jobs</h2>
          </div>
          <div className="row">
            {jobs.map((job) => (
              <div className="col-lg-6 col-md-12" key={job.id}>
                <div className="jobs-latest">
                  <div className="img-thumb">
                    <img
                      src={
                        job.company_logo
                          ? `${ASSET_URL}/storage/${job.company_logo}`
                          : "/portal-assets/assets/img/features/img1.png"
                      }
                      alt="Logo"
                    />
                  </div>
                  <div className="content">
                    <h3>
                      <Link to={`/job-details/${job.id}`}>{job.title}</Link>
                    </h3>
                    <p className="brand">{job.company_name}</p>
                    <div className="tags">
                      <span>
                        <i className="lni-map-marker"></i> {job.location}
                      </span>
                    </div>
                    <span
                      className={
                        job.type === "Full Time" ? "full-time" : "part-time"
                      }
                    >
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section id="testimonial" className="position-relative">
        <div
          id="testimonialCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {/* Testimonial 1 */}
            <div className="carousel-item active">
              <div className="testimonial-item text-center">
                <div className="img-member mx-auto">
                  <img
                    src="/portal-assets/assets/img/testimonial/img2.jpg"
                    className="img-fluid"
                    alt="John Doe"
                  />
                </div>

                <div className="client-info">
                  <div className="client-name">
                    John Doe <span>CEO, Company</span>
                  </div>
                </div>

                <p>
                  <i className="bi bi-quote quote-icon"></i>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <i className="bi bi-quote quote-icon"></i>
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="carousel-item">
              <div className="testimonial-item text-center">
                <div className="img-member mx-auto">
                  <img
                    src="/portal-assets/assets/img/testimonial/img1.jpg"
                    className="img-fluid"
                    alt="Jane Smith"
                  />
                </div>

                <div className="client-info">
                  <div className="client-name">
                    Jane Smith <span>Manager</span>
                  </div>
                </div>

                <p>
                  <i className="bi bi-quote quote-icon"></i>
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                  <i className="bi bi-quote quote-icon"></i>
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Navigation */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>
      {/* Testimonial Section End */}

      {/* --- Pricing Table Section --- */}
      <div id="pricing" className="section bg-gray">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Pricing Plan</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              ellentesque dignissim quam et <br />
              metus effici turac fringilla lorem facilisis.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="pricing-table border-color-default">
                <div className="pricing-details">
                  <div className="icon">
                    <i className="lni-rocket"></i>
                  </div>
                  <h2>Professional</h2>
                  <ul>
                    <li>Post 1 Job</li>
                    <li>No Featured Job</li>
                    <li>Edit Your Job Listing</li>
                    <li>Manage Application</li>
                    <li>30-day Expired</li>
                  </ul>
                  <div className="price">
                    <span>$</span>0<span>/Month</span>
                  </div>
                </div>
                <div className="plan-button">
                  <a href="#" className="btn btn-border">
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <div className="pricing-table border-color-red active">
                <div className="pricing-details">
                  <div className="icon">
                    <i className="lni-drop"></i>
                  </div>
                  <h2>Advance</h2>
                  <ul>
                    <li>Post 1 Job</li>
                    <li>No Featured Job</li>
                    <li>Edit Your Job Listing</li>
                    <li>Manage Application</li>
                    <li>30-day Expired</li>
                  </ul>
                  <div className="price">
                    <span>$</span>20<span>/Month</span>
                  </div>
                </div>
                <div className="plan-button">
                  <a href="#" className="btn btn-border">
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <div className="pricing-table border-color-green">
                <div className="pricing-details">
                  <div className="icon">
                    <i className="lni-briefcase"></i>
                  </div>
                  <h2>Premium</h2>
                  <ul>
                    <li>Post 1 Job</li>
                    <li>No Featured Job</li>
                    <li>Edit Your Job Listing</li>
                    <li>Manage Application</li>
                    <li>30-day Expired</li>
                  </ul>
                  <div className="price">
                    <span>$</span>40<span>/Month</span>
                  </div>
                </div>
                <div className="plan-button">
                  <a href="#" className="btn btn-border">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Pricing Table Section */}

      {/* Counter Section Start (BS5 grid update) */}
      <section id="counter">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counting">
                <div className="icon">
                  <i className="ti-briefcase" />
                </div>
                <div className="desc">
                  <h2>Jobs</h2>
                  <h1 className="counter">12050</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counting">
                <div className="icon">
                  <i className="ti-user" />
                </div>
                <div className="desc">
                  <h2>Members</h2>
                  <h1 className="counter">10890</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counting">
                <div className="icon">
                  <i className="ti-write" />
                </div>
                <div className="desc">
                  <h2>Resume</h2>
                  <h1 className="counter">700</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counting">
                <div className="icon">
                  <i className="ti-heart" />
                </div>
                <div className="desc">
                  <h2>Company</h2>
                  <h1 className="counter">9050</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Counter Section End */}

      {/* Blog Section (BS5 structure with new icons) */}
      <section id="blog" className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Blog Post</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              ellentesque dignissim quam et <br /> metus effici turac fringilla
              lorem facilisis.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 blog-item">
              <div className="blog-item-wrapper">
                <div className="blog-item-img">
                  <Link to="/single-post">
                    <img
                      src="/portal-assets/assets/img/blog/home-items/img1.jpg"
                      alt="Tips to write an impressive resume online for beginner"
                    />
                  </Link>
                </div>
                <div className="blog-item-text">
                  <h3>
                    <Link to="/single-post">
                      Tips to write an impressive resume online for beginner
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Labore praesentium asperiores ad vitae.
                  </p>
                </div>
                <Link className="readmore" to="/single-post">
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 blog-item">
              <div className="blog-item-wrapper">
                <div className="blog-item-img">
                  <Link to="/single-post">
                    <img
                      src="/portal-assets/assets/img/blog/home-items/img2.jpg"
                      alt="5 cool new features in JobBoard theme"
                    />
                  </Link>
                </div>
                <div className="blog-item-text">
                  <h3>
                    <Link to="/single-post">
                      Let's explore 5 cool new features in JobBoard theme
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Labore praesentium asperiores ad vitae.
                  </p>
                </div>
                <Link className="readmore" to="/single-post">
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 blog-item">
              <div className="blog-item-wrapper">
                <div className="blog-item-img">
                  <Link to="/single-post">
                    <img
                      src="/portal-assets/assets/img/blog/home-items/img3.jpg"
                      alt="How to convince recruiters and get your dream job"
                    />
                  </Link>
                </div>
                <div className="blog-item-text">
                  <h3>
                    <Link to="/single-post">
                      How to convince recruiters and get your dream job
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Labore praesentium asperiores ad vitae.
                  </p>
                </div>
                <Link className="readmore" to="/single-post">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* blog Section End */}

      {/* --- Download Section Start (BS5 Version, replacing Infobox) --- */}
      <section id="download" className="section bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-8">
              <div className="download-wrapper">
                <div>
                  <div className="download-text">
                    <h4>Download Our Best Apps</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      ellentesque dignissim quam et metus effici turac fringilla
                      lorem facilisis, Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit.
                    </p>
                  </div>
                  <div className="app-button">
                    <a href="#" className="btn btn-border">
                      <i className="lni-apple"></i>Download <br />{" "}
                      <span>From App Store</span>
                    </a>
                    <a href="#" className="btn btn-common btn-effect">
                      <i className="lni-android"></i> Download <br />{" "}
                      <span>From Play Store</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-4">
              <div className="download-thumb">
                <img
                  className="img-fluid"
                  src="/portal-assets/assets/img/app.png"
                  alt="Mobile App Screenshot"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* download Section Start */}
    </div>
  );
};

export default Home;
