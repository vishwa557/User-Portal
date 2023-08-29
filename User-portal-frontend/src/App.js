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
        

      </Routes>
    </Router>
  );
}

export default App;