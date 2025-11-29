import { useEffect, useRef, useState } from 'react';
import { useTransform, useScroll, motion } from 'framer-motion';
import '../styles/Gallery.css';

const images = [
  "DSC02139.jpg",
  "DSC02266.jpg",
  "DSC02274.jpg",
  "VUYO 2023 (31 of 31)-2.jpeg",
  "VUYO 2023-14.jpeg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

interface ColumnProps {
  images: string[];
  y: any;
}

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div className="column" style={{ y }}>
      {images.map((src, i) => (
        <div key={i} className="imageContainer">
          <img src={`/images/${src}`} alt="image" />
        </div>
      ))}
    </motion.div>
  );
};

const Gallery = () => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start 80%', 'end start']
  });

  const { height } = dimension;
  
  // Stronger parallax with increased multipliers
  const y = useTransform(scrollYProgress, [0, 1], [-height * 0.5, height * 0.5]);
  const y2 = useTransform(scrollYProgress, [0, 1], [height * 0.6, -height * 0.6]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-height * 0.4, height * 0.4]);
  const y4 = useTransform(scrollYProgress, [0, 1], [height * 0.5, -height * 0.5]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={gallery} className="gallery">
      <div className="gallery-inner">
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
    </div>
  );
};

export default Gallery;
