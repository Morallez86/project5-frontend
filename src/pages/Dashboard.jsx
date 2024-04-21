import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { userStore } from '../stores/UserStore';
import { useNavigate } from 'react-router-dom';
import DashboardStatsGrid from '../components/dashboard/DashboardStatsGrid';
import LineChartComponent from '../components/dashboard/LineChartComponent';

function Dashboard() {
  const token = userStore((state) => state.token);
  const navigate = useNavigate();
  const [userRegistrationData, setUserRegistrationData] = useState([]);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/dashboards/lineChartStats', {
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch registration data');
        }
        
        const data = await response.json();
        const formattedData = formatRegistrationData(data);
        setUserRegistrationData(formattedData);
      } catch (error) {
        console.error('Error fetching registration data:', error);
        // Handle error (e.g., show error message)
      }
    };

    if (token) {
      fetchRegistrationData();
    }
  }, [token]);

  const formatRegistrationData = (data) => {
    const registrationCountsByDate = {};

    data.forEach((entry) => {
      const { registTime } = entry;
      const formattedDate = new Date(registTime).toISOString().split('T')[0];

      if (registrationCountsByDate[formattedDate]) {
        registrationCountsByDate[formattedDate]++;
      } else {
        registrationCountsByDate[formattedDate] = 1;
      }
    });

    const chartData = Object.keys(registrationCountsByDate).map((date) => ({
      name: date,
      users: registrationCountsByDate[date]
    }));
    
    return chartData;
  };

  useEffect(() => {
    // Check if there is no token or if the token is invalid
    if (!token) {
      navigate('/'); // Redirect to login page
    }
  }, [token, navigate]);

  return (
    <Layout>
      <div className='flex flex-col overflow-auto gap-8 p-8'>
        <DashboardStatsGrid />
        <LineChartComponent userRegistrationData={userRegistrationData} />
      </div>
    </Layout>
  );
}

export default Dashboard;
