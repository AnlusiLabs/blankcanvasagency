import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/Services.css';

interface AccordionItem {
  id: number;
  title: string;
  description: string;
  pointsCol1: string[];
  pointsCol2: string[];
  image: string;
}

const accordionData: AccordionItem[] = [
  {
    id: 1,
    title: 'STRATEGY + POSITIONING',
    description: 'We create dynamic strategies fueled by deep<br/> insights and analytics. Instead of merely mapping<br/> out plans, we develop clear, actionable roadmaps<br/> that advance your brand or business to the<br/> forefront:',
    pointsCol1: [
      'Customer + Market Research',
      'Trends Analysis',
      'Competitor Review',
      'Analytics Report',
      'Target Audience',
      'Positioning Strategy'
    ],
    pointsCol2: [
      'Pricing Strategy',
      'Product Ideation',
      'Customer Journey Mapping',
      'Pre- and Post-Launch Strategy',
      'Business Recommendations'
    ],
    image: 'https://plus.unsplash.com/premium_photo-1671641797903-fd39ec702b16?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    title: 'BRAND IDENTITY',
    description: 'We craft distinctive brand identities by defining<br/> your brand\'s core essence and creating a<br/> compelling visual representation. By uncovering<br/> your mission, values, and purpose, we pinpoint your<br/> unique selling proposition and develop a cohesive<br/> visual and messaging strategy that truly sets your<br/> brand apart:',
    pointsCol1: [
      'Brand Identity + DNA',
      'Persona Composition',
      'Brand Story',
      'Naming',
      'Slogan',
      'Mission, Values, Goals'
    ],
    pointsCol2: [
      '3Ps: Promise, Purpose, Positioning',
      'Tone of Voice',
      'Brand Message',
      'Communications Manner',
      'Analysis + Development of USP',
      'Brand Statement'
    ],
    image: 'https://plus.unsplash.com/premium_photo-1726822827410-1a71bc2795fc?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    title: 'DESIGN IDENTITY',
    description: 'We craft exceptional visual identities where every element tells a story and contributes to a unified brand philosophy. We merge cutting-edge trends with cultural nuances to create a distinctive brand image that stands out. Service includes:',
    pointsCol1: [
      'Look + Feel',
      'Logo Design',
      'Color Palette',
      'Typography',
      'Brand Elements',
      'Collaterals',
      'Print + Packaging'
    ],
    pointsCol2: [],
    image: 'https://plus.unsplash.com/premium_photo-1758752254125-5dbac94074df?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 4,
    title: 'WEB DEVELOPMENT',
    description: 'We bring your brand into the digital world without sacrificing performance, security, or visual consistency. We create exclusive designs tailored specifically for each client, customizing every detail to meet your unique requests and ensure a standout online presence:',
    pointsCol1: [
      'Landing Page',
      'Multi-Page Website',
      'User Experience (UX)',
      'User Interface (UI)'
    ],
    pointsCol2: [
      'Web Design',
      'Prototyping',
      'E-Commerce',
      'Front-end Development'
    ],
    image: 'https://plus.unsplash.com/premium_photo-1741413525786-764efce37211?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 5,
    title: 'SOCIAL MEDIA',
    description: 'We design striking and cohesive visuals tailored to your brand, ensuring your social media presence captures attention and communicates your brand\'s identity accurately. Service includes:',
    pointsCol1: [
      'Digital Visual Identity',
      'Content Strategy + Plan',
      'Content Production',
      'Copywriting'
    ],
    pointsCol2: [],
    image: 'https://cdn.prod.website-files.com/66f184de342936a79e479300/6706466b4c48131ee54af839_image%202.webp'
  },
  {
    id: 6,
    title: 'MARKETING + COMMUNICATIONS',
    description: 'We craft tailored marketing strategies and communication plans that connect with your audience, build brand awareness, and deliver results, ensuring your brand\'s message stands out. Services includes:',
    pointsCol1: [
      '360 Marketing + Activations Plan',
      'Marketing Strategies',
      'Digital Identity',
      'Brand Positioning Online'
    ],
    pointsCol2: [
      'E-mail Marketing',
      'Influencer Marketing',
      'Communications Plan'
    ],
    image: 'https://images.unsplash.com/photo-1630706436999-f3a68cf50e98?q=80&w=418&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 7,
    title: 'PRODUCTION',
    description: 'We handle every aspect of photo and video content, from planning your ideas with a clear budget to executing bold campaigns and supporting shoots. Our team ensures everything comes together effortlessly:',
    pointsCol1: [
      'Concept Creation',
      'Art Direction',
      'Immersive Campaigns',
      'Video Production'
    ],
    pointsCol2: [
      'Photography',
      'Animation',
      'Audio Production',
      'Editing'
    ],
    image: 'https://images.unsplash.com/photo-1552793084-49132af00ff1?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, []);

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="services-section" ref={sectionRef} id="services-section">
      <div className="services-header">
        <h2 className="services-title">SERVICES</h2>
      </div>
      
      <div className="services-content">
        <div className="services-left">
          <p className="services-heading">
            Bringing together <span className="underlined-text">strategy</span>,<br/> 
            <span className="underlined-text">creativity</span>, and <span className="underlined-text">technology</span> to<br/> 
            craft visual products and<br/> 
            campaigns that thrive across<br/> 
            all platforms internationally
          </p>
          <button className="get-in-touch-btn">
            DISCUSS PROJECT
          </button>
        </div>
        
        <div className="services-right">
          <p className="services-tagline">
            Driven by strategies,<br/>
            money and viral success
          </p>
        </div>
      </div>

      <div className="services-accordion">
        {accordionData.map((item) => (
          <div key={item.id} className="accordion-item">
            <div 
              className="accordion-header" 
              onClick={() => toggleAccordion(item.id)}
            >
              <span className="accordion-number">0{item.id}</span>
              <h3 className="accordion-title">{item.title}</h3>
              <span className="accordion-icon">{openAccordion === item.id ? '−' : '+'}</span>
            </div>
            
            {openAccordion === item.id && (
              <div className="accordion-content">
                <div className="accordion-grid">
                  <div className="accordion-col">
                    <p 
                      className="accordion-description" 
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                  
                  <div className="accordion-col">
                    <ul className="accordion-list">
                      {item.pointsCol1.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="accordion-col">
                    <ul className="accordion-list">
                      {item.pointsCol2.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="accordion-col">
                    <img src={item.image} alt={item.title} className="accordion-image" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
