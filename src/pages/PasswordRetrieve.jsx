import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../components/footer/footer';

function PasswordRetrieve() {
    const [showWarning, setShowWarning] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');

        try {
            const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/checkEmail', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: email,
            });

            if (response.ok) {
                // Email exists in the backend
                navigate('/'); // Navigate to the password reset page
            } else {
                // Email does not exist
                setShowWarning(true);
            }
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    return (
        <div>
            <div className="text-white min-h-screen flex justify-center items-center">
                <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative w-full max-w-md">
                    <div> 
                        <h1 className="text-3xl w-full text-white font-bold text-center px-1 mb-6">New password</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="relative my-4">
                                <input 
                                    type="email" 
                                    className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                                    placeholder="Enter your email"
                                    name="email"
                                />
                                <label 
                                    htmlFor="" 
                                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                                >
                                </label>
                            </div>
                            {showWarning && (
                                <label 
                                    htmlFor="" 
                                    className="px-1 text-sm mb-4 text-red-600 text-center"
                                >Email not found
                                </label>
                            )}
                            <button 
                                className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                                type="submit"
                            >Send Email
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PasswordRetrieve;
