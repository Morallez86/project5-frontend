import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const taskStore = create(
    persist(
        (set) => ({
            taskId: null, // State variable to store a single task ID

            // Function to update the task ID
            updateTaskId: (newTaskId) => set({ taskId: newTaskId }),
            clearTaskId: () => set({ taskId: null }), // Clear the task ID
        }),
        {
            name: "taskStore", // Name for the persisted data
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
