import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

  

    // GET /api/users
    const loadUsers = async () => {
        try {
            const res = await axios.get("/api/users");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

      useEffect(() => {
        loadUsers();
    }, []);

    // DELETE user
    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`/api/users/${id}`);
            loadUsers();
        } catch (err) {
            console.log(err);
        }
    };

    // APPROVE user
    const approveUser = async (id) => {
        try {
            await axios.post(`/api/users/${id}/approve`);
            loadUsers();
        } catch (err) {
            console.log(err);
        }
    };

    // Filtered list
    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <Sidebar />

            <div className="main-container">
                <div className="pd-ltr-20 xs-pd-20-10">
                    
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <h4>Manage Users</h4>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Users</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">

                        {/* Search Bar */}
                        <div className="mb-3 d-flex justify-content-between">
                            <input
                                type="text"
                                className="form-control w-25"
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link to="/create-user" className="btn btn-primary">
                                + Add User
                            </Link>
                        </div>

                        {/* User Table */}
                        <div className="table-responsive">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredUsers.length === 0 ? (
                                        <tr><td colSpan="7" className="text-center">No users found</td></tr>
                                    ) : (
                                        filteredUsers.map((u) => (
                                            <tr key={u.id}>
                                                <td>{u.id}</td>
                                                <td>{u.name}</td>
                                                <td>{u.email}</td>
                                                <td>{u.role?.name}</td>

                                                <td>
                                                    {u.status === "active" ? (
                                                        <span className="badge bg-success">Active</span>
                                                    ) : (
                                                        <span className="badge bg-warning">Pending</span>
                                                    )}
                                                </td>

                                                <td>{new Date(u.created_at).toLocaleDateString()}</td>

                                                <td>
                                                    <Link
                                                        to={`/edit-user/${u.id}`}
                                                        className="btn btn-sm btn-info me-2"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        className="btn btn-sm btn-danger me-2"
                                                        onClick={() => deleteUser(u.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                    {u.status !== "active" && (
                                                        <button
                                                            className="btn btn-sm btn-success"
                                                            onClick={() => approveUser(u.id)}
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ManageUser;
