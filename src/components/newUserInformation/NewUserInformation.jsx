import React from 'react';
import { useState } from "react";
import { userStore } from "../../stores/UserStore";

const NewUserInformation = () => {
  const token = userStore((state) => state.token);
  const role = userStore((state) => state.role);
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role: '',
    photoURL: ''
  });

  const handleSubmit = async (event) => {
  event.preventDefault();
  
  try {
    const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
        'role': role
      },
      body: JSON.stringify(formData)
    });
    console.log(formData)
    const data = await response.json(); 
    console.log(data);
  } catch (error) {
    console.error('Error adding user:', error);
  }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="text-white mt-8 flex justify-center items-center">
    <div className="bg-cyan-900/60	border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div> 
                <h1 className="text-4xl text-whitefont-bold text-center mb-6">Profile</h1>
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
                        >Username
                    </label>
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
                </div>
                <div className="relative my-4">
                    <input 
                    type="text" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    onChange={handleChange}
                    name="firstname"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >First Name
                    </label>
                </div>
                <div className="relative my-4">
                    <input 
                    type="text" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    onChange={handleChange}
                    name="lastname"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >Last Name
                    </label>
                </div>
                <div className="relative my-4">
                    <input 
                    type="email" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    onChange={handleChange}
                    name="email"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >Email
                    </label>
                </div>
                <div className="relative my-4">
                    <input 
                    type="text" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    onChange={handleChange}
                    name="phone"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >Phone
                    </label>
                </div>
                <div className="relative my-4">
                <select 
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer"
                name="role"
                onChange={handleChange}
                >
                <option value="">Select Job</option>
                <option className="text-black" value="dev">Developer</option>
                <option className="text-black" value="sm">Scrum Master</option>
                <option className="text-black" value="po">Product Owner</option>
              </select>
              <label 
                htmlFor="" 
                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
              >
                User Job
              </label>
            </div>
                <div className="relative my-4">
                    <input 
                    type="text" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    onChange={handleChange}
                    name="photoURL"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >Photo URL
                    </label>
                </div>
                
                <button 
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                    type="submit"
                    >Save
                </button>
                </form>
            </div>
        </div>
        </div>
  )
}

export default NewUserInformation