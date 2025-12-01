import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();
    // Use the same base URL as in MyAccount.jsx
    const API_LOGOUT_URL = "http://127.0.0.1:8000/api/logout";

    useEffect(() => {
        const handleLogout = async () => {
            // --- 1. Server-Side Token Revocation ---
            // Axios automatically includes the Authorization header if it was set during login
            // (as seen in MyAccount.jsx).
            try {
                // Attempt to contact Laravel to clear the api_token in the database
                await axios.post(API_LOGOUT_URL);
            } catch (error) {
                // If the token is already expired or the server is unreachable, 
                // the request might fail (e.g., 401 Unauthorized). 
                // We still proceed with client-side cleanup.
                console.warn("Server-side logout failed or connection error. Cleaning up client data.", error);
            }
            
            // --- 2. Client-Side Cleanup ---
            
            // Clear the token and user data from browser storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            
            // Clear the default Authorization header in Axios to prevent sending 
            // a stale token with future requests.
            delete axios.defaults.headers.common["Authorization"];

            // --- 3. Redirect ---
            
            // Redirect the user to the login/register page
            navigate('/my-account'); 
        };

        handleLogout();
        
        // Cleanup function is a good practice, though less critical here
        return () => {}; 
    }, [navigate]);

    return (
        <div>
            
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>👋 Logging you out...</h2>
            <p>Ending session and redirecting to the Login page.</p>
        </div>
        </div>
    );
};

export default Logout;