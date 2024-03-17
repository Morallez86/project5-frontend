import React from "react"
import Sidebar from '../components/navbar/Sidebar'
import '../index.css'
import { userStore } from "../stores/UserStore"
import Footer from '../components/footer/footer';
import Header from '../components/header/Header';
import UserTable from "../components/tables/UserTable";

function ManagingUsers(){
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const username2 = userStore((state) => state.username);

    return(
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                {isSidebarVisible && <Sidebar toggleSidebar={toggleSidebar}/>}
                <div className="flex-1">
                    <Header username={username2} toggleSidebar={toggleSidebar} />
                    <div className="text-white p-4 flex justify-center">
                        <UserTable/>
                    </div>
                </div>
            </div>
            <Footer className="bg-gray-800 text-white p-4" />
        </div>
    )
}

export default ManagingUsers