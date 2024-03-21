import React, { useState, useEffect } from 'react';
import { userStore } from "../../stores/UserStore";
import { useNavigate } from 'react-router-dom';

function AddTaskInformation() {
    const [categories, setCategories] = useState([]); // State variable to store categories
    const token = userStore((state) => state.token);
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
                const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/categories', {
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
    }, [token]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                console.log(formData);
                throw new Error('Failed to add task');
            }
            navigate('/Home');
        } catch (error) {
            console.error('Error adding task:', error);
            // Handle error, e.g., show an error message
        }
    };

    const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    };

return (
    <div className="text-white pt-8 flex justify-center items-center">
        <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div>
                <h1 className="text-4xl font-bold text-center mb-6">New task</h1>
                <form onSubmit={handleSave}>
                    <div className="grid grid-cols-2 grid-rows-3  gap-10 relative my-4 items-center px-2">
                        <div>
                            <label htmlFor="title" className="text-sm">Task Title:</label>
                            <input 
                                type="text" 
                                className="block w-full py-1 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                                placeholder=""
                                value={formData.title}
                                onChange={handleChange}
                                name="title"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="category" className="text-sm">Category:</label>
                            <select 
                                className="bg-cyan-950 pl-1 border border-white w-60"
                                value={formData.category ?? categories?.[0]}
                                onChange={handleChange}
                                name="category"
                                >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.title}>{category.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="initialDate" className="text-sm">Start Date:</label>
                            <input 
                                type="date" 
                                className="bg-cyan-950 pl-1 border border-white" 
                                value={formData.initialDate}
                                onChange={handleChange}
                                name="initialDate"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="finalDate" className="text-sm">End Date:</label>
                            <input 
                                type="date" 
                                className="bg-cyan-950 pl-1 border border-white"
                                value={formData.finalDate}
                                onChange={handleChange}
                                name="finalDate"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="status" className="text-sm">Status:</label>
                            <select 
                                className="bg-cyan-950 pl-1 border border-white"
                                value={formData.status}
                                onChange={handleChange}
                                name="status"
                            >
                                <option value="">Select Status</option>
                                <option value="100">TO DO</option>
                                <option value="200">DOING</option>
                                <option value="300">DONE</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="priority" className="text-sm">Priority:</label>
                            <select 
                                className="bg-cyan-950 pl-1 border border-white"
                                value={formData.priority}
                                onChange={handleChange}
                                name="priority"
                            >
                                <option value="">Select Priority</option>
                                <option value="100">Low</option>
                                <option value="200">Medium</option>
                                <option value="300">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-1">
                        <label htmlFor="description" className="text-sm">Description:</label>
                        <textarea 
                            className="w-full p-2 h-40 text-sm text-white bg-cyan-950 border  border-gray-300 appearance-none focus:outline-none"
                            value={formData.description}
                            onChange={handleChange}
                            name="description"
                        ></textarea>
                    </div>
                    <div className="flex justify-between space-x-10">
                        <button type="submit" className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-cyan-900 hover:bg-cyan-950 hover:text-white py-2 transition-colors duration-300">
                        Save
                        </button>
                        <button 
                            type="button" 
                            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-cyan-900 hover:bg-slate-500 hover:text-white py-2 transition-colors duration-300"
                            onClick={() => navigate('/Home')}
                        >
                        Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
}

export default AddTaskInformation;
