import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/LayeredImages.css';

gsap.registerPlugin(ScrollTrigger);

const LayeredImages = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const leftImages = gsap.utils.toArray<HTMLElement>('.images-left .image-wrapper img');
      const rightImages = gsap.utils.toArray<HTMLElement>('.images-right .image-wrapper img');

      // Animate left images moving down on scroll
      leftImages.forEach((image, index) => {
        gsap.to(image, {
          y: 150 + (index * 50),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      });

      // Animate right images moving up on scroll
      rightImages.forEach((image, index) => {
        gsap.to(image, {
          y: -150 - (index * 50),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="layered-images-section" ref={sectionRef}>
      <div className="layered-images-container">
        {/* Left side - 3 fully visible images */}
        <div className="images-left">
          <div className="image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800" 
              alt="Layered 1"
            />
          </div>
          <div className="image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800" 
              alt="Layered 2"
            />
          </div>
          <div className="image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1509647648654-6ed5eeb815a4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800" 
              alt="Layered 3"
            />
          </div>
        </div>

        {/* Right side - 3 cutoff images (only edges visible) */}
        <div className="images-right">
          <div className="image-wrapper cutoff">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800" 
              alt="Layered 4"
            />
          </div>
          <div className="image-wrapper cutoff">
            <img 
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800" 
              alt="Layered 5"
            />
          </div>
          <div className="image-wrapper cutoff">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800" 
              alt="Layered 6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayeredImages;
