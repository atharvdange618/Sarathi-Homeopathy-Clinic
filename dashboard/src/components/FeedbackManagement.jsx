import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaTrash, FaStar, FaRegStar } from 'react-icons/fa';

function FeedbackManagement() {
    const [feedbacks, setFeedbacks] = useState([]);
    const APP_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/feedbacks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setFeedbacks(response.data);
            }
        } catch (error) {
            toast.error(`Error fetching feedbacks: ${error.message}`);
            console.error('Error fetching feedbacks', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${APP_URL}/api/feedbacks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                toast.success(response.data.message);
                fetchFeedbacks();
            }
        } catch (error) {
            toast.error(`Error deleting feedback: ${error.message}`);
            console.error('Error deleting feedback', error);
        }
    };

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <FaStar key={i} className="text-yellow-400" />
                ) : (
                    <FaRegStar key={i} className="text-yellow-400" />
                )
            );
        }
        return stars;
    };

    return (
        <div className="p-6">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Feedback Management</h1>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Feedback</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Rating</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {feedbacks.map((feedback) => (
                            <tr key={feedback._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 whitespace-nowrap">{feedback.name}</td>
                                <td className="py-3 px-4 whitespace-nowrap">{feedback.feedback}</td>
                                <td className="py-3 px-4 whitespace-nowrap">{feedback.rating}</td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    {new Date(feedback.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleDelete(feedback._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                {feedbacks.map((feedback) => (
                    <div key={feedback._id} className="bg-white shadow rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">{feedback.name}</h3>
                            <button
                                onClick={() => handleDelete(feedback._id)}
                                className="text-red-500" aria-label="Delete"
                            >
                                <FaTrash />
                            </button>
                        </div>
                        <p><strong>Feedback:</strong> {feedback.feedback}</p>
                        <p className="flex items-center">
                            <strong className="mr-2">Rating:</strong>
                            {renderStars(feedback.rating)}
                        </p>
                        <p><strong>Date:</strong> {new Date(feedback.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeedbackManagement;