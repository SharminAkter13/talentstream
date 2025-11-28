import React, { Component } from "react";
import Navbar from './../component/Navbar';
import Sidebar from './../component/Sidebar';
import Footer from './../component/Footer';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "John Doe",
      email: "john@example.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      notifications: true,
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({
      [name]: type === "checkbox" ? checked : value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Password confirmation check
    if (this.state.newPassword && this.state.newPassword !== this.state.confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    console.log("Settings updated:", this.state);
    alert("Settings updated successfully!");
    // Send updated data to backend here (fetch/Axios)
  };

  render() {
    const { username, email, currentPassword, newPassword, confirmPassword, notifications } = this.state;

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
              <h1 className="text-center mb-4">Settings</h1>
              <form onSubmit={this.handleSubmit}>
                {/* Profile Info */}
                <h4 className="mb-3 border-bottom pb-2">Profile</h4>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    className="form-control"
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
                  />
                </div>

                {/* Password */}
                <h4 className="mt-4 mb-3 border-bottom pb-2">Password</h4>
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Confirm new password"
                  />
                </div>

                {/* Preferences */}
                <h4 className="mt-4 mb-3 border-bottom pb-2">Preferences</h4>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={notifications}
                    onChange={this.handleChange}
                    className="form-check-input"
                    id="notificationsCheck"
                  />
                  <label className="form-check-label" htmlFor="notificationsCheck">
                    Receive email notifications
                  </label>
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Save Settings
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

export default Settings;
