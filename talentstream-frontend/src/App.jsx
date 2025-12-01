import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { hasRole } from "./services/auth"; // adjust the path if needed

// ADMIN/INTERNAL IMPORTS (Assuming these are internal/protected pages)
import Master from './pages/Master';
import ManageUser from './pages/user/ManageUser';
import ManageCategory from './pages/category/ManageCategory';
import CreateUser from './pages/user/CreateUser';
import CreateCategory from './pages/category/CreateCategory';
import JobList from './pages/job/JobList'; // Keeping this as Admin/Internal List
import CreateJob from './pages/job/CreateJob';
import Resume from './pages/candidate/Resume';
import Application from './pages/candidate/Application';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Interviews from './pages/Interviews';
import ManageApplications from './pages/ManageApplication'; // Keeping this as Admin/Internal List
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
import Help from './pages/Help';
import Logout from './pages/Logout';
import Reports from './pages/Reports';
import MyAccount from './loginPanel/MyAccount'; // Login/Register page

// PORTAL/PUBLIC IMPORTS
import Home from './portalPages/Home';
import Blog from './portalPages/Blog';
import AddResume from './portalPages/candidate/AddResume';
import About from './portalPages/About';
import Contact from './portalPages/Contact';
import PostJob from './portalPages/PostJob';
import JobPage from './portalPages/job/JobPage';
import BrowseResumes from './portalPages/employer/BrowseResume';
import ManageApplicationPortal from './portalPages/employer/ManageApplication'; // Renamed to avoid confusion
import ManageJob from './portalPages/employer/ManageJob';
import AddJob from './portalPages/employer/AddJob';
import BrowseCategories from './portalPages/candidate/BrowseCategories';
import BrowseJobs from './portalPages/candidate/BrowseJobs';
import PrivacyPolicy from './portalPages/PrivacyPolicy';

// LAYOUT IMPORT
import PortalLayout from './PortalLayout';

const App = () => {
 
 return (
  <BrowserRouter>
    <Routes>
  
        {/* ========================================================= */}
        {/* 1. PORTAL ROUTES (Public-facing, uses PortalLayout) */}
        {/* ========================================================= */}
        <Route element={<PortalLayout />}>
          {/* Home Page: path="/" is now the index route for the layout */}
     <Route path="/" element={<Home />} />
     
          {/* Other Portal Pages */}
     <Route path="/about" element={<About/>} />
     <Route path="/contact" element={<Contact />} />
     <Route path="/blog" element={<Blog />} />
     <Route path="/post-job" element={<PostJob />} />
     <Route path="/job-page" element={<JobPage />} />
     <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Candidate Routes */}
     <Route path="/add-resume" element={<AddResume />} />
          <Route path="/browse-job" element={<BrowseJobs />} />
     <Route path="/browse-cat" element={<BrowseCategories />} />

          {/* Employer/Job Management Routes */}
          <Route path="/add-job" element={<AddJob />} />
     <Route path="/manage-job" element={<ManageJob />} />
          {/* NOTE: If you need both ManageApplication components, 
              you must change one of their paths. I've used the portal version here. */}
     <Route path="/manage-application" element={<ManageApplicationPortal />} />
     <Route path="/browse-resume" element={<BrowseResumes />} />

    </Route>

        {/* ========================================================= */}
        {/* 2. STANDALONE ROUTES (Admin/Login, no PortalLayout) */}
        {/* ========================================================= */}

<Route path="/admin-dashboard" element={ hasRole(1) ? <Dashboard/> : <Navigate to="/login" /> } />
<Route path="/employer-dashboard" element={ hasRole(2) ? <EmployerDashboard/> : <Navigate to="/login" /> } />
<Route path="/candidate-dashboard" element={ hasRole(3) ? <CandidateDashboard/> : <Navigate to="/login" /> } />

        <Route path="/my-account" element={<MyAccount/>} />
    <Route path="/master" element={<Master />} />
    <Route path="/add-user" element={<CreateUser />} />
    <Route path="/manage-user" element={<ManageUser />} />
    <Route path="/add-cat" element={<CreateCategory />} />
    <Route path="/manage-cat" element={<ManageCategory />} />
    <Route path="/job-list" element={<JobList />} /> 
    <Route path="/create-job" element={<CreateJob />} />
    <Route path="/resume" element={<Resume />} />
    <Route path="/application" element={<Application />} />
    <Route path="/manage-application-admin" element={<ManageApplications />} /> {/* Renamed admin route path */}
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