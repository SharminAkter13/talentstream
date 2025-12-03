import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role_id: "",
        status: "",
    });

    const [roles, setRoles] = useState([]);


    // GET /users/{id}/edit
    const fetchUser = async () => {
        try {
            const res = await axios.get(`/api/users/${id}`);
            setForm({
                name: res.data.name,
                email: res.data.email,
                password: "",
                role_id: res.data.role_id,
                status: res.data.status,
            });
        } catch (err) {
            console.log(err);
        }
    };

    // GET /roles
    const fetchRoles = async () => {
        try {
            const res = await axios.get("/api/roles");
            setRoles(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // PUT /users/{id}
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/users/${id}`, form);
            navigate("/manage-users");
        } catch (err) {
            console.log(err);
        }
    };
        useEffect(() => {
        fetchUser();
        fetchRoles();
    }, []);


    return (
        <div>
            <Navbar />
            <Sidebar />

            <div className="main-container">
                <div className="pd-ltr-20 xs-pd-20-10">
                    <div className="min-height-200px">

                        <div className="page-header">
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <h4>Edit User</h4>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                                            <li className="breadcrumb-item"><a href="#">Users</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Edit</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
                            <div className="card">
                                <div className="card-body">

                                    <form onSubmit={handleSubmit}>
                                        <div className="row">

                                            {/* Name */}
                                            <div className="form-group col-md-6">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Email */}
                                            <div className="form-group col-md-6">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            {/* Password */}
                                            <div className="form-group col-md-6">
                                                <label>Password (Leave blank to keep same)</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    value={form.password}
                                                    onChange={handleChange}
                                                    placeholder="Enter new password"
                                                />
                                            </div>

                                            {/* Role */}
                                            <div className="form-group col-md-6">
                                                <label>Role</label>
                                                <select
                                                    className="form-control"
                                                    name="role_id"
                                                    value={form.role_id}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Role</option>
                                                    {roles.map((role) => (
                                                        <option key={role.id} value={role.id}>
                                                            {role.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Status */}
                                            <div className="form-group col-md-6">
                                                <label>Status</label>
                                                <select
                                                    className="form-control"
                                                    name="status"
                                                    value={form.status}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="pending">Pending</option>
                                                </select>
                                            </div>

                                        </div>

                                        <button type="submit" className="btn btn-primary mt-3">
                                            Update User
                                        </button>

                                    </form>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EditUser;
