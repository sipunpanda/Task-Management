import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, deleteTask } from "../redux/taskSlice";
import TaskEditForm from "./TaskEditForm";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setTaskToEdit(task);
  };

  const closeEditForm = () => {
    setIsEditing(false);
    setTaskToEdit(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading)
    return <div className="text-xl text-gray-200 text-center py-4">Tasks Loading...</div>;
  if (error)
    return <div className="text-xl text-red-500 text-center py-4">There is an Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-blue-900 py-6">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-6">
        <h1 className="text-4xl font-bold text-orange-300 text-center mb-4">Task Manager</h1>
      </div>

      {/* Search Bar and Filter Dropdown */}
      <div className="container mx-auto px-4 mb-6 flex flex-col md:flex-row gap-4 justify-center items-center">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-2/3 px-4 py-3 rounded-full text-gray-900 bg-gray-200 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 rounded-full text-gray-900 bg-gray-200 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Tasks</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="To Do">To Do</option>
        </select>
      </div>

      {/* Show Edit Form Separately */}
      {isEditing && taskToEdit && (
        <div className="container mx-auto px-4 mb-6">
          <TaskEditForm task={taskToEdit} setIsEditing={setIsEditing} closeEditForm={closeEditForm} />
        </div>
      )}

      {/* Task List */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-800 text-blue-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            {/* Task Title */}
            <h3 className="text-xl font-bold text-white-400 mb-2">{task.title}</h3>

            {/* Optional Description */}
            {task.description && (
              <p className="text-sm text-gray-300 mb-3">{task.description}</p>
            )}

            {/* Status */}
            <p className="text-sm font-semibold mb-4">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded-md ${task.status === "Completed"
                  ? "bg-green-600"
                  : "bg-red-600"
                  } text-white`}
              >
                {task.status}
              </span>
            </p>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(task)}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-500 rounded-md text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="px-4 py-2 bg-red-700 hover:bg-red-500 rounded-md text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message if No Tasks Match the Filters */}
      {filteredTasks.length === 0 && (
        <div className="text-xl text-blue-300 text-center py-4">
          No tasks found matching the filters
        </div>
      )}
    </div>
  );
};

export default TaskList;
