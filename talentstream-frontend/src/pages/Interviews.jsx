import React, { Component } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";

class Interviews extends Component {
  state = {
    interviews: [
      {
        id: 1,
        candidate: "John Doe",
        jobTitle: "Frontend Developer",
        date: "2025-10-05",
        time: "10:00 AM",
        mode: "Online",
      },
      {
        id: 2,
        candidate: "Jane Smith",
        jobTitle: "Backend Developer",
        date: "2025-10-07",
        time: "2:00 PM",
        mode: "Office",
      },
    ],
    form: {
      candidate: "",
      jobTitle: "",
      date: "",
      time: "",
      mode: "Online",
    },
    editId: null,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      form: { ...prev.form, [name]: value },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.editId) {
      // Update
      this.setState((prev) => ({
        interviews: prev.interviews.map((i) =>
          i.id === prev.editId ? { ...prev.form, id: i.id } : i
        ),
        form: { candidate: "", jobTitle: "", date: "", time: "", mode: "Online" },
        editId: null,
      }));
    } else {
      // Add new
      this.setState((prev) => ({
        interviews: [
          ...prev.interviews,
          { ...prev.form, id: Date.now() },
        ],
        form: { candidate: "", jobTitle: "", date: "", time: "", mode: "Online" },
      }));
    }
  };

  handleEdit = (id) => {
    const interview = this.state.interviews.find((i) => i.id === id);
    this.setState({ form: { ...interview }, editId: id });
  };

  handleDelete = (id) => {
    this.setState((prev) => ({
      interviews: prev.interviews.filter((i) => i.id !== id),
    }));
  };

  render() {
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
              <h1 className="text-center mb-4">Interviews Management</h1>

              {/* Interviews Form */}
              <form onSubmit={this.handleSubmit} className="mb-4">
                <div className="row g-3">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="candidate"
                      value={this.state.form.candidate}
                      onChange={this.handleChange}
                      placeholder="Candidate Name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="jobTitle"
                      value={this.state.form.jobTitle}
                      onChange={this.handleChange}
                      placeholder="Job Title"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="date"
                      name="date"
                      value={this.state.form.date}
                      onChange={this.handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="time"
                      name="time"
                      value={this.state.form.time}
                      onChange={this.handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <select
                      name="mode"
                      value={this.state.form.mode}
                      onChange={this.handleChange}
                      className="form-select"
                    >
                      <option value="Online">Online</option>
                      <option value="Office">Office</option>
                      <option value="Phone">Phone</option>
                    </select>
                  </div>
                  <div className="col-md-3 mt-3">
                    <button type="submit" className="btn btn-primary w-100">
                      {this.state.editId ? "Update" : "Schedule"}
                    </button>
                  </div>
                </div>
              </form>

              {/* Interviews Table */}
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Candidate</th>
                    <th>Job Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Mode</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.interviews.length > 0 ? (
                    this.state.interviews.map((interview) => (
                      <tr key={interview.id}>
                        <td>{interview.candidate}</td>
                        <td>{interview.jobTitle}</td>
                        <td>{interview.date}</td>
                        <td>{interview.time}</td>
                        <td>{interview.mode}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => this.handleEdit(interview.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => this.handleDelete(interview.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No interviews scheduled
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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

export default Interviews;
