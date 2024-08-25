import { useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Treatment from './components/Treatment';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HomeopathyClinic from './components/HomeopathyClinic';
import HappyStories from './components/HappyStories';
import Campaign from './components/Campaign';
import AddReview from './components/AddReview';
import './index.css';

function App() {
  const [reviews, setReviews] = useState(false)
  return (
    <div className="font-sans" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <Hero />
      <HomeopathyClinic />
      <Treatment />
      <Campaign />
      <Contact />
      <HappyStories reviews={reviews} />
      <AddReview setReviews={setReviews} />
      <Footer />
    </div>
  );
}

export default App;