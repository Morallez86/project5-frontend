import React, { useEffect, useState } from 'react';
import Layout from "./Layout";
import EditUserInformation from '../components/editUserInformation/EditUserInformation';
import POEditUserInformation from '../components/editUserInformation/POEditUserInformation';
import { ProfileStore } from "../stores/ProfileStore";
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router-dom";
import TaskInformation from '../components/editUserInformation/TaskInformation';

function Profile() {
    const selectedUserId = ProfileStore((state) => state.userId);
    const token = userStore((state) => state.token);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    console.log(selectedUserId);

    useEffect(() => {
        console.log("2");
        // Check if there is no token or if the token is invalid
        if (!token) {
            navigate('/'); // Redirect to login page
        } else {
            console.log("1");
            fetchUserProfileDetails(selectedUserId, token); // Fetch user profile details
        }
    }, [token, navigate, selectedUserId]);

    const fetchUserProfileDetails = async (userId, authToken) => {
        console.log("ola");
        try {
            const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/profileDetails/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': authToken,
                }
            });
            const userDetails = await response.json();
            console.log(userDetails);
            setUserDetails(userDetails);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    console.log("3");

    return (
        <Layout>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 px-4">
                    {selectedUserId ? <POEditUserInformation userDetails={userDetails} /> : <EditUserInformation userDetails={userDetails} />}
                </div>
                <div className="md:w-1/2 px-4">
                    <TaskInformation userDetails={userDetails} />
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
