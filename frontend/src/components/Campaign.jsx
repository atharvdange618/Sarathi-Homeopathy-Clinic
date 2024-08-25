/* eslint-disable react/prop-types */
const Campaign = () => {
    return (
        <section id="campaigns" className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Current Campaigns</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Add campaign cards here */}
                    <CampaignCard
                        title="Summer Health Check"
                        description="Get a comprehensive health check-up at discounted rates this summer."
                        date="June 1 - August 31, 2024"
                    />
                    <CampaignCard
                        title="Allergy Relief Program"
                        description="Special consultation and treatment package for allergy sufferers."
                        date="Ongoing"
                    />
                    {/* Add more CampaignCard components as needed */}
                </div>
            </div>
        </section>
    );
};

const CampaignCard = ({ title, description, date }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-sm text-gray-500">Duration: {date}</p>
        </div>
    );
};

export default Campaign;