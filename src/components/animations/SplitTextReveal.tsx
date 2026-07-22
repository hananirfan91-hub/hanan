import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  type?: 'words' | 'chars';
  stagger?: number;
  duration?: number;
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  className = '',
  as: Component = 'div',
  type = 'words',
  stagger = 0.03,
  duration = 0.8,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.split-item');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 35,
          rotateX: -60,
          transformOrigin: '0% 50% -20px',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, duration, stagger]);

  const words = text.split(' ');

  return (
    <Component ref={containerRef as any} className={`perspective-1000 ${className}`}>
      {type === 'words' ? (
        words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
            <span className="split-item inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))
      ) : (
        words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split('').map((char, charIndex) => (
              <span key={charIndex} className="split-item inline-block will-change-transform">
                {char}
              </span>
            ))}
          </span>
        ))
      )}
    </Component>
  );
};
