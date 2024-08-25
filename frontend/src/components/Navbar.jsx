import { useState } from 'react';

function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-bold">Sarathi Homeopathic Clinic</div>
                    <button
                        className="md:hidden"
                        onClick={toggleNav}
                        aria-label="Toggle navigation"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                <nav className={`${isNavOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <a href="#home" className="text-blue-500 mx-2 my-1 md:my-0">Home</a>
                        <a href="#about" className="mx-2 my-1 md:my-0">About</a>
                        <a href="#treatment" className="mx-2 my-1 md:my-0">Treatment</a>
                        <a href="#contact" className="mx-2 my-1 md:my-0">Contact</a>
                        <a href='tel:9325643953' className="bg-blue-500 text-white px-4 py-2 rounded mt-4 md:mt-0 md:ml-4">Call Now</a>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;