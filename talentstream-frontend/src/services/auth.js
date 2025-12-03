import axios from "axios";

// ================================
//  API BASE URL
// ================================
export const API_URL = "http://localhost:8000/api";

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
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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


export default api;
