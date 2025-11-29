import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Navbar from '../components/navbar';
import About from './About';
import Gallery from './Gallery';
import Services from './Services';
import Cases from './Cases';
import Benefits from './Benefits';
import FAQs from './FAQs';
import Contact from './Contact';
import Footer from '../components/Footer';
import '../styles/Introduction.css';

const Introduction = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/images/brand1.avif',
    '/images/brand2.avif',
    '/images/brand3.avif',
    '/images/brand4.avif'
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Image slideshow animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            gsap.to(imageRef.current, {
              opacity: 1,
              duration: 0.5
            });
          }
        });
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate introduction section on mount
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes}${period}`;
  };

  return (
    <>
      <Navbar />
      <div className="introduction-section" ref={sectionRef}>
        <div className="introduction-container">
          {/* Left Column */}
          <div className="intro-column intro-left">
            <h2 className="intro-title">
              INTERNATIONAL<br /> CREATIVE<br /> AGENCY
            </h2>
            <p className="intro-description">
              We specialise in creative design, strategy, branding and visual<br />
              identity, ux/ui and high-quality online presence for businesses,<br />
              corporations and dynamic startups.
            </p>
            <button className="discuss-project-btn">
              DISCUSS PROJECT
            </button>
          </div>

          {/* Middle Column */}
          <div className="intro-column intro-middle">
            <button className="plus-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="plus-button-tooltip">(CLICK AND GO TO SERVICES)</span>
            </button>
          </div>

          {/* Right Column */}
          <div className="intro-column intro-right">
            <h2 className="intro-title">
              BUILDING<br /> MONEY-MAKING<br /> BRANDS
            </h2>
            <p className="intro-location">
              BASED IN SOUTH AFRICA, PARIS,<br />
              ISTANBUL, LISBON
            </p>
            <p className="intro-operating">
              OPERATING WORLDWIDE
            </p>
          </div>
        </div>

        {/* Mobile-only separate sections */}
        <div className="mobile-description-section">
          <p className="mobile-intro-description">
            We specialise in creative design, strategy, branding and visual<br />
            identity, ux/ui and high-quality online presence for businesses,<br />
            corporations and dynamic startups.
          </p>
        </div>

        <div className="mobile-button-section">
          <button className="mobile-discuss-project-btn">
            DISCUSS PROJECT
          </button>
        </div>

        <div className="mobile-location-section">
          <p className="mobile-intro-location">
            BASED IN SOUTH AFRICA, PARIS,<br />
            ISTANBUL, LISBON
          </p>
          <p className="mobile-intro-operating">
            OPERATING WORLDWIDE
          </p>
        </div>

        <div className="full-horizontal-line"></div>

        {/* Bottom Section - Time and Image Slideshow */}
        <div className="bottom-section">
          {/* Left Column - Local Time */}
          <div className="bottom-left">
            <h3 className="local-time-title">LOCAL TIME</h3>
            <div className="time-list">
              <div className="time-item">
                <span className="time">{formatTime(currentTime)}</span>
                <span className="blinking-dot"></span>
                <span className="city">PRETORIA</span>
              </div>
              <div className="time-item">
                <span className="time">{formatTime(currentTime)}</span>
                <span className="blinking-dot"></span>
                <span className="city">JOHANNESBURG</span>
              </div>
            </div>
            <div className="bottom-agency-info">
              <p className="agency-est">EST.2025</p>
              <p className="agency-name">BLANKCANVASAGENCY®</p>
            </div>
          </div>

          {/* Right Column - Text and Image Slideshow */}
          <div className="bottom-right">
            <div className="bottom-text-container">
              <p className="bottom-text">
                We connect brands with their audience through<br/>
                in-depth research, strategic rigor, cutting-edge<br/>
                technology, and responsive design.
              </p>
              <p className="keep-scrolling">(KEEP SCROLLING)</p>
            </div>
            <div className="image-slideshow">
              <img 
                ref={imageRef}
                src={images[currentImageIndex]} 
                alt="Brand showcase"
                className="slideshow-image"
              />
            </div>
          </div>

          {/* Mobile EST info */}
          <div className="bottom-agency-info-mobile">
            <p className="agency-est">EST.2025</p>
            <p className="agency-name">BLANKCANVASAGENCY®</p>
          </div>
        </div>
      </div>
      
      <About />
      
      <Gallery />
      
      <Services />
      
      <Cases />
      
      <Benefits />
      
      <FAQs />
      
      <Contact />
      
      <Footer />
    </>
  );
};

export default Introduction;
