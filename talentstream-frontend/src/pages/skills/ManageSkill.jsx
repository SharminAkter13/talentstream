import React, { useEffect, useState } from "react";
import { getSkills, deleteSkill, storeSkill } from "../../services/auth";
import Master from "../Master";

const ManageSkill = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ name: '', amount: '', price: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        const data = await getSkills();
        setSkills(data.skills);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await storeSkill(formData);
            setFormData({ name: '', amount: '', price: '' });
            fetchSkills();
        } catch (err) {
            alert(err.response?.data?.message || "Error adding skill");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            await deleteSkill(id);
            setSkills(skills.filter(s => s.id !== id));
        }
    };

    return (
        <Master>
            <div className="card p-4 mb-4 shadow-sm">
                <h4>Add New Job Skill</h4>
                <form onSubmit={handleAdd} className="row g-3">
                    <div className="col-md-4">
                        <input type="text" placeholder="Skill Name (e.g. PHP)" className="form-control" 
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="col-md-3">
                        <input type="number" placeholder="Amount" className="form-control" 
                            value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                    </div>
                    <div className="col-md-3">
                        <input type="number" step="0.01" placeholder="Price" className="form-control" 
                            value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Adding..." : "Add Skill"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map(skill => (
                            <tr key={skill.id}>
                                <td><strong>{skill.name}</strong></td>
                                <td>{skill.amount || 0}</td>
                                <td>${skill.price || '0.00'}</td>
                                <td className="text-end">
                                    <button onClick={() => handleDelete(skill.id)} className="btn btn-sm btn-outline-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Master>
    );
};

export default ManageSkill;