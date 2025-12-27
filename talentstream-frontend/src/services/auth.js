import axios from "axios";

// ================================
//  API BASE URL
// ================================
export const API_URL = "http://127.0.0.1:8000/api";
export const ASSET_URL = "http://localhost/talentstream/talentstream-backend/public";
// ================================
// TOKEN + USER HELPERS
// ================================
export const getToken = () => localStorage.getItem("token");
export const getCurrentUser = () => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
};

export const isLoggedIn = () => !!getToken();

export const hasRole = (roleId) => {
    const user = getCurrentUser();
    return user && user.role_id === roleId;
};

// ================================
// AXIOS INSTANCE (AUTO AUTH HEADER)
// ================================
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token automatically
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ================================
// LOGIN (FIXED)
// Laravel returns: { token, user }
// ================================
export const loginUser = async (credentials) => {
    const res = await axios.post(`${API_URL}/login`, credentials);

    const { token, user } = res.data;

    // Save token + user
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
};

// ================================
// LOGOUT
// ================================
// export const logoutUser = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
// };

export const logoutUser = async () => {
    try {
        await api.post("/logout"); 
    } catch (err) {
        console.error("Backend logout failed", err);
    } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login"; // Redirect user
    }
};
// ================================
// FETCH USER FROM BACKEND (AUTH)
// ================================
export const getUserInfo = async () => {
    try {
        const res = await api.get("/user");
        return res.data;
    } catch (err) {
        console.error("User fetch error:", err);
        
        // If token invalid → force logout
        logoutUser();

        return null;
    }
};

// ================================
// FETCH NOTIFICATIONS
// ================================
export const getNotifications = async () => {
    try {
        const res = await api.get("/notifications");
        return res.data;
    } catch (err) {
        console.error("Notification fetch error:", err);
        return [];
    }
};

// ================================
// FETCH MESSAGES
// ================================
export const getMessages = async (otherUserId) => {
  try {
    const response = await api.get(`/chat/messages/${otherUserId}`);
    return response.data;
  } catch (error) {
    console.error("Message fetch error:", error);
    return [];
  }
};
// ================================
// HOME PAGE DATA FETCHING
// ================================

// Fetch all categories with job counts
export const getCategories = async () => {
    try {
        const res = await api.get("/browse-categories");
        return res.data || []; 
    } catch (err) {
        console.error("Home data load error", err);
        return [];
    }
};
// Fetch latest 6 jobs
export const getLatestJobs = async () => {
    const res = await api.get("/browse-jobs");
    return res.data;
};


// auth.js or api.js

export const getEmployerJobs = async () => {
    const res = await api.get("/employer/manage-jobs");
    return res.data;
};

export const postJob = async (formData) => {
    // Note: Use 'multipart/form-data' if you are uploading an image
    const res = await api.post("/employer/post-job", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
};

export const deleteJob = async (jobId) => {
    const res = await api.delete(`/employer/job/${jobId}`);
    return res.data;
};

// Add this new function to auth.js
export const getHomePortalData = async () => {
    try {
        const res = await api.get("/portal-data"); 
        return res.data;
    } catch (err) {
        console.error("Home data fetch error", err);
        return { categories: [], jobs: [] };
    }
};
export default api;
