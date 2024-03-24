import React, { useEffect } from 'react';
import Layout from "./Layout";
import CategoryEdition from "../components/categoryEdition/CategoryEdition";
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

function ManagingCategories() {
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
            <CategoryEdition />
        </Layout>
    );
}

export default ManagingCategories;
