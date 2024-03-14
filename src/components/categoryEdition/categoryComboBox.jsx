import React, { useEffect, useState } from 'react';
import { userStore } from "../../stores/UserStore"

function CategoryComboBox() {
    const [categories, setCategories] = useState([]);
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
    }, [token]); // Include token in the dependency array

    return (
        <>
            <select className="bg-cyan-950 rounded border border-white">
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                ))}
            </select>
        </>
    );
}

export default CategoryComboBox;
