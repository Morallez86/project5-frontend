import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const ProfileStore = create(
    persist(
        (set) => ({
            userId: null, // State variable to store a single task ID

            // Function to update the task ID
            updateUserId: (newUserId) => set({ userId: newUserId }),
            clearUserId: () => set({ userId: null }), // Clear the task ID
        }),
        {
            name: "profileStore", // Name for the persisted data
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);