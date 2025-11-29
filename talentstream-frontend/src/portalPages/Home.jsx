import React from "react";
// Assuming you have 'Link' imported from react-router-dom if you use it in other components
import { Link } from 'react-router-dom'; 

import PortalNavbar from "../portalComponent/PortalNavbar";
import PortalFooter from "../portalComponent/PortalFooter";

const Home = () => {
  
  return (
    <div>
      <PortalNavbar />
      
      {/* Service Section (Retaining BS3 structure but replacing classes) */}
      <section id="service-main" className="section">
        <div className="container">
          <div className="row">        
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="service-item">
                <div className="icon-wrapper">
                  <i className="ti-search"></i>
                </div>
                <h2>Search Millions of jobs</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eligendi consequuntur assumenda perferendis natus dolorem facere mollitia eius.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="service-item">
                <div className="icon-wrapper">
                  <i className="ti-world"></i>
                </div>
                <h2>Location Base Search</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eligendi consequuntur assumenda perferendis natus dolorem facere mollitia eius.</p>
              </div>             
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="service-item">
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
      {/* Service Main Section Ends */}

      {/* --- Category Section Start (BS5 Version) --- */}
      <section className="category section bg-gray">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Browse Categories</h2>
            <p>Most popular categories of portal, sorted by popularity</p>
          </div>
          <div className="row">
            {/* Note: I'm using the 8 categories from your BS5 content */}
            <div className="col-lg-3 col-md-6 f-category">
              <Link to="/browse-jobs">
                <div className="icon bg-color-1"><i className="lni-home"></i></div>
                <h3>Finance</h3>
                <p>(4286 jobs)</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 f-category">
              <Link to="/browse-jobs">
                <div className="icon bg-color-2"><i className="lni-world"></i></div>
                <h3>Sale/Marketing</h3>
                <p>(2000 jobs)</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 f-category">
              <Link to="/browse-jobs">
                <div className="icon bg-color-3"><i className="lni-book"></i></div>
                <h3>Education/Training</h3>
                <p>(1450 jobs)</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 f-category border-right-0">
              <Link to="/browse-jobs">
                <div className="icon bg-color-4"><i className="lni-display"></i></div>
                <h3>Technologies</h3>
                <p>(5100 jobs)</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 f-category border-bottom-0">
              <Link to="/browse-jobs">
                <div className="icon bg-color-5"><i className="lni-brush"></i></div>
                <h3>Art/Design</h3>
                <p>(5079 jobs)</p>
              </Link>
            </div>                      
            <div className="col-lg-3 col-md-6 f-category border-bottom-0">
              <Link to="/browse-jobs">
                <div className="icon bg-color-6"><i className="lni-heart"></i></div>
                <h3>Healthcare</h3>
                <p>(3235 jobs)</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 f-category border-bottom-0">
              <Link to="/browse-jobs">
                <div className="icon bg-color-7"><i className="lni-funnel"></i></div>
                <h3>Science</h3>
                <p>(1800 jobs)</p>
              </Link>
            </div>                      
            <div className="col-lg-3 col-md-6 f-category border-right-0 border-bottom-0">
              <Link to="/browse-jobs">
                <div className="icon bg-color-8"><i className="lni-cup"></i></div>
                <h3>Food Services</h3>
                <p>(4286 jobs)</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Category Section End */}

      {/* --- Browse jobs Section Start (BS5 Version) --- */}
      <div id="browse-jobs" className="section bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="text-wrapper">
                <div>
                  <h3>7,000+ Browse Jobs</h3>
                  <p>Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide. The right job is out there.</p>
                  <Link className="btn btn-common" to="/search-jobs">Search jobs</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="img-thumb">
                <img className="img-fluid" src="assets/img/search.png" alt="Job Search Interface" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Browse jobs Section End */}

      {/* --- How It Work Section Start (BS5 Version) --- */}
      <section className="how-it-works section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">How It Works?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ellentesque dignissim quam et <br /> metus effici turac fringilla lorem facilisis.</p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="work-process">
                <span className="process-icon"><i className="lni-user"></i></span>
                <h4>Create an Account</h4>
                <p>Post a job to tell us about your project. We'll quickly match you with the right freelancers find place best.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="work-process step-2">
                <span className="process-icon"><i className="lni-search"></i></span>
                <h4>Search Jobs</h4>
                <p>Post a job to tell us about your project. We'll quickly match you with the right freelancers find place best.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="work-process step-3">
                <span className="process-icon"><i className="lni-cup"></i></span>
                <h4>Apply</h4>
                <p>Post a job to tell us about your project. We'll quickly match you with the right freelancers find place best.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Work Section End */}

      {/* --- Latest Section Start (BS5 Version, replacing original Find Job Section) --- */}
      <section id="latest-jobs" className="section bg-gray">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Latest Jobs</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ellentesque dignissim quam et <br /> metus effici turac fringilla lorem facilisis.</p>
          </div>
          <div className="row">
            {/* Job Item 1 */}
            <div className="col-lg-6 col-md-12">
              <div className="jobs-latest">
                <div className="img-thumb">
                  <img src="assets/img/features/img-1.jpg" alt="Company Logo" />
                </div>
                <div className="content">
                  <h3><Link to="/job-details">UX Designer</Link></h3>
                  <p className="brand">MagNews</p>
                  <div className="tags">
                    <span><i className="lni-map-marker"></i> New York</span>
                    <span><i className="lni-user"></i>  John Smith</span>
                  </div>
                  <div className="tag mb-3"><i className="lni-tag"></i> #Html #Css #PHP</div>
                  <span className="full-time">Full Time</span>
                </div>
              </div>
            </div>
            {/* Job Item 2 */}
            <div className="col-lg-6 col-md-12">
              <div className="jobs-latest">
                <div className="img-thumb">
                  <img src="assets/img/features/img-2.jpg" alt="Company Logo" />
                </div>
                <div className="content">
                  <h3><Link to="/job-details">UI Designer</Link></h3>
                  <p className="brand">Hunter Inc.</p>
                  <div className="tags">
                    <span><i className="lni-map-marker"></i> New York</span>
                    <span><i className="lni-user"></i>  John Smith</span>
                  </div>
                  <div className="tag mb-3"><i className="lni-tag"></i> #Html #Css #PHP</div>
                  <span className="part-time">Part Time</span>
                </div>
              </div>
            </div>
            {/* Job Item 3 */}
            <div className="col-lg-6 col-md-12">
              <div className="jobs-latest">
                <div className="img-thumb">
                  <img src="assets/img/features/img-3.jpg" alt="Company Logo" />
                </div>
                <div className="content">
                  <h3><Link to="/job-details">Web Developer</Link></h3>
                  <p className="brand">MagNews</p>
                  <div className="tags">
                    <span><i className="lni-map-marker"></i> New York</span>
                    <span><i className="lni-user"></i>  John Smith</span>
                  </div>
                  <div className="tag mb-3"><i className="lni-tag"></i> #Html #Css #PHP</div>
                  <span className="full-time">Full Time</span>
                </div>
              </div>
            </div>
            {/* Job Item 4 */}
            <div className="col-lg-6 col-md-12">
              <div className="jobs-latest">
                <div className="img-thumb">
                  <img src="assets/img/features/img-4.jpg" alt="Company Logo" />
                </div>
                <div className="content">
                  <h3><Link to="/job-details">UX Designer</Link></h3>
                  <p className="brand">AmazeSoft</p>
                  <div className="tags">
                    <span><i className="lni-map-marker"></i> New York</span>
                    <span><i className="lni-user"></i>  John Smith</span>
                  </div>
                  <div className="tag mb-3"><i className="lni-tag"></i> #Html #Css #PHP</div>
                  <span className="full-time">Full Time</span>
                </div>
              </div>
            </div>
            {/* Job Item 5 */}
            <div className="col-lg-6 col-md-12">
              <div className="jobs-latest">
                <div className="img-thumb">
                  <img src="assets/img/features/img-2.jpg" alt="Company Logo" />
                </div>
                <div className="content">
                  <h3><Link to="/job-details">Digital Marketer</Link></h3>
                  <p className="brand">Bingo</p>
                  <div className="tags">
                    <span><i className="lni-map-marker"></i> New York</span>
                    <span><i className="lni-user"></i>  John Smith</span>
                  </div>
                  <div className="tag mb-3"><i className="lni-tag"></i> #Html #Css #PHP</div>
                  <span className="part-time">Part Time</span>
                </div>
              </div>
            </div>
            {/* Job Item 6 */}
            <div className="col-lg-6 col-md-12">
              <div className="jobs-latest">
                <div className="img-thumb">
                  <img src="assets/img/features/img-1.jpg" alt="Company Logo" />
                </div>
                <div className="content">
                  <h3><Link to="/job-details">Web Developer</Link></h3>
                  <p className="brand">MagNews</p>
                  <div className="tags">
                    <span><i className="lni-map-marker"></i> New York</span>
                    <span><i className="lni-user"></i>  John Smith</span>
                  </div>
                  <div className="tag mb-3"><i className="lni-tag"></i> #Html #Css #PHP</div>
                  <span className="full-time">Full Time</span>
                </div>
              </div>
            </div>
            <div className="col-12 text-center mt-4">
              <Link to="/job-page" className="btn btn-common">Browse All Jobs</Link>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Section End */}

      {/* --- Listings Section (Lite Version Warning) --- */}
      <section id="job-listings" className="section">
        <div className="container text-center wow fadeInUp">
          <h1 className="section-title">You Using Free Lite Version :(</h1>
          <h6>Purchase Full Version to Get All Pages, Features, Docs and Support!</h6>
          <br/>
          <a href="https://rebrand.ly/jobx-gg" target="_blank" rel="nofollow" className="btn btn-common btn-lg">
            <span className="lni-pointer-right"></span> Purchase Now!
          </a>
        </div>
      </section>
      {/* Listings Section End */}

      {/* --- Testimonial Section Start (BS5 Version) --- */}
      <section id="testimonial" className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Clients Review</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ellentesque dignissim quam et <br /> metus effici turac fringilla lorem facilisis.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div id="testimonials" className="touch-slider owl-carousel">
                {/* Testimonial Item 1 */}
                <div className="item">
                  <div className="testimonial-item">
                    <div className="author">
                      <div className="img-thumb">
                        <img src="assets/img/testimonial/img1.png" alt="Jessica" />
                      </div>
                    </div>
                    <div className="content-inner">
                      <p className="description">Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui.</p>
                      <div className="author-info">
                        <h2><a href="#">Jessica</a></h2>
                        <span>Senior Accountant</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Testimonial Item 2 */}
                <div className="item">
                  <div className="testimonial-item">
                    <div className="author">
                      <div className="img-thumb">
                        <img src="assets/img/testimonial/img2.png" alt="John Doe" />
                      </div>
                    </div>
                    <div className="content-inner">
                      <p className="description">Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui.</p>
                      <div className="author-info">
                        <h2><a href="#">John Doe</a></h2>
                        <span>Project Menager</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Testimonial Item 3 */}
                <div className="item">
                  <div className="testimonial-item">
                    <div className="author">
                      <div className="img-thumb">
                        <img src="assets/img/testimonial/img3.png" alt="Helen" />
                      </div>
                    </div>
                    <div className="content-inner">
                      <p className="description">Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui Morbi quam enim, cursus non erat pretium veh icula finibus ex stibulum venenatis viverra dui.</p>
                      <div className="author-info">
                        <h2><a href="#">Helen</a></h2>
                        <span>Engineer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonial Section End */}

      {/* --- Pricing Table Section --- */}
<div id="pricing" className="section bg-gray">
  <div className="container">
    <div className="section-header text-center">  
      <h2 className="section-title">Pricing Plan</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ellentesque dignissim quam et <br />
        metus effici turac fringilla lorem facilisis.
      </p>      
    </div>

    <div className="row g-4">
      <div className="col-lg-4 col-md-6 col-12">
        <div className="pricing-table border-color-default">
          <div className="pricing-details">
            <div className="icon"><i className="lni-rocket"></i></div>
            <h2>Professional</h2>
            <ul>
              <li>Post 1 Job</li>
              <li>No Featured Job</li>
              <li>Edit Your Job Listing</li>
              <li>Manage Application</li>
              <li>30-day Expired</li>
            </ul>
            <div className="price"><span>$</span>0<span>/Month</span></div>
          </div>
          <div className="plan-button">
            <a href="#" className="btn btn-border">Get Started</a>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-12">
        <div className="pricing-table border-color-red active">
          <div className="pricing-details">
            <div className="icon"><i className="lni-drop"></i></div>
            <h2>Advance</h2>
            <ul>
              <li>Post 1 Job</li>
              <li>No Featured Job</li>
              <li>Edit Your Job Listing</li>
              <li>Manage Application</li>
              <li>30-day Expired</li>
            </ul>
            <div className="price"><span>$</span>20<span>/Month</span></div>
          </div>
          <div className="plan-button">
            <a href="#" className="btn btn-border">Get Started</a>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-12">
        <div className="pricing-table border-color-green">
          <div className="pricing-details">
            <div className="icon"><i className="lni-briefcase"></i></div>
            <h2>Premium</h2>
            <ul>
              <li>Post 1 Job</li>
              <li>No Featured Job</li>
              <li>Edit Your Job Listing</li>
              <li>Manage Application</li>
              <li>30-day Expired</li>
            </ul>
            <div className="price"><span>$</span>40<span>/Month</span></div>
          </div>
          <div className="plan-button">
            <a href="#" className="btn btn-border">Get Started</a>
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
                <div className="icon"><i className="ti-briefcase" /></div>
                <div className="desc">                
                  <h2>Jobs</h2>
                  <h1 className="counter">12050</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counting">
                <div className="icon"><i className="ti-user" /></div>
                <div className="desc">
                  <h2>Members</h2>
                  <h1 className="counter">10890</h1>                
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counting">
                <div className="icon"><i className="ti-write" /></div>
                <div className="desc">
                  <h2>Resume</h2>
                  <h1 className="counter">700</h1>                
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counting">
                <div className="icon"><i className="ti-heart" /></div>
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ellentesque dignissim quam et <br /> metus effici turac fringilla lorem facilisis.</p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 blog-item">
              <div className="blog-item-wrapper">
                <div className="blog-item-img">
                  <Link to="/single-post">
                    <img src="assets/img/blog/img1.jpg" alt="Tips to write an impressive resume online for beginner" />
                  </Link>                
                </div>
                <div className="blog-item-text">
                  <h3><Link to="/single-post">Tips to write an impressive resume online for beginner</Link></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore praesentium asperiores ad vitae.</p>
                </div>
                <Link className="readmore" to="/single-post">Read More</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 blog-item">
              <div className="blog-item-wrapper">
                <div className="blog-item-img">
                  <Link to="/single-post">
                    <img src="assets/img/blog/img2.jpg" alt="5 cool new features in JobBoard theme" />
                  </Link>                
                </div>
                <div className="blog-item-text">
                  <h3><Link to="/single-post">Let's explore 5 cool new features in JobBoard theme</Link></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore praesentium asperiores ad vitae.</p>
                </div>
                <Link className="readmore" to="/single-post">Read More</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 blog-item">
              <div className="blog-item-wrapper">
                <div className="blog-item-img">
                  <Link to="/single-post">
                    <img src="assets/img/blog/img3.jpg" alt="How to convince recruiters and get your dream job" />
                  </Link>                
                </div>
                <div className="blog-item-text">
                  <h3><Link to="/single-post">How to convince recruiters and get your dream job</Link></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore praesentium asperiores ad vitae.</p>
                </div>
                <Link className="readmore" to="/single-post">Read More</Link>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ellentesque dignissim quam et metus effici turac fringilla lorem facilisis, Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                  <div className="app-button">
                    <a href="#" className="btn btn-border"><i className="lni-apple"></i>Download <br /> <span>From App Store</span></a>
                    <a href="#" className="btn btn-common btn-effect"><i className="lni-android"></i> Download <br /> <span>From Play Store</span></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-4">
              <div className="download-thumb">
                <img className="img-fluid" src="assets/img/app.png" alt="Mobile App Screenshot" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* download Section Start */}

      <PortalFooter />
    </div>
  );
};

export default Home;