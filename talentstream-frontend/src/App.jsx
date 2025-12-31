import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";
import { hasRole, isLoggedIn } from "./services/auth";

// pages...
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

import Logout from "./loginPanel/Logout";
import MyAccount from "./loginPanel/MyAccount";

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
import ManageJobType from "./pages/types/ManageJobType";
import PortalLayout from "./PortalLayout";
import ManageSkill from "./pages/skills/ManageSkill";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import EditUser from './pages/user/EditUser';
import EditCategory from './pages/category/EditCategory';
import ManageLocation from "./pages/locations/ManageLocation";
import JobDetails from './portalPages/job/JobDetails';
import JobViewStats from './pages/job_view/JobViewStats';
import CompanyCRUD from './pages/companies/CompanyCRUD';
import ResumeList from './pages/resume/ResumeList';
import CreateResume from './pages/resume/CreateResumes';
import ViewResume from './pages/resume/ViewResume';
import EditResume from './pages/resume/EditResumes';

// ===============================================
// 🚀 FIXED PROTECTED ROUTE
// ===============================================
const ProtectedRoute = ({ role }) => {
    const location = useLocation();

    const onLoginPage = location.pathname === "/login";

    // NOT LOGGED IN → only redirect if NOT already on login page
    if (!isLoggedIn()) {
        return onLoginPage ? <Outlet /> : <Navigate to="/login" replace />;
    }

    // LOGGED IN but wrong role → redirect ONLY if not already on correct dashboard
    if (role && !hasRole(role)) {
        return onLoginPage ? <Outlet /> : <Navigate to="/login" replace />;
    }

    return <Outlet />;
};


// ===============================================
// 🚀 FIXED APP ROUTES
// ===============================================
const App = () => {
    return (
        <BrowserRouter>
            <Routes> 

                {/* PUBLIC */}
                <Route element={<PortalLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/post-job" element={<PostJob />} />
                    <Route path="/job-page" element={<JobPage />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />

                    <Route path="/add-resume" element={<AddResume />} />
                    <Route path="/browse-jobs" element={<BrowseJobs />} />
                    <Route path="/browse-cat" element={<BrowseCategories />} />

                    <Route path="/add-job" element={<AddJob />} />
                    <Route path="/manage-job" element={<ManageJob />} />
                    <Route path="/manage-application" element={<ManageApplicationPortal />} />
                    <Route path="/browse-resume" element={<BrowseResumes />} />
                    <Route path="/jobs/:id" element={<JobDetails />} />
                </Route>

                {/* AUTH */}
                <Route path="/login" element={<MyAccount />} />
                <Route path="/logout" element={<Logout />} />

                {/* ADMIN */}
                <Route element={<ProtectedRoute role={1} />}>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/master" element={<Master />} />
                    <Route path="/add-user" element={<CreateUser />} />
                    <Route path="/manage-user" element={<ManageUser />} />
                    <Route path="/edit-user/:id" element={<EditUser />} />
                    <Route path="/add-cat" element={<CreateCategory />} />
                    <Route path="/manage-categories" element={<ManageCategory />} />
                    <Route path="/edit-category/:id" element={<EditCategory />} />
                    <Route path="/manage-cat" element={<ManageCategory />} />
                    <Route path="/job-list" element={<JobList />} />
                    <Route path="/manage-application-admin" element={<ManageApplications />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/interviews" element={<Interviews />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/manage-location" element={<ManageLocation />} />
                    <Route path="/manage-skill" element={<ManageSkill />} />
                    <Route path="/manage-job-type" element={<ManageJobType />} />
                </Route>

                {/* EMPLOYER */}
                <Route element={<ProtectedRoute role={2} />}>
                    <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                    <Route path="/create-job" element={<CreateJob />} />
                    <Route path="/manage-job" element={<ManageJob />} />
                    <Route path="/manage-application" element={<ManageApplicationPortal />} />
                    <Route path="/my-job-stats" element={<JobViewStats />} />
                    <Route path="/manage-company" element={<CompanyCRUD />} />

                </Route>

                {/* CANDIDATE */}
                <Route element={<ProtectedRoute role={3} />}>
                    <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
                    <Route path="/job-alerts" element={<JobAlerts />} />
                </Route>

                {/* SHARED AUTH ROUTES */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/application" element={<Application />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile-setting" element={<ProfileSettings />} />
                    <Route path="/help" element={<Help />} />
                     <Route path="/candidate-resume" element={<ResumeList />} />

                    <Route path="/resume-create" element={<CreateResume />} />

                    <Route path="/resume-edit/:id" element={<EditResume />} />

                    <Route path="/resume-view/:id" element={<ViewResume />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default App;
