import { useState } from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        date: '',
        message: '',
    });

    const APP_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to add appointment
            const response = await axios.post(`${APP_URL}/api/appointments`, formData);
            if (response.status === 201) {
                toast.success(response.data.message);
            }

            setTimeout(() => {
                // Redirect to WhatsApp
                const message = `Name: ${formData.name}%0AContact: ${formData.number}%0AMessage: ${formData.message}`;
                const whatsappUrl = `https://api.whatsapp.com/send?phone=919325643953&text=${message}`;
                window.open(whatsappUrl, '_blank');
            }, 1000);

            setFormData({
                name: '',
                number: '',
                date: '',
                message: '',
            })
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    };

    return (
        <section id="contact" className="container mx-auto px-4 py-16">
            <Toaster />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">How to Find Us</h2>
            <p className="mb-8 text-center">Fill up the Form and Ask Your Queries</p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d571.651815295772!2d73.87603066325778!3d18.579152721026933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c7997a3a0683%3A0x24a66c27a891549!2sAgarwal%20building!5e0!3m2!1sen!2sin!4v1723713625888!5m2!1sen!2sin"
                    width="100%"
                    height="350"
                    style={{ border: 0, marginBottom: '15px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <form
                    className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2"
                    onSubmit={handleSubmit}
                >
                    <h3 className="font-bold text-gray-700 mb-4 text-xl">
                        Book Your Appointment
                    </h3>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            id="number"
                            placeholder="Your Phone Number"
                            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
                            value={formData.number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="date"
                            id="date"
                            placeholder="Appointment Date"
                            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            placeholder="Message"
                            id="message"
                            className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:border-blue-500"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300 w-full"
                    >
                        Send Request
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;
