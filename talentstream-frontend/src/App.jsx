import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hasRole } from "./services/auth";

// =============================
// ADMIN / INTERNAL IMPORTS
// =============================
import Master from './pages/Master';
import ManageUser from './pages/user/ManageUser';
import ManageCategory from './pages/category/ManageCategory';
import CreateUser from './pages/user/CreateUser';
import CreateCategory from './pages/category/CreateCategory';
import JobList from './pages/job/JobList';
import CreateJob from './pages/job/CreateJob';
import Resume from './pages/candidate/Resume';
import Application from './pages/candidate/Application';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Interviews from './pages/Interviews';
import ManageApplications from './pages/ManageApplication';
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
import Help from './pages/Help';
import Logout from './pages/Logout';
import Reports from './pages/Reports';
import MyAccount from './loginPanel/MyAccount';

// =============================
// PORTAL / PUBLIC IMPORTS
// =============================
import Home from './portalPages/Home';
import Blog from './portalPages/Blog';
import AddResume from './portalPages/candidate/AddResume';
import About from './portalPages/About';
import Contact from './portalPages/Contact';
import PostJob from './portalPages/PostJob';
import JobPage from './portalPages/job/JobPage';
import BrowseResumes from './portalPages/employer/BrowseResume';
import ManageApplicationPortal from './portalPages/employer/ManageApplication';
import ManageJob from './portalPages/employer/ManageJob';
import AddJob from './portalPages/employer/AddJob';
import BrowseCategories from './portalPages/candidate/BrowseCategories';
import BrowseJobs from './portalPages/candidate/BrowseJobs';
import PrivacyPolicy from './portalPages/PrivacyPolicy';

// Layout
import PortalLayout from './PortalLayout';

// Dashboards
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ============================= */}
        {/* 1. PUBLIC PORTAL ROUTES      */}
        {/* ============================= */}
        <Route element={<PortalLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/job-page" element={<JobPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Candidate area */}
          <Route path="/add-resume" element={<AddResume />} />
          <Route path="/browse-job" element={<BrowseJobs />} />
          <Route path="/browse-cat" element={<BrowseCategories />} />

          {/* Employer area */}
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/manage-job" element={<ManageJob />} />
          <Route path="/manage-application" element={<ManageApplicationPortal />} />
          <Route path="/browse-resume" element={<BrowseResumes />} />
        </Route>

        {/* ============================= */}
        {/* 2. DASHBOARDS (protected)     */}
        {/* ============================= */}
        <Route path="/logout" element={<Logout />} />
        <Route 
          path="/admin/dashboard" 
          element={hasRole(1) ? <Dashboard /> : <Navigate to="/my-account" />} 
        />

        <Route 
          path="/employer/dashboard" 
          element={hasRole(2) ? <EmployerDashboard /> : <Navigate to="/my-account" />} 
        />

        <Route 
          path="/candidate/dashboard" 
          element={hasRole(3) ? <CandidateDashboard /> : <Navigate to="/my-account" />} 
        />

        {/* ============================= */}
        {/* 3. OTHER INTERNAL PAGES       */}
        {/* ============================= */}

        <Route path="/my-account" element={<MyAccount />} />

        <Route path="/master" element={<Master />} />
        <Route path="/add-user" element={<CreateUser />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/add-cat" element={<CreateCategory />} />
        <Route path="/manage-cat" element={<ManageCategory />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/application" element={<Application />} />
        <Route path="/manage-application-admin" element={<ManageApplications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-setting" element={<ProfileSettings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/reports" element={<Reports />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
