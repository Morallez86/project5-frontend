import React, { useState, useEffect } from 'react';
import Sidebar from '../components/navbar/Sidebar';
import Header from '../components/header/Header';
import Footer from '../components/footer/footer';
import { userStore } from "../stores/UserStore";
import TasksListColumn from "../components/tasksListColumn/TasksListColumn";
import TaskComponent from "../components/taskComponent/TaskComponent";
import '../index.css';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Initialize to false
    const username = userStore((state) => state.username);
    const token = userStore((state) => state.token); // Define token

    const toggleSidebar = () => { // Define toggleSidebar function
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            if (token !== null) {
            try {
                const response = await fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                console.log(data);
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        };

        fetchTasks();
    }, [token]);

    const filterTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <Sidebar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} /> {/* Pass isSidebarVisible to Sidebar */}
                <div className="flex-1">
                    <Header username={username} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} /> {/* Pass isSidebarVisible to Header */}
                    <div className="flex flex-row h-5/6 p-10 mt-5 space-x-10">
                        <TasksListColumn title="To Do">
                            {filterTasksByStatus(100).map(task => (
                                <TaskComponent key={task.id} id={task.id} title={task.title} priority={task.priority} owner={task.owner} />
                            ))}
                        </TasksListColumn>
                        <TasksListColumn title="Doing">
                            {filterTasksByStatus(200).map(task => (
                                <TaskComponent key={task.id} id={task.id} title={task.title} priority={task.priority} owner={task.owner} />
                            ))}
                        </TasksListColumn>
                        <TasksListColumn title="Done">
                            {filterTasksByStatus(300).map(task => (
                                <TaskComponent key={task.id} id={task.id} title={task.title} priority={task.priority} owner={task.owner} />
                            ))}
                        </TasksListColumn>
                    </div>
                </div>
            </div>
            <Footer className="bg-gray-800 text-white p-4" />
        </div>
    );
}

export default Home;
