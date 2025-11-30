import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/Navbar.css";

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }

    // Hide navbar on scroll down
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling down
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector(".nav-underline");
    if (underline) {
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleNavLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector(".nav-underline");
    if (underline) {
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <nav className={`navbar ${isHidden ? 'navbar-hidden' : ''}`} ref={navRef}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">blankcanvasagency®</a>
        </div>
        <div className={`navbar-links ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
          <button className="close-menu-btn" onClick={closeMenu}>
            <span className="close-line"></span>
            <span className="close-line"></span>
          </button>
          <a href="#about" className="navbar-link" onMouseEnter={handleNavLinkHover} onMouseLeave={handleNavLinkLeave} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
            about
            <span className="nav-underline"></span>
          </a>
          <a href="#services-section" className="navbar-link" onMouseEnter={handleNavLinkHover} onMouseLeave={handleNavLinkLeave} onClick={(e) => { e.preventDefault(); scrollToSection('services-section'); }}>
            services
            <span className="nav-underline"></span>
          </a>
          <a href="#cases" className="navbar-link" onMouseEnter={handleNavLinkHover} onMouseLeave={handleNavLinkLeave} onClick={(e) => { e.preventDefault(); scrollToSection('cases'); }}>
            cases
            <span className="nav-underline"></span>
          </a>
          <a href="#faqs" className="navbar-link" onMouseEnter={handleNavLinkHover} onMouseLeave={handleNavLinkLeave} onClick={(e) => { e.preventDefault(); scrollToSection('faqs'); }}>
            faqs
            <span className="nav-underline"></span>
          </a>
          <button className="get-in-touch-btn mobile-menu-cta" onClick={() => scrollToSection('contact')}>get in touch</button>
        </div>
        <div className="navbar-cta">
          <button className="get-in-touch-btn desktop-only" onClick={() => scrollToSection('contact')}>get in touch</button>
          <button className={`hamburger-menu mobile-only ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;