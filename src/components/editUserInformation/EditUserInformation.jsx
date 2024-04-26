import React, { useState, useEffect } from 'react';
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import languages from '../../translations';
import { FormattedMessage, IntlProvider } from 'react-intl';

const EditUserInformation = ({ userDetails }) => {
  const locale = userStore((state) => state.locale);
  const token = userStore((state) => state.token);
  const usernameProfile = userStore((state) => state.username);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userRole = userStore((state) => state.role);
  const [showPasswordUpdated, setShowPasswordUpdated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const profileURL = `http://localhost:3000/Profile/${usernameProfile}`;
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
    event.preventDefault();

    // Create a new object with filtered fields from formData
    const { taskCounts, totalTasks, ...filteredFormData } = formData;
    try {
        const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/updateProfile/0', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token, 
        },
        body: JSON.stringify(filteredFormData)
      });
      const data = await response.json();
      console.log(data); 
      navigate('/Home');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setShowWarning(true);
      return;
    }
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
        setShowPasswordUpdated(true);
        setErrorMsg('');
        setTimeout(() => {
          setShowModal(false);
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setShowPasswordUpdated(false);
        }, 3000); 
      } else {
        setShowPasswordUpdated(false);
        setShowWarning(false);
        setErrorMsg(data.message);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
      })
      .catch((error) => console.error('Error copying to clipboard:', error));
  };

  return (
    <IntlProvider locale={locale} messages={languages[locale]}>
    <div className="text-white p-8 flex justify-center items-center">
    <div className="bg-cyan-900/60	border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div> 
                <h1 className="text-4xl text-whitefont-bold text-center mb-6">
                  <FormattedMessage id="profileTitle" defaultMessage="Profile" />
                </h1>
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
                        ><FormattedMessage id="usernameLabel" defaultMessage="username" />
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
                    ><FormattedMessage id="firstNameProfile" defaultMessage="First Name" />
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
                    ><FormattedMessage id="lastNameProfile" defaultMessage="Last Name" />
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
                    ><FormattedMessage id="emailProfile" defaultMessage="Email" />
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
                    ><FormattedMessage id="phoneProfile" defaultMessage="Phone" />
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
                <option className='text-black' value="">
                  <FormattedMessage id="selectJob" defaultMessage="Select Job" />
                </option>
                <option className='text-black' value="dev">
                  <FormattedMessage id="developer" defaultMessage="Developer" />
                </option>
                <option className='text-black' value="sm">
                  <FormattedMessage id="scrumMaster" defaultMessage="Scrum Master" />
                </option>
                <option className='text-black' value="po">
                  <FormattedMessage id="productOwner" defaultMessage="Product Owner" />
                </option>
              </select>
              <label 
                htmlFor="" 
                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
              >
                <FormattedMessage id="userJobProfile" defaultMessage="User Job" />
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
                    ><FormattedMessage id="photoURLProfile" defaultMessage="Photo URL" />
                    </label>
                </div>
                
                <button 
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                    type="submit"
                    ><FormattedMessage id="saveButton" defaultMessage="Save" />
                </button>
                </form>
                <button 
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                    type="button"
                    onClick={() => setShowModal(true)}
                    ><FormattedMessage id="changePasswordButton" defaultMessage="Change Password" />
                </button>
                <button 
                  className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                  type="button"
                  onClick={copyToClipboard}>
                <FormattedMessage 
                  id={copied ? 'copiedMessage' : 'shareProfileMessage'}
                  defaultMessage={copied ? 'Copied!' : 'Share Profile'}
                />
              </button>
            </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="bg-cyan-900 p-6 rounded-lg z-20 border-2 border-white">
            <h2 className="text-lg font-bold mb-4 text-white text-center">
              <FormattedMessage id="ChangePassword" defaultMessage="Change Password" />
            </h2>
            <input
              type="password"
              className="block w-full py-2.5 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
              placeholder={languages[locale].oldPassword}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              className="block w-full py-2.5 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
              placeholder={languages[locale].newPassword}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              className="block w-full py-2.5 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
              placeholder={languages[locale].confirmPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showWarning &&(
              <label 
                htmlFor="" 
                className="px-1 text-sm mb-4 text-red-600 text-center"
                > <FormattedMessage
                id="passwordMismatch"
                defaultMessage="Password and confirmed password are not the same"
              />
              </label>
            )}
            {showPasswordUpdated && (
              <label 
              htmlFor="" 
              className="px-1 text-sm mb-4 text-green-600 text-center"
              ><FormattedMessage
                id="passwordUpdated"
                defaultMessage="Password updated successfully"
              />
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
                className="px-4 py-2 bg-cyan-950 w-auto h-10 text-white rounded hover:bg-cyan-950 mr-2"
                onClick={handlePasswordChange}
              >
                <FormattedMessage id="saveButton" defaultMessage="Save" />
              </button>
              <button
                className="px-4 py-2 w-auto h-10 bg-slate-400 text-white rounded hover:bg-slate-500"
                onClick={handleCloseModal}
              >
                <FormattedMessage id="cancelButton" defaultMessage="Cancel" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </IntlProvider>
  );
}

export default EditUserInformation;