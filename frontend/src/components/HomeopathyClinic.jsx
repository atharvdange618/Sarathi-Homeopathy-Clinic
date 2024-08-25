/* eslint-disable react/no-unescaped-entities */

const HomeopathyClinic = () => {
    return (
        <div className="container mx-auto px-4 py-8 font-sans max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Welcome to Sarathi Homeopathic Clinic</h1>

            <div className="flex flex-col lg:flex-row mb-12 gap-8">
                <div className="lg:w-1/2">
                    <p className="mb-4 text-gray-700">Welcome to <b>Sarathi Homeopathic clinic</b>. Thank you for taking the time to find out how homeopathy can help you. We hope that you get inspired to let us help you transform your health. Please don't hesitate to call <a href="tel:9325643953" className="text-blue-500">93256 43953</a> to book your consultation.</p>

                    <div className="bg-white shadow p-6 rounded-lg">
                        <h3 className="font-bold text-xl mb-2">Friendly Homeopathy Clinic Near You</h3>
                        <p>Homeopathy for young and old, helping you with mental, emotional and physical health issues.</p>
                    </div>

                    <div className="bg-white shadow p-6 rounded-lg mt-2">
                        <h3 className="font-bold text-xl mb-2">Experienced Homeopath Doctor</h3>
                        <p>Your health issues are treated holistically by a Qualified Practitioner.</p>
                    </div>
                </div>

                <div className="lg:w-1/2 hidden lg:flex justify-center items-center">
                    <img
                        className="max-w-full h-[380px] object-cover rounded-lg"
                        src="https://img.freepik.com/vetores-gratis/composicao-isometrica-de-homeopatia_1284-21705.jpg?t=st=1723726327~exp=1723729927~hmac=06141da173fd26dd23907c3c8074d3355b60a043790e3182c390259ac16746df&w=826"
                        alt="Homeopathy Illustration"
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/2">
                    <div className="hidden lg:flex justify-center">
                        <img
                            src="/Pediatrician-amico.png"
                            alt="Homeopathy Diagram"
                            className="max-w-full h-[400px] rounded-lg"
                        />
                    </div>
                </div>

                <div className="lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Homeopathy: a holistic approach</h2>
                    <h3 className="font-semibold mb-3 text-lg">So why Homeopathy?</h3>
                    <p className="mb-4 text-gray-700">Homeopathic medicine facilitates the body's physical and emotional recovery without causing more damage to the body. Your body is yours to be regenerated for. If you are rude to it, it will hurt, you will have a stomach ache. If you drink too less, you will have a burning in urine. These are all warning signs that your body does not like what is happening to it.</p>
                    <p className="mb-6 text-gray-700">A homeopath considers the whole picture and thus does not treat physical, emotional and mental symptoms separately, but takes the view that they are all interconnected as facets of the patient's suffering. This is what makes homeopathy a truly holistic and refined art.</p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="font-semibold text-lg">Dr. Swati Hile</p>
                        <p className="text-gray-600">Doctor of Medicine (Homeopathy) B.H.M.S</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeopathyClinic;