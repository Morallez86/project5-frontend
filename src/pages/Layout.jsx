import React from 'react';
import Sidebar from '../components/navbar/Sidebar';
import Header from '../components/header/Header';
import Footer from '../components/footer/footer';
import { userStore } from "../stores/UserStore";

const Layout = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const username2 = userStore((state) => state.username);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                {isSidebarVisible && <Sidebar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>}
                <div className="flex-1">
                    <Header username={username2} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>
                    <div>{children}</div>
                </div>
            </div>
            <Footer className="bg-gray-800 text-white p-4" />
        </div>
    );
};

export default Layout;
