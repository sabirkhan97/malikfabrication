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

  return (
    <div>
      <Header
      />

      <section>
        <Home />
      </section>

      <section >
        <WeldingServices />
      </section>

      <section >
        <WeldingSpecializations />
      </section>

      <section >
        <SeoPage />
      </section>
      <section >
        <AboutSection />
      </section>

      <section >
        <ContactPage />
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;