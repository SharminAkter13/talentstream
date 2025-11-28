import React from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";
const ManageUser = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Sidebar */}
      <Sidebar />
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

              {/* Content Wrapper. Contains page content */}
              <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                  <div className="container-fluid">
                    <div className="row mb-2">
                      <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                          <li className="breadcrumb-item">
                            <a href="#">Home</a>
                          </li>
                          <li className="breadcrumb-item active">Blank Page</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  {/* /.container-fluid */}
                </section>
                {/* Main content */}
                <section className="content">
                  {/* Default box */}
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <div className="card">
                            <div className="card-header">
                              <h3 className="card-title">Manage Users</h3>
                              <div className="card-tools">
                                <div
                                  className="input-group input-group-sm"
                                  style={{ width: 150 }}
                                >
                                  <input
                                    type="text"
                                    name="table_search"
                                    className="form-control float-right"
                                    placeholder="Search"
                                  />
                                  <div className="input-group-append">
                                    <button type="submit" className="btn btn-default">
                                      <i className="fas fa-search" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body table-responsive p-0">
                              <table className="table table-hover text-nowrap">
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>183</td>
                                    <td>John Doe</td>
                                    <td>11-7-2014</td>
                                    <td>
                                      <span className="tag tag-success">
                                        Approved
                                      </span>
                                    </td>

                                  </tr>
                                  <tr>
                                    <td>219</td>
                                    <td>Alexander Pierce</td>
                                    <td>11-7-2014</td>
                                    <td>
                                      <span className="tag tag-warning">Pending</span>
                                    </td>

                                  </tr>
                                  <tr>
                                    <td>657</td>
                                    <td>Bob Doe</td>
                                    <td>11-7-2014</td>

                                    <td>
                                      Bacon ipsum dolor sit amet salami venison
                                      chicken flank fatback doner.
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>175</td>
                                    <td>Mike Doe</td>
                                    <td>11-7-2014</td>
                                    <td>
                                      <span className="tag tag-danger">Denied</span>
                                    </td>

                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            {/* /.card-body */}
                          </div>
                          {/* /.card */}
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                </section>
                {/* /.content */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
</div>
      );
};

      export default ManageUser;