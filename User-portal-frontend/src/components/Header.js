import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import "../../src/assets/styles/Header.css";
import avatarImage from "../../src/assets/images/user.jpg";

function Header() {
  const [click, setClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    // console.log(token);
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  function handleLogout() {
    Cookies.remove("token");
    setLoggedIn(false);
  }

  const navigateTo = (route) => {
    window.location.href = route;
  };
  

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            FileSafeNet
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/upload"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    Upload
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    exact
                    to="/list"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    List
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    exact
                    to="/portal"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    Portal
                  </NavLink>
                </li>

                <li className=" profile-icon">
                  <button
                    className="nav-avatar"
                    onClick={() => navigateTo('/profile')}
                  >
                    <img
                      src={avatarImage}
                      alt="Avatar"
                      className="avatar-img"
                    />
                  </button>
                </li>

                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    exact
                    to="/contactus"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/signup"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={() => setClick(!click)}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
