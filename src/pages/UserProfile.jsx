import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { userStore } from '../stores/UserStore';
import languages from '../translations';
import LanguageSelector from '../components/languageSelector/LanguageSelector';

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
    const locale = userStore((state) => state.locale);

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
        <IntlProvider locale={locale} messages={languages[locale]}>
        <div className="text-white p-8 flex justify-center items-center">
        <div className="bg-cyan-900/60	border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div className='px-1 space-y-4'> 
                <div className="flex justify-between mb-6">
                    <h1 className="text-3xl text-white font-bold text-center">
                    <FormattedMessage id="profileTitle" defaultMessage="Profile" />
                    </h1>
                    <LanguageSelector />
                </div>
                <div className="relative px-1 my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.username}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        <FormattedMessage id="usernameLabel" defaultMessage="username" />
                    </label>
                </div>
                <div className="relative px-1 my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.firstname}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        <FormattedMessage id="firstNameProfile" defaultMessage="First Name" />
                    </label>
                </div>
                <div className="relative px-1 my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.lastname}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        <FormattedMessage id="lastNameProfile" defaultMessage="Last Name" />
                    </label>
                </div>
                <div className="relative px-1 my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.email}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        <FormattedMessage id="emailProfile" defaultMessage="Email" />
                    </label>
                </div>
                <div className="relative px-1 my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.phone}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        <FormattedMessage id="phoneProfile" defaultMessage="Phone" />
                    </label>
                </div>
                <div className="relative px-1 my-4">
                    <label 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    >
                        {formData.role}
                    </label>
                    <label 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >
                        <FormattedMessage id="userJobProfile" defaultMessage="User Job" />
                    </label>
                </div>
            </div>
            <img src={formData.photoURL} alt="User" className="w-32 h-32 rounded-full mx-auto mt-8" />
        </div>
        </div>
        </IntlProvider>
    );
}

export default UserProfile;
