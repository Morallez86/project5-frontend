import React from "react";
import Layout from "./Layout";
import TaskTable from "../components/tables/TaskTable";

function ManagingTasks() {
    return (
        <Layout>
            <div className="text-white p-4 flex justify-center">
                <TaskTable />
            </div>
        </Layout>
    );
}

export default ManagingTasks;
