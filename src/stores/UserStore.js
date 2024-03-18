import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the store
export const userStore = create(
    persist(
        (set) => ({
            username: "", // State variable
            token: "",    // Additional state variable for token
            role: "",     // Additional state variable for role

            // Function to update the state variables
            updateUserData: (username, token, role) =>
            set({ username, token, role }),
            clearUserData: () => set({ username: "", token: "", role: "" }), // Clear user data
        }),
    {
        name: "userStore", // The name to use for the persisted data
        storage: createJSONStorage(() => sessionStorage),
    }
    )
);
