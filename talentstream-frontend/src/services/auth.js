// services/auth.js
import axios from 'axios';

// --- CONFIGURATION ---
// 🚨 IMPORTANT: Replace with your actual Laravel API base URL
const API_URL = 'http://localhost:8000/api'; 

// Function to get the current authentication token (e.g., from local storage)
const getAuthToken = () => {
    // Replace 'authToken' with the actual key you use to store the Bearer token
    return localStorage.getItem('authToken'); 
};

// Create a configured Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach the JWT token to every request
api.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// --- EXISTING FUNCTIONS ---

export const getCurrentUser = () => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
};

export const hasRole = (roleId) => {
    const user = getCurrentUser();
    return user && user.role_id === roleId;
};

// --- NEW DYNAMIC FETCH FUNCTIONS ---

/**
 * Fetches detailed user information (name, avatar, role_id) from the backend.
 * Laravel Endpoint: /api/user
 */
export const getUserInfo = async () => {
    try {
        // Assuming Laravel provides user details via a protected '/user' route
        const response = await api.get('/user'); 
        
        // Return the user data (e.g., { id: 1, name: '...', avatar: '...', role_id: 1 })
        return response.data; 
    } catch (error) {
        console.error("Error fetching user info:", error);
        // Fallback to local storage or return null/default structure
        return getCurrentUser() || { name: 'Guest', avatar: '/default-avatar.jpg', role_id: 0 };
    }
};

/**
 * Fetches the list of notifications for the current user.
 * Laravel Endpoint: /api/notifications
 */
export const getNotifications = async () => {
    try {
        const response = await api.get('/notifications'); 
        // Example structure: [{ title: '...', message: '...', read: false, link: '...' }]
        return response.data; 
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return []; // Return an empty array on failure
    }
};

/**
 * Fetches the list of messages for the current user.
 * Laravel Endpoint: /api/messages
 */
export const getMessages = async () => {
    try {
        const response = await api.get('/messages'); 
        // Example structure: [{ id: 1, sender: '...', text: '...', avatar: '...', read: false }]
        return response.data; 
    } catch (error) {
        console.error("Error fetching messages:", error);
        return []; // Return an empty array on failure
    }
};

// You might also want a generic login/logout function
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { access_token, user } = response.data;

        // Store token for future authenticated requests
        localStorage.setItem('authToken', access_token);
        // Store basic user info for quick client-side checks
        localStorage.setItem('user', JSON.stringify(user)); 
        
        return user;
    } catch (error) {
        // Handle login errors
        throw error.response.data; 
    }
};