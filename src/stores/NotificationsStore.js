import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const notificationsStore = create(
    persist(
        (set) => ({
            unreadMessages: [], // Array to store unread messages
            unreadNotifications: [], // Array to store unread notifications

            // Function to add an unread message
            addUnreadMessage: (message) => set((state) => ({ unreadMessages: [...state.unreadMessages, message] })),

            // Function to add an unread notification
            addUnreadNotification: (notification) => set((state) => ({ unreadNotifications: [...state.unreadNotifications, notification] })),

            // Function to remove an unread message by messageId
            removeUnreadMessage: (messageId) => {
                set((state) => ({
                    unreadMessages: state.unreadMessages.filter((message) => message.id !== messageId),
                }));
            },

            // Function to clear all unread messages and notifications
            clearUnreadItems: () => set({ unreadMessages: [], unreadNotifications: [] }),
        }),
        {
            name: "notificationsStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
