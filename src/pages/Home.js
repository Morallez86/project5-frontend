import React from "react";
import Sidebar from '../components/navbar/Sidebar';
import Header from '../components/header/Header';
import '../index.css';
import Footer from '../components/footer/footer';
import { userStore } from "../stores/UserStore";
import TasksListColumn from '../components/tasksListColumn/TasksListColumn';

function Home() {
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const username2 = userStore((state) => state.username);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                {isSidebarVisible && <Sidebar />}
                <div className="flex-1">
                    <Header username={username2} toggleSidebar={toggleSidebar} />
                    <div className="flex flex-row">
                        <TasksListColumn title="To Do" />
                        <TasksListColumn title="Doing" />
                        <TasksListColumn title="Done" />
                    </div>
                </div>
            </div>
            <Footer className="bg-gray-800 text-white p-4" />
        </div>
    );
}

export default Home;
