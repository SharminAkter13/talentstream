import React from "react";

const PricingTable = () => {
  return (
    <div>
      {/* Page Header Start */}
      <div
        className="page-header"
        style={{ background: "url(assets/img/banner1.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumb-wrapper">
                <h2 className="product-title">Pricing Table</h2>
                <ol className="breadcrumb">
                  <li>
                    <a href="#">
                      <i className="ti-home"></i> Home
                    </a>
                  </li>
                  <li className="current">Pricing</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Pricing Section Start */}
      <section className="pricing-table section">
        <div className="container">
          <div className="row text-center">
            {/* Free Plan */}
            <div className="col-md-4 col-sm-6">
              <div className="pricing-item">
                <h3>Free Plan</h3>
                <p className="price">$0 <span>/month</span></p>
                <ul className="features">
                  <li>Basic Support</li>
                  <li>1 User Account</li>
                  <li>Access to limited features</li>
                </ul>
                <a href="#" className="btn btn-common">
                  Get Started
                </a>
              </div>
            </div>

            {/* Standard Plan */}
            <div className="col-md-4 col-sm-6">
              <div className="pricing-item featured">
                <h3>Standard Plan</h3>
                <p className="price">$29 <span>/month</span></p>
                <ul className="features">
                  <li>Email Support</li>
                  <li>5 User Accounts</li>
                  <li>Access to most features</li>
                </ul>
                <a href="#" className="btn btn-common">
                  Get Started
                </a>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="col-md-4 col-sm-6">
              <div className="pricing-item">
                <h3>Premium Plan</h3>
                <p className="price">$59 <span>/month</span></p>
                <ul className="features">
                  <li>Priority Support</li>
                  <li>Unlimited Users</li>
                  <li>Access to all features</li>
                </ul>
                <a href="#" className="btn btn-common">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Section End */}
    </div>
  );
};

export default PricingTable;
