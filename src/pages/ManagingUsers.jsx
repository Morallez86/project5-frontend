import React from "react";
import Layout from "./Layout";
import UserTable from "../components/tables/UserTable";

function ManagingUsers() {
    return (
        <Layout>
            <div className="text-white p-4 flex justify-center">
                <UserTable />
            </div>
        </Layout>
    );
}

export default ManagingUsers;
