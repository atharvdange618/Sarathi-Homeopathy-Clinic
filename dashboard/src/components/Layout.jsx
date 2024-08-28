import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Layout() {
    const [notifications, setNotifications] = useState([]);
    const APP_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    const setupBrowserNotifications = () => {
        if ("Notification" in window) {
            if (Notification.permission === "granted") {
                // Permission already granted
            } else {
                Notification.requestPermission().then(res => {
                    if (res !== "granted") {
                        console.error("Did not receive permission for notifications");
                    }
                });
            }
        } else {
            console.error("Browser does not support notifications");
        }
    };

    const showBrowserNotification = (title, body) => {
        if (Notification.permission === "granted") {
            const notification = new Notification(title, {
                body: body,
                icon: '/Doctor-amico.png', // Replace with your app's icon
                vibrate: [300, 200, 300],
            });
            notification.addEventListener('click', function () {
                window.focus();
                notification.close();
            });
            setTimeout(() => notification.close(), 5 * 1000);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setNotifications(response.data);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const showNotifications = () => {
        notifications.forEach((notification) => {
            showBrowserNotification(
                notification.type === 'new_review' ? 'New Review Added' : 'New Appointment Added',
                notification.message
            );
        });
    };

    useEffect(() => {
        fetchNotifications();
        setupBrowserNotifications();

        const intervalId = setInterval(fetchNotifications, 500);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        showNotifications();
    }, [notifications]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Toaster />
            <Sidebar />
            <main className="flex-1 overflow-auto p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
