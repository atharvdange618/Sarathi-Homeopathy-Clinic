/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const APP_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchNotifications();

        // Mark all notifications as read when component mounts
        try {
            const response = axios.get(`${APP_URL}/api/notifications/mark-read`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            toast.error(error.message)
        }

    }, [APP_URL, token]);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setNotifications(response.data);
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    const clearNotifications = async () => {
        try {
            const response = await axios.delete(`${APP_URL}/api/notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success('All notifications cleared!')
            setNotifications([]);
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className="p-6">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <button onClick={clearNotifications} className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600">
                Clear All Notifications
            </button>
            <div className="space-y-4">
                {notifications.map(notification => (
                    <div key={notification._id} className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">{notification.type === 'new_review' ? 'New Review Added' : 'New Appointment Added'}</h2>
                        <p>{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-2">{new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notifications;
