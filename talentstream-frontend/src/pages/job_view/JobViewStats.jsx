import React, { useEffect, useState } from "react";
import { getJobViewStats } from "../../services/auth";
import Master from "../Master";

const JobViewStats = () => {
    const [views, setViews] = useState([]);

    useEffect(() => {
        getJobViewStats().then(data => setViews(data.job_views.data));
    }, []);

    return (
        <Master>
            <h4>Job View Analytics</h4>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Viewer</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {views.map(view => (
                        <tr key={view.id}>
                            <td>{view.job?.title}</td>
                            <td>{view.viewer?.name || "Anonymous"}</td>
                            <td>{new Date(view.viewed_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Master>
    );
};

export default JobViewStats;