import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  
  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });
  const dotElRef = useRef<HTMLDivElement | null>(null);
  const auraElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if touch device or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    let animationFrameId: number;
    const updateTrail = () => {
      const targetX = posRef.current.x;
      const targetY = posRef.current.y;

      trailRef.current.x += (targetX - trailRef.current.x) * 0.25;
      trailRef.current.y += (targetY - trailRef.current.y) * 0.25;

      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${targetX - 4}px, ${targetY - 4}px, 0) scale(${isHovered ? 2.5 : 1})`;
      }

      if (auraElRef.current) {
        const offset = isHovered ? 24 : 16;
        auraElRef.current.style.transform = `translate3d(${trailRef.current.x - offset}px, ${trailRef.current.y - offset}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  if (isTouch) return null;

  return (
    <>
      {/* Primary Dot */}
      <div
        ref={dotElRef}
        className="fixed top-0 left-0 w-2 h-2 bg-purple-400 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      />
      {/* Smooth Trailing Aura */}
      <div
        ref={auraElRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 border will-change-transform ${
          isHovered
            ? 'w-12 h-12 border-purple-400/80 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
            : 'w-8 h-8 border-cyan-400/40 bg-transparent'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      />
    </>
  );
};
