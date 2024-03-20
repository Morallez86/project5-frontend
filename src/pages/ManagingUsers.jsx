import React from "react";
import Layout from "./Layout";
import UserTable from "../components/tables/UserTable";

function ManagingUsers() {
    return (
        <Layout>
            <div>
                <UserTable />
            </div>
        </Layout>
    );
}

export default ManagingUsers;
