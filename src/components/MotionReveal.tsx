import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export function useRevealObserver(threshold = 0.08, rootMargin = '0px 0px -32px 0px') {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return true;
    }
    return Boolean(shouldReduceMotion);
  });

  useEffect(() => {
    if (shouldReduceMotion || isVisible) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, shouldReduceMotion, threshold, rootMargin]);

  return { ref, isVisible };
}

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  threshold?: number;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 20,
  threshold = 0.08,
}) => {
  const { ref, isVisible } = useRevealObserver(threshold);

  return (
    <div
      ref={ref}
      style={
        {
          '--reveal-y': `${yOffset}px`,
          transitionDelay: delay > 0 ? `${Math.round(delay * 1000)}ms` : undefined,
        } as React.CSSProperties
      }
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const RevealSection = MotionReveal;

interface AnimatedStatProps {
  target: number;
  decimals?: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({
  target,
  decimals = 0,
  suffix = '',
  durationMs = 950,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>(() => target.toFixed(decimals));

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldReduceMotion || typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!hasEntered || shouldReduceMotion) {
      setDisplayValue(target.toFixed(decimals));
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplayValue(current.toFixed(decimals));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setDisplayValue(target.toFixed(decimals));
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [hasEntered, shouldReduceMotion, target, decimals, durationMs]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {displayValue}
      {suffix}
    </span>
  );
};
