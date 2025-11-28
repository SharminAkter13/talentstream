import React, { Component } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],       // List of skills
      newSkill: "",     // Input field for adding new skill
    };
  }

  handleChange = (e) => {
    this.setState({ newSkill: e.target.value });
  };

  handleAddSkill = (e) => {
    e.preventDefault();
    const { newSkill, skills } = this.state;
    if (newSkill.trim() === "") return;
    this.setState({
      skills: [...skills, newSkill.trim()],
      newSkill: "",
    });
  };

  handleDeleteSkill = (index) => {
    const { skills } = this.state;
    const updatedSkills = skills.filter((_, i) => i !== index);
    this.setState({ skills: updatedSkills });
  };

  render() {
    const { skills, newSkill } = this.state;

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
              <h1 className="text-center mb-4">Manage Skills</h1>

              {/* Add Skill Form */}
              <form onSubmit={this.handleAddSkill} className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a new skill"
                    value={newSkill}
                    onChange={this.handleChange}
                  />
                  <button type="submit" className="btn btn-primary">
                    Add Skill
                  </button>
                </div>
              </form>

              {/* Skills List */}
              {skills.length === 0 ? (
                <p>No skills added yet.</p>
              ) : (
                <ul className="list-group">
                  {skills.map((skill, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {skill}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.handleDeleteSkill(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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

export default Skills;
