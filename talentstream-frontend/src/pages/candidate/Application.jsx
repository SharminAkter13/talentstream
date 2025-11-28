import React, { Component } from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      phone: "",
      jobTitle: "",
      coverLetter: "",
      resume: null,
    };
  }

  handleChange = (e) => {
    const { name, value, files } = e.target;
    this.setState({
      [name]: files ? files[0] : value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted:", this.state);
    alert("Application submitted successfully!");
    // Here you can send data to backend using fetch/Axios
  };

  render() {
    const { fullName, email, phone, jobTitle, coverLetter, resume } = this.state;

    return (
        <div>
            {/* Navbar */}
            <Navbar/>
            {/* Sidebar */}
            <Sidebar/>
  <div className="main-container">
    <div className="pd-ltr-20 xs-pd-20-10">
      <div className="min-height-200px">
        <div className="page-header">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="title">
                <h4>blank</h4>
              </div>
              <nav aria-label="breadcrumb" role="navigation">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">blank</li>
                </ol>
              </nav>
            </div>
            
          </div>
        </div>
        <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
          <main className="flex-grow-1 p-4 bg-light">
            <div className="container bg-white p-4 rounded shadow-sm">
              <h1 className="text-center mb-4">Job Application Form</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={jobTitle}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter the job title you are applying for"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={coverLetter}
                    onChange={this.handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Write a short cover letter"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Resume (PDF/DOC)</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={this.handleChange}
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  {resume && (
                    <small className="text-success">
                      Selected file: {resume.name}
                    </small>
                  )}
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </div>

    );
  }
}

export default Application;
