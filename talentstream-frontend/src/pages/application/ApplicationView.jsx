import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { ASSET_URL, getCurrentUser } from "../../services/auth";
import Master from "../Master";

const ApplicationView = () => {
    const { id } = useParams();
    const [app, setApp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const user = getCurrentUser();
    const isEmployer = user?.role_id === 2;

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                // DYNAMIC PREFIX: This fixes the 403 Forbidden error
                const prefix = isEmployer ? "employer" : "candidate";
                
                const res = await api.get(`/${prefix}/applications/${id}`);
                setApp(res.data.application);
            } catch (err) {
                console.error("Error fetching application:", err);
                setError(err.response?.data?.error || "Failed to load application.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id, isEmployer]);

    if (loading) return <Master><div className="p-5 text-center">Loading...</div></Master>;
    if (error) return <Master><div className="alert alert-danger m-5">{error}</div></Master>;
    if (!app) return <Master><div className="p-5 text-center">Application not found.</div></Master>;

    return (
        <Master>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card p-4 shadow-sm border-0">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4>Application Details</h4>
                                <span className={`badge ${app.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                                    {app.status.toUpperCase()}
                                </span>
                            </div>
                            <hr />
                            
                            {isEmployer ? (
                                <div className="candidate-info mb-4">
                                    <h6 className="text-blue">Applicant Information</h6>
                                    <p className="mb-1"><strong>Name:</strong> {app.candidate?.user?.name}</p>
                                    <p className="mb-1"><strong>Email:</strong> {app.candidate?.user?.email}</p>
                                    <p><strong>Applied for:</strong> {app.job?.title}</p>
                                </div>
                            ) : (
                                <div className="job-info mb-4">
                                    <h6 className="text-blue">Job Information</h6>
                                    <p className="mb-1"><strong>Job Title:</strong> {app.job?.title}</p>
                                    <p className="mb-1"><strong>Company:</strong> {app.job?.employer?.user?.name || app.job?.company_name}</p>
                                    <p><strong>Date Applied:</strong> {new Date(app.applied_date).toLocaleDateString()}</p>
                                </div>
                            )}
                            
                            <h6>Cover Letter:</h6>
                            <div className="p-3 bg-light rounded border">
                                {app.cover_letter || "No cover letter provided."}
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="card p-4 shadow-sm border-0">
                            <h5>Files & Actions</h5>
                            <hr />
                            {app.resume ? (
                                <a 
                                    href={`${ASSET_URL}/storage/${app.resume}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn btn-outline-danger w-100 mb-3"
                                >
                                    <i className="dw dw-file-pdf"></i> Download Resume
                                </a>
                            ) : (
                                <div className="alert alert-warning">No resume uploaded.</div>
                            )}

                            {isEmployer && (
                                <div className="mt-3">
                                    <h6>Update Status</h6>
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-success btn-sm">Accept Candidate</button>
                                        <button className="btn btn-danger btn-sm">Reject Application</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    );
};

export default ApplicationView;