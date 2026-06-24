import About from './components/About';
import Contact from './components/Contact';
import Demos from './components/Demos';
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
        <Demos />
        <FeaturedVideos />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
