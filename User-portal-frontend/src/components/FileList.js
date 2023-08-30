import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library
import config from "../assets/config/config";
import "../../src/assets/styles/fileList.css"; 


const FileList = () => {
  const [fileList, setFileList] = useState([]);
  const serverUrl = config.serverUrl;


  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    axios.get(`${serverUrl}api/file/list`, {
      headers: {
        Authorization: accessToken
      }
    })
    .then(response => {
      setFileList(response.data);
   
    })
    .catch(error => {
      console.error(error);
    });
  }, []);
  

  const handleDownload = (fileId) => {
    // console.log(fileId);
    const accessToken = Cookies.get('access_token');
    axios.get(`${serverUrl}api/file/download/${fileId}`, {
      responseType: 'blob', // Required for downloading files
      headers: {
        Authorization: accessToken
      }
    })
    .then(response => {
      const blob = new Blob([response.data]);
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileList.find(file => file._id === fileId).filename;
      downloadLink.click();
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div className="file-list-container">
      <h2>File List</h2>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Filename</div>
          <div className="col col-2">Date Uploaded</div>
          <div className="col col-3">File Type</div>
          <div className="col col-4">Action</div>
        </li>
        {fileList.map(file => (
          <li className="table-row" key={file._id}>
            <div className="col col-1" data-label="Filename">{file.filename}</div>
            <div className="col col-2" data-label="Date Uploaded">{new Date(file.dateUploaded).toLocaleDateString()}</div>
            <div className="col col-3" data-label="File Type">{file.fileType}</div>
            <div className="col col-4" data-label="Action">
              <button onClick={() => handleDownload(file._id)}>Download</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
