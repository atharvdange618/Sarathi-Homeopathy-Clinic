/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';

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

const StoryCard = ({ content, author, avatarUrl, rating }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mx-2">
            <div className="mb-4">
                <p className="text-gray-700 text-sm italic mt-2">"{content}"</p>
            </div>
            <div className="flex items-center justify-between">
                <div className='flex items-center'>
                    <img
                        src={avatarUrl}
                        alt={`${author} avatar`}
                        className="w-10 h-10 rounded-full mr-4"
                    />
                    <p className="text-gray-900 font-semibold">{author}</p>
                </div>
                <StarRating rating={rating} />
            </div>
        </div>
    );
};

const HappyStories = () => {
    const stories = [
        {
            content: "Last year Nov I met her for the 1st time for my anxiety and depression and she was also treating my son for bronchitis. I was so worried for him but after course of her medicine my son is completely OK now & also my anxiety and depression is overcome. She is so caring and humble. I call her anytime and she is always there to explain. Highly recommend this doctor.",
            author: "Snehal Golambade",
            avatarUrl: "/user.jpg",
            rating: 5
        },
        {
            content: "My child had a cough and a frequnet attack. We tried allopathy for the year, but did not get proper results. My friend suggested homeopathy and we consulted with Dr.Pratiksha and we got satisfactory results with homeopathy. I Really Appreciate the Support, communication and care of doctor.",
            author: "Sanika pitale",
            avatarUrl: "/user.jpg",
            rating: 4
        },
        // Add more stories as needed
    ];

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
                        content={story.content}
                        author={story.author}
                        avatarUrl={story.avatarUrl}
                        rating={story.rating}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default HappyStories;