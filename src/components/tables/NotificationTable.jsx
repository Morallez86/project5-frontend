import React, { useState, useEffect } from 'react';
import { userStore } from "../../stores/UserStore";
import { MdOutlineMessage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import languages from '../../translations';
import { FormattedMessage, IntlProvider } from 'react-intl';


function NotificationTable() {
    const locale = userStore((state) => state.locale);
    const token = userStore((state) => state.token);
    const userId = userStore((state) => state.userId);
    const [notifications, setAllNotifications] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/chat`);
    };

    const formatTimestamp = (timestamp) => {
        // Split the timestamp string at 'T' to separate date and time components
        const parts = timestamp.split('T');

        if (parts.length !== 2) {
            // Invalid timestamp format, return the original string
            return timestamp;
        }

        const datePart = parts[0]; // Extract the date part 'yyyy-mm-dd'
        const timePartWithMillis = parts[1]; // Extract the time part 'hh:mm:ss.ssssss'

        // Remove milliseconds part by splitting timePartWithMillis at '.'
        const timePart = timePartWithMillis.split('.')[0]; // 'hh:mm:ss'

        // Construct the formatted timestamp with a space between date and time parts
        const formattedTimestamp = `${datePart} ${timePart}`;

        return formattedTimestamp;
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            if (token && userId) {
                try {
                    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/notifications/all/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': token,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setAllNotifications(data);
                        console.log(data)
                    } else {
                        console.error('Failed to fetch notifications.');
                    }
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };

        fetchNotifications();
    }, [token, userId]);


    return (
        <IntlProvider locale={locale} messages={languages[locale]}>
        <div className=" p-8 text-white flex justify-center">
            <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-8 backdrop-filter backdrop-blur-sm bg-opacity-30 text-center w-full max-w-screen-lg">
                <h1 className="text-2xl font-bold mb-4">
                    <FormattedMessage id="notifications" defaultMessage="Notifications" />
                </h1>
                <div className='overflow-y-auto overflow-x-auto max-h-96' style={{ paddingRight: '8px' }}>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border border-gray-300">
                                    <FormattedMessage id="message" defaultMessage="Message" />
                                </th>
                                <th className="px-4 py-2 border border-gray-300">
                                    <FormattedMessage id="time" defaultMessage="Time" />
                                </th>
                                <th className="px-4 py-2 border border-gray-300">Chat</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {notifications.map(notification => (
                                <tr key={notification.id} className={`text-center border border-gray-300 ${notification.read ? 'text-white' : 'text-gray-800'}`}>
                                    <td className="px-4 py-2 border border-gray-300">{notification.message}</td>
                                    <td className="px-4 py-2 border border-gray-300">{formatTimestamp(notification.timestamp)}</td>
                                    <td className="px-4 py-2">
                                        {notification.notificationType === 'message' && (
                                            <div className="flex items-center justify-center cursor-pointer">
                                                <MdOutlineMessage className="text-xl" onClick={handleNavigate} />
                                            </div>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </IntlProvider>
    );
}

export default NotificationTable