import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function FeedbackManagement() {
    const [feedbacks, setFeedbacks] = useState([]);
    const APP_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token')

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(`${APP_URL}/api/feedbacks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                setFeedbacks(response.data);
            }
        } catch (error) {
            toast.error(error.message)
            console.error('Error fetching feedbacks', error)
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${APP_URL}/api/feedbacks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                toast.success(response.data.message);
                fetchFeedbacks();
            }
        } catch (error) {
            toast.error(error.message);
            console.error('Error deleting feedback', error)
        }
    };

    return (
        <div className="p-6">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Feedback Management</h1>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Feedback</th>
                        <th className="border border-gray-300 p-2">Rating</th>
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map(feedback => (
                        <tr key={feedback._id}>
                            <td className="border border-gray-300 p-2">{feedback.name}</td>
                            <td className="border border-gray-300 p-2">{feedback.feedback}</td>
                            <td className="border border-gray-300 p-2">{feedback.rating}</td>
                            <td className="border border-gray-300 p-2">
                                {new Date(feedback.createdAt).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-300 p-2">
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
    );
}

export default FeedbackManagement;