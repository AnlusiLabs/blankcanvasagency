import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(SplitText, CustomEase);

const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLAnchorElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    if (!headerRef.current || !copyRef.current) return;

    const splitPreloaderHeader = new SplitText(headerRef.current, {
      type: "chars",
      charsClass: "char",
    });

    const splitPreloaderCopy = new SplitText(copyRef.current, {
      type: "lines",
      linesClass: "line",
    });

    const chars = splitPreloaderHeader.chars;
    const lines = splitPreloaderCopy.lines;
    const initialChar = chars[0];
    const lastChar = chars[chars.length - 1];

    // Set initial positions for all chars
    chars.forEach((char, index) => {
      gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
    });

    gsap.set(lines, { yPercent: 100 });

    const preloaderImages = gsap.utils.toArray<HTMLElement>(".preloader-images .img");
    const preloaderImagesInner = gsap.utils.toArray<HTMLElement>(".preloader-images .img img");

    gsap.set(preloaderImages, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
    });

    gsap.set(preloaderImagesInner, {
      scale: 2
    });

    const tl = gsap.timeline({ delay: 0.25 });

    tl.to(progressBarRef.current, {
      scaleX: 1,
      duration: 4,
      ease: "power3.inOut",
    })
      .set(progressBarRef.current, { transformOrigin: "right center" })
      .to(progressBarRef.current, {
        scaleX: 0,
        duration: 0.1,
        ease: "power3.in",
      });

    preloaderImages.forEach((preloaderImg, index) => {
      tl.to(
        preloaderImg,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "hop",
          delay: index * 0.75,
        },
        "-=5"
      );
    });

    preloaderImagesInner.forEach((preloaderImgInner, index) => {
      tl.to(
        preloaderImgInner,
        {
          scale: 1,
          duration: 1.5,
          ease: "hop",
          delay: index * 0.75,
        },
        "-=5.25"
      );
    });

    tl.to(
      lines,
      {
        yPercent: 0,
        duration: 2,
        ease: "hop",
        stagger: 0.1,
      },
      "-=5.5"
    );

    tl.to(
      chars,
      {
        yPercent: 0,
        duration: 1,
        ease: "hop",
        stagger: 0.025,
      },
      "-=5"
    );

    tl.to(
      imagesRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "hop",
      },
      "-=1.5"
    );

    tl.to(
      lines,
      {
        y: "-125%",
        duration: 2,
        ease: "hop",
        stagger: 0.1,
      },
      "-=2"
    );

    tl.to(
      chars,
      {
        yPercent: (index) => {
          if (index === 0 || index === chars.length - 1) {
            return 0;
          }
          return index % 2 === 0 ? 100 : -100;
        },
        duration: 1,
        ease: "hop",
        stagger: 0.025,
        delay: 0.5,

        onStart: () => {
          const initialCharMask = initialChar.parentElement;

          if (initialCharMask) {
            initialCharMask.style.overflow = "visible";
          }

          const viewportWidth = window.innerWidth;
          const centerX = viewportWidth / 2;
          const initialCharRect = initialChar.getBoundingClientRect();
          const lastCharRect = lastChar.getBoundingClientRect();

          gsap.to([initialChar, lastChar], {
            duration: 1,
            ease: "hop",
            delay: 0.5,
            x: (i) => {
              if (i === 0) {
                return centerX - initialCharRect.left - initialCharRect.width;
              } else {
                return centerX - lastCharRect.left;
              }
            },
            onComplete: () => {
              gsap.set(".preloader-header", { mixBlendMode: "difference" });
              
              // Immediately hide everything
              gsap.to(".preloader-header", {
                opacity: 0,
                duration: 0.5,
              });
              
              gsap.to(".preloader-header", {
                y: "2rem",
                scale: 0.35,
                duration: 1.75,
                ease: "hop",
                onComplete: () => {
                  gsap.set(".preloader-header", { display: "none" });
                },
              });
              
              // Hide preloader background immediately
              gsap.to(".preloader", {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                  gsap.set(".preloader", { display: "none" });
                },
              });
            },
          });
        },
      },
      "-=2.5"
    );

    return () => {
      splitPreloaderHeader.revert();
      splitPreloaderCopy.revert();
    };
  }, []);

  const images = [
    "https://plus.unsplash.com/premium_photo-1667520043080-53dcca77e2aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://plus.unsplash.com/premium_photo-1734218353091-a40705659ab1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://plus.unsplash.com/premium_photo-1734388423021-4cc4ce7d7d11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627"
  ];

  return (
    <>
      <div ref={preloaderRef} className="preloader">
        <div ref={progressBarRef} className="progress-bar" />

        <div ref={imagesRef} className="preloader-images">
          {images.map((src, index) => (
            <div key={index} className="img">
              <img src={src} alt="" />
            </div>
          ))}
        </div>

        <div className="preloader-copy">
          <p ref={copyRef}>
            A visual storyteller focused on shaping timeless fashion narratives through
            bold composition and refined tone.
          </p>
        </div>
      </div>

      <div className="preloader-header">
        <a ref={headerRef} href="#">
          BlankCanvasAgency
        </a>
      </div>
    </>
  );
};

export default Preloader;
