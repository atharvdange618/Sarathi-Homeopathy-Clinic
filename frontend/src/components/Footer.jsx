/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-500 to-purple-500 py-8 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="flex flex-col items-center md:items-start">
                        <img src="/Doctor-amico.png" alt="Sarathi Homeopathic" className="w-16 h-16 mb-4" />
                        <p className="max-w-xs text-center md:text-left">Sarathi Homeopathic is one of the best child Specialists Homeopathic Clinic in Vishrantwadi, Pune. Dr. Swati is Child Specialist and also treat adults with various disorders & have expertise in this area as well.</p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold mb-2 text-center md:text-left">Quick Links</h3>
                        <div className="flex flex-col items-center md:items-start">
                            <a href="#about" className="mb-2">About</a>
                            <a href="#treatment" className="mb-2">Treatment</a>
                            <a href="#contact" className="mb-2">Contact</a>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold mb-2 text-center md:text-left">Treatment</h3>
                        <div className="flex flex-col items-center md:items-start">
                            <a href="#" className="mb-2">Paediatric Related Diseases</a>
                            <a href="#" className="mb-2">Women's Health</a>
                            <a href="#" className="mb-2">Old Age Problems</a>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold mb-2 text-center md:text-left">Address</h3>
                        <p className="text-center md:text-left">Off. No. 1, Ground Floor, Agarwal Building,Opp. R&DE Gate, Sr. No. 116, Kalas, Alandi Road, Pune 411015</p>
                        <div className="flex justify-center md:justify-start space-x-2 mt-4">
                            <a href="#"><i className="fa-brands fa-square-facebook w-6 h-6"></i></a>
                            <a href="#"><i className="fa-brands fa-square-instagram w-6 h-6"></i></a>
                            <a href="https://wa.me/9325643953"><i className="fa-brands fa-square-whatsapp w-6 h-6"></i></a>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-center">Copyright © 2024 Sarathi Homeopathic Clinic</p>
            </div>
        </footer>
    );
}

export default Footer;