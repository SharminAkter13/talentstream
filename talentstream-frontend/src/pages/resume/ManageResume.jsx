import React, { useEffect, useState } from "react";
import { API_URL, getToken } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import Master from './../Master';
import axios from 'axios'; // Use Axios for cleaner requests

const RESUME_API = "/admin/resumes";

// Helper function to get the base asset URL (removes '/api' if present)
const getAssetBaseUrl = (apiUrl) => {
    return apiUrl.split('/api')[0];
};

const ManageResume = () => {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    // --- Axios Instance Setup ---
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json',
        }
    });

    // --- Fetch All Resumes ---
    const fetchResumes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(RESUME_API);
            // Assuming the controller returns { resumes: [...] }
            setResumes(response.data.resumes); 
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch resumes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    // --- Delete Handler ---
    const handleDelete = async (resumeId) => {
        if (!window.confirm("Are you sure you want to delete this resume and all related data?")) {
            return;
        }

        setDeleteError(null);
        try {
            await axiosInstance.delete(`${RESUME_API}/${resumeId}`);
            
            // Remove the deleted resume from the state
            setResumes(prev => prev.filter(r => r.id !== resumeId));
        } catch (err) {
            setDeleteError(err.response?.data?.message || "Failed to delete resume.");
        }
    };

    if (loading) return <Master><p>Loading resumes...</p></Master>;

    return (
        <Master>
            <h2>Manage Resumes</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {deleteError && <div className="alert alert-warning">{deleteError}</div>}

            <Link to="/create-resume" className="btn btn-success mb-3">
                Create New Resume
            </Link>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {resumes.length > 0 ? (
                        resumes.map((r) => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>
                                    {r.cover_image ? (
                                        <img 
                                            src={`${getAssetBaseUrl(API_URL)}/storage/${r.cover_image}`} 
                                            alt={r.name} 
                                            style={{width: '60px', height: '60px', objectFit: 'cover'}} 
                                        />
                                    ) : (
                                        "No Cover"
                                    )}
                                </td>
                                <td>{r.name}</td>
                                <td>{r.profession_title}</td>
                                <td>{r.email}</td>
                                <td>
                                    <Link 
                                        to={`/edit-resume/${r.id}`} 
                                        className="btn btn-sm btn-info me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(r.id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No resumes found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Master>
    );
};

export default ManageResume;