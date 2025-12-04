import React from "react";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const Master = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="main-container">
        <div className="pd-ltr-20 xs-pd-20-10">
          <div className="min-height-200px">

            {/* Page Content */} 
            <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
              {children}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Master;
