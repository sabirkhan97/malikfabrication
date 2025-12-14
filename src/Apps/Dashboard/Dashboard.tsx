import { useRef } from 'react';
import Header from '../Pages/Header/Header';
import Home from '../Pages/Home/Home';
import AboutSection from '../Pages/About/About';
import ContactPage from '../Pages/Contact/Contact';
import Footer from '../Pages/Footer/Footer';


const Dashboard = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Header 
        homeRef={homeRef}
        servicesRef={servicesRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />
      
      <section ref={homeRef}>
        <Home />
      </section>
            
      <section ref={aboutRef}>
        <AboutSection />
      </section>
      
      <section ref={contactRef}>
        <ContactPage />
      </section>
      
      <Footer />
    </div>
  );
};

export default Dashboard;