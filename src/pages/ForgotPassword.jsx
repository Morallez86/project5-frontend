import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/footer/footer";



function VerifyAccount(){
    const [showWarning, setShowWarning] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    setShowWarning(false); // Hide warning when user types
  };

const handleAccountRegistration = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (password !== confirmPassword) {
      setShowWarning(true);
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/forgotPassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password })
      });
      await response.json();
      if (response.ok) {
        navigate('/', { replace: true });
      } else {
        // Handle other response scenarios if needed
      }
    } catch (error) {
      console.error('Error confirming registration:', error);
    }
  };


    return(
        <div >
            <div className="text-white min-h-screen flex justify-center items-center">
                <div className="bg-cyan-900/60	border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative w-full max-w-md">
                    <div> 
                        <h1 className="text-3xl w-full text-whitefont-bold text-center px-1 mb-6">New Password</h1>
                        <form onSubmit={handleAccountRegistration}>
                        <div className="relative my-4">
                            <input 
                                type="password" 
                                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                                placeholder=""
                                value={password}
                                onChange={handleChange}
                                name="password"/>
                            <label 
                                htmlFor="" 
                                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                                >Password
                            </label>
                        </div>
                        <div className="relative my-4">
                            <input 
                            type="password" 
                            className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                            placeholder=""
                            value={confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            />
                            <label 
                            htmlFor="" 
                            className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6">
                            Confirm Password
                            </label>
                        </div>
                        {showWarning &&(
                        <label 
                        htmlFor="" 
                        className="px-1 text-sm mb-4 text-red-600 text-center"
                        >Password and confirmed password are not the same
                        </label>
                        )}
                        <button 
                            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                            type="submit"
                            >Change Password
                        </button>
                        </form>
                    </div>
                </div>
            </div>
      <Footer />
    </div>
    )
}

export default VerifyAccount