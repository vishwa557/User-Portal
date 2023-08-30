import React, { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import the js-cookie library
import config from "../assets/config/config";
import "../../src/assets/styles/fileUpload.css";
import upload from "../../src/assets/images/upload.jpg";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef(null);
  const serverUrl = config.serverUrl;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadImageClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input click
  };

  const handleUpload = () => {
    console.log(selectedFile)
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const accessToken = Cookies.get("access_token"); // Retrieve the access token from cookies
      console.log(accessToken);
      axios
        .post(`${serverUrl}api/file/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accessToken, // Include the access token in the header
          },
        })
        .then((response) => {
          setUploadMessage(response.data.message);
        })
        .catch((error) => {
          console.error(error);
          setUploadMessage("File upload failed");
        });
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Files Up To 5 GB</h2>
      <p>Secure, Anonymous, Fast, Free</p>
      <div className="upload-content">
        <div
          className="upload-image-container"
          onClick={handleUploadImageClick}
        >
          <img src={upload} alt="Upload" className="upload-image" />
          <span>Click to Choose File</span>
          {selectedFile && <p>{selectedFile.name}</p>}
         
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="file-input"
        />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
      <div className="faq-section">
        <h3>FAQ</h3>
        <p>
          <strong>How long do we host your files?</strong>
        </p>
        <p>
          We host your files on our cloud storage solution for 7 days. After the
          7th day, your files are automatically deleted. If you want to store
          for longer and choose an expiration date, our paid plans have you
          covered.
        </p>
        <p>
          <strong>Are there any download limits?</strong>
        </p>
        <p>
          No, there are no download limits. Your shared files can be downloaded
          as many times as you want, by as many people as you want. You'll be
          notified when someone has downloaded the file. The only restriction
          is, the files are no longer available after 7 days.
        </p>
        {/* Add more FAQ items here */}
      </div>
    </div>
  );
};

export default FileUpload;
