import React, { useState, useEffect } from 'react';
import { userStore } from "../stores/UserStore";
import TasksListColumn from "../components/tasksListColumn/TasksListColumn";
import TaskComponent from "../components/taskComponent/TaskComponent";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { taskStore } from "../stores/TaskStore";
import { FormattedMessage, IntlProvider } from 'react-intl';
import languages from '../translations';

function Home() {
    const { tasks, addTask, clearTasks } = taskStore();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const token = userStore((state) => state.token);
    const navigate = useNavigate();
    const locale = userStore((state) => state.locale);

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
                    clearTasks();
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
        <IntlProvider locale={locale} messages={languages[locale]}>
            <Layout isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center p-4 mt-5">
                    <TasksListColumn title={<FormattedMessage id="todo" defaultMessage="To Do" />}>
                        {filterTasksByStatus(100).map(task => (
                            <TaskComponent key={task.id} id={task.id} title={task.title} priority={task.priority} owner={task.owner} />
                        ))}
                    </TasksListColumn>
                    <TasksListColumn title={<FormattedMessage id="doing" defaultMessage="Doing" />}>
                        {filterTasksByStatus(200).map(task => (
                            <TaskComponent key={task.id} id={task.id} title={task.title} priority={task.priority} owner={task.owner} />
                        ))}
                    </TasksListColumn>
                    <TasksListColumn title={<FormattedMessage id="done" defaultMessage="Done" />}>
                        {filterTasksByStatus(300).map(task => (
                            <TaskComponent key={task.id} id={task.id} title={task.title} priority={task.priority} owner={task.owner} />
                        ))}
                    </TasksListColumn>
                </div>
            </Layout>
        </IntlProvider>
    );
}

export default Home;
