import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'; 
import Activity from './pages/Activity';
import Profile from './pages/Profile';
import AddUser from './pages/AddUser';
import AddTask from './pages/AddTask';
import ManagingCategories from './pages/ManagingCategories';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route index element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/managingCategories" element={<ManagingCategories />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
