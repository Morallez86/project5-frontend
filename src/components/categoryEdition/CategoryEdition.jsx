import React, { useState, useEffect, useCallback } from 'react';
import { userStore } from "../../stores/UserStore";

function CategoryEdition() {
    const [newCategoryTitle, setNewCategoryTitle] = useState(""); // State variable for new category title
    const [selectedCategory, setSelectedCategory] = useState(""); // State variable to store the selected category
    const [isAddCategorySelected, setIsAddCategorySelected] = useState(true); // State variable to track if "Add category" is selected
    const [categories, setCategories] = useState([]); // State variable to store categories
    const token = userStore((state) => state.token); // Get token from store
    const username2 = userStore((state) => state.username);
    const [categoryId, setCategoryId] = useState(""); // State variable to store the category ID

    // Function to fetch categories
    const fetchCategories = useCallback(() => {
        if (!token) {
            // Token is not available, do not make the fetch request
            return;
        }

        // Make an HTTP request to fetch categories
        fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories', {
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

    // Function to handle adding a new category
    const handleAddCategory = () => {
        // Check if token is available
        if (!token) {
            console.error("Token is missing. Unable to add category.");
            return;
        }

        // Check if new category title is provided
        if (!newCategoryTitle) {
            console.error("New category title is missing. Unable to add category.");
            return;
        }

        // Create addCategoryBody for the POST request
        const addCategoryBody = {
            title: newCategoryTitle,
            id: 0,
            description: "nope",
            owner: username2
        };

        // Make a POST request to add a new category
        fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(addCategoryBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add category');
            }
            // Reset the new category title input
            setNewCategoryTitle("");
            setIsAddCategorySelected(true); // Reset the state
            // Refresh the category list
            fetchCategories();
        })
        .catch(error => {
            console.error('Error adding category:', error);
        });
    };

    const handleDeleteCategory = () => {
        // Check if token is available
        if (!token) {
            console.error("Token is missing. Unable to delete category.");
            return;
        }

        // Check if category title is provided
        if (!selectedCategory) {
            console.error("Category title is missing. Unable to delete category.");
            return;
        }

        // Make a DELETE request to delete the category
        fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories/?title=${selectedCategory}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete category');
            }
            // Refresh the category list
            setNewCategoryTitle("");
            setSelectedCategory(""); // Clear selected category
            // Refresh the category list
            fetchCategories();
        })
        .catch(error => {
            console.error('Error deleting category:', error);
        });
    };

    const handleRenameCategory = () => {
        // Check if token is available
        if (!token) {
            console.error("Token is missing. Unable to rename category.");
            return;
        }

        // Check if category title and ID are provided
        if (!selectedCategory || !categoryId) {
            console.error("Category title or ID is missing. Unable to rename category.");
            return;
        }

        // Create the renameCategoryBody for the PUT request
        const renameCategoryBody = {
            // Assuming categoryId is the ID of the selected category
            categoryId: categoryId,
            title: newCategoryTitle,
        };

        // Make a PUT request to update the category
        fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories/${categoryId}?title=${selectedCategory}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(renameCategoryBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to rename category');
            }
            // Reset the new category title input
            setNewCategoryTitle("");
            setIsAddCategorySelected(true); // Reset the state
            // Refresh the category list
            fetchCategories();
        })
        .catch(error => {
            console.error('Error renaming category:', error);
        });
    };

    // Function to handle selecting an option in the CategoryComboBox
    const handleCategorySelect = (selectedValue) => {
        setIsAddCategorySelected(selectedValue === "");
        setSelectedCategory(selectedValue); // Set the selected category

        // Find the corresponding category ID based on the selected category title
        const category = categories.find(cat => cat.title === selectedValue);
        if (category) {
            setCategoryId(category.id);
        } else {
            setCategoryId(""); // Reset the category ID if not found
        }
    };

    useEffect(() => {
        // Fetch categories on component mount
        fetchCategories();
    }, [fetchCategories]); // Include fetchCategories in the dependency array

    return (
        <div className="text-white mt-8 flex justify-center items-center">
            <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <div>
                    <h1 className="text-4xl font-bold text-center mb-6">Category Edition:</h1>
                    <div className="flex justify-between items-center space-x-32 mt-10">
                        <div >
                            <label className="mr-2" htmlFor="taskFilter">Categories:</label>
                            <select className="bg-cyan-950 pl-1 rounded border border-white" value={selectedCategory} onChange={(e) => handleCategorySelect(e.target.value)}>
                                <option value="">Add Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.title}>{category.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="categoryInput">Category Title:</label>
                            <input 
                                type="text" 
                                id="categoryInput" 
                                value={newCategoryTitle} 
                                onChange={(e) => setNewCategoryTitle(e.target.value)} 
                                className="bg-transparent border-0 pl-1 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 py-2.5 text-sm" 
                                placeholder="Category title" 
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-24 mt-16">
                        
                        { isAddCategorySelected && (
                            <div className='w-full flex justify-center'>
                            <button 
                                className="mb-4 w-1/2 text-[18px] mt-6 rounded bg-white text-cyan-900 hover:bg-cyan-950 hover:text-white py-2 transition-colors duration-300" 
                                onClick={handleAddCategory} // Call the function to add a new category
                            >
                                Add Category
                            </button>
                            </div>
                        )}                       
                        { !isAddCategorySelected && (
                            <>
                                <button 
                                    className="w-full mb-4 text-[18px] mt-6 rounded bg-white text-cyan-900 hover:bg-cyan-950 hover:text-white py-2 transition-colors duration-300"
                                    onClick={handleRenameCategory}
                                >
                                    Rename Category
                                </button>
                                <button 
                                    className="w-full mb-4 text-[18px] mt-6 bg-red-900 text-white rounded hover:bg-red-950" 
                                    onClick={handleDeleteCategory} // Call the function to delete a category
                                >
                                    Delete Category
                                </button>
                                
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryEdition;
