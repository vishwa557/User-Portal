import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../assets/config/config';
import "../assets/styles/portalDetails.css";

const PortalDetails = () => {
  const [portalDetails, setPortalDetails] = useState({});
  const [animationStarted, setAnimationStarted] = useState(false);
  const serverUrl = config.serverUrl;

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    axios.get(`${serverUrl}api/portal-details`, {
      headers: {
        Authorization: accessToken
      }
    })
    .then(response => {
      setPortalDetails(response.data);
      setAnimationStarted(true);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div className="portal-details-container">
      <h2>Portal Details</h2>
      <p className={`total-files ${animationStarted ? 'counting' : ''}`}>
        Total Files Uploaded: <span>{portalDetails.totalFilesUploaded}</span>
      </p>
      <div className="simple-bar-chart">
        {portalDetails.fileTypeCounts && portalDetails.fileTypeCounts.map(fileType => (
          <div className="item" key={fileType._id} style={{ '--clr': '#060606', '--val': fileType.count }}>
            <div className="label">{fileType._id}</div>
            <div className="value">{fileType.count}%</div>
          </div>
        ))}
      </div>
      <p>Files Uploaded by You:</p>
      <ul>
        {portalDetails.filesUploadedByUser && portalDetails.filesUploadedByUser
          .filter(userFile => userFile._id === portalDetails._id)
          .map(userFile => (
            <li key={userFile._id}>
              <span className="user-file-id">{userFile._id}:</span> {userFile.count}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PortalDetails;
