import React, { useState } from "react";
import { api } from "../services/auth"; // Braces are now correct
const ApplyJobForm = ({ job }) => {
    const [coverLetter, setCoverLetter] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append("job_id", job.id);
        formData.append("employer_id", job.employer_id); // Required by your migration
        formData.append("resume", resumeFile); // This maps to your resume upload logic
        formData.append("cover_letter", coverLetter);

        try {
            await api.post(`/candidate/jobs/${job.id}/apply`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Application submitted successfully!");
        } catch (err) {
            alert(err.response?.data?.error || "Failed to apply");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="card p-4 shadow-sm">
            <h5>Apply for this Job</h5>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label className="form-label">Upload Resume (PDF)</label>
                    <input type="file" className="form-control" onChange={e => setResumeFile(e.target.files[0])} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cover Letter</label>
                    <textarea className="form-control" rows="4" value={coverLetter} onChange={e => setCoverLetter(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={submitting}>
                    {submitting ? "Applying..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
};

export default ApplyJobForm;