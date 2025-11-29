import React from 'react';
import { Outlet } from 'react-router-dom';
import PortalNavbar from './portalComponent/PortalNavbar';
import PortalFooter from './portalComponent/PortalFooter';

const PortalLayout = () => {
  return (
    // The React Fragment (<>...</>) ensures a single parent element is returned.
    <> 
      {/* 1. Navbar (Header) */}
      <PortalNavbar />
      
      {/* 2. Page Content: Renders the specific component for the current route */}
      <div id="page-content">
          <Outlet />
      </div>
      
      {/* 3. Footer */}
      <PortalFooter />
    </>
  );
};

export default PortalLayout;