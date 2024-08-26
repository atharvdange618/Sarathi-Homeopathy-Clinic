import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Sidebar() {
    const [notificationCount, setNotificationCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const APP_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchNotificationCount = () => {
            axios.get(`${APP_URL}/api/notifications/count`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setNotificationCount(response.data.count);
                })
                .catch(error => {
                    console.error('Error fetching notification count', error);
                });
        };

        // Fetch notification count initially
        fetchNotificationCount();

        // Set up interval to fetch notification count every 2 seconds
        const intervalId = setInterval(fetchNotificationCount, 2000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [APP_URL, token]);

    useEffect(() => {
        // Mark all notifications as read when on the notifications page
        if (location.pathname === '/notifications') {
            // Mark all notifications as read when component mounts
            try {
                const response = axios.get(`${APP_URL}/api/notifications/mark-read`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setNotificationCount(0)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }, [location, APP_URL, token]);

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${APP_URL}/auth/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            toast.error(`Error logging out: ${error.message}`);
        }
    };

    return (
        <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
            <nav>
                <div className="flex items-center space-x-2 px-4 mb-6">
                    <img src="/Doctor-amico.png" alt="Logo" className="h-8 w-8" />
                    <span className="text-2xl font-extrabold">Dashboard</span>
                </div>

                <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Home
                </Link>
                <Link to="/patients" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Patient Management
                </Link>
                <Link to="/content" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Content Management
                </Link>
                <Link to="/notifications" className="py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex justify-between items-center">
                    <span>Notifications</span>
                    {notificationCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                            {notificationCount}
                        </span>
                    )}
                </Link>
            </nav>

            <div className="px-4 py-2 border-t border-gray-700">
                <h3 className="text-sm font-semibold text-gray-300 uppercase">Quick Stats</h3>
                <ul className="mt-2 text-sm">
                    <li>Total Users: 1,234</li>
                    <li>New Today: 56</li>
                    <li>Active Now: 789</li>
                </ul>
            </div>

            <div className="px-4 mt-auto">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;