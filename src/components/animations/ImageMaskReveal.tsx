import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageMaskRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left-to-right' | 'bottom-to-top' | 'center-out';
}

export const ImageMaskReveal: React.FC<ImageMaskRevealProps> = ({
  children,
  className = '',
  direction = 'bottom-to-top',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;

    let initialClip = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
    if (direction === 'left-to-right') {
      initialClip = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
    } else if (direction === 'center-out') {
      initialClip = 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)';
    }

    const finalClip = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          clipPath: initialClip,
        },
        {
          clipPath: finalClip,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        innerRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={containerRef} className={`overflow-hidden will-change-[clip-path] ${className}`}>
      <div ref={innerRef} className="w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
};
