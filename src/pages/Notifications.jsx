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
            <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-screen-lg">
                    <NotificationTable />
                </div>
            </div>
        </Layout>
    );
}

export default Notifications;
