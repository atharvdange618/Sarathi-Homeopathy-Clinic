import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Treatment from './components/Treatment';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HomeopathyClinic from './components/HomeopathyClinic';
import HappyStories from './components/HappyStories';
import './index.css';

function App() {
  return (
    <div className="font-sans" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <Hero />
      <HomeopathyClinic />
      <Treatment />
      <Contact />
      <HappyStories />
      <Footer />
    </div>
  );
}

export default App;