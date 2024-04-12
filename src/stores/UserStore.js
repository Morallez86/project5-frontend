import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the store
export const userStore = create(
    persist(
        (set) => ({
            username: null,
            token: null,
            role: null,
            userId: null, // New state variable for user ID

            // Function to update the state variables
            updateUserData: (username, token, role, userId) =>
                set({ username, token, role, userId }),

            clearUserData: () => set({ username: null, token: null, role: null, userId: null }),

            locale: "en",
            updateLocale: (locale) => set({ locale }),
        }),
        {
            name: "userStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
