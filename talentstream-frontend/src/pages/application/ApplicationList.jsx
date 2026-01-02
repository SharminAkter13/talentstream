import React, { useEffect, useState } from "react";
import { api, getCurrentUser } from "../../services/auth";
import Master from "../Master";
import { Link } from "react-router-dom";

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = getCurrentUser();
    const isEmployer = user?.role_id === 2;

    useEffect(() => {
        const fetchApps = async () => {
            try {
                // Determine prefix dynamically to match App.jsx / api.php
                const prefix = isEmployer ? "employer" : "candidate";
                const res = await api.get(`/${prefix}/applications`);
                
                // Laravel pagination nesting: res.data.applications.data
                if (res.data.applications && res.data.applications.data) {
                    setApplications(res.data.applications.data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, [isEmployer]);

    if (loading) return <Master><div className="text-center p-5">Loading...</div></Master>;

    return (
        <Master>
            <div className="container py-4">
                <h3 className="mb-4">{isEmployer ? "Applications Received" : "My Job Applications"}</h3>
                
                <div className="card shadow-sm border-0">
                    <table className="table table-hover align-middle m-0">
                        <thead className="table-light">
                            <tr>
                                <th>{isEmployer ? "Applicant Name" : "Job Title"}</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.length > 0 ? (
                                applications.map((app) => (
                                    <tr key={app.id}>
                                        <td>
                                            <div className="fw-bold">
                                                {/* Corrected path: candidate -> user -> name */}
                                                {isEmployer ? app.candidate?.user?.name : app.job?.title}
                                            </div>
                                            <small className="text-muted">
                                                {isEmployer ? `Job: ${app.job?.title}` : `Ref ID: #${app.id}`}
                                            </small>
                                        </td>
                                        <td>{new Date(app.applied_date).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`badge rounded-pill ${app.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            <Link to={`/application-view/${app.id}`} className="btn btn-sm btn-outline-primary">
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-muted">No applications found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Master>
    );
};

export default ApplicationList;