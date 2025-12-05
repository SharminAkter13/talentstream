import React, { useEffect, useState } from "react";
import { API_URL, getToken,ASSET_URL } from "../../services/auth";
import { useNavigate, useParams } from "react-router-dom";
import Master from './../Master';
// Import Axios
import axios from 'axios'; 

const CATEGORY_API = "/admin/categories";

const EditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [form, setForm] = useState({
        name: "",
        is_active: true, 
        sort_order: 0,
    });

    const [imageFile, setImageFile] = useState(null);
    const [currentImagePath, setCurrentImagePath] = useState(null); 
    const [removeImage, setRemoveImage] = useState(0); 

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // --- Axios Configuration ---
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json',
        }
    });

    // --- Fetch Category Data on Component Mount (Axios GET) ---
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axiosInstance.get(`${CATEGORY_API}/${id}`);

                // Populate form state with existing category data
                setForm({
                    name: response.data.category.name,
                    // Ensure boolean conversion if necessary, though Laravel often returns 0/1 which JS treats as falsy/truthy
                    is_active: !!response.data.category.is_active, 
                    sort_order: response.data.category.sort_order,
                });

                setCurrentImagePath(response.data.category.image_path);
            } catch (err) {
                // Axios error handling
                setError(err.response?.data?.message || "Failed to load category data.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id, axiosInstance]); // Include axiosInstance as a dependency

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFile = (e) => {
        setImageFile(e.target.files[0]);
        setRemoveImage(0); // If a new file is selected, cancel the removal flag
    };

    const handleRemoveImage = (e) => {
        setRemoveImage(e.target.checked ? 1 : 0);
        if (e.target.checked) {
            setImageFile(null); // Clear file selection if removing current image
        }
    }

    // --- Handle Form Submission (Axios POST with _method: PUT) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const formData = new FormData();
        
        // Laravel requires the method to be explicitly set for PUT/PATCH with FormData
        formData.append("_method", "PUT"); 
        
        // Append form data
        Object.entries(form).forEach(([key, val]) => {
            // Ensure boolean values are sent as 1 or 0
            formData.append(key, typeof val === 'boolean' ? (val ? 1 : 0) : val);
        });

        if (imageFile) {
            formData.append("image_path", imageFile);
        }
        
        // Send the remove_image flag to the controller
        formData.append("remove_image", removeImage); 

        try {
            // Use POST with _method: PUT for file upload
            await axiosInstance.post(`${CATEGORY_API}/${id}`, formData, {
                // Ensure Axios does not try to set Content-Type: application/json
                // Content-Type will be automatically set to multipart/form-data
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });

            // Navigate to the management view after success
            navigate("/manage-categories");
        } catch (err) {
            const responseData = err.response?.data;
            let errorMessage = responseData?.message || "An unexpected error occurred.";

            // Display validation errors if they exist
            if (responseData?.errors) {
                errorMessage = Object.values(responseData.errors).flat().join(" | ");
            }
            
            setError(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <Master>
            <h2>Edit Category: {form.name}</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="fw-bold">Category Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="fw-bold">Current Image</label>
                    {currentImagePath && (
                        <div className="mb-2">
                            {/* Assuming images are accessible via /storage/ */}
<img 
                // Use the correct base URL and currentImagePath
                src={`${API_URL.split('/api')[0]}/storage/${currentImagePath}`} 
                alt={form.name} // Use form.name for alt text
                style={{maxWidth: '150px'}} 
            />                        </div>
                    )}

                    <div className="form-check mb-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="removeImageCheck"
                            checked={removeImage === 1}
                            onChange={handleRemoveImage}
                        />
                        <label className="form-check-label" htmlFor="removeImageCheck">
                            Remove Current Image
                        </label>
                    </div>
                    
                    <label className="fw-bold">Upload New Image (Optional)</label>
                    <input
                        type="file"
                        name="image_path"
                        className="form-control"
                        onChange={handleFile}
                        disabled={removeImage === 1} // Disable if remove is checked
                    />
                </div>
                
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        name="is_active"
                        className="form-check-input"
                        id="isActiveCheck"
                        checked={form.is_active}
                        onChange={handleChange}
                    />
                    <label className="form-check-label fw-bold" htmlFor="isActiveCheck">
                        Is Active
                    </label>
                </div>

                <div className="mb-3">
                    <label className="fw-bold">Sort Order</label>
                    <input
                        type="number"
                        name="sort_order"
                        className="form-control"
                        value={form.sort_order}
                        onChange={handleChange}
                        min="0"
                    />
                </div>

                <button className="btn btn-primary" disabled={submitting}>
                    {submitting ? "Updating..." : "Update Category"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/manage-categories")}
                >
                    Cancel
                </button>

            </form>
        </Master>
    );
};

export default EditCategory;