import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const notificationsStore = create(
    persist(
        (set) => ({
            unreadMessages: [], // Array to store unread messages
            notifications: [], // Array to store all notifications

            // Function to add an unread message
            addUnreadMessage: (message) => set((state) => ({ unreadMessages: [...state.unreadMessages, message] })),

            // Function to add a notification
            addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),

            removeReadMessages: (messageId) => {
                set((state) => ({
                    unreadMessages: state.unreadMessages.filter((message) => message.id > messageId),
                }));
            },

            // Function to clear all unread messages
            clearUnreadMessages: () => set({ unreadMessages: [] }),

            // Function to clear all notifications
            clearNotifications: () => set({ notifications: [] }),
        }),
        {
            name: "notificationsStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
