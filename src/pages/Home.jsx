import React, { useState, useEffect } from 'react';
import { userStore } from "../stores/UserStore";
import TasksListColumn from "../components/tasksListColumn/TasksListColumn";
import TaskComponent from "../components/taskComponent/TaskComponent";
import '../index.css';
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { taskStore } from "../stores/TaskStore";

function Home() {
    const { tasks, addTask, clearTasks } = taskStore(); // Access tasks state and addTask action from taskStore
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Initialize to false
    const token = userStore((state) => state.token); // Define token
    const navigate = useNavigate();

    const toggleSidebar = () => {
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
                    clearTasks();
                    // Add fetched tasks to the taskStore
                    data.forEach(task => {
                        addTask(task);
                    });
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            } else {
                navigate('/');
            }
        };

        fetchTasks();
    }, [token, navigate, addTask, clearTasks]);

    const filterTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };

    return (
        <Layout isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar}>
            <div className="flex flex-row h-5/6 p-10 mt-5 space-x-10 justify-center">
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
        </Layout>
    );
}

export default Home;
