import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the store
export const userStore = create(
    persist(
        (set) => ({
            username: null, // State variable
            token: null,    // Additional state variable for token
            role: null,     // Additional state variable for role

            // Function to update the state variables
            updateUserData: (username, token, role) =>
            set({ username, token, role }),
            clearUserData: () => set({ username: null, token: null, role: null }), // Clear user data

            locale: "en",
            updateLocale : (locale) => set({locale})
        }),
    {
        name: "userStore", // The name to use for the persisted data
        storage: createJSONStorage(() => sessionStorage),
    },
    )
);
