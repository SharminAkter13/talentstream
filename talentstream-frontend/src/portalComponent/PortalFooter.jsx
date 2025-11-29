import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const PortalFooter = () => {
    return (
        // Must wrap multiple top-level elements (footer, a, div) in a Fragment or a single div
        <>
            {/* Footer Section Start */}
            <footer>
                {/* Footer Area Start */}
                <section className="footer-Content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-xs-12">
                                <div className="widget">
                                    <div className="footer-logo">
                                        <img src="assets/img/logo-footer.png" alt="Company Logo" />
                                    </div>
                                    <div className="textwidget">
                                        <p>Sed consequat sapien faus quam bibendum convallis quis in nulla. Pellentesque volutpat odio eget diam cursus semper.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-4 col-xs-12">
                                <div className="widget">
                                    <h3 className="block-title">Quick Links</h3>
                                    <ul className="menu">
                                        {/* Use Link component for internal navigation */}
                                        <li><Link to="/about">About Us</Link></li>
                                        <li><Link to="/support">Support</Link></li>
                                        <li><Link to="/license">License</Link></li>
                                        <li><Link to="/contact">Contact</Link></li>
                                    </ul>
                                    <ul className="menu">
                                        <li><Link to="/terms">Terms & Conditions</Link></li>
                                        <li><Link to="/privacy">Privacy</Link></li>
                                        <li><Link to="/referral-terms">Refferal Terms</Link></li>
                                        <li><Link to="/product-license">Product License</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-xs-12">
                                <div className="widget">
                                    <h3 className="block-title">Subscribe Now</h3>
                                    <p>Sed consequat sapien faus quam bibendum convallis.
                                        {/* Note: This <br> was present in your original code. 
                                            If it's necessary, use <br /> */}
                                    </p> 
                                    {/* Handle form submission using React state/handlers for a better UX */}
                                    <form method="post" id="subscribe-form" name="subscribe-form" className="validate">
                                        <div className="form-group is-empty">
                                            {/* Note the use of value and required for accessibility, 
                                                though value should be managed by state in a functional component. */}
                                            <input type="email" defaultValue="" name="Email" className="form-control" id="EMAIL" placeholder="Enter Email..." required="" />
                                            <button type="submit" name="subscribe" id="subscribes" className="btn btn-common sub-btn">
                                                <i className="lni-envelope"></i>
                                            </button>
                                            <div className="clearfix"></div>
                                        </div>
                                    </form>
                                    <ul className="mt-3 footer-social">
                                        {/* Keep as <a> for external social links or if their behavior is non-SPA */}
                                        <li><a className="facebook" href="#"><i className="lni-facebook-filled"></i></a></li>
                                        <li><a className="twitter" href="#"><i className="lni-twitter-filled"></i></a></li>
                                        <li><a className="linkedin" href="#"><i className="lni-linkedin-fill"></i></a></li>
                                        <li><a className="google-plus" href="#"><i className="lni-google-plus"></i></a></li>
                                    </ul> 
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Footer area End */}
                
                {/* Copyright Start */}
                <div id="copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="site-info text-center">
                                    <p>2025 All Right Reserve To <i class="fa fa-copyright" aria-hidden="true"></i> <a href="#" rel="nofollow">TalentStream</a></p>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                {/* Copyright End */}
            </footer>
            {/* Footer Section End */}

            {/* Go To Top Link */}
            {/* Changed to className="back-to-top" */}
            <a href="#" className="back-to-top">
                <i className="lni-arrow-up"></i>
            </a> 

        </>
    );
};

export default PortalFooter;