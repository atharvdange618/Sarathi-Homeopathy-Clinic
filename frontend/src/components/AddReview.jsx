/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/24/solid';

const AddReview = ({ setReviews }) => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle rating changes
    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (name && content) {
            try {
                const APP_URL = import.meta.env.VITE_API_URL;
                const response = await axios.post(`${APP_URL}/api/feedback`, {
                    name,
                    feedback: content,
                    rating
                });

                if (response.status === 201) {
                    setSuccess('Thank you for your feedback!');
                    setReviews(prev => !prev);
                    setName('');
                    setContent('');
                    setRating(0);
                } else {
                    setError('Failed to submit feedback. Please try again later.');
                }
            } catch (err) {
                console.log(err)
                setError('Failed to submit feedback. Please try again later.');
            }
        } else {
            setError('Please fill in all fields.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                {error && <div className="mb-4 text-red-500">{error}</div>}
                {success && <div className="mb-4 text-green-500">{success}</div>}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Your Review</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating</label>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                                key={star}
                                className={`h-8 w-8 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                onClick={() => handleRatingClick(star)}
                            />
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default AddReview;