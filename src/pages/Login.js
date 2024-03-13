import React from "react"
import '../index.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock} from "react-icons/ai";



function Login(){
    const updateUserData = userStore((state) => state.updateUserData);
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values,[name]:value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Make a request to your authentication endpoint with user credentials
            const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': inputs.username,
                'password': inputs.password,
            },
            body: JSON.stringify(inputs),
            });
            if (response.ok) {
                const userData = await response.json();
                // Update user information in the store
                updateUserData(
                    userData.username,
                    userData.token,
                    userData.role
                );
                // Navigate to the home page or another route
                navigate('/Home', { replace: true });
            } else {
                // Authentication failed
                console.error('Authentication failed');
            }
            } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    return(
        <div className="bg-cyan-900/60	border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div> 
                <h1 className="text-4xl text-whitefont-bold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit}>
                <div className="relative my-4">
                    <input 
                        type="text" 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                        placeholder=""
                        onChange={handleChange}
                        name="username"/>
                    <label 
                        htmlFor="" 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                        >Your Username
                    </label>
                        <BiUser className="absolute top-4 right-4"></BiUser>
                </div>
                <div className="relative my-4">
                    <input 
                    type="password" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    onChange={handleChange}
                    name="password"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6">Your Password
                    </label>
                    <AiOutlineUnlock className="absolute top-4 right-4"></AiOutlineUnlock>
                </div>
                <button 
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                    type="submit"
                    >Login
                </button>
                </form>
            </div>
        </div>
    )
}

export default Login