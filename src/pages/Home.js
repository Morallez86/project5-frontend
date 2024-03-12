import React from "react";
import Sidebar from '../components/navbar/Sidebar';
import Header from '../components/header/Header';
import '../index.css';
import Footer from '../components/footer/footer';

function Home() {

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1">
                    <Header />
                    <div>
                        <h1></h1>
                        <p></p>
                    </div>
                </div>
            </div>

            <Footer className="bg-gray-800 text-white p-4" />
        </div>
    );
}

export default Home;
