import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './Layout';
import { userStore } from '../stores/UserStore';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { format } from 'date-fns';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { notificationsStore } from '../stores/NotificationsStore';


function Chat() {
    const [searchResults, setSearchResults] = useState([]);
    const token = userStore((state) => state.token);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState(null);
    const [users, setUsers] = useState([]);
    const messagesEndRef = useRef(null);

    const fetchMessages = useCallback((recipientId) => {
        fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/messages?recipientId=${recipientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch messages');
            }
        })
        .then((data) => {
            // Format timestamps in the fetched data before updating state
            const formattedMessages = data.map((message) => ({
                ...message,
                timestamp: format(new Date(message.timestamp), 'yyyy-MM-dd HH:mm:ss')
            }));
            
            // Update state with formatted messages
            setMessages(formattedMessages);
        })
        .catch((error) => {
            console.error('Error fetching messages:', error);
        });
    }, [token]);

    useEffect(() => {
        const fetchUsers = () => {
            fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/messages/chat`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch users');
                }
            })
            .then((data) => {
                // Update state with fetched users
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
        };

        fetchUsers();
    }, [token]); // Added 'token' as a dependency

    useEffect(() => {
        // Establish WebSocket connection when receiverId changes
        if (receiverId) {
            const userId = receiverId;
            const ws = new WebSocket(`ws://localhost:8080/demo-1.0-SNAPSHOT/websocket/chat/${userId}`);

            ws.onopen = () => {
                console.log('WebSocket connected');
                setSocket(ws);
            };

            ws.onclose = () => {
                console.log('WebSocket disconnected');
                setSocket(null);
            };

            ws.onmessage = (event) => {
                try {
                    const newMessage = JSON.parse(event.data);

                    // Extract date components from the array
                    const [year, month, day, hours, minutes, seconds, milliseconds] = newMessage.timestamp;

                    // Create a new Date object using extracted date components
                    const parsedTimestamp = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);

                    if (isNaN(parsedTimestamp.getTime())) {
                        console.error('Invalid timestamp:', newMessage.timestamp);
                        return;
                    }

                    // Format the parsed timestamp using date-fns
                    const formattedMessage = {
                        ...newMessage,
                        timestamp: format(parsedTimestamp, 'yyyy-MM-dd HH:mm:ss')
                    };

                    setMessages((prevMessages) => [...prevMessages, formattedMessage]);
                } catch (error) {
                    console.error('Error parsing or processing message:', error);
                }
            };
            return () => {
                // Cleanup: close WebSocket connection when component unmounts or receiverId changes
                ws.close();
            };
        }
    }, [receiverId]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom when component mounts
    }, []);

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom when messages update
    }, [messages]);

    useEffect(() => {
        // WebSocket connection and handling logic
    }, [receiverId]);


    const handleUserClick = (userId) => {
        setReceiverId(userId);
        fetchMessages(userId);
        console.log(`User clicked with ID: ${userId}`);
    };

    const handleOnHover = (result) => {

    };

    const handleOnSelect = (item) => {
        setReceiverId(item.id);
        fetchMessages(item.id); // Fetch messages for the selected user
    };

    const handleOnFocus = () => {
    };

    const formatResult = (item) => {
        return (
            <div>
                <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
            </div>
        );
    };

const handleSendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const senderId = userStore.getState().userId;
        const messageObject = {
            sender: senderId,
            recipient: receiverId,
            content: message
        };
        console.log(messageObject)
        socket.send(JSON.stringify(messageObject)); // Send message as JSON string
    } else {
        console.error('WebSocket connection not established.');
    }
};


    const handleSearch = (string) => {

        if (string.length >= 2) {
            fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/search?query=${string}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Search request failed');
                }
            })
            .then((data) => {
                // Format each item in the data array
                const formattedResults = data.map((item) => ({
                    id: item.id,
                    name: item.username,
                }));

                // Update searchResults state with formatted results
                setSearchResults(formattedResults);
            })
            .catch((error) => {
                console.error('Error searching users:', error);
                setSearchResults([]); // Clear search results on error
            });
        } else {
            setSearchResults([]); // Clear search results if query length is less than 3
        }
    };

    const handleConfirmSeen = (messageId) => {
        fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/messages/seen/${messageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: token,
            },
            body: JSON.stringify({ messageId }),
        })
        .then((response) => {
            if (response.ok) {
            // Find the message in the messages array and update its read status
            const updatedMessages = messages.map((message) =>
                message.id === messageId ? { ...message, read: true } : message
            );
            setMessages(updatedMessages);
            notificationsStore.removeUnreadMessage(updatedMessages);

            // If backend response indicates a broader update, fetch updated messages
            // Example: Fetch all messages for the receiverId to reflect updated read status
            if (response.status === 200) {
                fetchMessages(receiverId); // Update all messages for the current receiverId
            }

            console.log(`Message ${messageId} marked as seen`);
            } else {
                throw new Error('Failed to mark message as seen');
            }
        })
        .catch((error) => {
            console.error('Error marking message as seen:', error);
        });
    };


    const renderMessageContainer = (message) => {
        const isCurrentUser = message.sender === userStore.getState().userId;
        const isSeen = message.read;

        const handleConfirmSeenClick = (messageId) => {
            if (!isSeen) {
                handleConfirmSeen(messageId);
            }
        };

        return (
            <div
                key={message.id}
                className={`py-2 px-4 border-b ${isCurrentUser ? 'ml-auto' : 'mr-auto'} w-fit ${
                    isCurrentUser ? 'bg-gray-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl' : 'bg-blue-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl round'
                } text-white`}
            >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs text-gray-500">{message.timestamp}</div>
                {!isCurrentUser && (
                    <IoIosCheckmarkCircle
                        className={`cursor-pointer mt-1 ${isSeen ? 'text-green-300' : 'text-gray-300'}`}
                        onClick={() => handleConfirmSeenClick(message.id)}
                    />
                )}
            </div>
        );
    };

    return (
        <Layout>
            <div className="container mx-auto shadow-lg rounded-lg p-6" style={{ maxHeight: '80vh' }}>
                <div className="px-5 py-5 flex justify-between items-center bg-white rounded border-b-2">
                    <div className="font-semibold text-2xl">ScrumChat</div>
                </div>
                <div className="flex flex-row justify-between bg-white">
                    <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                        <div className="border-b-2 py-4 px-2 cursor-progress">
                            <ReactSearchAutocomplete
                                items={searchResults}
                                onSearch={handleSearch}
                                onHover={handleOnHover}
                                onSelect={handleOnSelect}
                                onFocus={handleOnFocus}
                                autoFocus
                                formatResult={formatResult}
                            />
                        </div>
                        {users.map((user) => (
                            <div
                                key={"user" + user.userId}
                                className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer"
                                onClick={() => handleUserClick(user.userId)}
                            >
                                <div className="w-1/4">
                                    <img
                                        src={user.photoUrl}
                                        className="object-cover h-12 w-12 rounded-full"
                                        alt=""
                                    />
                                </div>
                                <div className="w-full">
                                    <div className="text-lg font-semibold">{user.username}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full px-5 flex flex-col justify-between">
                        <div className="flex flex-col mt-5 space-y-2" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                            {messages.map((message) => renderMessageContainer(message))}
                            <div ref={messagesEndRef} /> {/* Ref for scrolling to the end */}
                        </div>
                        <div className="py-5">
                            <input
                                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                                type="text"
                                placeholder="type your message here..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const message = e.target.value.trim();
                                        if (message) {
                                            handleSendMessage(message);
                                            e.target.value = ''; // Clear input field after sending
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Chat;