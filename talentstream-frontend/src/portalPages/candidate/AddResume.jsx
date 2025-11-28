import React, { useState } from "react";
import PortalNavbar from './../../portalComponent/PortalNavbar';
import PortalFooter from './../../portalComponent/PortalFooter';

const AddResume = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
    location: "",
    website: "",
    salary: "",
    age: "",
    profileImage: null,
    education: [{ degree: "", field: "", school: "", from: "", to: "", description: "" }],
    work: [{ company: "", title: "", from: "", to: "", description: "" }],
    skills: [{ skill: "", percent: "" }],
  });

  const handleChange = (e, section = null, index = null) => {
    const { name, value, files } = e.target;

    if (section !== null && index !== null) {
      const updatedSection = [...formData[section]];
      if (files) {
        updatedSection[index][name] = files[0];
      } else {
        updatedSection[index][name] = value;
      }
      setFormData({ ...formData, [section]: updatedSection });
    } else if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addSectionItem = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], {}],
    });
  };

  const removeSectionItem = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can send this data to your backend via fetch or axios
  };

  return (
    <>
      <PortalNavbar />

      <div className="page-header" style={{ background: "url(assets/img/banner1.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumb-wrapper">
                <h2 className="product-title">Create Resume</h2>
                <ol className="breadcrumb">
                  <li><a href="#"><i className="ti-home"></i> Home</a></li>
                  <li className="current">Resumes</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-md-offset-2">
              <div className="page-ads box">
                <div className="post-header">
                  <p>Already have an account? <a href="/login">Click here to login</a></p>
                </div>

                <form className="form-ad" onSubmit={handleSubmit}>

                  {/* Basic Information */}
                  <div className="divider"><h3>Basic Information</h3></div>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Name" required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Your@domain.com" required />
                  </div>
                  <div className="form-group">
                    <label>Profession Title</label>
                    <input type="text" name="profession" value={formData.profession} onChange={handleChange} className="form-control" placeholder="Headline (e.g. Front-end developer)" />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" placeholder="Location, e.g" />
                  </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input type="url" name="website" value={formData.website} onChange={handleChange} className="form-control" placeholder="Website address" />
                  </div>
                  <div className="form-group">
                    <label>Pre Hour</label>
                    <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="form-control" placeholder="Salary, e.g. 85" />
                  </div>
                  <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" placeholder="Years old" />
                  </div>
                  <div className="form-group">
                    <label>Profile Image</label>
                    <input type="file" name="profileImage" onChange={handleChange} className="form-control" />
                  </div>

                  {/* Education */}
                  <div className="divider"><h3>Education</h3></div>
                  {formData.education.map((edu, idx) => (
                    <div key={idx} className="education-item">
                      <div className="form-group">
                        <label>Degree</label>
                        <input type="text" name="degree" value={edu.degree || ""} onChange={(e) => handleChange(e, "education", idx)} className="form-control" placeholder="Degree, e.g. Bachelor" />
                      </div>
                      <div className="form-group">
                        <label>Field of Study</label>
                        <input type="text" name="field" value={edu.field || ""} onChange={(e) => handleChange(e, "education", idx)} className="form-control" placeholder="Major, e.g Computer Science" />
                      </div>
                      <div className="form-group">
                        <label>School</label>
                        <input type="text" name="school" value={edu.school || ""} onChange={(e) => handleChange(e, "education", idx)} className="form-control" placeholder="School name" />
                      </div>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label>From</label>
                          <input type="text" name="from" value={edu.from || ""} onChange={(e) => handleChange(e, "education", idx)} className="form-control" placeholder="e.g 2014" />
                        </div>
                        <div className="col-md-6">
                          <label>To</label>
                          <input type="text" name="to" value={edu.to || ""} onChange={(e) => handleChange(e, "education", idx)} className="form-control" placeholder="e.g 2018" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={edu.description || ""} onChange={(e) => handleChange(e, "education", idx)} className="form-control" rows="4"></textarea>
                      </div>
                      <button type="button" className="btn btn-danger" onClick={() => removeSectionItem("education", idx)}>Delete</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-primary" onClick={() => addSectionItem("education")}>Add Education</button>

                  {/* Work and Skills sections can be duplicated similarly */}
                  
                  <div className="form-group mt-4">
                    <button type="submit" className="btn btn-common">Save Resume</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>

      <PortalFooter />
    </>
  );
};

export default AddResume;
