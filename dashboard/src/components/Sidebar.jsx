import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

function Sidebar() {
    const [notificationCount, setNotificationCount] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const APP_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

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

        fetchNotificationCount();
        const intervalId = setInterval(fetchNotificationCount, 2000);
        return () => clearInterval(intervalId);
    }, [APP_URL, token]);

    useEffect(() => {
        if (location.pathname === '/notifications') {
            try {
                axios.get(`${APP_URL}/api/notifications/mark-read`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    if (response.status === 200) {
                        setNotificationCount(0);
                    }
                });
            } catch (error) {
                toast.error(error.message);
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
        <>
            {/* Mobile toggle button */}
            <button
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
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
                    <Link to="/campaign" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Campaign Management
                    </Link>
                    <Link to="/feedback" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Feedback Management
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

                <div className="px-4 mt-auto">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;