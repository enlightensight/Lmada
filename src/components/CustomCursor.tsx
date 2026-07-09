'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<'none' | 'hover' | 'project'>('none');
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide cursor on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for project hover
      const projectCard = target.closest('[data-cursor="project"]');
      if (projectCard) {
        setHoverState('project');
        setLabel('VIEW');
        return;
      }

      // Check for regular link/button hover
      const interactive = target.closest('a, button, [role="button"], input, select, textarea');
      if (interactive) {
        setHoverState('hover');
        return;
      }

      setHoverState('none');
      setLabel('');
    };

    window.addEventListener('mouseover', handleMouseOver);

    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black/30 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          width: hoverState === 'project' ? 64 : hoverState === 'hover' ? 40 : 24,
          height: hoverState === 'project' ? 64 : hoverState === 'hover' ? 40 : 24,
          backgroundColor: hoverState === 'project' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0)',
          borderColor: hoverState === 'project' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.3)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {hoverState === 'project' && (
          <span className="text-[10px] tracking-widest font-semibold text-black uppercase select-none">
            {label}
          </span>
        )}
      </motion.div>

      {/* Inner dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-black pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hoverState === 'project' ? 0 : hoverState === 'hover' ? 1.5 : 1,
        }}
      />
    </>
  );
}
