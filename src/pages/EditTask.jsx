import React, { useEffect } from 'react';
import Layout from "./Layout";
import EditTaskInformation from "../components/addTaskInformation/EditTaskInformation";
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

function EditTask() {
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
            <EditTaskInformation />
        </Layout>
    );
}

export default EditTask;
