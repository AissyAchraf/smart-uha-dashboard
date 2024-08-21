import React, { createContext, useEffect, useReducer, useState } from "react";
import API from "../utils/api";
import useSnackbar from "../hooks/useSnackbar";
import useLang from "../hooks/useLang";
import useAuth from "../hooks/useAuth";

const initialState = {
    notifications: [],
}

const NotificationContext = createContext({
    ...initialState,
    getNotifications: () => {},
});

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const {translate} = useLang();
    const {showSnackbar} = useSnackbar();
    const {isAuthenticated} = useAuth();

    const notify = (string, callback) => {
        if(Notification.permission === "granted"){
            let notif = new Notification(
                translate("app.title", {location: "Campus Ill"}), {
                    body: string
                }
            );
            notif.onclose = callback;
            notif.onclick = callback;
        }
    }

    const getNotifications = async () => {
        try {
            const res = await API.getNotifications();
            const newNotifications = res.data;

            setNotifications((prevNotifications) => {
                // Filter out new notifications that already exist in the state
                const uniqueNotifications = newNotifications.filter(newNotification => {
                    return !prevNotifications.some(existingNotification => existingNotification._id === newNotification._id);
                });

                // Show unique notifications
                uniqueNotifications.forEach(notification => {
                    let message = translate(`notifications.${notification.messageId}`, notification.messageParams)

                    showSnackbar(message);
                    notify(message, () => API.confirmNotification(notification._id));
                });

                // Return the updated list of notifications
                return newNotifications;
            });
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    }

    useEffect(() => {
        if('Notification' in window && Notification.permission === "default") {
            Notification.requestPermission().then(permission => {
                new Notification(
                    this.app.translate("app.title", {location: Params.location}),
                    {body: this.app.translate("notifications.activated")}
                );
            });
        }

        const interval = setInterval(() => {
            if(isAuthenticated) {
                getNotifications();
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;