import React, { useEffect } from 'react';
import Layout from "./Layout";
import TaskTable from "../components/tables/TaskTable";
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

function ManagingTasks() {
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
            <div>
                <TaskTable />
            </div>
        </Layout>
    );
}

export default ManagingTasks;
