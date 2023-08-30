import React from 'react';
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import Login from "./components/Login";
import Signup from "./components/Signup";
import FileUpload from './components/FileUpload';
import Header from "./components/Header";
import Home from "./components/Home";
import FileList from './components/FileList';
import PortalDetails from './components/PortalDetails';
import Profile from "./components/Profile";



function App() {
  return (
    <Router>
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/upload' element={<FileUpload/>}/>
        <Route path='/list' element={<FileList/>}/>
        <Route path='/portal' element={<PortalDetails/>}/>
        <Route path='/profile' element={<Profile/>}/>


      </Routes>
    </Router>
  );
}

export default App;