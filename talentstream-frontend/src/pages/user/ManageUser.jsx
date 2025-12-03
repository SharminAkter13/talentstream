import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";
import { Link, useParams } from "react-router-dom"; // useParams is not used here, but okay to import
import axios from "axios";
import { API_URL, getToken } from "../../services/auth";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // FIX: Using getToken() from the imported auth service (assuming correct)
  const token = getToken();

  // Load users
  const loadUsers = useCallback(async () => {
    // SECURITY CHECK: If no token, prevent API call and stop loading
    if (!token) {
        setLoading(false);
        console.error("No authentication token found. User is likely logged out.");
        return; 
    }

    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data)) setUsers(res.data);
      else setUsers([]);
    } catch (err) {
      console.error("Error loading users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    if (!token) return; 

    try {
      await axios.delete(`${API_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error deleting user.");
    }
  };

  // Approve user
  const approveUser = async (id) => {
    if (!token) return; 

    try {
      await axios.post(`${API_URL}/admin/users/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error approving user.");
    }
  };

  // Filter users by search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="main-container">
        <div className="pd-ltr-20 xs-pd-20-10">
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
            <div className="mb-3 d-flex justify-content-between">
              <input
                type="text"
                className="form-control w-25"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Link to="/add-user" className="btn btn-primary">
                + Add User
              </Link>
            </div>

            <div className="table-responsive">
              {loading ? (
                <div className="text-center py-5">Loading users...</div>
              ) : (
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
                      <tr>
                        <td colSpan="7" className="text-center">
                          No users found
                        </td>
                      </tr>
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
                            {/* THIS IS THE CRITICAL LINE, MUST BE /edit-user/${u.id} */}
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
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageUser;