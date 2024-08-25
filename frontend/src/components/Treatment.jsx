/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Treatment() {
    const treatments = [
        "Chronic cold, cough",
        "Allergy, tonsillitis",
        "Respiratory diseases, asthma",
        "Diseases in young children",
        "All diseases of women",
        "All skin diseases",
        "Sinusitis",
        "Migraines",
        "Stomach disorders",
        "Liver disease, jaundice",
        "Eye disorders",
        "Back and spine diseases",
        "Joint and bone pain",
        "Hair fall, baldness",
        "Ear problems, earaches",
        "Thyroid issues",
        "Mental disorders",
        "Diabetes, high blood pressure"
    ];

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <section id='treatment' className="container mx-auto px-4 py-16 text-center shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Complete Care on Your Schedule</h2>
            <p className="mb-8">Meet Dr. Swati for a New, Improved & Faster Homeopathy</p>
            <Slider {...settings}>
                {treatments.map((treatment, index) => (
                    <div key={index} className="p-2">
                        <div className="bg-white shadow p-6 rounded-lg">
                            <h3 className="font-bold text-xl mb-2">{treatment}</h3>
                            <p>Effective treatment available for {treatment.toLowerCase()}.</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.5)",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                position: "absolute",
                right: "-10px",
                zIndex: 1,
                cursor: "pointer",
                transition: "background 0.3s ease"
            }}
            onClick={onClick}
        >
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.5)",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                position: "absolute",
                left: "-10px",
                zIndex: 1,
                cursor: "pointer",
                transition: "background 0.3s ease"
            }}
            onClick={onClick}
        >
        </div>
    );
}


export default Treatment;
