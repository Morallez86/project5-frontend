import React, { useEffect, useState } from 'react';
import Sidebar from '../components/navbar/Sidebar';
import Header from '../components/header/Header';
import Footer from '../components/footer/footer';
import { userStore } from "../stores/UserStore";
import { notificationsStore } from '../stores/NotificationsStore';

const Layout = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const username = userStore((state) => state.username);
    const token = userStore((state) => state.token);
    const userId = userStore((state) => state.userId);

    // WebSocket setup and message handling
    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/demo-1.0-SNAPSHOT/websocket/application/${token}`);

        ws.onopen = () => {
            console.log('WebSocket connected for notifications and unread messages');
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'newMessage') {
                    if (message.recipient === userId) {
                        notificationsStore.addUnreadMessage(message);
                    }
                } else if (message.type === 'newNotification') {
                    notificationsStore.addNotification(message);
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        return () => {
            ws.close();
        };
    }, [token, userId]);

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
                    fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/notifications/${userId}`, {
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
