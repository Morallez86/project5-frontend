import React, { useState } from 'react';
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import MessageModal from '../modal/MessageModal';
import languages from '../../translations';
import { FormattedMessage, IntlProvider } from 'react-intl';

const NewUserInformation = () => {
  const locale = userStore((state) => state.locale);
  const token = userStore((state) => state.token);
  const role = userStore((state) => state.role);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role: '',
    photoURL: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
          'role': role
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json(); 
      console.log(data);
      if (response.ok) {
        setModalTitle('Success');
        setModalMessage('User added successfully!');
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate('/Home');
        }, 3000);
      } else {
        setModalTitle('Error');
        setModalMessage('Failed to add user. Please try again.');
        setShowModal(true);
      }
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
    <IntlProvider locale={locale} messages={languages[locale]}>
    <div className="text-white p-8 flex justify-center items-center">
      <MessageModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title={modalTitle} 
        message={modalMessage} 
      />
    <div className="bg-cyan-900/60	border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div> 
                <h1 className="text-4xl text-whitefont-bold text-center mb-6">
                  <FormattedMessage id="newUser" defaultMessage="New User" />
                </h1>
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
                        ><FormattedMessage id="usernameLabel" defaultMessage="username" />
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
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6">
                      <FormattedMessage id="password" defaultMessage="Password" />
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
                    ><FormattedMessage id="firstNameProfile" defaultMessage="First Name" />
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
                    ><FormattedMessage id="lastNameProfile" defaultMessage="Last Name" />
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
                    ><FormattedMessage id="emailProfile" defaultMessage="Email" />
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
                    ><FormattedMessage id="phoneProfile" defaultMessage="Phone" />
                    </label>
                </div>
                <div className="relative my-4">
                <select 
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer"
                name="role"
                onChange={handleChange}
                >
                <option className="text-black" value=""><FormattedMessage id="selectJob" defaultMessage="Select Job" /></option>
                <option className="text-black" value="dev"><FormattedMessage id="developer" defaultMessage="Developer" /></option>
                <option className="text-black" value="sm"><FormattedMessage id="scrumMaster" defaultMessage="Scrum Master" /></option>
                <option className="text-black" value="po"><FormattedMessage id="productOwner" defaultMessage="Product Owner" /></option>
              </select>
              <label 
                htmlFor="" 
                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
              >
                <FormattedMessage id="userJobProfile" defaultMessage="User Job" />
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
                    ><FormattedMessage id="photoURLProfile" defaultMessage="Photo URL" />
                    </label>
                </div>
                
                <button 
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                    type="submit"
                    ><FormattedMessage id="saveButton" defaultMessage="Save" />
                </button>
                </form>
            </div>
        </div>
        </div>
        </IntlProvider>
  )
}

export default NewUserInformation