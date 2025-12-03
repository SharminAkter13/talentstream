import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, getToken } from "../../services/auth";

const EditUser = () => {
    // This expects the ID to come from the URL parameter (e.g., /edit-user/3)
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        const token = getToken();

        // Check if ID is available before fetching
        if (!id) {
            setError("Error: User ID is missing from the URL.");
            setLoading(false);
            return;
        }

        if (!token) {
            setError("Authentication token missing. Please log in again.");
            setLoading(false);
            return;
        }

        try {
            // FIX: This API call relies on 'id' being correct (not 'undefined')
            const res = await axios.get(`${API_URL}/admin/users/${id}/edit`, {
                 headers: { Authorization: `Bearer ${token}` },
            }); 

            const { user, roles } = res.data;

            // Defensive check for structure (previous error)
            if (!user || !roles) {
                throw new Error("Invalid data structure returned by the server.");
            }

            setForm({
                name: user.name,
                email: user.email,
                password: "", 
                role_id: user.role_id,
                status: user.status,
            });

            if (Array.isArray(roles)) {
                setRoles(roles);
            } else {
                console.error("Roles data is not an array:", roles);
                setRoles([]);
            }
            
        } catch (err) {
            console.error("Error fetching user data:", err.response?.data || err.message);
            setError(`Failed to load user data: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();

        if (!token) {
            alert("Authentication failed. Please log in.");
            return;
        }

        try {
            await axios.put(`${API_URL}/admin/users/${id}`, form, {
                 headers: { Authorization: `Bearer ${token}` },
            }); 
            navigate("/manage-user"); // Note: Corrected to /manage-user based on App.jsx route
        } catch (err) {
            console.error("Error updating user:", err.response?.data || err.message);
            alert("Update failed: " + (err.response?.data?.error || err.response?.data?.message || "Check console for details."));
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [id]);


    if (loading) {
        return (
            <div>
                <Navbar /><Sidebar />
                <div className="main-container"><div className="text-center py-5">Loading user data...</div></div>
                <Footer />
            </div>
        );
    }

    if (error) {
         return (
            <div>
                <Navbar /><Sidebar />
                <div className="main-container"><div className="pd-ltr-20 xs-pd-20-10"><div className="alert alert-danger">{error}</div></div></div>
                <Footer />
            </div>
        );
    }
    
    // ... (Rest of the component's JSX remains the same)

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
                                            <li className="breadcrumb-item"><a href="/manage-user">Users</a></li>
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
                                                    <option value="banned">Banned</option>
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