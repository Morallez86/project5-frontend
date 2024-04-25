import React, { useEffect, useState } from 'react';
import Sidebar from '../components/navbar/Sidebar';
import Header from '../components/header/Header';
import Footer from '../components/footer/footer';
import { userStore } from "../stores/UserStore";
import { notificationsStore } from '../stores/NotificationsStore';
import { taskStore } from "../stores/TaskStore";

const Layout = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const username = userStore((state) => state.username);
    const token = userStore((state) => state.token);
    const userId = userStore((state) => state.userId);
    const addNotification = notificationsStore ((state) => state.addNotification);
    const addUnreadMessage = notificationsStore ((state) => state.addUnreadMessage);
    const addTask = taskStore ((state) => state.addTask);
    const clearTasks = taskStore ((state) => state.clearTasks);

    // WebSocket setup and message handling
    useEffect(() => {
        console.log("just mount")
        const ws = new WebSocket(`ws://localhost:8080/demo-1.0-SNAPSHOT/websocket/application/${token}`);

        ws.onopen = () => {
            console.log('WebSocket connected for notifications and unread messages');
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                console.log("111111")
                console.log(message)

                // Check if the message is a new message
                if (message.recipient === userId) {
                    addUnreadMessage(message);
                    console.log("222222")
                } else if(message.notificationType) {
                    // If not a new message, assume it's a new notification
                    console.log(message)
                    addNotification(message);
                    console.log("ON MESSAGE")
                    
                }else{
                    clearTasks();
                    message.forEach((task) => {
                        addTask(task); // Add each task to the tasks list
                    });
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        return () => {
            ws.close();
        };
    }, []);


    // Fetch unread messages and notifications when userId or token changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [messagesResponse, notificationsResponse] = await Promise.all([
                    fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/messages/unread/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': token
                        }
                    }),
                    fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/notifications/unread/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': token
                        }
                    })
                ]);

                if (!messagesResponse.ok) {
                    throw new Error(`Error fetching unread messages! Status: ${messagesResponse.status}`);
                }

                if (!notificationsResponse.ok) {
                    throw new Error(`Error fetching unread notifications! Status: ${notificationsResponse.status}`);
                }
                console.log("FETCH NOtificações")
                const messagesData = await messagesResponse.json();
                const notificationsData = await notificationsResponse.json();

                notificationsStore.setState((state) => ({
                    ...state,
                    unreadMessages: messagesData || [],
                    notifications: notificationsData || [],
                }));
            } catch (error) {
                console.error('Error fetching unread data:', error);
            }
        };

        fetchData();
    }, [userId, token]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                {isSidebarVisible && <Sidebar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>}
                <div className="flex-1">
                    <Header username={username} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>
                    <div>{children}</div>
                </div>
            </div>
            <Footer className="bg-gray-800 text-white p-4" />
        </div>
    );
};

export default Layout;
