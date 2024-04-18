import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the store
// Define the store
export const taskStore = create(
    persist(
        (set) => ({
            taskId: null, // State variable to store a single task ID
            taskOwner: null, // State variable to store the owner of the task
            tasks: [],
            
            addTask: (newTask) => {
                set((state) => ({
                    tasks: [...state.tasks, newTask],
                }));
            },

            // Function to update the task ID
            updateTaskId: (newTaskId) => {
                set({ taskId: newTaskId });
            },
            // Function to update the task owner
            updateTaskOwner: (newTaskOwner) => {
                set({ taskOwner: newTaskOwner });
            },
            clearTaskData: () => {
                set({ taskId: null, taskOwner: null }); // Clear the task ID and task owner
            },
            clearTasks: () => {
                set({ tasks: [] }); // Clear only the tasks array
            },
        }),
        {
            name: "taskStore", // Name for the persisted data
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

