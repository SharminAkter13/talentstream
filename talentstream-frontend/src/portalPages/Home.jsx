import React from "react";
import PortalNavbar from "../portalComponent/PortalNavbar";
import PortalFooter from "../portalComponent/PortalFooter";

const Home = () => {
  return (
    <div>
      <PortalNavbar />
  {/* end intro section */}
  {/* Service  Section */}
  <section id="service-main" className="section">
    {/* Container Starts */}
    <div className="container">
      <div className="row">        
        <div className="col-sm-6 col-md-4">
          <div className="service-item">
            <div className="icon-wrapper">
              <i className="ti-search">
              </i>
            </div>
            <h2>
              Search Miloins of jobs
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eligendi consequuntur assumenda perferendis natus dolorem facere mollitia eius.
            </p>
          </div>
          {/* Service-Block-1 Item Ends */}
        </div>
        <div className="col-sm-6 col-md-4">
          {/* Service-Block-1 Item Starts */}
          <div className="service-item">
            <div className="icon-wrapper">
              <i className="ti-world">
              </i>
            </div>
            <h2>
              Location Base Search
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eligendi consequuntur assumenda perferendis natus dolorem facere mollitia eius.
            </p>
          </div>             
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="service-item">
            <div className="icon-wrapper">
              <i className="ti-stats-up">
              </i>
            </div>
            <h2>
              Top Careers
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eligendi consequuntur assumenda perferendis natus dolorem facere mollitia eius.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Service Main Section Ends */}
  {/* Find Job Section Start */}
  <section className="find-job section">
    <div className="container">
      <h2 className="section-title">Hot Jobs</h2>
      <div className="row">
        <div className="col-md-12">
          <div className="job-list">
            <div className="thumb">
              <a href="job-details.html"><img src="portal-assets/assets/img/jobs/img-1.jpg" alt /></a>
            </div>
            <div className="job-list-content">
              <h4><a href="job-details.html">Need a web designer</a><span className="full-time">Full-Time</span></h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quaerat aut veniam molestiae atque dolorum omnis temporibus consequuntur saepe. Nemo atque consectetur saepe corporis odit in dicta reprehenderit, officiis, praesentium?</p>
              <div className="job-tag">
                <div className="pull-left">
                  <div className="meta-tag">
                    <span><a href="browse-categories.html"><i className="ti-brush" />Art/Design</a></span>
                    <span><i className="ti-location-pin" />Washington, USA</span>
                    <span><i className="ti-time" />60/Hour</span>
                  </div>
                </div>
                <div className="pull-right">
                  <div className="icon">
                    <i className="ti-heart" />
                  </div>
                  <a href="job-details.html" className="btn btn-common btn-rm">Apply Job</a>
                </div>
              </div>
            </div>
          </div>
          <div className="job-list">
            <div className="thumb">
              <a href="job-details.html"><img src="portal-assets/assets/img/jobs/img-2.jpg" alt /></a>
            </div>
            <div className="job-list-content">
              <h4><a href="job-details.html">Front-end developer needed</a><span className="full-time">Full-Time</span></h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quaerat aut veniam molestiae atque dolorum omnis temporibus consequuntur saepe. Nemo atque consectetur saepe corporis odit in dicta reprehenderit, officiis, praesentium?</p>
              <div className="job-tag">
                <div className="pull-left">
                  <div className="meta-tag">
                    <span><a href="browse-categories.html"><i className="ti-desktop" />Technologies</a></span>
                    <span><i className="ti-location-pin" />Cupertino, CA, USA</span>
                    <span><i className="ti-time" />60/Hour</span>
                  </div>
                </div>
                <div className="pull-right">
                  <div className="icon">
                    <i className="ti-heart" />
                  </div>
                  <a href="job-details.html" className="btn btn-common btn-rm">Apply Job</a>
                </div>
              </div>
            </div>
          </div>
          <div className="job-list">
            <div className="thumb">
              <a href="job-details.html"><img src="portal-assets/assets/img/jobs/img-3.jpg" alt /></a>
            </div>
            <div className="job-list-content">
              <h4><a href="job-details.html">Senior Accountant</a><span className="part-time">Part-Time</span></h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quaerat aut veniam molestiae atque dolorum omnis temporibus consequuntur saepe. Nemo atque consectetur saepe corporis odit in dicta reprehenderit, officiis, praesentium?</p>
              <div className="job-tag">
                <div className="pull-left">
                  <div className="meta-tag">
                    <span><a href="browse-categories.html"><i className="ti-home" />Finance</a></span>
                    <span><i className="ti-location-pin" />Delaware, USA</span>
                    <span><i className="ti-time" />60/Hour</span>
                  </div>
                </div>
                <div className="pull-right">
                  <div className="icon">
                    <i className="ti-heart" />
                  </div>
                  <a href="job-details.html" className="btn btn-common btn-rm">Apply Job</a>
                </div>
              </div>
            </div>
          </div>
          <div className="job-list">
            <div className="thumb">
              <a href="job-details.html"><img src="portal-assets/assets/img/jobs/img-4.jpg" alt /></a>
            </div>
            <div className="job-list-content">
              <h4><a href="job-details.html">Fullstack web developer needed</a><span className="full-time">Full-Time</span></h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quaerat aut veniam molestiae atque dolorum omnis temporibus consequuntur saepe. Nemo atque consectetur saepe corporis odit in dicta reprehenderit, officiis, praesentium?</p>
              <div className="job-tag">
                <div className="pull-left">
                  <div className="meta-tag">
                    <span><a href="browse-categories.html"><i className="ti-desktop" />Technologies</a></span>
                    <span><i className="ti-location-pin" />New York, USA</span>
                    <span><i className="ti-time" />60/Hour</span>
                  </div>
                </div>
                <div className="pull-right">
                  <div className="icon">
                    <i className="ti-heart" />
                  </div>
                  <a href="job-details.html" className="btn btn-common btn-rm">Apply Job</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="showing pull-left">
            <a href="#">Showing <span>6-10</span> Of 24 Jobs</a>
          </div>                    
          <ul className="pagination pull-right">              
            <li className="active"><a href="#" className="btn btn-common"><i className="ti-angle-left" /> prev</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li className="active"><a href="#" className="btn btn-common">Next <i className="ti-angle-right" /></a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  {/* Find Job Section End */}
  {/* Category Section Start */}
  <section className="category section">
    <div className="container">
      <h2 className="section-title">Browse Categories</h2>  
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-3 col-sm-3 col-xs-12 f-category">
            <a href="browse-categories.html">
              <div className="icon">
                <i className="ti-home" />
              </div>
              <h3>Finance</h3>
              <p>4286 jobs</p>
            </a>
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12 f-category">
            <a href="browse-categories.html">
              <div className="icon">
                <i className="ti-world" />
              </div>
              <h3>Sale/Markting</h3>
              <p>2000 jobs</p>
            </a>
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12 f-category">
            <a href="browse-categories.html">
              <div className="icon">
                <i className="ti-book" />
              </div>
              <h3>Education/Training</h3>
              <p>1450 jobs</p>
            </a>
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12 f-category">
            <a href="browse-categories.html">
              <div className="icon">
                <i className="ti-desktop" />
              </div>
              <h3>Technologies</h3>
              <p>5100 jobs</p>
            </a>
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12 f-category">
            <a href="browse-categories.html">
              <div className="icon">
                <i className="ti-brush" />
              </div>
              <h3>Art/Design</h3>
              <p>5079 jobs</p>
            </a>
          </div>            
          <div className="col-md-3 col-sm-3 col-xs-12 f-category">
            <a href="browse-categories.html">
              <div className="icon">
                <i className="ti-heart" />
              </div>
              <h3>Healthcare</h3>
              <p>3235 jobs</p>
            </a>
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12 f-category">
            <a href="browse-categories.html">
              <div className="icon">
                <i className="ti-filter" />
              </div> 
              <h3>Science</h3>
              <p>1800 jobs</p> 
            </a>
          </div>            
          <div className="col-md-3 col-sm-3 col-xs-12 f-category">
            <a href="browse-categories.html">
              <div className="icon">
                <i className="ti-cup" />
              </div>
              <h3>Food Services</h3>
              <p>4286 jobs</p>
            </a>
          </div>
        </div> 
      </div>
    </div>
  </section>
  {/* Category Section End */}  
  {/* Featured Jobs Section Start */}
  <section className="featured-jobs section">
    <div className="container">
      <h2 className="section-title">
        Featured Jobs
      </h2>
      <div className="row">
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="featured-item">
            <div className="featured-wrap">
              <div className="featured-inner">
                <figure className="item-thumb">
                  <a className="hover-effect" href="job-page.html">
                    <img src="portal-assets/assets/img/features/img-1.jpg" alt />
                  </a>
                </figure>
                <div className="item-body">
                  <h3 className="job-title"><a href="job-page.html">Graphic Designer</a></h3>
                  <div className="adderess"><i className="ti-location-pin" /> Dallas, United States</div>
                </div>
              </div>
            </div>
            <div className="item-foot">
              <span><i className="ti-calendar" /> 4 months ago</span>
              <span><i className="ti-time" /> Full Time</span>
              <div className="view-iocn">
                <a href="job-page.html"><i className="ti-arrow-right" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="featured-item">
            <div className="featured-wrap">
              <div className="featured-inner">
                <figure className="item-thumb">
                  <a className="hover-effect" href="job-page.html">
                    <img src="portal-assets/assets/img/features/img-2.jpg" alt />
                  </a>
                </figure>
                <div className="item-body">
                  <h3 className="job-title"><a href="job-page.html">Software Engineer</a></h3>
                  <div className="adderess"><i className="ti-location-pin" /> Delaware, United States</div>
                </div>
              </div>
            </div>
            <div className="item-foot">
              <span><i className="ti-calendar" /> 5 months ago</span>
              <span><i className="ti-time" /> Part Time</span>
              <div className="view-iocn">
                <a href="job-page.html"><i className="ti-arrow-right" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="featured-item">
            <div className="featured-wrap">
              <div className="featured-inner">
                <figure className="item-thumb">
                  <a className="hover-effect" href="job-page.html">
                    <img src="portal-assets/assets/img/features/img-3.jpg" alt />
                  </a>
                </figure>
                <div className="item-body">
                  <h3 className="job-title"><a href="job-page.html">Managing Director</a></h3>
                  <div className="adderess"><i className="ti-location-pin" /> NY, United States</div>
                </div>
              </div>
            </div>
            <div className="item-foot">
              <span><i className="ti-calendar" /> 3 months ago</span>
              <span><i className="ti-time" /> Full Time</span>
              <div className="view-iocn">
                <a href="job-page.html"><i className="ti-arrow-right" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="featured-item">
            <div className="featured-wrap">
              <div className="featured-inner">
                <figure className="item-thumb">
                  <a className="hover-effect" href="job-page.html">
                    <img src="portal-assets/assets/img/features/img-3.jpg" alt />
                  </a>
                </figure>
                <div className="item-body">
                  <h3 className="job-title"><a href="job-page.html">Graphic Designer</a></h3>
                  <div className="adderess"><i className="ti-location-pin" /> Washington, United States</div>
                </div>
              </div>
            </div>
            <div className="item-foot">
              <span><i className="ti-calendar" /> 1 months ago</span>
              <span><i className="ti-time" /> Part Time</span>
              <div className="view-iocn">
                <a href="job-page.html"><i className="ti-arrow-right" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="featured-item">
            <div className="featured-wrap">
              <div className="featured-inner">
                <figure className="item-thumb">
                  <a className="hover-effect" href="job-page.html">
                    <img src="portal-assets/assets/img/features/img-2.jpg" alt />
                  </a>
                </figure>
                <div className="item-body">
                  <h3 className="job-title"><a href="job-page.html">Software Engineer</a></h3>
                  <div className="adderess"><i className="ti-location-pin" /> Dallas, United States</div>
                </div>
              </div>
            </div>
            <div className="item-foot">
              <span><i className="ti-calendar" /> 6 months ago</span>
              <span><i className="ti-time" /> Full Time</span>
              <div className="view-iocn">
                <a href="job-page.html"><i className="ti-arrow-right" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="featured-item">
            <div className="featured-wrap">
              <div className="featured-inner">
                <figure className="item-thumb">
                  <a className="hover-effect" href="job-page.html">
                    <img src="portal-assets/assets/img/features/img-1.jpg" alt />
                  </a>
                </figure>
                <div className="item-body">
                  <h3 className="job-title"><a href="job-page.html">Managing Director</a></h3>
                  <div className="adderess"><i className="ti-location-pin" /> NY, United States</div>
                </div>
              </div>
            </div>
            <div className="item-foot">
              <span><i className="ti-calendar" /> 7 months ago</span>
              <span><i className="ti-time" /> Part Time</span>
              <div className="view-iocn">
                <a href="job-page.html"><i className="ti-arrow-right" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Featured Jobs Section End */}
  {/* Pricing Table Section */}
  <section id="pricing-table" className="section">
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <div className="table">
            <div className="title">
              <h3>Pricing Plan 1</h3>
            </div>
            <div className="pricing-header">
              <p className="price-value"> <sup>$</sup>0</p>
              <p className="price-quality">/forever</p>
            </div>
            <ul className="description">
              <li>Post 1 Job</li>
              <li>No Featured Job</li>
              <li>Edit Your Job Listing</li>
              <li>Manage Application</li>
            </ul>
            <button className="btn btn-common" type="submit">Get Started</button>
          </div> 
        </div>
        <div className="col-sm-4">
          <div className="table" id="active-tb">
            <div className="title">
              <h3>Pricing Plan 2</h3>
            </div>
            <div className="pricing-header">
              <p className="price-value"> <sup>$</sup>99</p>
              <p className="price-quality">/90 DAYS</p>
            </div>
            <ul className="description">
              <li>Post 3 Jobs</li>
              <li>No Featured Job</li>
              <li>Edit Your Job Listing</li>
              <li>Manage Application</li>
            </ul>
            <button className="btn btn-common" type="submit">Get Started</button>
          </div> 
        </div>
        <div className="col-sm-4">
          <div className="table">
            <div className="title">
              <h3>Pricing Plan 3</h3>
            </div>
            <div className="pricing-header">
              <p className="price-value"> <sup>$</sup>199</p>
              <p className="price-quality">/180 DAYS</p>                    
            </div>
            <ul className="description">
              <li>Post 10 Jobs</li>
              <li>3 Featured Jobs</li>
              <li>Edit Your Job Listing</li>
              <li>Manage Applications</li>
            </ul>
            <button className="btn btn-common" type="submit">Get Started</button>
          </div> 
        </div>
      </div>
    </div>
  </section>
  {/* Pricing Table Section End */}
  {/* Blog Section */}
  <section id="blog" className="section">
    {/* Container Starts */}
    <div className="container">
      <h2 className="section-title">
        Latest News
      </h2>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 blog-item">
          {/* Blog Item Starts */}
          <div className="blog-item-wrapper">
            <div className="blog-item-img">
              <a href="single-post.html">
                <img src="portal-assets/assets/img/blog/home-items/img1.jpg" alt />
              </a>                
            </div>
            <div className="blog-item-text">
              <div className="meta-tags">
                <span className="date"><i className="ti-calendar" /> Dec 20, 2017</span>
                <span className="comments"><a href="#"><i className="ti-comment-alt" /> 5 Comments</a></span>
              </div>
              <a href="single-post.html">
                <h3>
                  Tips to write an impressive resume online for beginner
                </h3>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore praesentium asperiores ad vitae.
              </p>
              <a href="single-post.html" className="btn btn-common btn-rm">Read More</a>
            </div>
          </div>
          {/* Blog Item Wrapper Ends*/}
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 blog-item">
          {/* Blog Item Starts */}
          <div className="blog-item-wrapper">
            <div className="blog-item-img">
              <a href="single-post.html">
                <img src="portal-assets/assets/img/blog/home-items/img2.jpg" alt />
              </a>                
            </div>
            <div className="blog-item-text">
              <div className="meta-tags">
                <span className="date"><i className="ti-calendar" /> Jan 20, 2018</span>
                <span className="comments"><a href="#"><i className="ti-comment-alt" /> 5 Comments</a></span>
              </div>
              <a href="single-post.html">
                <h3>
                  Let's explore 5 cool new features in JobBoard theme
                </h3>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore praesentium asperiores ad vitae.
              </p>
              <a href="single-post.html" className="btn btn-common btn-rm">Read More</a>
            </div>
          </div>
          {/* Blog Item Wrapper Ends*/}
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 blog-item">
          {/* Blog Item Starts */}
          <div className="blog-item-wrapper">
            <div className="blog-item-img">
              <a href="single-post.html">
                <img src="portal-assets/assets/img/blog/home-items/img3.jpg" alt />
              </a>                
            </div>
            <div className="blog-item-text">
              <div className="meta-tags">
                <span className="date"><i className="ti-calendar" /> Mar 20, 2018</span>
                <span className="comments"><a href="#"><i className="ti-comment-alt" /> 5 Comments</a></span>
              </div>
              <a href="single-post.html">
                <h3>
                  How to convince recruiters and get your dream job
                </h3>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore praesentium asperiores ad vitae.
              </p>
              <a href="single-post.html" className="btn btn-common btn-rm">Read More</a>
            </div>
          </div>
          {/* Blog Item Wrapper Ends*/}
        </div>
      </div>
    </div>
  </section>
  {/* blog Section End */}
  {/* Testimonial Section Start */}
  <section id="testimonial" className="section">
    <div className="container">
      <div className="row">
        <div className="touch-slider">
          <div className="item active text-center">  
            <img className="img-member" src="portal-assets/assets/img/testimonial/img1.jpg" alt /> 
            <div className="client-info">
              <h2 className="client-name">Jessica <span>(Senior Accountant)</span></h2>
            </div>
            <p><i className="fa fa-quote-left quote-left" /> The team that was assigned to our project... were extremely professional <i className="fa fa-quote-right quote-right" /><br /> throughout the project and assured that the owner expectations were met and <br /> often exceeded. </p>
          </div>
          <div className="item text-center">
            <img className="img-member" src="portal-assets/assets/img/testimonial/img2.jpg" alt /> 
            <div className="client-info">
              <h2 className="client-name">John Doe <span>(Project Menager)</span></h2>
            </div>
            <p><i className="fa fa-quote-left quote-left" /> The team that was assigned to our project... were extremely professional <i className="fa fa-quote-right quote-right" /><br /> throughout the project and assured that the owner expectations were met and <br /> often exceeded. </p>
          </div>
          <div className="item text-center">
            <img className="img-member" src="portal-assets/assets/img/testimonial/img3.jpg" alt /> 
            <div className="client-info">
              <h2 className="client-name">Helen <span>(Engineer)</span></h2>
            </div>
            <p><i className="fa fa-quote-left quote-left" /> The team that was assigned to our project... were extremely professional <i className="fa fa-quote-right quote-right" /><br /> throughout the project and assured that the owner expectations were met and <br /> often exceeded. </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Testimonial Section End */}
  {/* Clients Section */}
  <section className="clients section">
    <div className="container">
      <h2 className="section-title">
        Clients &amp; Partners
      </h2>
      <div className="row"> 
        <div id="clients-scroller">
          <div className="items">
            <img src="portal-assets/assets/img/clients/img1.png" alt />
          </div>
          <div className="items">
            <img src="portal-assets/assets/img/clients/img2.png" alt />
          </div>
          <div className="items">
            <img src="portal-assets/assets/img/clients/img3.png" alt />
          </div>
          <div className="items">
            <img src="portal-assets/assets/img/clients/img4.png" alt />
          </div>
          <div className="items">
            <img src="portal-assets/assets/img/clients/img5.png" alt />
          </div>
          <div className="items">
            <img src="portal-assets/assets/img/clients/img6.png" alt />
          </div>
          <div className="items">
            <img src="portal-assets/assets/img/clients/img6.png" alt />
          </div>
          <div className="items">
            <img src="portal-assets/assets/img/clients/img6.png" alt />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Client Section End */}

  {/* Counter Section Start */}
  <section id="counter">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-12">
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
        <div className="col-md-3 col-sm-6 col-xs-12">
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
        <div className="col-md-3 col-sm-6 col-xs-12">
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
        <div className="col-md-3 col-sm-6 col-xs-12">
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
  {/* Infobox Section Start */}
  <section className="infobox section">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="info-text">
            <h2>Don't Want To Miss a Thing?</h2>
            <p>Just go to <a href="#">Google Play</a> to download JobBoard Mini</p>
          </div> 
          <a href="#" className="btn btn-border">Google Play</a>           
        </div>
      </div>
    </div>
  </section>
  {/* Infobox Section End */}
  <PortalFooter />
  </div>
  );
};

export default Home;