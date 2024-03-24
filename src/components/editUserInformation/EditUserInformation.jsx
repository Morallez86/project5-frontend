import React from 'react';
import { useState, useEffect } from "react"
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";

const EditUserInformation = () => {
  const token = userStore((state) => state.token);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userRole = userStore((state) => state.role);
  const [showPasswordUpdated, setShowPasswordUpdated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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
        const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/profileDetails/0', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          }
        });
        const userDetails = await response.json();
        setFormData(userDetails); // Update the formData state with user details
        console.log(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleSubmit = async (event) => {
  event.preventDefault();
  
    try {
        // Make a POST request to your endpoint
        const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/updateProfile/0', {
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

  const handlePasswordChange = async () => {
  // Check if the new password matches the confirmed password
  if (newPassword !== confirmPassword) {
    setShowWarning(true); // Show warning message
    return; // Exit the function early
  }

  // Send a request to change the password
  try {
    const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/updatePassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      // Password successfully updated
      setShowPasswordUpdated(true); // Show success message
      setShowWarning(false);
      setShowModal(false); // Close the modal after changing the password
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      // Error updating password
      setShowPasswordUpdated(false); // Hide success message
      setShowWarning(false);
      // Display the error message from the backend
      setErrorMsg(data.message); // Assuming the error message is in the 'message' field of the response
    }
  } catch (error) {
    console.error('Error changing password:', error);
  }
};

  const handleCloseModal = () => {
    setShowModal(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowWarning(false);
    setErrorMsg(false);
    setShowPasswordUpdated(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="text-white p-8 flex justify-center items-center">
    <div className="bg-cyan-900/60	border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div> 
                <h1 className="text-4xl text-whitefont-bold text-center mb-6">Profile</h1>
                <form onSubmit={handleSubmit}>
                <div className="relative my-4">
                    <input 
                        type="text" 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                        placeholder=""
                        value={formData.username}
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
                    type="text" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    value={formData.firstname}
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
                    value={formData.lastname}
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
                    value={formData.email}
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
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >Phone
                    </label>
                </div>
                {userRole === 'po' && (
                <div className="relative my-4">
                <select 
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer"
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
                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
              >
                User Job
              </label>
            </div>
                )}
                <div className="relative my-4">
                    <input 
                    type="text" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    value={formData.photoURL}
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
                <button 
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                    type="button"
                    onClick={() => setShowModal(true)}
                    >Change Password
                </button>
            </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="bg-cyan-900 p-6 rounded-lg z-20 border-2 border-white">
            <h2 className="text-lg font-bold mb-4 text-white text-center">Change Password</h2>
            <input
              type="password"
              className="block w-full py-2.5 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              className="block w-full py-2.5 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              className="block w-full py-2.5 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showWarning &&(
              <label 
                htmlFor="" 
                className="px-1 text-sm mb-4 text-red-600 text-center"
                >New password does not match confirmed password
              </label>
            )}
            {showPasswordUpdated && (
              <label 
              htmlFor="" 
              className="px-1 text-sm mb-4 text-green-600 text-center"
              >Password updated successfully
              </label>
            )}
            {errorMsg && (
              <label 
              htmlFor="" 
              className="px-1 text-sm mb-4 text-red-600 text-center"
              >{errorMsg}
              </label>
            )}
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-cyan-950 w-20 h-10 text-white rounded hover:bg-cyan-950 mr-2"
                onClick={handlePasswordChange}
              >
                Save
              </button>
              <button
                className="px-4 py-2 w-20 h-10 bg-slate-400 text-white rounded hover:bg-slate-500"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditUserInformation;