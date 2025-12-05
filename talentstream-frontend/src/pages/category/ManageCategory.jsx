import React, { useEffect, useState } from "react";
import { API_URL, getToken } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import Master from './../Master';

const CATEGORY_API = "/categories";

const ManageCategory = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    // --- Fetch All Categories ---
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        const token = getToken();

        const res = await fetch(`${API_URL}${CATEGORY_API}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message || "Failed to fetch categories");
            setLoading(false);
            return;
        }

        // Controller returns { categories: [...] }
        setCategories(data.categories);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // --- Delete Handler ---
    const handleDelete = async (categoryId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }

        setDeleteError(null);
        const token = getToken();

        const res = await fetch(`${API_URL}${CATEGORY_API}/${categoryId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            const data = await res.json();
            setDeleteError(data.message || "Failed to delete category.");
            return;
        }

        // Remove the deleted category from the state
        setCategories(prev => prev.filter(c => c.id !== categoryId));
    };

    if (loading) return <p>Loading categories...</p>;

    return (
        <Master>
            <h2>Manage Categories</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {deleteError && <div className="alert alert-warning">{deleteError}</div>}

            <Link to="/create-category" className="btn btn-success mb-3">
                Create New Category
            </Link>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Active</th>
                        <th>Sort Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>
                                    {c.image_path ? (
                                        <img 
                                            src={`${API_URL}/storage/${c.image_path}`} 
                                            alt={c.name} 
                                            style={{width: '50px', height: '50px', objectFit: 'cover'}} 
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td>{c.name}</td>
                                <td>{c.is_active ? 'Yes' : 'No'}</td>
                                <td>{c.sort_order}</td>
                                <td>
                                    <Link 
                                        to={`/edit-category/${c.id}`} 
                                        className="btn btn-sm btn-info me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(c.id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No categories found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Master>
    );
};

export default ManageCategory;