import React, { useState } from 'react';
import Navbar from '../../component/Navbar';
import Sidebar from '../../component/Sidebar';
import Footer from '../../component/Footer';

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    note: '',
    status: 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Category:', formData);
    // Here you would send data to backend via fetch/Axios
  };

  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Add Job Category</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                  <li className="breadcrumb-item active">Add Category</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Create Job Category</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                {/* Category Name */}
                <div className="form-group">
                  <label htmlFor="name">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="e.g., Engineering, Design"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Note / Description */}
                <div className="form-group">
                  <label htmlFor="note">Description (optional)</label>
                  <textarea
                    className="form-control"
                    id="note"
                    name="note"
                    rows="3"
                    placeholder="Short description about the category"
                    value={formData.note}
                    onChange={handleChange}
                  />
                </div>

                {/* Status */}
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CreateCategory;
