import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Cases.css';

gsap.registerPlugin(ScrollTrigger);

interface CaseItem {
  id: number;
  title: string;
  tags: string;
  image: string;
  content: {
    projectName: string;
    description: string;
    services: string[];
    results: string[];
  };
}

const casesData: CaseItem[] = [
  {
    id: 1,
    title: 'LULO CAFE',
    tags: 'STRATEGY + POSITIONING|BRANDING',
    image: '/images/VOID.png',
    content: {
      projectName: 'VOID CONTOUR',
      description: 'A comprehensive brand strategy and positioning project that transformed the client\'s market presence.',
      services: ['Brand Strategy', 'Market Research', 'Visual Identity', 'Positioning'],
      results: ['150% increase in brand awareness', 'Market leader position', '$5M valuation increase']
    }
  },
  {
    id: 2,
    title: 'ABSA',
    tags: 'WEB DEVELOPMENT|DESIGN IDENTITY',
    image: '/images/EVOQUE.png',
    content: {
      projectName: 'EVOQUE',
      description: 'Complete web development and design overhaul for a modern digital experience.',
      services: ['Web Design', 'UX/UI', 'Front-end Development', 'E-Commerce'],
      results: ['300% traffic increase', 'Enhanced user engagement', '2x conversion rate']
    }
  },
  {
    id: 3,
    title: 'HOUSE OF SEBO',
    tags: 'SOCIAL MEDIA|PRODUCTION',
    image: '/images/NIGHTLIFE.webp',
    content: {
      projectName: 'NIGHTLIFE AVENUE',
      description: 'Social media campaign with high-quality video and photo production.',
      services: ['Content Strategy', 'Video Production', 'Photography', 'Social Media Management'],
      results: ['1M+ social reach', 'Viral campaign success', 'Brand recognition boost']
    }
  },
  {
    id: 4,
    title: 'GRADESMATCH',
    tags: 'MARKETING|BRAND IDENTITY',
    image: '/images/FINE-DINING.webp',
    content: {
      projectName: 'FINE-DINING',
      description: 'Integrated marketing campaign with complete brand identity refresh.',
      services: ['Marketing Strategy', 'Brand Identity', 'Digital Marketing', 'Communications'],
      results: ['200% ROI', 'Market expansion', 'Award-winning campaign']
    }
  },
  {
    id: 5,
    title: 'LIVE SHOW VENUE',
    tags: 'STRATEGY + POSITIONING|WEB DEVELOPMENT',
    image: '/images/LIVE.webp',
    content: {
      projectName: 'LIVE SHOW VENUE',
      description: 'Strategic positioning combined with cutting-edge web development.',
      services: ['Business Strategy', 'Web Platform', 'UX Design', 'Analytics'],
      results: ['Industry disruption', '$10M funding raised', 'Rapid growth']
    }
  },
  {
    id: 6,
    title: 'ATELIER',
    tags: 'DESIGN IDENTITY|BRANDING',
    image: '/images/ATELIER.webp',
    content: {
      projectName: 'ATELIER',
      description: 'Complete visual identity design with comprehensive brand guidelines.',
      services: ['Visual Identity', 'Logo Design', 'Brand Guidelines', 'Typography'],
      results: ['Distinctive brand presence', 'Award-winning design', 'Market differentiation']
    }
  },
  {
    id: 7,
    title: 'SABRAGE',
    tags: 'PRODUCTION|MARKETING',
    image: '/images/SABRAGE.webp',
    content: {
      projectName: 'SABRAGE',
      description: 'Full-scale production and marketing campaign driving massive brand awareness.',
      services: ['Video Production', 'Photography', 'Campaign Strategy', 'Media Planning'],
      results: ['10M+ impressions', 'Viral content success', '300% engagement increase']
    }
  }
];

const Cases = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const container = scrollContainerRef.current;
    if (!section || !container) return;

    const grid = container.querySelector('.cases-grid') as HTMLElement;
    if (!grid) return;

    const scrollWidth = grid.scrollWidth;
    const viewportWidth = window.innerWidth;
    const totalScroll = scrollWidth - viewportWidth + 130;

    console.log('Cases scroll debug:', { scrollWidth, viewportWidth, totalScroll, cardCount: grid.children.length });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalScroll + 900}`,
        invalidateOnRefresh: true
      }
    });

    tl.to(grid, {
      x: -totalScroll,
      ease: 'none'
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // GSAP Marquee Animation
  useEffect(() => {
    const marqueeRight = gsap.utils.toArray('.marquee-right .marquee-content');
    const marqueeLeft = gsap.utils.toArray('.marquee-left .marquee-content');

    marqueeRight.forEach((el) => {
      gsap.to(el as HTMLElement, {
        xPercent: -50,
        repeat: -1,
        ease: 'none',
        duration: 90,
        force3D: true,
      });
    });

    marqueeLeft.forEach((el) => {
      gsap.fromTo(
        el as HTMLElement,
        { xPercent: -50 },
        {
          xPercent: 0,
          repeat: -1,
          ease: 'none',
          duration: 90,
          force3D: true,
        }
      );
    });

    return () => gsap.killTweensOf('.marquee-content');
  }, []);

  const openModal = (caseItem: CaseItem) => {
    setSelectedCase(caseItem);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCase(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="cases-section" ref={sectionRef} id="cases">
        <div className="cases-header">
          <div className="cases-left">
            <h3 className="cases-subtitle">CASES</h3>
            <h2 className="cases-heading">CREATING LASTING VALUE</h2>
            <p className="cases-description">
              Our work is driven by success, clearly defined business goals,<br/> and an unstoppable desire to create worthy projects that make<br/> an impact, leave a lasting impression, and achieve valuations in<br/> the millions of dollars.
            </p>
          </div>

          <div className="cases-right">
            <button className="skip-btn">SKIP NOW</button>
            <p className="scroll-indicator">
              scroll down/up to see more
            </p>
          </div>
        </div>

        <div className="cases-scroll-container" ref={scrollContainerRef}>
          <div className="cases-grid">
            {casesData.map((caseItem) => (
            <div
              key={caseItem.id}
              className="case-card"
              onClick={() => openModal(caseItem)}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredCard(caseItem.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="case-image-wrapper">
                <img src={caseItem.image} alt={caseItem.title} className="case-image" />
                <div className="case-tags-container">
                  {caseItem.tags.split('|').map((tag, index) => (
                    <div key={index} className="case-tag">
                      {tag}
                    </div>
                  ))}
                </div>
                {hoveredCard === caseItem.id && (
                  <div 
                    className="view-case-cursor"
                    style={{
                      left: `${cursorPosition.x}px`,
                      top: `${cursorPosition.y}px`
                    }}
                  >
                    (VIEW CASE)
                  </div>
                )}
              </div>
              <div className="case-info">
                <span className="case-number">(0{caseItem.id})</span>
                <span className="case-title">{caseItem.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="services-marquee">
      <div className="marquee-line marquee-right">
        <div className="marquee-content">
          {Array(4).fill('STRATEGY + POSITIONING - BRANDING - DIGITAL PRESENCE - VISUAL IDENTITY - MARKETING STRATEGY - REBRANDING - PRODUCTION - MARKETING + COMMUNICATIONS - SOCIAL MEDIA - WEB DEVELOPMENT - DESIGN IDENTITY - BRAND IDENTITY - ').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>
      <div className="marquee-line marquee-left">
        <div className="marquee-content">
          {Array(4).fill('STRATEGY + POSITIONING - BRANDING - DIGITAL PRESENCE - VISUAL IDENTITY - MARKETING STRATEGY - REBRANDING - PRODUCTION - MARKETING + COMMUNICATIONS - SOCIAL MEDIA - WEB DEVELOPMENT - DESIGN IDENTITY - BRAND IDENTITY - ').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>
    </div>

    {selectedCase && (
        <div className="case-modal" onClick={closeModal}>
          <div className="modal-overlay" />
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}>×</button>
            
            <div className="modal-body">
              <h2 className="modal-title">{selectedCase.content.projectName}</h2>
              <p className="modal-description">{selectedCase.content.description}</p>
              
              <div className="modal-section">
                <h3 className="modal-section-title">Services Provided</h3>
                <ul className="modal-list">
                  {selectedCase.content.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3 className="modal-section-title">Results</h3>
                <ul className="modal-list">
                  {selectedCase.content.results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cases;
