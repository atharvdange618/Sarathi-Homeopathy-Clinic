/* eslint-disable react/no-unescaped-entities */
function Welcome() {
    return (
        <section className="container mx-auto px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Welcome to Sarathi Homeopathic Clinic</h2>
            <p className="mb-8 text-center max-w-2xl mx-auto">Welcome to Sarathi Homeopathic clinic. Thank you for taking the time to find out how homeopathy can help you. We hope that you get inspired to let us help you transform your health. Please don't hesitate to call <a href="tel:9325643953" className="text-blue-500">93256 43953</a> to book your consultation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-2">Friendly Homeopathy Clinic Near You</h3>
                    <p>Homeopathy for young and old, helping you with mental, emotional and physical health issues.</p>
                </div>
                <div className="bg-white shadow p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-2">Experienced Homeopath Doctor</h3>
                    <p>Your health issues are treated holistically by a Qualified Practitioner.</p>
                </div>
            </div>
        </section>
    );
}

export default Welcome;