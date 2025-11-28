import React from 'react';

const PortalFooter = () => {
    return (
      <div>
  {/* Footer Section Start */}
  <footer>
   {/* Footer Area Start */}
    <section className="footer-Content">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="widget">
              <h3 className="block-title"><img src="portal-assets/assets/img/logo.png" className="img-responsive" alt="Footer Logo" /></h3>
              <div className="textwidget">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lobortis tincidunt est, et euismod purus suscipit quis. Etiam euismod ornare elementum. Sed ex est, consectetur eget facilisis sed.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="widget">
              <h3 className="block-title">Quick Links</h3>
              <ul className="menu">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">License</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="widget">
              <h3 className="block-title">Trending Jobs</h3>
              <ul className="menu">
                <li><a href="#">Android Developer</a></li>
                <li><a href="#">Senior Accountant</a></li>
                <li><a href="#">Frontend Developer</a></li>
                <li><a href="#">Junior Tester</a></li>
                <li><a href="#">Project Manager</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="widget">
              <h3 className="block-title">Follow Us</h3>
              <div className="bottom-social-icons social-icon">  
                <a className="twitter" href="https://twitter.com/GrayGrids"><i className="ti-twitter-alt" /></a>
                <a className="facebook" href="https://web.facebook.com/GrayGrids"><i className="ti-facebook" /></a>                   
                <a className="youtube" href="https://youtube.com/"><i className="ti-youtube" /></a>
                <a className="dribble" href="https://dribbble.com/GrayGrids"><i className="ti-dribbble" /></a>
                <a className="linkedin" href="https://www.linkedin.com/GrayGrids"><i className="ti-linkedin" /></a>
              </div>  
              <p>Join our mailing list to stay up to date and get notices about our new releases!</p>
              <form className="subscribe-box">
                <input type="text" placeholder="Your email" />
                <input type="submit" className="btn-system" defaultValue="Send" />
              </form> 
            </div>
          </div>
        </div>
      </div>
    </section>
   {/* Footer area End */}
    {/* Copyright Start  */}
    <div id="copyright">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="site-info text-center">
              <p>All Rights reserved © 2025 - Designed &amp; Developed by <a rel="nofollow" href="#">TalentStream</a></p>
            </div>   
          </div>
        </div>
      </div>
    </div>
   {/* Copyright End */}
  </footer>
 {/* Footer Section End */}  
 {/* Go To Top Link */}
  <a href="#" className="back-to-top">
    <i className="ti-arrow-up" />
  </a>
  <div id="loading">
    <div id="loading-center">
      <div id="loading-center-absolute">
        <div className="object" id="object_one" />
        <div className="object" id="object_two" />
        <div className="object" id="object_three" />
        <div className="object" id="object_four" />
        <div className="object" id="object_five" />
        <div className="object" id="object_six" />
        <div className="object" id="object_seven" />
        <div className="object" id="object_eight" />
      </div>
    </div>
  </div>
</div>

    );
};

export default PortalFooter;