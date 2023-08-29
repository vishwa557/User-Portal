import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import the js-cookie library
import config from "../assets/config/config";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const serverUrl = config.serverUrl;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const accessToken = Cookies.get("access_token"); // Retrieve the access token from cookies
      console.log(accessToken);
      axios
        .post(`${serverUrl}api/file/upload`, formData, {
          headers: {
            'Content-Type': "multipart/form-data",
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
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default FileUpload;
