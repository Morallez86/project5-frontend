import React, { useEffect, useState } from 'react';
import { userStore } from "../../stores/UserStore";

function CategoryComboBox({ onRefresh }) {
    const [categories, setCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState(""); // State to store the selected option value
    const token = userStore((state) => state.token);

    useEffect(() => {
        if (!token) {
            // Token is not available, do not make the fetch request
            return;
        }

        // Make an HTTP request to fetch categories
        fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            return response.json();
        })
        .then(data => {
            // Store the fetched categories in the state
            setCategories(data);
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
    }, [token, onRefresh]); // Include token and onRefresh in the dependency array

    // Function to handle option selection
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);
        // Call the onRefresh function with the selected option value
        onRefresh(selectedValue);
    };

    return (
        <>
            <select className="bg-cyan-950 rounded border border-white" value={selectedValue} onChange={handleSelectChange}>
                <option value="">Add Category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.title}>{category.title}</option>
                ))}
            </select>
        </>
    );
}

export default CategoryComboBox;
