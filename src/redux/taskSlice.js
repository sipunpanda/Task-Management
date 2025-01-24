import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to load tasks from localStorage
const loadTasksFromLocalStorage = () => {
    try {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        return tasks ? tasks : [];
    } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
        return [];
    }
};

// Helper function to save tasks to localStorage
const saveTasksToLocalStorage = (tasks) => {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
    }
};

// Initial state with tasks loaded from localStorage
const initialState = {
    tasks: loadTasksFromLocalStorage(), // Load tasks from localStorage on app load
    loading: false,
    error: null,
    status: "All",
};

// Async thunk to fetch tasks (used for initial fetch if required)
export const fetchTodo = createAsyncThunk("task/fetchTodo", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    const data = await response.json();
    return data.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.completed ? "Completed" : "To Do",
        description: "",
    }));
});

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // Add a new task
        addTask(state, action) {
            state.tasks.push(action.payload);
            saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
        },

        // Delete a task
        deleteTask(state, action) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
        },

        // Update an existing task
        updateTask(state, action) {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id ? action.payload : task
            );
            saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
        },

        // Clear all tasks
        clearTasks(state) {
            state.tasks = [];
            localStorage.removeItem("tasks"); // Remove tasks from localStorage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                // Only set tasks if there are no tasks in state (i.e., if localStorage is empty)
                if (state.tasks.length === 0) {
                    state.tasks = action.payload;
                    saveTasksToLocalStorage(state.tasks); // Save tasks to localStorage from API response
                }
                state.loading = false;
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            });
    },
});

// Exporting the actions and reducer
export const { addTask, deleteTask, updateTask, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
