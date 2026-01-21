import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Benefits.css';

gsap.registerPlugin(ScrollTrigger);

interface BenefitItem {
  id: string;
  title: string;
  description: string;
}

const benefitsData: BenefitItem[] = [
  {
    id: '01',
    title: 'HUNGER',
    description: "Our goal is to make sure our strategies and concepts actually<br/> work for you, resulting in your growth and recognition."
  },
  {
    id: '02',
    title: 'EXPERIENCE',
    description: "We have a proven track record over 10 years in the Western and<br/> Eastern Europe, CIS and the Middle East, across industries such<br/> as hospitality, f&b, fashion, luxury, and tech."
  },
  {
    id: '03',
    title: 'STRATEGY',
    description: "Designs, strategies, and visuals are driven by clear intentions<br/> and a strategic plan. Each element is crafted with purpose to<br/> ensure impactful and cohesive results."
  },
  {
    id: '04',
    title: 'BUSINESS-SAVVY APPROACH',
    description: "What makes us unique is that we don't do things just because \"it's pretty\"; our decisions are based on the business objectives and goals of the client."
  }
];

const Benefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['RECOGNITION', 'SUCCESS', 'MONEY'];

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
    const interval = setInterval(() => {
      if (wordRef.current) {
        // Animate out: slide up and fade
        gsap.to(wordRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentWord((prev) => (prev + 1) % words.length);
            // Animate in: slide up from below
            gsap.fromTo(
              wordRef.current,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
            );
          }
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="benefits-section" ref={sectionRef} id="benefits">
      <div className="benefits-header">
        <h3 className="benefits-subtitle">OUR BENEFITS</h3>
        <h2 className="benefits-heading">WHY CHOOSE US</h2>
        <p className="benefits-description">
          Our work is driven by success, clearly defined business<br/> goals, and an unstoppable desire to create worthy projects<br/> that make an impact, leave a lasting impression, and achieve<br/> valuations in the millions of dollars.
        </p>
      </div>

      <div className="benefits-grid">
        {benefitsData.map((benefit) => (
          <div key={benefit.id} className="benefit-card">
            <div className="benefit-content">
              <div className="benefit-top">
                <div className="benefit-left">
                  <span className="benefit-number">({benefit.id})</span>
                </div>
                <div className="benefit-right">
                  <h3 className="benefit-title">{benefit.title}</h3>
                </div>
              </div>
              <p className="benefit-text" dangerouslySetInnerHTML={{ __html: benefit.description }} />
            </div>
          </div>
        ))}
      </div>

      <div className="benefits-footer">
        <img 
          src="https://images.unsplash.com/photo-1548918901-9b31223c5c3a?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Left decoration" 
          className="footer-image-left"
        />
        <h3 className="benefits-footer-subtitle">BLANK CANVAS AGENCY.</h3>
        <h2 className="benefits-tagline">
          WE BUILD POWERFUL<br/>
          BRANDS THAT BRING YOU<br/>
          <span ref={wordRef} className="rotating-word">{words[currentWord]}</span>
        </h2>
        <img 
          src="https://images.unsplash.com/photo-1509679708047-e0e562d21e44?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Right decoration" 
          className="footer-image-right"
        />
        <img 
          src="https://cdn.prod.website-files.com/66efe6622a82b5acbcedebd8/67080e8c5351b11a8d0dfcca_Rectangle%205.webp" 
          alt="Bottom decoration" 
          className="footer-image-bottom"
        />
      </div>
    </div>
  );
};

export default Benefits;
