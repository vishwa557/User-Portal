import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../src/assets/config/config';
import "../assets/styles/login.css";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const serverUrl = config.serverUrl;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}api/auth/login`, { email, password });
      const accessToken = response.data.token;
      

      // Store the access token in a cookie
      Cookies.set('access_token', accessToken, { expires: 7 });

      // Decode the JWT token to get user information (assuming JWT is in the format: "Bearer token")
      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      console.log(tokenPayload.userId)

 
      // Redirect to the dashboard or other page
      window.location.href = "/"; 
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <>
    <div className="login-container">
    <h2>Welcome to FileSafeNet!</h2>
  <p className="app-description">
    Store, manage, and share your files with confidence using our secure and
    user-friendly file vault. Your data's safety is our top priority!
  </p>
    <div className='horizontal'></div>
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Enter email address'
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='enter your password'
        />
      </div>
      <button type="submit">Login</button>
    </form>
    {error && <p className="login-error">{error}</p>}
    <p className="signup-link">
      Don't have an account? <Link to="/signup">Sign up</Link>
    </p>
    
  </div>
  <footer className="footer">
  &copy; 2023 FileSafeNet. All rights reserved.
</footer>
  </>
  );
};

export default Login;
