// src/App.jsx
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import Vision from './components/Vision';
import About from './components/About';
import OurClients from './components/OurClients';
import ContactUS from './components/ContactUS';
import Gallery from './components/Gallery';

function App() {
  return (
    <div>
      <Hero />
      
      
      
        <About />
       <Vision />
       
       <Gallery />
       <WhyChooseUs />
     
      
      <Services />
      <OurClients />
      <ContactUS />

      {/* Stats component yetil */}
      {/* Services component yetil */}
      {/* About component yetil */}
      {/* Contact component yetil */}
      {/* Footer component yetil */}
    </div>
  );
}

export default App;