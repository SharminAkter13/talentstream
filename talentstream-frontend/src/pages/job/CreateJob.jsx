import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJobFormData, storeJob } from "../../services/auth"; // Update path if necessary
import Swal from "sweetalert2";
import Master from "../Master";

const CreateJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Data for Dropdowns
    const [formOptions, setFormOptions] = useState({
        categories: [],
        locations: [],
        types: [],
    });

    // Form State (Matching Model $fillable)
    const [formData, setFormData] = useState({
        title: "",
        category_id: "",
        job_location_id: "",
        job_type_id: "",
        description: "",
        application_email: "",
        application_url: "",
        closing_date: "",
        tagline: "",
        tags: "",
        status: "active",
    });

    const [coverImage, setCoverImage] = useState(null);

    // Load Dropdowns on Mount
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await getJobFormData();
                setFormOptions({
                    categories: data.categories || [],
                    locations: data.locations || [],
                    types: data.types || [],
                });
            } catch (err) {
                console.error("Error loading form data", err);
            }
        };
        fetchOptions();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setCoverImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const submissionData = new FormData();
        Object.keys(formData).forEach((key) => {
            submissionData.append(key, formData[key]);
        });
        if (coverImage) {
            submissionData.append("cover_image", coverImage);
        }

        try {
            await storeJob(submissionData);
            Swal.fire("Success", "Job posted successfully!", "success");
            navigate("/job-list");
        } catch (error) {
            const msg = error.response?.data?.message || "Something went wrong";
            Swal.fire("Error", msg, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Master>
            <div className="pd-20 card-box mb-30">
                <div className="clearfix mb-20">
                    <div className="pull-left">
                        <h4 className="text-blue h4">Create New Job Listing</h4>
                        <p>Only authorized employers can post listings.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Job Title <span className="text-danger">*</span></label>
                                <input name="title" type="text" className="form-control" onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Category <span className="text-danger">*</span></label>
                                <select name="category_id" className="form-control" onChange={handleChange} required>
                                    <option value="">Select Category</option>
                                    {formOptions.categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Location <span className="text-danger">*</span></label>
                                <select name="job_location_id" className="form-control" onChange={handleChange} required>
                                    <option value="">Select Location</option>
                                    {formOptions.locations.map(loc => (
                                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Job Type <span className="text-danger">*</span></label>
                                <select name="job_type_id" className="form-control" onChange={handleChange} required>
                                    <option value="">Select Type</option>
                                    {formOptions.types.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Job Description <span className="text-danger">*</span></label>
                        <textarea name="description" className="form-control" rows="5" onChange={handleChange} required></textarea>
                    </div>

                    <div className="form-group">
                        <label>Cover Image</label>
                        <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
                    </div>

                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Processing..." : "Create Job Listing"}
                        </button>
                    </div>
                </form>
            </div>
        </Master>
    );
};

export default CreateJob;
