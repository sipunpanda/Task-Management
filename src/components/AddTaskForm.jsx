import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice"; // Assuming you have an action for adding tasks
import { v4 as uuid4 } from "uuid";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      return alert("Task title is required");
    }

    const newTask = {
      id: uuid4(), // Generate unique ID for each task using UUID
      title,
      description,
      status,
    };

    // Dispatch action to add task
    dispatch(addTask(newTask));

    // Clear the form after submission
    setTitle("");
    setDescription("");
    setStatus("To Do");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 py-10">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-10 text-center">
        <h1 className="text-4xl font-bold text-orange-300">Add New Task</h1>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 max-w-2xl bg-gray-900 text-blue-100 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-blue-300 mb-2"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Task Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-blue-300 mb-2"
            >
              Task Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add an optional task description"
            />
          </div>

          {/* Task Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-blue-300 mb-2"
            >
              Task Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:ring-4 focus:ring-blue-400 transition"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
