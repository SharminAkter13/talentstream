import React, { useState } from "react";
import PortalNavbar from './../portalComponent/PortalNavbar';
import PortalFooter from './../portalComponent/PortalFooter';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to send form data
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <PortalNavbar />

      {/* Map Section */}
      <div id="google-map" style={{ height: "400px", width: "100%", marginBottom: "50px" }}>
        {/* You can integrate Google Maps API here */}
      </div>

      {/* Contact Section */}
      <section id="content">
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-md-4">
              <h2 className="medium-title">Contact Us</h2>
              <div className="information">
                <div className="contact-datails">
                  <div className="icon">
                    <i className="ti-location-pin"></i>
                  </div>
                  <div className="info">
                    <h3>Address</h3>
                    <span className="detail">
                      Main Office: NO.22-23 Street Name- City, Country
                    </span>
                    <span className="detail">
                      Customer Center: NO.130-45 Street Name- City, Country
                    </span>
                  </div>
                </div>
                <div className="contact-datails">
                  <div className="icon">
                    <i className="ti-mobile"></i>
                  </div>
                  <div className="info">
                    <h3>Phone Numbers</h3>
                    <span className="detail">Main Office: +880 123 456 789</span>
                    <span className="detail">Customer Support: +880 123 456 789</span>
                  </div>
                </div>
                <div className="contact-datails">
                  <div className="icon">
                    <i className="ti-location-arrow"></i>
                  </div>
                  <div className="info">
                    <h3>Email Address</h3>
                    <span className="detail">Customer Support: info@mail.com</span>
                    <span className="detail">Technical Support: support@mail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-8">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="mail@sitename.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message"
                        rows="8"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-common">
                      Send Us
                    </button>
                    {submitted && (
                      <div className="h3 text-center mt-3 text-success">
                        Message sent successfully!
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PortalFooter />
    </>
  );
};

export default Contact;
