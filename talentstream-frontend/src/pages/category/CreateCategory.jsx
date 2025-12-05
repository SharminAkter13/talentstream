import React, { useState } from "react";
import { API_URL, getToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Master from './../Master';

const CATEGORY_API = "/categories";

const CreateCategory = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    is_active: true, // Default to active
    sort_order: 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFile = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const token = getToken();

    const formData = new FormData();
    
    // Append form data
    Object.entries(form).forEach(([key, val]) => {
      // Ensure boolean values are sent as 1 or 0 for the backend (as expected by $request->boolean('is_active') in CategoryController)
      formData.append(key, typeof val === 'boolean' ? (val ? 1 : 0) : val);
    });

    if (imageFile) {
      formData.append("image_path", imageFile);
    }

    const res = await fetch(`${API_URL}${CATEGORY_API}`, {
      method: "POST",
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

    // Navigate to the management view after success
    navigate("/manage-categories");
  };

  return (
    <Master>
      <h2>Create New Category</h2>

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
          <label className="fw-bold">Category Image (Optional)</label>
          <input
            type="file"
            name="image_path"
            className="form-control"
            onChange={handleFile}
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

        <button className="btn btn-success" disabled={submitting}>
          {submitting ? "Creating..." : "Create Category"}
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

export default CreateCategory;