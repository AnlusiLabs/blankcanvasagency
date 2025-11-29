import { useRef } from "react";
import "../styles/PreNavbar.css";

const PreNavbar = () => {
  const navLinksRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

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
            <div key={item} className="pre-nav-link">
              <span className="text-xs">{item}</span>
              <div className="pre-nav-underline"></div>
            </div>
          ))}
        </div>

        <div className="pre-navbar-section" ref={socialLinksRef}>
          {["twitter", "instagram"].map((item) => (
            <div key={item} className="pre-nav-link">
              <span className="text-xs">{item}</span>
              <div className="pre-nav-underline"></div>
            </div>
          ))}
        </div>

        <div className="pre-navbar-section">
          <span className="text-xs">pretoria, gp</span>
        </div>
      </div>
    </div>
  );
};

export default PreNavbar;
