import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { recordJobView, api } from "../../services/auth";

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        // 1. Fetch Job Details
        api.get(`/jobs/${id}`).then(res => setJob(res.data));

        // 2. Record the view for analytics
        recordJobView(id);
    }, [id]);

    if (!job) return <div>Loading...</div>;

    return (
        
        <div className="job-container">
            <h1>{job.title}</h1>
            <p>{job.description}</p>
            {/* ... other job details */}
        </div>
    );
};
export default JobDetails;