'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollZigzagLine() {
  const [pageHeight, setPageHeight] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure page size on mount and on resize
  useEffect(() => {
    const handleResize = () => {
      const body = document.body;
      const html = document.documentElement;
      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      setPageHeight(height);
      setPageWidth(window.innerWidth);
    };

    // Delay measurement slightly to let Next.js layout render completely
    const timeoutId = setTimeout(handleResize, 500);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  
  // Smooth out path draw progress with a highly responsive spring (exactly matching scroll position)
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (pageHeight === 0 || pageWidth === 0) return null;

  // Define zigzag curve points based on page dimensions
  const w = pageWidth;
  const h = pageHeight;
  
  // Margins from the screen edge
  const leftMargin = w > 1200 ? (w - 1200) / 2 - 40 : 40;
  const rightMargin = w > 1200 ? w - (w - 1200) / 2 + 40 : w - 40;
  const centerPos = w / 2;

  // Winding coordinates that weave through left, center, and right down the page
  const points = [
    { x: centerPos, y: 0 },
    { x: rightMargin - 40, y: h * 0.1 },
    { x: centerPos, y: h * 0.22 },
    { x: leftMargin + 40, y: h * 0.35 },
    { x: centerPos, y: h * 0.5 },
    { x: rightMargin - 40, y: h * 0.65 },
    { x: centerPos, y: h * 0.8 },
    { x: leftMargin + 40, y: h * 0.92 },
    { x: centerPos, y: h }, // Ends exactly at the bottom center of the page
  ];

  // Build SVG path using cubic Bezier curves
  let pathData = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    
    // Control points for smooth winding curves
    const cp1x = prev.x;
    const cp1y = prev.y + (curr.y - prev.y) * 0.5;
    const cp2x = curr.x;
    const cp2y = prev.y + (curr.y - prev.y) * 0.5;
    
    pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[-20]"
      style={{ height: pageHeight, width: '100%' }}
    >
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle background static guide line */}
        <path
          d={pathData}
          stroke="#009ee3"
          strokeWidth="1.5"
          strokeOpacity="0.05"
        />

        {/* Scroll-drawing active brand-blue line */}
        <motion.path
          d={pathData}
          stroke="#009ee3"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
        />

        {/* Turn point indicators alternating in brand blue/orange */}
        {points.slice(1, points.length - 1).map((pt, idx) => (
          <motion.circle
            key={idx}
            cx={pt.x}
            cy={pt.y}
            r="4.5"
            fill={idx % 2 === 0 ? "#009ee3" : "#ef7c00"}
            className="opacity-50"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
          />
        ))}
      </svg>
    </div>
  );
}
