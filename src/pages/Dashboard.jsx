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
    const [categoryStats, SetCategoryStats] = useState([]);
    


    useEffect(() => {
        if (!token) {
            navigate('/'); // Redirect to login page
        }else{
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

                    const taskFinalDates = formatFinalDatesData(data);
                    setTasksFinalDate(taskFinalDates);

                    const averageTime = calculateAverageTaskCompletionTime(data);
                    setAverageTaskCompletionTime(averageTime);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            if (token) {
                fetchData();
            }
        }
        
    }, [token, navigate]);

    const formatRegistrationData = (data) => {
        const registrationCountsByDate = {};

        data.forEach((entry) => {
            let formattedDate = null;

            if (entry.registTime) {
                if (Array.isArray(entry.registTime)) {
                    // WebSocket data format (array of numbers)
                    const [year, month, day] = entry.registTime.slice(0, 3); // Extract year, month, day
                    formattedDate = new Date(year, month - 1, day).toISOString().split('T')[0];
                } else if (typeof entry.registTime === 'string') {
                    // Fetch data format (ISO string)
                    formattedDate = new Date(entry.registTime).toISOString().split('T')[0];
                }

                if (formattedDate) {
                    if (registrationCountsByDate[formattedDate]) {
                        registrationCountsByDate[formattedDate]++;
                    } else {
                        registrationCountsByDate[formattedDate] = 1;
                    }
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
            let formattedDate = null;

            if (entry.finalDate) {
                if (Array.isArray(entry.finalDate)) {
                    // WebSocket data format (array of numbers)
                    const [year, month, day] = entry.finalDate.slice(0, 3); // Extract year, month, day
                    formattedDate = new Date(year, month - 1, day).toISOString().split('T')[0];
                } else if (typeof entry.finalDate === 'string') {
                    // Fetch data format (LocalDate string)
                    formattedDate = new Date(entry.finalDate).toISOString().split('T')[0];
                }

                if (formattedDate) {
                    if (finalDateCountsByDate[formattedDate]) {
                        finalDateCountsByDate[formattedDate]++;
                    } else {
                        finalDateCountsByDate[formattedDate] = 1;
                    }
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
        let initialDateTime, finalDateTime;

        if (Array.isArray(entry.initialDate)) {
            // WebSocket data format (array of numbers)
            const [initialYear, initialMonth, initialDay] = entry.initialDate.slice(0, 3);
            initialDateTime = new Date(initialYear, initialMonth - 1, initialDay);
        } else if (typeof entry.initialDate === 'string') {
            // Fetch data format ISO string
            initialDateTime = new Date(entry.initialDate);
        }

        if (Array.isArray(entry.finalDate)) {
            // WebSocket data format (array of numbers)
            const [finalYear, finalMonth, finalDay] = entry.finalDate.slice(0, 3);
            finalDateTime = new Date(finalYear, finalMonth - 1, finalDay);
        } else if (typeof entry.finalDate === 'string') {
            finalDateTime = new Date(entry.finalDate);
        }

        // Calculate the difference in days between finalDateTime and initialDateTime
        const durationInDays = (finalDateTime - initialDateTime) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        return durationInDays;
    });

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
                if(newMessage.totalUsers){
                    setDashboardStats(newMessage);
                }else if(newMessage[0].registTime){
                    const formattedRegistrations = formatRegistrationData(newMessage);
                    setUserRegistrationData(formattedRegistrations);
                }else if(newMessage[0].initialDate){
                    const formattedFinalDatesData = formatFinalDatesData(newMessage);
                    setTasksFinalDate(formattedFinalDatesData);

                    const averageTime = calculateAverageTaskCompletionTime(newMessage);
                    setAverageTaskCompletionTime(averageTime);
                }else if(newMessage[0].categoryTitle){
                    SetCategoryStats(newMessage)
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
                webSocketcategoryStats ={categoryStats}
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
