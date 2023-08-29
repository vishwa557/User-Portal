import React from "react";
import "../assets/styles/home.css";

const HomePage = () => {
  return (
    <>
    <div className="home-container">
     
      <main className="main-content">
        <div className="welcome-section">
          <h1>Welcome to FileSafeNet</h1>
          <p>Your Secure File Upload and Storage Solution</p>
        </div>
        <div className="features-section">
          <div className="feature">
            <i className="fas fa-upload"></i>
            <h3>Easy File Upload</h3>
            <p>Upload your files securely and effortlessly.</p>
          </div>
          <div className="feature">
            <i className="fas fa-table"></i>
            <h3>File List</h3>
            <p>View and manage your uploaded files in a user-friendly table.</p>
          </div>
          <div className="feature">
            <i className="fas fa-download"></i>
            <h3>Download Files</h3>
            <p>Download your files with just a click from the list.</p>
          </div>
        </div>
      </main>
      
    </div>

<footer className="footer">
&copy; 2023 FileSafeNet. All rights reserved.
</footer>
</>
  );
};

export default HomePage;
