import React, { useState, useEffect } from "react";
import axios from "axios";
import Master from "../layouts/Master";

const JobAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        keywords: "",
        location: "",
        contract_type: "full-time",
        frequency: "daily"
    });

    // Fetch alerts on load
    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            const res = await axios.get('/api/job-alerts');
            // Accessing the paginated data from the controller
            setAlerts(res.data.jobAlerts.data); 
            setLoading(false);
        } catch (err) {
            console.error("Error fetching alerts", err);
        }
    };

    const handleEdit = (alert) => {
        setFormData({
            id: alert.id,
            title: alert.title,
            keywords: alert.keywords || "",
            location: alert.location || "",
            contract_type: alert.contract_type,
            frequency: alert.frequency
        });
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({ id: null, title: "", keywords: "", location: "", contract_type: "full-time", frequency: "daily" });
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Controller update method
                await axios.put(`/api/job-alerts/${formData.id}`, formData);
            } else {
                // Controller store method
                await axios.post('/api/job-alerts', formData);
            }
            resetForm();
            fetchAlerts();
        } catch (error) {
            console.error("Submission failed", error.response?.data);
        }
    };

    const deleteAlert = async (id) => {
        if (window.confirm("Delete this alert?")) {
            // Controller destroy method
            await axios.delete(`/api/job-alerts/${id}`);
            fetchAlerts();
        }
    };

    return (
        <Master>
            <div className="row">
                {/* LEFT COLUMN: FORM */}
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mb-30">
                    <div className="pd-20 card-box">
                        <h5 className="h4 text-blue mb-20">
                            {isEditing ? "Update Alert" : "Create New Alert"}
                        </h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Alert Title</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={formData.title} 
                                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Keywords</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={formData.keywords} 
                                    onChange={(e) => setFormData({...formData, keywords: e.target.value})} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Frequency</label>
                                <select 
                                    className="form-control" 
                                    value={formData.frequency} 
                                    onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                {isEditing ? "Save Changes" : "Create Alert"}
                            </button>
                            {isEditing && (
                                <button type="button" className="btn btn-outline-secondary btn-block mt-2" onClick={resetForm}>
                                    Cancel
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* RIGHT COLUMN: LIST */}
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 mb-30">
                    <div className="pd-20 card-box">
                        <h5 className="h4 text-blue mb-20">My Active Alerts</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Frequency</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alerts.map(alert => (
                                    <tr key={alert.id}>
                                        <td>
                                            <strong>{alert.title}</strong><br/>
                                            <small className="text-muted">{alert.location || 'All Locations'}</small>
                                        </td>
                                        <td><span className="badge badge-pill badge-info">{alert.frequency}</span></td>
                                        <td>
                                            <button onClick={() => handleEdit(alert)} className="btn btn-link p-0 mr-2">Edit</button>
                                            <button onClick={() => deleteAlert(alert.id)} className="btn btn-link text-danger p-0">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Master>
    );
};

export default JobAlerts;