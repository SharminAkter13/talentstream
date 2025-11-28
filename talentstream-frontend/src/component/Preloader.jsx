import React from 'react';

const Preloader = ({ isLoading }) => {
    // Style to control visibility based on the 'isLoading' prop
    // Use 'fixed' positioning and high z-index to ensure it covers everything.
    const preloaderStyle = {
        display: isLoading ? 'flex' : 'none', // Show if loading, hide otherwise
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999, // Ensure it's on top of all other elements
        // You may need to add the background color or check your CSS for .pre-loader
    };

    return (
        // The original pre-loader structure from your HTML
        <div className="pre-loader" style={preloaderStyle}>
            <div className="pre-loader-box">
                <div className="loader-logo">
                    <img src="/assets/admin/vendors/images/deskapp-logo.svg" alt="" />
                </div>
                <div className="loader-progress" id="progress_div">
                    <div className="bar" id="bar1" />
                </div>
                <div className="percent" id="percent1">0%</div>
                <div className="loading-text">Loading...</div>
            </div>
        </div>
    );
};

export default Preloader;