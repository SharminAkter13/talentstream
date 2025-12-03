import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hasRole, isLoggedIn } from "./services/auth";

// =============================
// ADMIN / INTERNAL IMPORTS
// =============================
import Master from "./pages/Master";
import ManageUser from "./pages/user/ManageUser";
import ManageCategory from "./pages/category/ManageCategory";
import CreateUser from "./pages/user/CreateUser";
import CreateCategory from "./pages/category/CreateCategory";
import JobList from "./pages/job/JobList";
import CreateJob from "./pages/job/CreateJob";
import Resume from "./pages/candidate/Resume";
import Application from "./pages/candidate/Application";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Interviews from "./pages/Interviews";
import ManageApplications from "./pages/ManageApplication";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import Help from "./pages/Help";
import Reports from "./pages/Reports";

// AUTH (Login Panel)
import Logout from "./loginPanel/Logout";
import MyAccount from "./loginPanel/MyAccount";

// =============================
// PORTAL / PUBLIC IMPORTS
// =============================
import Home from "./portalPages/Home";
import Blog from "./portalPages/Blog";
import AddResume from "./portalPages/candidate/AddResume";
import About from "./portalPages/About";
import Contact from "./portalPages/Contact";
import PostJob from "./portalPages/PostJob";
import JobPage from "./portalPages/job/JobPage";
import BrowseResumes from "./portalPages/employer/BrowseResume";
import ManageApplicationPortal from "./portalPages/employer/ManageApplication";
import ManageJob from "./portalPages/employer/ManageJob";
import AddJob from "./portalPages/employer/AddJob";
import BrowseCategories from "./portalPages/candidate/BrowseCategories";
import BrowseJobs from "./portalPages/candidate/BrowseJobs";
import PrivacyPolicy from "./portalPages/PrivacyPolicy";

// Layout
import PortalLayout from "./PortalLayout";

// Dashboards
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";


// =============================
// REUSABLE PROTECTED ROUTE
// =============================
const ProtectedRoute = ({ role, element }) => {
    if (!isLoggedIn()) return <Navigate to="/my-account" />;

    if (role && !hasRole(role)) return <Navigate to="/my-account" />;

    return element;
};


const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* ============================= */}
                {/* 1. PUBLIC PORTAL ROUTES       */}
                {/* ============================= */}
                <Route element={<PortalLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/post-job" element={<PostJob />} />
                    <Route path="/job-page" element={<JobPage />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />

                    {/* Candidate public pages */}
                    <Route path="/add-resume" element={<AddResume />} />
                    <Route path="/browse-job" element={<BrowseJobs />} />
                    <Route path="/browse-cat" element={<BrowseCategories />} />

                    {/* Employer public pages */}
                    <Route path="/add-job" element={<AddJob />} />
                    <Route path="/manage-job" element={<ManageJob />} />
                    <Route path="/manage-application" element={<ManageApplicationPortal />} />
                    <Route path="/browse-resume" element={<BrowseResumes />} />
                </Route>

                {/* ============================= */}
                {/* 2. AUTH & DASHBOARDS          */}
                {/* ============================= */}
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/logout" element={<Logout />} />

                <Route 
                    path="/admin/dashboard"
                    element={<ProtectedRoute role={1} element={<Dashboard />} />}
                />

                <Route 
                    path="/employer/dashboard"
                    element={<ProtectedRoute role={2} element={<EmployerDashboard />} />}
                />

                <Route 
                    path="/candidate/dashboard"
                    element={<ProtectedRoute role={3} element={<CandidateDashboard />} />}
                />

                {/* ============================= */}
                {/* 3. ADMIN INTERNAL PAGES       */}
                {/* ============================= */}

                <Route 
                    path="/master"
                    element={<ProtectedRoute role={1} element={<Master />} />}
                />

                <Route 
                    path="/add-user"
                    element={<ProtectedRoute role={1} element={<CreateUser />} />}
                />

                <Route 
                    path="/manage-user"
                    element={<ProtectedRoute role={1} element={<ManageUser />} />}
                />

                <Route 
                    path="/add-cat"
                    element={<ProtectedRoute role={1} element={<CreateCategory />} />}
                />

                <Route 
                    path="/manage-cat"
                    element={<ProtectedRoute role={1} element={<ManageCategory />} />}
                />

                <Route 
                    path="/job-list"
                    element={<ProtectedRoute role={1} element={<JobList />} />}
                />

                <Route 
                    path="/create-job"
                    element={<ProtectedRoute role={1} element={<CreateJob />} />}
                />

                <Route 
                    path="/manage-application-admin"
                    element={<ProtectedRoute role={1} element={<ManageApplications />} />}
                />

                <Route 
                    path="/settings"
                    element={<ProtectedRoute role={1} element={<Settings />} />}
                />

                <Route 
                    path="/skills"
                    element={<ProtectedRoute role={1} element={<Skills />} />}
                />

                <Route 
                    path="/interviews"
                    element={<ProtectedRoute role={1} element={<Interviews />} />}
                />

                <Route 
                    path="/reports"
                    element={<ProtectedRoute role={1} element={<Reports />} />}
                />

                {/* Candidate + Employer internal (must login) */}
                <Route
                    path="/resume"
                    element={<ProtectedRoute element={<Resume />} />}
                />

                <Route
                    path="/application"
                    element={<ProtectedRoute element={<Application />} />}
                />

                <Route
                    path="/profile"
                    element={<ProtectedRoute element={<Profile />} />}
                />

                <Route
                    path="/profile-setting"
                    element={<ProtectedRoute element={<ProfileSettings />} />}
                />

                <Route
                    path="/help"
                    element={<ProtectedRoute element={<Help />} />}
                />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
