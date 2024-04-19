import React, { useEffect } from 'react';
import Layout from './Layout';
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router-dom";
import DashboardStatsGrid from '../components/dashboard/DashboardStatsGrid';
import TransactionChart from '../components/dashboard/TransactionChart';

function Dashboard() {
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
            <div className='flex flex-col gap-8 p-8'>
                <DashboardStatsGrid />
                <TransactionChart/>
            </div>
        </Layout>
    );
}

export default Dashboard;
