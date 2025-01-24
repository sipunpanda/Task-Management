import React from "react";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-gray-900 py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-white">
            Task Management System
          </h1>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Add Task Form */}
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">

            <AddTaskForm />
          </section>

          {/* Task List */}
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">

            <TaskList />
          </section>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gradient-to-t from-black to-gray-800 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Task Management System. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
