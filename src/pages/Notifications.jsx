import React, { useEffect } from 'react';
import Layout from "./Layout";
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router-dom";
import NotificationTable from '../components/tables/NotificationTable';

function Notifications() {
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
                <NotificationTable>
                </NotificationTable>
            </div>
        </Layout>
    );
}

export default Notifications;
