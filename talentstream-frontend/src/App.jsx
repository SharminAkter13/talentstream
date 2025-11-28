
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Home from './portalPages/Home';
import Blog from './portalPages/Blog';
import AddResume from './portalPages/candidate/AddResume';
import MyAccount from './loginPanel/MyAccount';
import About from './portalPages/About';
import Contact from './portalPages/Contact';
import PostJob from './portalPages/PostJob';
import JobPage from './portalPages/job/JobPage';
import BrowseResumes from './portalPages/employer/BrowseResume';
import ManageApplication from './portalPages/employer/ManageApplication';
import ManageJob from './portalPages/employer/ManageJob';
import AddJob from './portalPages/employer/AddJob';
import BrowseCategories from './portalPages/candidate/BrowseCategories';
import BrowseJobs from './portalPages/candidate/BrowseJobs';
import PrivacyPolicy from './portalPages/PrivacyPolicy';

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
    <Routes>
     
      <Route path="/" element={<Home />} />
      <Route path="/master" element={<Master />} />
      <Route path="/add-user" element={<CreateUser />} />
      <Route path="/manage-user" element={<ManageUser />} />
      <Route path="/add-cat" element={<CreateCategory />} />
      <Route path="/manage-cat" element={<ManageCategory />} />
      <Route path="/job-list" element={<JobList />} />
      <Route path="/create-job" element={<CreateJob />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/application" element={<Application />} />
      <Route path="/manage-application" element={<ManageApplications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/interviews" element={<Interviews />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile-setting" element={<ProfileSettings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/add-resume" element={<AddResume />} />
      <Route path="/my-account" element={<MyAccount/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/job-list" element={<JobList/>} />
      <Route path="/job-page" element={<JobPage />} />
      <Route path="/add-resume" element={<AddResume />} />
      <Route path="/browse-resume" element={<BrowseResumes />} />
      <Route path="/manage-application" element={<ManageApplication />} />
      <Route path="/manage-job" element={<ManageJob />} />
      <Route path="/add-job" element={<AddJob />} />
      <Route path="/browse-cat" element={<BrowseCategories />} />
      <Route path="/browse-job" element={<BrowseJobs />} />
      <Route path="/browse-resume" element={<BrowseResumes />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  </BrowserRouter>
    </div>
  );
};

export default App;
