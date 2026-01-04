import React from "react";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const Master = ({ children }) => {
  return (
    <div className="master-container">
      <Navbar />
      <Sidebar />

      <div className="main-container">
        <div className="content-wrapper">
          <div className="pd-20 bg-white border-radius-4 box-shadow mb-30">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Master;
