import React, { useEffect } from 'react';
import Layout from "./Layout"; // Assuming the Layout component is in the same directory
import EditUserInformation from '../components/editUserInformation/EditUserInformation';
import POEditUserInformation from '../components/editUserInformation/POEditUserInformation';
import { ProfileStore } from "../stores/ProfileStore";
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

function Profile() {
    const selectedUserId = ProfileStore((state) => state.userId);
    const token = userStore((state) => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there is no token or if the token is invalid
        if (!token) {
            navigate('/'); // Redirect to login page
        }
    }, [token, navigate]);

    return (
        <Layout>
            <div>
                {selectedUserId ? <POEditUserInformation /> : <EditUserInformation />}
            </div>
        </Layout>
    );
}

export default Profile;
