import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { FormattedMessage, IntlProvider } from 'react-intl';
import languages from '../translations';
import LanguageSelector from '../components/languageSelector/LanguageSelector';

function Login() {
    const updateUserData = userStore((state) => state.updateUserData);
    const [inputs, setInputs] = useState({});
    const [showPendingWarning, setShowPendingWarning] = useState(false);
    const [showInvalidCredentialsWarning, setShowInvalidCredentialsWarning] = useState(false);
    const navigate = useNavigate();
    const locale = userStore((state) => state.locale);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }));
        setShowPendingWarning(false); // Reset warnings when inputs change
        setShowInvalidCredentialsWarning(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: inputs.username,
                    password: inputs.password,
                }),
            });

            if (response.ok) {
                const userData = await response.json();
                updateUserData(
                    userData.username,
                    userData.token,
                    userData.role,
                    userData.userId
                );
                navigate('/Home', { replace: true });
            } else {
                const responseBody = await response.json();
                console.log(responseBody)
                if (response.status === 401 && responseBody.message === "User registration pending") {
                    setShowPendingWarning(true);
                } else {
                    setShowInvalidCredentialsWarning(true);
                }
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    const handleForgotPassword = () => {
        // Navigate to the Forgot Password page
        navigate('/PasswordRetrieve');
    };

    return (
        <IntlProvider locale={locale} messages={languages[locale]}>
            <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <div>
                    <div className="flex justify-between mb-6">
                        <h1 className="text-3xl text-white font-bold text-center px-1">
                            <FormattedMessage id="loginTitle" defaultMessage="Login" />
                        </h1>
                        <LanguageSelector />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="relative px-1">
                            <input
                                type="text"
                                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer"
                                placeholder=""
                                onChange={handleChange}
                                name="username"
                            />
                            <label
                                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                            >
                                <FormattedMessage id="usernameLabel" defaultMessage="Your Username" />
                            </label>
                            <BiUser className="absolute top-4 right-4" />
                        </div>
                        <div className="relative my-4 mb-5 px-1">
                            <input
                                type="password"
                                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer"
                                placeholder=""
                                onChange={handleChange}
                                name="password"
                            />
                            <label
                                className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                            >
                                <FormattedMessage id="passwordLabel" defaultMessage="Your Password" />
                            </label>
                            <AiOutlineUnlock className="absolute top-4 right-4" />
                        </div>
                        {showPendingWarning && (
                            <div className="text-sm text-red-500 mb-4 px-1">
                                <FormattedMessage id="pendingAccountWarning" defaultMessage="*Account registration is pending." />
                            </div>
                        )}
                        {showInvalidCredentialsWarning && (
                            <div className="text-sm text-red-500 mb-4 px-1">
                                <FormattedMessage id="loginFailed" defaultMessage="*Failed to login" />
                            </div>
                        )}
                        <div className="flex justify-between items-center px-1">
                            <p className="text-white text-xs cursor-pointer hover:underline" onClick={handleForgotPassword}>
                                <FormattedMessage id="forgotPassword" defaultMessage="Forgot your password?" />
                            </p>
                        </div>
                        <button
                            className="w-full mb-4 px-1 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300"
                            type="submit"
                        >
                            <FormattedMessage id="loginButton" defaultMessage="Login" />
                        </button>
                    </form>
                </div>
            </div>
        </IntlProvider>
    );
}

export default Login;
