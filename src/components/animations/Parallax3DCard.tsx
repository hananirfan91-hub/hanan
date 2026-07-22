import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface Parallax3DCardProps {
  children: React.ReactNode;
  className?: string;
  parallaxSpeed?: number; // e.g., -20 to 20
}

export const Parallax3DCard: React.FC<Parallax3DCardProps> = ({
  children,
  className = '',
  parallaxSpeed = 15,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxSpeed, parallaxSpeed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rY = (mouseX / (rect.width / 2)) * 8; // Max 8 deg rotation
    const rX = -(mouseY / (rect.height / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className={`perspective-1000 transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};
