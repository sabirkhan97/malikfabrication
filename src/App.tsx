
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Apps/Pages/Header/Header';
import Footer from './Apps/Pages/Footer/Footer';
import Home from './Apps/Pages/Home/Home';
import Services from './Apps/Pages/services/Services';
import About from './Apps/Pages/About/About';
import Contact from './Apps/Pages/Contact/Contact';
import Blogs from './Apps/Pages/Blogs/Blogs';
import BlogDetail from './Apps/Pages/Blogs/BlogDetail';



function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>


        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
