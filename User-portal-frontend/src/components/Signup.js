import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles/signup.css";
import config from "../../src/assets/config/config.js";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const serverUrl = config.serverUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}api/auth/signup`, {
        email,
        password,
        name,
        phoneNumber,
      });
      console.log("Signup successful!", response.data);
      window.location = "/login";
      // Redirect or perform other actions after successful signup
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <>
      <div className="signup-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <footer className="footer">
        &copy; 2023 FileSafeNet. All rights reserved.
      </footer>
    </>
  );
};

export default Signup;
