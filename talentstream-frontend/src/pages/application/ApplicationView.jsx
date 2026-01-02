import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { ASSET_URL, getCurrentUser } from "../../services/auth";
import Master from "../Master";

const ApplicationView = () => {
    const { id } = useParams();
    const [app, setApp] = useState(null);
    const user = getCurrentUser();
    const isEmployer = user?.role_id === 2;

    useEffect(() => {
        api.get(`/candidate/applications/${id}`).then(res => setApp(res.data.application));
    }, [id]);

    if (!app) return <Master>Loading...</Master>;

    return (
        <Master>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card p-4 shadow-sm border-0">
                            <h4>Application Details</h4>
                            <hr />
                            {isEmployer ? (
                                <div className="candidate-info mb-4">
                                    <h6>Applicant: {app.candidate?.user?.name}</h6>
                                    <p>Email: {app.candidate?.user?.email}</p>
                                </div>
                            ) : (
                                <div className="job-info mb-4">
                                    <h6>Job Title: {app.job?.title}</h6>
                                    <p>Company: {app.job?.company_name}</p>
                                </div>
                            )}
                            
                            <h6>Cover Letter:</h6>
                            <p className="p-3 bg-light rounded">{app.cover_letter || "No message provided."}</p>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="card p-4 shadow-sm border-0">
                            <h5>Files & Actions</h5>
                            <a href={`${ASSET_URL}/storage/${app.resume}`} target="_blank" className="btn btn-outline-danger w-100 mb-3">
                                <i className="bi bi-file-earmark-pdf"></i> Download Resume
                            </a>
                            <div className="alert alert-info py-2">
                                <small>Status: <strong>{app.status.toUpperCase()}</strong></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    );
};

export default ApplicationView;