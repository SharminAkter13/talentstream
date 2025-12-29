import React, { useEffect, useState } from "react";
import { getJobTypes, storeJobType, deleteJobType } from "../../services/auth";
import Master from "../Master";

const ManageJobType = () => {
    const [types, setTypes] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        const data = await getJobTypes();
        setTypes(data.job_types);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await storeJobType(formData);
            setFormData({ name: '', description: '' });
            fetchTypes();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to create job type");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this job type?")) {
            await deleteJobType(id);
            setTypes(types.filter(t => t.id !== id));
        }
    };

    return (
        <Master>
            <div className="card p-4 mb-4 shadow-sm">
                <h4>Manage Employment Types</h4>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Type Name (e.g. Full-time)"
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Short Description"
                            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100">Add Type</button>
                    </div>
                </form>
            </div>

            <table className="table table-hover mt-3">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map(type => (
                        <tr key={type.id}>
                            <td>{type.id}</td>
                            <td><strong>{type.name}</strong></td>
                            <td>{type.description || "—"}</td>
                            <td className="text-end">
                                <button onClick={() => handleDelete(type.id)} className="btn btn-sm btn-outline-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Master>
    );
};

export default ManageJobType;