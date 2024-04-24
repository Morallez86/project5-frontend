import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'; 
import Profile from './pages/Profile';
import AddUser from './pages/AddUser';
import AddTask from './pages/AddTask';
import ManagingCategories from './pages/ManagingCategories';
import ManagingUsers from './pages/ManagingUsers';
import ManagingTasks from './pages/ManagingTasks';
import EditTask from './pages/EditTask';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import VerifyAccount from './pages/VerifyAccount';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';


ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
      <Routes>
        <Route index element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/managingCategories" element={<ManagingCategories />} />
        <Route path="/managingUsers" element={<ManagingUsers />} />
        <Route path="managingTasks" element={<ManagingTasks />} />
        <Route path="/editTask" element={<EditTask />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify-account/:token" element={<VerifyAccount/>} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notifications" element={<Notifications/>} />
      </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
