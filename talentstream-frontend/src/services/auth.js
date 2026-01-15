import axios from "axios";

// ================================
// API BASE URL
// ================================

export const API_URL = "http://127.0.0.1:8000/api"; 
export const ASSET_URL = "http://127.0.0.1:8000";

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
export const api = axios.create({
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
// export const getEmployerJobs = async () => {
//     const res = await api.get("/employer/manage-jobs");
//     return res.data;
// };

export const postJob = async (formData) => {
    const res = await api.post("/employer/post-job", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};

// export const deleteJob = async (jobId) => {
//     const res = await api.delete(`/employer/job/${jobId}`);
//     return res.data;
// };

// ================================
// JOB FORM DATA
// ================================
// export const getJobFormData = async () => {
//     try {
//         const user = getCurrentUser();
//         const prefix = user?.role_id === 1 ? "admin" : "employer";
        
//         const res = await api.get(`/${prefix}/jobs/create`);
//         return res.data;
//     } catch (err) {
//         console.error("Error fetching dropdown data:", err);
//         return { categories: [], locations: [], types: [] };
//     }
// };

// ================================
// STORE JOB (Multipart for cover_image)
// ================================
// export const storeJob = async (formData) => {
//     const user = getCurrentUser();
//     const prefix = user?.role_id === 1 ? "admin" : "employer";

//     const res = await api.post(`/${prefix}/jobs`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data;
// };

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

/* ============================
   EMPLOYER JOB CRUD API
============================= */

// Fetch employer jobs
export const getEmployerJobs = async () => {
    const res = await api.get("/employer/jobs");
    return res.data.jobs;
};

// Fetch dropdown data (categories, locations, types)
export const getJobFormData = async () => {
    const res = await api.get("/employer/jobs/create");
    return res.data;
};

// Store job (with image)
export const storeJob = async (formData) => {
    const res = await api.post("/employer/jobs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

// Fetch single job
export const getSingleJob = async (id) => {
    const res = await api.get(`/employer/jobs/${id}`);
    return res.data;
};

// Update job
export const updateJob = async (id, formData) => {
    formData.append("_method", "PUT");
    const res = await api.post(`/employer/jobs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

// Delete job
export const deleteJob = async (id) => {
    const res = await api.delete(`/employer/jobs/${id}`);
    return res.data;
};
export const getLocations = async () => {
    const res = await api.get("/admin/locations");
    return res.data;
};

export const storeLocation = async (data) => {
    const res = await api.post("/admin/locations", data);
    return res.data;
};

export const deleteLocation = async (id) => {
    const res = await api.delete(`/admin/locations/${id}`);
    return res.data;
};

export const getSkills = async () => {
    const res = await api.get("/admin/skills");
    return res.data;
};

export const storeSkill = async (data) => {
    const res = await api.post("/admin/skills", data);
    return res.data;
};

export const deleteSkill = async (id) => {
    const res = await api.delete(`/admin/skills/${id}`);
    return res.data;
};

export const getJobTypes = async () => {
    const res = await api.get("/admin/job-types");
    return res.data;
};

export const storeJobType = async (data) => {
    const res = await api.post("/admin/job-types", data);
    return res.data;
};

export const deleteJobType = async (id) => {
    const res = await api.delete(`/admin/job-types/${id}`);
    return res.data;
};

export const recordJobView = async (jobId) => {
    try {
        const res = await api.post(`/jobs/${jobId}/view`);
        return res.data;
    } catch (err) {
        // Silently fail as this shouldn't break the user experience
        console.error("Analytics Error:", err);
    }
};

export const getJobViewStats = async () => {
    const res = await api.get("/job-statistics/views");
    return res.data;
};
/* ============================
   CANDIDATE RESUME API
============================= */

// Fetch all resumes for the logged-in candidate
export const getCandidateResumes = async () => {
    const res = await api.get("/candidate/resumes");
    // Based on your ResumeController.php, data is wrapped in a 'data' key
    return res.data.data; 
};

// Get a single resume by ID
export const getResumeDetail = async (id) => {
    const res = await api.get(`/candidate/resumes/${id}`);
    return res.data;
};

// Store a new resume (Multipart for cover_image)
export const storeResume = async (formData) => {
    const res = await api.post("/candidate/resumes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

// Update an existing resume
// We use POST with _method=POST or just POST because files don't work well with PUT in Laravel
export const updateResume = async (id, formData) => {
    const res = await api.post(`/candidate/resumes/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

// Delete a resume
export const deleteResume = async (id) => {
    const res = await api.delete(`/candidate/resumes/${id}`);
    return res.data;
};

export default api;
