import React, { useState, useEffect } from 'react';
import { userStore } from "../../stores/UserStore";
import { taskStore } from "../../stores/TaskStore";
import { useNavigate } from 'react-router-dom'; 

function EditTaskInformation() {
    const [categories, setCategories] = useState([]); // State variable to store categories
    const token = userStore((state) => state.token);
    const username2 = userStore((state) => state.username);
    const taskId = taskStore((state) => state.taskId);
    const taskOwner = taskStore((state) => state.taskOwner);
    const role = userStore((state) => state.role);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: 0,
        status: 0,
        initialDate: "",
        finalDate: "",
        category: ""
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        
        fetchCategories();

        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/get?id=${taskId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch task');
                }
                const taskData = await response.json();
                setFormData(taskData);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };
        if (taskId) {
            fetchTask();
        }
    }, [token, taskId]);
    
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/update?id=${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            navigate('/Home');
        } catch (error) {
            console.error('Error updating task:', error);
            // Handle error, such as displaying an error message
        }
    };

    const handleChange = (event) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    });
    };

    return (
    <div className="text-white mt-8 flex justify-center items-center">
        <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div>
                <h1 className="text-4xl font-bold text-center mb-6">Edit task</h1>
                <form onSubmit={handleSave}>
                    <div className="relative my-4">
                        <input 
                            type="text" 
                            className="block w-72 py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                            placeholder=""
                            value={formData.title}
                            onChange={handleChange}
                            name="title"
                        />
                        <label 
                            htmlFor="title" 
                            className="absolute text-sm duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                        >
                            Task Title
                        </label>
                        {/* Input fields for other task properties */}
                        <div className="flex flex-row items-center space-x-4 mt-6">
                            <label><b>Start Date:</b></label>
                            <input 
                                type="date" 
                                className="bg-cyan-950 rounded border border-white" 
                                value={formData.initialDate}
                                onChange={handleChange}
                                name="initialDate"
                            />

                            <label><b>End Date:</b></label>
                            <input 
                                type="date" 
                                className="bg-cyan-950 rounded border border-white"
                                value={formData.finalDate}
                                onChange={handleChange}
                                name="finalDate"
                            />
                        </div>
                        <div className="flex flex-row items-center space-x-4 mt-6">
                            <label><b>Status:</b></label>
                            <select 
                                className="bg-cyan-950 rounded border border-white"
                                value={formData.status}
                                onChange={handleChange}
                                name="status"
                            >
                                <option value="100">TO DO</option>
                                <option value="200">DOING</option>
                                <option value="300">DONE</option>
                            </select>
                            <label><b>Priority:</b></label>
                            <select 
                                className="bg-cyan-950 rounded border border-white"
                                value={formData.priority}
                                onChange={handleChange}
                                name="priority"
                            >
                                <option value="100">High</option>
                                <option value="200">Medium</option>
                                <option value="300">Low</option>
                            </select>
                            <label><b>Category:</b></label>
                            <select 
                                className="bg-cyan-950 rounded border border-white"
                                value={formData.category}
                                onChange={handleChange}
                                name="category"
                                >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.title}>{category.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-row items-center space-x-4 mt-6">
                            <label><b>Description:</b></label>
                            <textarea 
                                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950"
                                value={formData.description}
                                onChange={handleChange}
                                name="description"
                            ></textarea>
                        </div>
                        <div>
                            <div>
                                {(role === "po" || role === "sm" || (role === "dev" && username2 === taskOwner)) && (
                                <button type="submit" className="w-full mb-4 text-[18px] mt-6 rounded-full bg-green-500 text-white hover:bg-green-700 py-2 transition-colors duration-300">
                                    Save
                                </button>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </form>
                <button 
                type="button" 
                className="w-full mb-4 text-[18px] mt-6 rounded-full bg-gray-500 text-white hover:bg-gray-700 py-2 transition-colors duration-300"
                onClick={() => navigate('/Home')}
                >Cancel
                </button>
                {role === "po" && (
                <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-red-500 text-white hover:bg-red-700 py-2 transition-colors duration-300">
                Delete
                </button>
                )}
            </div>
        </div>
    </div>
  );
}

export default EditTaskInformation;
