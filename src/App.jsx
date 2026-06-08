import About from './components/About';
import Contact from './components/Contact';
import FeaturedVideos from './components/FeaturedVideos';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import StructuredData from './components/StructuredData';

export default function App() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <div className="divider" />
        <FeaturedVideos />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
