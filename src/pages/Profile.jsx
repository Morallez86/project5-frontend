import React from "react";
import Layout from "./Layout"; // Assuming the Layout component is in the same directory
import EditUserInformation from '../components/editUserInformation/EditUserInformation';
import POEditUserInformation from '../components/editUserInformation/POEditUserInformation';
import { ProfileStore } from "../stores/ProfileStore";

function Profile() {
    const selectedUserId = ProfileStore((state) => state.userId);

    return (
        <Layout>
            <div>
                {selectedUserId ? <POEditUserInformation /> : <EditUserInformation />}
            </div>
        </Layout>
    );
}

export default Profile;
