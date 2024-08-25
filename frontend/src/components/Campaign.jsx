/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Campaign = () => {
    const APP_URL = import.meta.env.VITE_API_URL;
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get(`${APP_URL}/api/campaigns`);
                setCampaigns(response.data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
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
        <section id="campaigns" className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Current Campaigns</h2>
                <Slider {...settings}>
                    {campaigns.map((campaign) => (
                        <div key={campaign._id} className="px-2">
                            <CampaignCard
                                title={campaign.title}
                                description={campaign.description}
                                date={`${new Date(campaign.startDate).toLocaleDateString()} - ${new Date(campaign.endDate).toLocaleDateString()}`}
                                image={campaign.image}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

const CampaignCard = ({ title, description, date, image }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 h-full">
            {image && <img src={image} alt={title} className="w-full h-48 object-bg-cover mb-4 rounded" />}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-sm text-gray-500">Duration: {date}</p>
        </div>
    );
};

export default Campaign;