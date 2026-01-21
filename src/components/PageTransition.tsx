import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PageTransitionProps {
  fromId: string;
  toId: string;
}

const PageTransition = ({ fromId, toId }: PageTransitionProps) => {
  useEffect(() => {
    const fromElement = document.getElementById(fromId);
    const toElement = document.getElementById(toId);

    if (fromElement && toElement) {
      // Fade out the from page as soon as user starts scrolling down
      gsap.to(fromElement, {
        scrollTrigger: {
          trigger: fromElement,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 0,
        y: -50,
        ease: 'power2.inOut',
      });

      // Fade in the to page at the same time
      gsap.fromTo(
        toElement,
        { opacity: 0 },
        {
          scrollTrigger: {
            trigger: fromElement,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 1,
          },
          opacity: 1,
          ease: 'power2.inOut',
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [fromId, toId]);

  return null;
};

export default PageTransition;
