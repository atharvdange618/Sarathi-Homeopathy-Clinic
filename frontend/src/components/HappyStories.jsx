/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import axios from 'axios';

const StarRating = ({ rating }) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                    {star <= rating ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-300" />}
                </span>
            ))}
        </div>
    );
};

const StoryCard = ({ feedback, name, avatarUrl, rating }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mx-2">
            <div className="mb-4">
                <p className="text-gray-700 text-sm italic mt-2">"{feedback}"</p>
            </div>
            <div className="flex items-center justify-between">
                <div className='flex items-center'>
                    <img
                        src={avatarUrl}
                        alt={`${name} avatar`}
                        className="w-10 h-10 rounded-full mr-4"
                    />
                    <p className="text-gray-900 font-semibold">{name}</p>
                </div>
                <StarRating rating={rating} />
            </div>
        </div>
    );
};

const HappyStories = () => {

    const APP_URL = import.meta.env.VITE_API_URL;
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/feedbacks`);
                if (response.status === 200) {
                    // Sort feedbacks by createdAt in descending order and take the most recent 10
                    const sortedFeedbacks = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    const recentFeedbacks = sortedFeedbacks.slice(0, 10);
                    setStories(recentFeedbacks);
                }
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchStories();
    }, [APP_URL]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-2">Happy Stories</h2>
            <p className="text-xl text-center text-gray-600 mb-8">Creating Vibrant Smiles for Healthy Lifestyles!</p>
            <Slider {...settings}>
                {stories.map((story, index) => (
                    <StoryCard
                        key={index}
                        feedback={story.feedback}
                        name={story.name}
                        avatarUrl={story.avatarUrl || "/user.jpg"}
                        rating={story.rating}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default HappyStories;
