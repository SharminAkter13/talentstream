import React, { useEffect, useState } from "react";
import { API_URL, getToken } from "../../services/auth";
import { useNavigate, useParams } from "react-router-dom";
import Master from './../Master';

const CATEGORY_API = "/categories";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the category ID from the URL parameter

  const [form, setForm] = useState({
    name: "",
    is_active: true, // Use boolean/number for form, send as boolean
    sort_order: 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [currentImagePath, setCurrentImagePath] = useState(null); // To display current image
  const [removeImage, setRemoveImage] = useState(0); // Flag to tell the backend to remove the image

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // --- Fetch Category Data on Component Mount ---
  useEffect(() => {
    const fetchCategory = async () => {
      const token = getToken();

      const res = await fetch(`${API_URL}${CATEGORY_API}/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load category data");
        setLoading(false);
        return;
      }

      // Populate form state with existing category data
      setForm({
        name: data.category.name,
        is_active: data.category.is_active,
        sort_order: data.category.sort_order,
      });

      setCurrentImagePath(data.category.image_path);

      setLoading(false);
    };

    fetchCategory();
  }, [id]);

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

  // --- Handle Form Submission (PUT/PATCH) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const token = getToken();

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

    const res = await fetch(`${API_URL}${CATEGORY_API}/${id}`, {
      method: "POST", // Use POST due to FormData and _method="PUT"
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(
        data.errors
          ? Object.values(data.errors).flat().join(" | ")
          : data.message
      );
      setSubmitting(false);
      return;
    }

    navigate("/manage-categories"); // Navigate to the management view after success
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
                    <img src={`${API_URL}/storage/${currentImagePath}`} alt="Current Category" style={{maxWidth: '150px'}} />
                </div>
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