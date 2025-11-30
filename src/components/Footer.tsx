import { useState } from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const [showEmail, setShowEmail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Column */}
        <div className="footer-column">
          <h3 className="footer-heading">OPERATING WORLDWIDE</h3>
          <p className="footer-description">
            We create unique, powerful brand identities and designs that set you apart from the competition.
          </p>
          <div 
            className="footer-email-container"
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}
          >
            <p className="footer-email">
              {showEmail ? 'business@blankcanvaagency.com' : 'Email Us'}
            </p>
          </div>
        </div>

        {/* Second Column - Contact/Social */}
        <div className="footer-column">
          <h3 className="footer-heading">CONTACT</h3>
          <ul className="footer-links">
            <li><a href="https://behance.net" target="_blank" rel="noopener noreferrer">Behance</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">Tiktok</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin</a></li>
          </ul>
        </div>

        {/* Third Column - Navigation */}
        <div className="footer-column">
          <h3 className="footer-heading">NAVIGATION</h3>
          <ul className="footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#cases">Cases</a></li>
            <li><a href="#faqs">FAQs</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Fourth Column - Rights & Links */}
        <div className="footer-column footer-column-right">
          <p className="footer-copyright">© All right reserved 2025</p>
          <div className="footer-bottom-links">
            <button onClick={scrollToTop} className="footer-link-btn">Back on top</button>
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <p className="footer-credit">made by AnLuSi</p>
          </div>
        </div>
      </div>
      
      {/* Plus Button to Home */}
      <button className="footer-home-btn" onClick={goToHome} aria-label="Go to home">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      
      {/* Large Brand Text */}
      <div className="footer-brand-container">
        <div className="footer-brand">BLANK CANVAS</div>
      </div>
    </footer>
  );
};

export default Footer;
