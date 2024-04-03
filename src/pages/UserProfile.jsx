import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
    const { username } = useParams();
    const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role: '',
    photoURL: ''
    });

    useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/shareProfileDetails/${username}`, {
                method: 'GET',
            });
            const userDetails = await response.json();
            setFormData(userDetails);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    fetchUserDetails();
    }, [username]);

    return (
        <div className="text-white p-8 flex justify-center items-center">
        <div className="bg-cyan-900/60	border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div> 
                <h1 className="text-4xl text-white font-bold text-center mb-6">Profile</h1>
                <div className="relative my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.username}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        Username
                    </label>
                </div>
                <div className="relative my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.firstname}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        First Name
                    </label>
                </div>
                <div className="relative my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.lastname}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        Last Name
                    </label>
                </div>
                <div className="relative my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.email}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        Email
                    </label>
                </div>
                <div className="relative my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.phone}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        Phone
                    </label>
                </div>
                <div className="relative my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.role}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        User Job
                    </label>
                </div>
            </div>
            <img src={formData.photoURL} alt="User" className="w-32 h-32 rounded-full mx-auto mt-4" />
        </div>
        </div>
    );
}

export default UserProfile;
