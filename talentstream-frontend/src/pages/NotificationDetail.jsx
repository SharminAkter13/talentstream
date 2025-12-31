import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Master from "../pages/Master"; // Double check this path to Master
const NotificationDetail = () => {
    const { id } = useParams();
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // Fetch all to find the specific one, or hit a specific show endpoint if you have one
                const res = await axios.get('/api/notifications');
                const found = res.data.find(n => n.id == id);
                setNotification(found);
            } catch (err) {
                console.error("Error loading notification:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <Master><div className="pd-20">Loading...</div></Master>;
    if (!notification) return <Master><div className="pd-20">Notification not found.</div></Master>;

    return (
        <Master>
            <div className="pd-20 card-box mb-30">
                <div className="clearfix mb-20">
                    <div className="pull-left">
                        <h4 className="text-blue h4">{notification.title}</h4>
                        <p className="text-muted">
                            {new Date(notification.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="notification-content pb-20">
                    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
                        {notification.message}
                    </p>
                </div>
                <div className="footer">
                    <button className="btn btn-primary" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left"></i> Back
                    </button>
                </div>
            </div>
        </Master>
    );
};

export default NotificationDetail;