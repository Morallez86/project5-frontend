import React from "react";
import Layout from "./Layout";
import TaskTable from "../components/tables/TaskTable";

function ManagingTasks() {
    return (
        <Layout>
            <div>
                <TaskTable />
            </div>
        </Layout>
    );
}

export default ManagingTasks;
