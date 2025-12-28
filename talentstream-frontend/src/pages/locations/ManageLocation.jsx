import React, { useEffect, useState } from "react";
import { getLocations, deleteLocation, storeLocation } from "../../services/auth";
import Master from "../Master";

const ManageLocation = () => {
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({ country: '', city: '', state: '', address: '' });

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        const data = await getLocations();
        setLocations(data.locations);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await storeLocation(formData);
            setFormData({ country: '', city: '', state: '', address: '' }); // Reset
            fetchLocations(); // Refresh list
        } catch (err) {
            alert("Error adding location");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this location?")) {
            await deleteLocation(id);
            setLocations(locations.filter(loc => loc.id !== id));
        }
    };

    return (
        <Master>
            <div className="card p-4 mb-4">
                <h4>Add New Location</h4>
                <form onSubmit={handleAdd} className="row g-3">
                    <div className="col-md-3">
                        <input type="text" placeholder="Country" className="form-control" value={formData.country} 
                            onChange={e => setFormData({...formData, country: e.target.value})} required />
                    </div>
                    <div className="col-md-3">
                        <input type="text" placeholder="City" className="form-control" value={formData.city} 
                            onChange={e => setFormData({...formData, city: e.target.value})} />
                    </div>
                    <div className="col-md-4">
                        <input type="text" placeholder="Full Address" className="form-control" value={formData.address} 
                            onChange={e => setFormData({...formData, address: e.target.value})} />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100">Add</button>
                    </div>
                </form>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map(loc => (
                        <tr key={loc.id}>
                            <td>{loc.city || 'N/A'}</td>
                            <td>{loc.state || 'N/A'}</td>
                            <td>{loc.country}</td>
                            <td>
                                <button onClick={() => handleDelete(loc.id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Master>
    );
};

export default ManageLocation;