import axios from "axios";

// ================================
// API BASE URL
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

    // Save token + user to local storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
};

// ================================
// LOGOUT
// ================================
export const logoutUser = async () => {
    try {
        await api.post("/logout"); // Log out user from backend
    } catch (err) {
        console.error("Backend logout failed", err);
    } finally {
        localStorage.removeItem("token"); // Clear token from localStorage
        localStorage.removeItem("user"); // Clear user data from localStorage
        window.location.href = "/login"; // Redirect to login page
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

        // If token is invalid → force logout
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

// ================================
// EMPLOYER JOB CRUD
// ================================
export const getEmployerJobs = async () => {
    const res = await api.get("/employer/manage-jobs");
    return res.data;
};

export const postJob = async (formData) => {
    const res = await api.post("/employer/post-job", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

export const deleteJob = async (jobId) => {
    const res = await api.delete(`/employer/job/${jobId}`);
    return res.data;
};

// ================================
// JOB FORM DATA
// ================================
export const getJobFormData = async () => {
    try {
        const user = getCurrentUser();
        const prefix = user?.role_id === 1 ? "admin" : "employer";
        
        const res = await api.get(`/${prefix}/jobs/create`);
        return res.data;
    } catch (err) {
        console.error("Error fetching dropdown data:", err);
        return { categories: [], locations: [], types: [] };
    }
};

// ================================
// STORE JOB (Multipart for cover_image)
// ================================
export const storeJob = async (formData) => {
    const user = getCurrentUser();
    const prefix = user?.role_id === 1 ? "admin" : "employer";

    const res = await api.post(`/${prefix}/jobs`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

// ================================
// HOME PAGE DATA (Additional)
// ================================
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
