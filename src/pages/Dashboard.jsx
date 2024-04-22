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
    const [tasksFinalDate, setTasksFinalDate] = useState([]);
    const [averageTaskCompletionTime, setAverageTaskCompletionTime] = useState(0);
    const [dashboardStats, setDashboardStats] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/dashboards/lineChartStats', {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();

                const formattedRegistrations = formatRegistrationData(data);
                setUserRegistrationData(formattedRegistrations);
                console.log(formattedRegistrations);

                const taskFinalDates = formatFinalDatesData(data);
                setTasksFinalDate(taskFinalDates);

                const averageTime = calculateAverageTaskCompletionTime(data);
                setAverageTaskCompletionTime(averageTime);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error (e.g., show error message)
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const formatRegistrationData = (data) => {
        const registrationCountsByDate = {};

        data.forEach((entry) => {
            const { registTime } = entry;

            // Check if registTime is defined and is a valid date string
            if (registTime && new Date(registTime).toString() !== 'Invalid Date') {
                const formattedDate = new Date(registTime).toISOString().split('T')[0];

                if (registrationCountsByDate[formattedDate]) {
                    registrationCountsByDate[formattedDate]++;
                } else {
                    registrationCountsByDate[formattedDate] = 1;
                }
            }
        });

        const chartData = Object.keys(registrationCountsByDate).map((date) => ({
            name: date,
            users: registrationCountsByDate[date]
        }));

        return chartData;
    };


    const formatFinalDatesData = (data) => {
        const finalDateCountsByDate = {};

        data.forEach((entry) => {
            const { finalDate } = entry;
            if (finalDate) {
                const formattedDate = finalDate.toString(); // Assuming finalDate is already a LocalDate
                if (finalDateCountsByDate[formattedDate]) {
                    finalDateCountsByDate[formattedDate]++;
                } else {
                    finalDateCountsByDate[formattedDate] = 1;
                }
            }
        });

        const cumulativeCounts = {};
        let cumulativeTotal = 0;

        // Create cumulative counts by date
        Object.keys(finalDateCountsByDate).forEach((date) => {
            cumulativeTotal += finalDateCountsByDate[date];
            cumulativeCounts[date] = cumulativeTotal;
        });

        const chartData = Object.keys(cumulativeCounts).map((date) => ({
            name: date,
            tasks: cumulativeCounts[date]
        }));

        return chartData;
    };

const calculateAverageTaskCompletionTime = (data) => {
    // Filter out entries where finalDate and initialDate are both defined
    const filteredData = data.filter((entry) => entry.finalDate && entry.initialDate);

    // Map filtered entries to calculate task durations in days
    const taskDurations = filteredData.map((entry) => {
        const initialDateTime = new Date(entry.initialDate);
        const finalDateTime = new Date(entry.finalDate);

        // Calculate the difference in days between finalDateTime and initialDateTime
        const durationInDays = (finalDateTime - initialDateTime) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        return durationInDays;
    });

    console.log("Task durations (in days):", taskDurations);

    if (taskDurations.length === 0) return 0;

    const totalDurationInDays = taskDurations.reduce((sum, duration) => sum + duration, 0);

    // Calculate the average duration in days
    const averageDurationInDays = totalDurationInDays / taskDurations.length;

    // Two decimal numbers
    const formattedAverageDuration = averageDurationInDays.toFixed(2);

    return formattedAverageDuration;
    };

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/demo-1.0-SNAPSHOT/websocket/dashboard/${token}`);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        ws.onmessage = (event) => {
            try {
                const newMessage = JSON.parse(event.data);
                console.log(newMessage);
                if(newMessage.totalUsers){
                    setDashboardStats(newMessage);
                }
            } catch (error) {
                console.error('Error parsing or processing message:', error);
            }
        };
        return () => {
            // Cleanup: close WebSocket connection when component unmounts or receiverId changes
            ws.close();
        };
        
    }, [token]);

    useEffect(() => {
        // Check if there is no token or if the token is invalid
        if (!token) {
            navigate('/'); // Redirect to login page
        }
    }, [token, navigate]);

    return (
        <Layout>
        <div className='flex flex-col overflow-auto gap-8 p-8'>
            <DashboardStatsGrid 
                averageTaskCompletionTime={averageTaskCompletionTime}
                webSocketupdateUserDashboardStats = {dashboardStats}
                />
            <LineChartComponent 
                userRegistrationData={userRegistrationData}
                tasksFinalDate={tasksFinalDate}
            />
        </div>
        </Layout>
    );
}

export default Dashboard;
