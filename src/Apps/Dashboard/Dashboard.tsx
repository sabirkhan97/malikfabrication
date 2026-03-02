import { useRef } from 'react';
import Header from '../Pages/Header/Header';
import Home from '../Pages/Home/Home';
import AboutSection from '../Pages/About/About';
import ContactPage from '../Pages/Contact/Contact';
import Footer from '../Pages/Footer/Footer';
import WeldingServices from '../Pages/services/Services';
import SeoPage from '../Pages/seo/SeoPage';
import WeldingSpecializations from '../Pages/ourSpecialization/OurSpecialization';

const Dashboard = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const weldingServiceRef = useRef<HTMLDivElement>(null)
  const seoRef = useRef<HTMLDivElement>(null)
  const weldingSpecializationsRef = useRef<HTMLDivElement>(null)
  return (
    <div>
      <Header
        homeRef={homeRef}
        servicesRef={servicesRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
        weldingServiceRef={weldingServiceRef}
        seoRef={seoRef}
        weldingSpecializationsRef={weldingSpecializationsRef}
      />

      <section ref={homeRef}>
        <Home />
      </section>

      <section ref={weldingServiceRef}>
        <WeldingServices />
      </section>

      <section ref={weldingSpecializationsRef}>
        <WeldingSpecializations />
      </section>

      <section ref={seoRef}>
        <SeoPage />
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