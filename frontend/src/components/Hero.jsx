function Hero() {
    return (
        <section id='home' className="bg-blue-100 py-20 md:py-32 bg-cover bg-center" style={{ backgroundImage: 'url(/hero.jpeg)' }}>
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">Your Friendly Homeopathy Clinic in Pune</h1>
                <p className="mb-8 font-semibold text-base md:text-lg text-white">Homeopathy is one of the best alternative treatments that can be administered alongside conventional treatments without any adverse effects.</p>
                <a href="#contact" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">Book An Appointment</a>
            </div>
        </section>
    );
}

export default Hero;