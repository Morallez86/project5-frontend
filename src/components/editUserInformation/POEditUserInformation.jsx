import React, { useState, useEffect } from 'react';
import { ProfileStore } from "../../stores/ProfileStore";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";

const POEditUserInformation = ({ userDetails }) => {
  const token = userStore((state) => state.token);
  const selectedUserId = ProfileStore((state) => state.userId);
  const navigate = useNavigate();
  const userRole = userStore((state) => state.role);
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
    if (userDetails) {
      setFormData(userDetails);
    }
  }, [userDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
        const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/updateProfile/${selectedUserId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token, 
        },
        body: JSON.stringify(formData)
    });
    console.log(formData)
    const data = await response.json();
    console.log(data);
    navigate('/Home');
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
      <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-6 md:p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <div> 
          <h1 className="text-4xl text-whitefont-bold text-center mb-6">Profile User</h1>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:flex-wrap">
            <div className="relative my-4 flex-grow md:w-1/2 md:pr-4">
              <input 
                type="text" 
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950" 
                placeholder=""
                value={formData.username}
                onChange={handleChange}
                name="username"/>
              <label 
                htmlFor="" 
                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6 text-center"
                >Username
              </label>
            </div>
            <div className="relative my-4 flex-grow md:w-1/2 md:pr-4">
              <input 
                type="text" 
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950" 
                placeholder=""
                value={formData.firstname}
                onChange={handleChange}
                name="firstname"
              />
              <label 
                htmlFor="" 
                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6 text-center"
              >First Name
              </label>
            </div>
            <div className="relative my-4 flex-grow md:w-1/2 md:pr-4">
              <input 
                type="text" 
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950" 
                placeholder=""
                value={formData.lastname}
                onChange={handleChange}
                name="lastname"
              />
              <label 
                htmlFor="" 
                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6 text-center"
              >Last Name
              </label>
            </div>
            <div className="relative my-4 flex-grow md:w-1/2 md:pr-4">
              <input 
                type="email" 
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950" 
                placeholder=""
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
              <label 
                htmlFor="" 
                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6 text-center"
              >Email
              </label>
            </div>
            <div className="relative my-4 flex-grow md:w-1/2 md:pr-4">
              <input 
                type="text" 
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950" 
                placeholder=""
                value={formData.phone}
                onChange={handleChange}
                name="phone"
              />
              <label 
                htmlFor="" 
                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6 text-center"
              >Phone
              </label>
            </div>
            {userRole === 'po' && (
              <div className="relative my-4 flex-grow md:w-1/2 md:pr-4">
                <select 
                  className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select Job</option>
                  <option className="text-black" value="dev">Developer</option>
                  <option className="text-black" value="sm">Scrum Master</option>
                  <option className="text-black" value="po">Product Owner</option>
                </select>
                <label 
                  htmlFor="" 
                  className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6 text-center"
                >
                User Job
                </label>
              </div>
            )}
            <div className="relative my-4 flex-grow md:w-1/2 md:pr-4">
              <input 
                type="text" 
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950" 
                placeholder=""
                value={formData.photoURL}
                onChange={handleChange}
                name="photoURL"
              />
              <label 
                htmlFor="" 
                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6 text-center"
              >Photo URL
              </label>
            </div>
                {userRole === 'po' && (
                  <button
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300"
                    type="submit"
                    >
                    Save
                  </button>
                )}
                </form>
                <button 
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                    type="button"
                    onClick={() => navigate('/ManagingUsers')}
                    >Return
                </button>
            </div>
        </div>
        </div>
  )
}

export default POEditUserInformation