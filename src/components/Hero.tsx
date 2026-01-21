import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import PreNavbar from "./PreNavbar";

gsap.registerPlugin(SplitText, CustomEase);

const Hero = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // -------------------
  // GSAP PRE-LOADER ANIMATION
  // -------------------
  useEffect(() => {
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    if (!headerRef.current) return;

    const h1Element = headerRef.current;
    
    const splitHeader = new SplitText(h1Element, {
      type: "lines",
      linesClass: "line",
    });

    const headerLines = splitHeader.lines;
    gsap.set(headerLines, { yPercent: 100 });

    gsap.to(headerLines, {
      yPercent: 0,
      duration: 1.5,
      ease: "hop",
      stagger: 0.1,
      delay: 4.5, // starts after preloader finishes
    });

    return () => splitHeader.revert();
  }, []);

  // -------------------
  // THREE.JS TEXT EFFECT
  // -------------------
  useEffect(() => {
    const container = textContainerRef.current;
    if (!container) return;

    let easeFactor = 0.03;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };
    let prevMouse = { x: 0.5, y: 0.5 };

    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-1, 1, 1 / aspect, -1 / aspect, 0.1, 10);
    camera.position.z = 1;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;

      void main() {
        vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);
        vec2 mouseDirection = u_mouse - u_prevMouse;
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistance = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistance);
        vec2 uvOffset = strength * -mouseDirection * 0.3;
        vec2 uv = vUv - uvOffset;
        gl_FragColor = texture2D(u_texture, uv);
      }
    `;

    const createTextTexture = () => {
      const dpr = Math.min(window.devicePixelRatio, 3); // Increased to 3 for sharper text
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { alpha: false })!;
      
      // Set canvas size with higher DPR for sharper text
      const width = window.innerWidth;
      const height = window.innerHeight * 0.6;
      canvas.width = width * dpr * 6;
      canvas.height = height * dpr * 6;
      
      // Scale context to account for DPR
      ctx.scale(dpr * 6, dpr * 6);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Font size based on viewport width - responsive sizing
      let fontSize = width * 0.055;
      if (width >= 2560) {
        // 4K and larger monitors - smaller font to prevent cutoff
        fontSize = width * 0.035;
      } else if (width >= 1920) {
        // Full HD and 2K monitors
        fontSize = width * 0.04;
      }
      
      ctx.fillStyle = "#1a1a1a";
      ctx.font = `600 ${fontSize}px "Rejouice Headline", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Enable high-quality text rendering
      ctx.imageSmoothingEnabled = false; // Disable smoothing for crisp text
      
      // Split text into two lines
      const line1 = "CAPTURING ELEGANCE: A";
      const line2 = "BRANDS JOURNEY";
      const lineHeight = fontSize * 1.3;
      
      ctx.fillText(line1, width / 2, height / 2 - lineHeight / 2);
      ctx.fillText(line2, width / 2, height / 2 + lineHeight / 2);
      

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16; // Maximum anisotropic filtering
      return texture;
    };

    const texture = createTextTexture();

    const uniforms = {
      u_texture: { value: texture },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    
    const rendererPixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(rendererPixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight * 0.6, true);
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      mousePosition.x += (targetMouse.x - mousePosition.x) * easeFactor;
      mousePosition.y += (targetMouse.y - mousePosition.y) * easeFactor;
      uniforms.u_mouse.value.set(mousePosition.x, 1 - mousePosition.y);
      uniforms.u_prevMouse.value.set(prevMouse.x, 1 - prevMouse.y);
      renderer.render(scene, camera);
    };
    animate();

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      prevMouse = { ...targetMouse };
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = (e.clientY - rect.top) / rect.height;
    };

    const onResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      camera.top = 1 / aspectRatio;
      camera.bottom = -1 / aspectRatio;
      camera.updateProjectionMatrix();
      
      const rendererPixelRatio = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(rendererPixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight * 0.6, true);
      
      // Regenerate texture on resize for crisp text
      const newTexture = createTextTexture();
      uniforms.u_texture.value.dispose();
      uniforms.u_texture.value = newTexture;
    };

    container.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      uniforms.u_texture.value.dispose();
      material.dispose();
      plane.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  // -------------------
  // MARKUP
  // -------------------
  return (
    <section className="hero">
      {/* --- PRE NAVBAR --- */}
      <PreNavbar />

      {/* --- HERO CONTENT --- */}
      <div className="hero-content">
        <div
          className="header-row"
          style={{ 
            position: "relative", 
            width: "100%", 
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h1 ref={headerRef} style={{ visibility: 'hidden', position: 'absolute' }}>
            CAPTURING ELEGANCE: A<br />
            BRANDS JOURNEY
          </h1>
          <div ref={textContainerRef} id="textContainer" style={{ 
            width: "100%", 
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }} />
        </div>

        <p className="mt-6">
          A visual storyteller crafting powerful brand narratives through strategy, design, and
          digital innovation.
        </p>

        {/* --- SCROLL INDICATOR --- */}
        <div className="scroll-indicator">
          <span className="scroll-text">scroll down</span>
          <div className="scroll-arrows">
            <div className="arrow">↓</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
