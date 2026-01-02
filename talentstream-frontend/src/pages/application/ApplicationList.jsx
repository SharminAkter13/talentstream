import React, { useEffect, useState } from "react";
import  api,{ getCurrentUser } from "../../services/auth";
import Master from "../Master";
import { Link } from "react-router-dom";

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = getCurrentUser();
    
    // role_id 2 = Employer, 3 = Candidate (verify with your DB)
    const isEmployer = user?.role_id === 2; 

    useEffect(() => {
        const fetchApps = async () => {
            try {
                // The backend controller you provided filters this automatically
                const res = await api.get("/candidate/applications");
                setApplications(res.data.applications.data || []);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, []);

    if (loading) return <Master><div className="text-center p-5">Loading...</div></Master>;

    return (
        <Master>
            <div className="container py-4">
                <h3 className="mb-4">{isEmployer ? "Managed Applications" : "My Applications"}</h3>
                
                <div className="card shadow-sm border-0">
                    <table className="table align-middle m-0">
                        <thead className="table-light">
                            <tr>
                                <th>{isEmployer ? "Applicant" : "Applied For"}</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id}>
                                    <td>
                                        <div className="fw-bold">
                                            {/* If employer, show candidate name. If candidate, show job title */}
                                            {isEmployer ? app.candidate?.name : app.job?.title}
                                        </div>
                                        <small className="text-muted">
                                            {isEmployer ? `Job: ${app.job?.title}` : `Company: ${app.job?.company_name}`}
                                        </small>
                                    </td>
                                    <td>{new Date(app.applied_date).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge rounded-pill ${app.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <Link to={`/application-view/${app.id}`} className="btn btn-sm btn-primary">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Master>
    );
};

export default ApplicationList;