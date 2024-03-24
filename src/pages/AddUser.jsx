import React, { useEffect } from 'react';
import Layout from './Layout';
import ProfileInformation from '../components/newUserInformation/NewUserInformation';
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

function AddUser() {
    const token = userStore((state) => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there is no token or if the token is invalid
        if (!token) {
            navigate('/'); // Redirect to login page
        }
    }, [token, navigate]);
    return (
        <Layout>
            <ProfileInformation />
        </Layout>
    );
}

export default AddUser;
