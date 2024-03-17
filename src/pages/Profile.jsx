import React from "react"
import Sidebar from '../components/navbar/Sidebar'
import '../index.css'
import { userStore } from "../stores/UserStore"
import Footer from '../components/footer/footer';
import Header from '../components/header/Header';
import EditUserInformation from '../components/editUserInformation/EditUserInformation';
import { ProfileStore } from "../stores/ProfileStore";
import POEditUserInformation from '../components/editUserInformation/POEditUserInformation';



function Profile(){
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
    const selectedUserId = ProfileStore((state) => state.userId);
    console.log(selectedUserId);

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
                    <div>
                        {selectedUserId ? <POEditUserInformation /> : <EditUserInformation />}
                    </div>
                </div>
            </div>
            <Footer className="bg-gray-800 text-white p-4" />
        </div>
    );
}

export default Profile