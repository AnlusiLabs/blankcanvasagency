import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate about section on mount
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }

    // Scroll-pin effect: Pin section 1's left column only
    if (section1Ref.current && section2Ref.current) {
      const ctx = gsap.context(() => {
        const section1Left = section1Ref.current!.querySelector('.about-left');
        
        // Pin only the left column of section 1
        ScrollTrigger.create({
          trigger: section1Ref.current,
          start: 'top top',
          end: () => `+=${section1Ref.current!.offsetHeight + 200}`,
          pin: section1Left,
          pinSpacing: false,
          scrub: true,
        });

        // Fade out section 1 left column as section 2 scrolls up
        gsap.to(section1Left, {
          opacity: 0,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top center',
            end: 'top top',
            scrub: true,
          }
        });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="about-section" ref={sectionRef} id="about">
      <div className="about-header">
        <h2 className="about-title">ABOUT</h2>
      </div>
      
      <div className="about-horizontal-line"></div>
      
      <div className="about-container">
        {/* First Section - Two Columns */}
        <div className="about-content-grid" ref={section1Ref}>
          <div className="about-left">
            <div className="about-brand-name">
              <div><span className="underlined-brand">BlankCanvasAgency®</span> <br />
              is a creative visual <br />
              identity agency <span className="header-number">1</span></div>
            </div>
          </div>
          
          <div className="about-right">
            <p className="about-description">
              We bring brands to life through identities, specializing in a wide range of creative services including strategy, branding, visual content, social media, websites, and full-scale 360° production. We partner with luxury, fashion, hospitality, and f&b brands, focusing on <span className="underlined-text">bespoke solutions</span>, <span className="underlined-text">distinctive identities</span>, and <span className="underlined-text">visual excellence</span>.
            </p>
            <p className="about-description">
              Our strength lies in crafting <span className="underlined-text">money-making brands</span> that dominate the market. By leveraging captivating concepts and powerful branding strategies, we don't just capture attention — we drive lasting success.
            </p>
            
            {/* Two Images under right column text */}
            <div className="about-images-row">
              <img 
                src="https://plus.unsplash.com/premium_photo-1747851577585-8317ee8d531a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" 
                alt="Creative visual identity"
                className="about-image"
              />
              <img 
                src="https://plus.unsplash.com/premium_photo-1710681612314-ba2b2c7010a1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" 
                alt="Brand design"
                className="about-image"
              />
            </div>
          </div>
        </div>

        {/* Second Section - Two Columns */}
        <div className="about-content-grid" ref={section2Ref}>
          <div className="about-left">
            <div className="about-brand-name">
              <div><span className="underlined-brand">Silent Spaces</span> Interior <br />
              Design Studio is a <br />
              natural continuation of <br />
              Blank canvas Agency <span className="header-number">2</span></div>
            </div>
          </div>
          
          <div className="about-right">
            <p className="about-description">
              We're creating this <span className="underlined-text">interior design</span> branch to fulfill our clients' growing demand for full rebranding solutions that extend from the digital world into <span className="underlined-text">physical spaces</span>. With our expertise in branding and rebranding for f&b, hospitality, and fashion brands, we recognized the need to offer not only online transformations but also immersive, beautifully designed environments.
            </p>
            <p className="about-description">
              Partnering with a leading European design firm with over five years of experience working with major global brands, we bring together creativity and industry expertise. From commercial — hospitality, f&b, boutiques, event spaces — to residential projects, we provide bold, tailor-made solutions that transform spaces and reflect our clients' unique brand identity.
            </p>
            
            {/* Standalone Image */}
            <div className="about-right-image">
              <img 
                src="https://plus.unsplash.com/premium_photo-1746637466031-c74900b2ccb8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1567" 
                alt="Interior design"
                className="about-large-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="about-stats">
        <div className="stat-block">
          <div className="stat-number">15 +</div>
          <div className="stat-description">years of experience in CIS, Western, <br /> Eastern Europe and Middle East</div>
        </div>
        <div className="stat-block">
          <div className="stat-number">10 +</div>
          <div className="stat-description">years of experience in fashion, 5 years <br /> in hospitality and f&b business</div>
        </div>
        <div className="stat-block">
          <div className="stat-number">200+</div>
          <div className="stat-description">creative concepts, visual identities developed and logos designed</div>
        </div>
        <div className="stat-block">
          <div className="stat-number">500 +</div>
          <div className="stat-description">creative directions developed and <br /> photo/videoshoots organized</div>
        </div>
      </div>
    </div>
  );
};

export default About;
