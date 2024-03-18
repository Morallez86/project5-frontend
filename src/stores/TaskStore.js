import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the store
export const taskStore = create(
    persist(
        (set) => ({
            taskId: null, // State variable to store a single task ID
            taskOwner: null, // State variable to store the owner of the task

            // Function to update the task ID and task owner
            updateTaskData: (newTaskId, newTaskOwner) => {
                set({ taskId: newTaskId, taskOwner: newTaskOwner });
            },
            clearTaskData: () => {
                set({ taskId: null, taskOwner: null }); // Clear the task ID and task owner
            },
        }),
        {
            name: "taskStore", // Name for the persisted data
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
