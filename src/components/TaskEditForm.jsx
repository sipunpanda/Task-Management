import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/taskSlice";

const TaskEditForm = ({ task, setIsEditing }) => {
    const dispatch = useDispatch();
    const [updatedTask, setUpdatedTask] = useState({
        ...task,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTask(updatedTask)); // Dispatch the update task action
        setIsEditing(false); // Close the form after updating
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Task</h3>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Title</label>
                <input
                    type="text"
                    name="title"
                    value={updatedTask.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-100"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                    name="description"
                    value={updatedTask.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-100"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Status</label>
                <select
                    name="status"
                    value={updatedTask.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-100"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default TaskEditForm;
