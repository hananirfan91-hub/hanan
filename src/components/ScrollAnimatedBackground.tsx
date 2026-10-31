import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react';

const DEFAULT_WORKSPACE_WEBP = '/abdul-hanan-irfan-developer-workspace-bg.webp';
const DEFAULT_WORKSPACE_FALLBACK = '/assets/aistudio/Cinematic_Greenlit_Developer_Workspace_c5162921.png';

interface ScrollAnimatedBackgroundProps {
  customImage?: string;
}

export const ScrollAnimatedBackground: React.FC<ScrollAnimatedBackgroundProps> = ({
  customImage
}) => {
  const finalImage = customImage || DEFAULT_WORKSPACE_WEBP;

  // Mouse tilt tracking for subtle 3D parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  // Framer Motion Scroll hooks
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.001 });

  // Deep scroll transforms: smooth zoom, vertical parallax, subtle 3D rotational tilt
  const bgScale = useTransform(smoothProgress, [0, 0.5, 1], [1.02, 1.10, 1.20]);
  const bgTranslateY = useTransform(smoothProgress, [0, 1], [0, -75]);
  const bgRotate = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.6, -0.8]);
  const haloRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const glowPulse = useTransform(smoothProgress, [0, 0.5, 1], [0.6, 0.85, 1.0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 16);
      mouseY.set((e.clientY / innerHeight - 0.5) * 16);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#07080c]" />

      {/* 2. Main Full-Screen Animated Background Container */}
      <motion.div
        style={{
          scale: bgScale,
          y: bgTranslateY,
          rotate: bgRotate,
          x: smoothMouseX,
        }}
        className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
      >
        {/* Full-Screen Master Background Image with High Clarity */}
        <div className="absolute inset-0 w-full h-full">
          <picture className="block w-full h-full">
            {!customImage && (
              <source srcSet={DEFAULT_WORKSPACE_WEBP} type="image/webp" />
            )}
            <img
              src={finalImage}
              alt="Abdul Hanan Irfan Personal Developer Workspace Background"
              width={1774}
              height={887}
              decoding="async"
              style={{ opacity: 0.95 }}
              className="w-full h-full object-cover object-[64%_35%] sm:object-[58%_35%] lg:object-[50%_35%] transition-opacity duration-700"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.endsWith(DEFAULT_WORKSPACE_FALLBACK)) {
                  target.src = DEFAULT_WORKSPACE_FALLBACK;
                }
              }}
            />
          </picture>
        </div>
      </motion.div>

      {/* 3. Deep Scroll Reactive Rotating Ambient Energy Rings */}
      <motion.div
        style={{
          rotate: haloRotate,
          opacity: glowPulse
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1200px] h-[800px] sm:h-[1200px] rounded-full pointer-events-none border border-cyan-400/12 will-change-transform"
      >
        <div className="absolute inset-16 rounded-full border border-dashed border-purple-500/15 animate-spin" style={{ animationDuration: '60s' }} />
        <div className="absolute inset-32 rounded-full border border-emerald-400/12" />
      </motion.div>

      {/* 4. Ambient Colored Glow Blooms */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)'
        }}
      />
      <div
        className="absolute bottom-1/4 left-10 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)'
        }}
      />

      {/* 5. Minimal Vignette & Dark Shading for Text Legibility */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{
          backgroundColor: 'rgba(7, 8, 12, 0.18)',
          backgroundImage: 'radial-gradient(circle at 50% 40%, transparent 0%, rgba(7, 8, 12, 0.22) 60%, rgba(7, 8, 12, 0.65) 100%)'
        }}
      />

      {/* Top & Bottom Soft Gradient Fades */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#07080c]/80 via-[#07080c]/25 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#07080c]/85 via-[#07080c]/35 to-transparent pointer-events-none" />
    </div>
  );
};
