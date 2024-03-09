import React from "react";
import Sidebar from '../components/navbar/Sidebar';
import Header from '../components/header/Header';
import '../index.css';
import { userStore } from "../stores/UserStore";
import Footer from '../components/footer/footer';

function Home() {
    const username = userStore((state) => state.username);

    return (
        <div className="flex flex-col h-screen">

            {/* Main Content */}
            <div className="flex flex-1">

                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1">
                    {/* Header */}
                    <Header />

                    {/* Main Content */}
                    <div>
                        <h1>Home</h1>
                        <p>Welcome {username}</p>
                    </div>
                </div>
            </div>

            {/* Footer component with modified styles */}
            <Footer className="bg-gray-800 text-white p-4" />
        </div>
    );
}

export default Home;
