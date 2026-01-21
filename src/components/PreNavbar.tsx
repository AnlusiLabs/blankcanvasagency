import { useRef } from "react";
import "../styles/PreNavbar.css";

const PreNavbar = () => {
  const navLinksRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId === 'services' ? 'services-section' : sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pre-navbar">
      <div className="pre-navbar-container">
        <div className="pre-navbar-section">
          <span className="text-xs uppercase">blankcanvasagency®</span>
        </div>
        <div className="pre-navbar-section">
          <span className="text-xs">digital studio</span>
        </div>

        <div className="pre-navbar-section" ref={navLinksRef}>
          {["about", "services", "faqs", "contact"].map((item) => (
            <div key={item} className="pre-nav-link" onClick={() => scrollToSection(item)}>
              <span className="text-xs">{item}</span>
              <div className="pre-nav-underline"></div>
            </div>
          ))}
        </div>

        <div className="pre-navbar-section" ref={socialLinksRef}>
          <div className="pre-nav-link" onClick={() => window.open('https://twitter.com', '_blank')}>
            <span className="text-xs">twitter</span>
            <div className="pre-nav-underline"></div>
          </div>
          <div className="pre-nav-link" onClick={() => window.open('https://instagram.com', '_blank')}>
            <span className="text-xs">instagram</span>
            <div className="pre-nav-underline"></div>
          </div>
        </div>

        <div className="pre-navbar-section">
          <span className="text-xs">pretoria, gp</span>
        </div>
      </div>
    </div>
  );
};

export default PreNavbar;
