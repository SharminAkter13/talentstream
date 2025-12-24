import React from 'react';
import { Link } from 'react-router-dom';

const PortalFooter = () => {
  return (
    <>
      <div>
        {/* Footer Section Start */}
        <footer>
          {/* Footer Area Start */}
          <section className="footer-Content">
            <div className="container">
              <div className="row">
                {/* Logo Column */}
                <div className="col-lg-3 col-md-3 col-xs-12">
                  <div className="widget">
                    <div className="footer-logo">
                      <img src="/portal-assets/assets/img/logo-footer.png" alt="Company Logo" />
                    </div>
                    <div className="textwidget">
                      <p>
                        Sed consequat sapien faus quam bibendum convallis quis in nulla.
                        Pellentesque volutpat odio eget diam cursus semper.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="col-lg-6 col-md-4 col-xs-12">
                  <div className="widget">
                    <h3 className="block-title">Quick Links</h3>

                    <ul className="menu">
                      <li><Link to="/about">About Us</Link></li>
                      <li><Link to="/support">Support</Link></li>
                      <li><Link to="/license">License</Link></li>
                      <li><Link to="/contact">Contact</Link></li>
                    </ul>

                    <ul className="menu">
                      <li><Link to="/terms">Terms & Conditions</Link></li>
                      <li><Link to="/privacy">Privacy</Link></li>
                      <li><Link to="/referral-terms">Referral Terms</Link></li>
                      <li><Link to="/product-license">Product License</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Subscribe Section */}
                <div className="col-lg-3 col-md-4 col-xs-12">
                  <div className="widget">
                    <h3 className="block-title">Subscribe Now</h3>
                    <p>Sed consequat sapien faus quam bibendum convallis.</p>

                    <form method="post" id="subscribe-form" name="subscribe-form" className="validate">
                      <div className="form-group is-empty">
                        <input
                          type="email"
                          defaultValue=""
                          name="Email"
                          className="form-control"
                          id="EMAIL"
                          placeholder="Enter Email..."
                          required
                        />
                        <button
                          type="submit"
                          name="subscribe"
                          id="subscribes"
                          className="btn btn-common sub-btn"
                        >
                          <i className="lni-envelope" />
                        </button>
                        <div className="clearfix" />
                      </div>
                    </form>

                    {/* Social Links */}
                    <ul className="mt-3 footer-social">
                      <li><a className="facebook" href="#"><i className="lni-facebook-filled" /></a></li>
                      <li><a className="twitter" href="#"><i className="lni-twitter-filled" /></a></li>
                      <li><a className="linkedin" href="#"><i className="lni-linkedin-fill" /></a></li>
                      <li><a className="google-plus" href="#"><i className="lni-google-plus" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Copyright */}
          <div id="copyright">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="site-info text-center">
                    <p>
                      2025 All Right Reserved To{" "}
                      <i className="fa fa-copyright" aria-hidden="true" />{" "}
                      <a href="#" rel="nofollow">TalentStream</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Back to Top */}
        <a href="#" className="back-to-top">
          <i className="lni-arrow-up" />
        </a>
      </div>
    </>
  );
};

export default PortalFooter;
