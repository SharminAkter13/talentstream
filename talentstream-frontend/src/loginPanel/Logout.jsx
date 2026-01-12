import React, { useEffect } from 'react';
// Import the centralized logout function
import { logoutUser } from '../services/auth'; 

const Logout = () => {
    useEffect(() => {
        // Triggers API call, clears storage, and redirects
        logoutUser(); 
    }, []);

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>👋 Logging you out...</h2>
            <p>Ending session and redirecting to the Login page.</p>
        </div>
    );
};

export default Logout;