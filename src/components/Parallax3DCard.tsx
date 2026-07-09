'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion';

interface Parallax3DCardProps {
  children: React.ReactNode;
  className?: string;
  /** Active hover tilt effect */
  enableHoverTilt?: boolean;
}

export default function Parallax3DCard({
  children,
  className = '',
  enableHoverTilt = true,
}: Parallax3DCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // ─── 1. Scroll-driven target values ───
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scroll transparency mapping
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.7, 1, 1, 0.7]);

  // ─── 2. Combined Motion Values (Targets) ───
  const targetRotateX = useMotionValue(0);
  const targetRotateY = useMotionValue(0);
  const targetTranslateY = useMotionValue(0);
  const targetScale = useMotionValue(1);

  // Synchronize target values on scroll events (only if not currently hovered)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!isHovered) {
      // Map scroll progress [0, 0.5, 1] to rotateX [15, 0, -15]
      const rX = 15 - latest * 30;
      targetRotateX.set(rX);

      // Map scroll progress [0, 0.5, 1] to translateY [30, 0, -30]
      const tY = 30 - latest * 60;
      targetTranslateY.set(tY);
      
      targetRotateY.set(0);
      targetScale.set(1);
    }
  });

  // ─── 3. Mouse Hover Handlers ───
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableHoverTilt || !containerRef.current) return;
    setIsHovered(true);

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to card center (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Set interactive 3D coordinates
    targetRotateY.set(relativeX * 15); // Max 7.5 deg tilt
    targetRotateX.set(relativeY * -15);
    targetTranslateY.set(0);
    targetScale.set(1.02);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetRotateX.set(0);
    targetRotateY.set(0);
    targetTranslateY.set(0);
    targetScale.set(1);
  };

  // ─── 4. Spring Smoothing configuration ───
  const springConfig = { stiffness: 120, damping: 25, mass: 0.5 };
  
  const finalRotateX = useSpring(targetRotateX, springConfig);
  const finalRotateY = useSpring(targetRotateY, springConfig);
  const finalTranslateY = useSpring(targetTranslateY, springConfig);
  const finalScale = useSpring(targetScale, springConfig);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`perspective-[1200px] select-none ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX: finalRotateX,
          rotateY: finalRotateY,
          y: finalTranslateY,
          scale: finalScale,
          opacity: scrollOpacity,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full duration-75 ease-out"
      >
        {children}
      </motion.div>
    </div>
  );
}
