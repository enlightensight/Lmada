'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

interface Point {
  x: number;
  y: number;
}

interface RungData {
  id: string;
  t: number;
  s1: Point;
  s2: Point;
  center: Point;
  color1: string;
  color2: string;
}

// Cubic bezier curve evaluation
function cubicBezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
}

// Cubic bezier derivative (tangent vector)
function cubicBezierDerivative(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: 3 * mt * mt * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x),
    y: 3 * mt * mt * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y),
  };
}

// Convert sampled points into a continuous smooth cubic bezier SVG path
function pointsToPath(pts: Point[]): string {
  if (pts.length === 0) return '';
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 >= pts.length ? pts.length - 1 : i + 2];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

// Individual DNA Base-Pair Rung that reveals and lights up on scroll
function DnaRungItem({ rung, progress }: { rung: RungData; progress: MotionValue<number> }) {
  // Reveal when scroll progress approaches rung's t position
  const opacity = useTransform(
    progress,
    [Math.max(0, rung.t - 0.08), Math.min(1, rung.t + 0.02)],
    [0, 0.72]
  );
  const scale = useTransform(
    progress,
    [Math.max(0, rung.t - 0.08), Math.min(1, rung.t + 0.02)],
    [0.2, 1]
  );

  return (
    <motion.g style={{ opacity, scale, originX: `${rung.center.x}px`, originY: `${rung.center.y}px` }}>
      {/* Base pair connector rung (Hydrogen bond bridge) */}
      <line
        x1={rung.s1.x}
        y1={rung.s1.y}
        x2={rung.s2.x}
        y2={rung.s2.y}
        stroke="url(#rungGradient)"
        strokeWidth="1.5"
        strokeDasharray="3 2"
        strokeLinecap="round"
      />

      {/* Nucleotide node A (Cyan) */}
      <circle
        cx={rung.s1.x}
        cy={rung.s1.y}
        r="3.5"
        fill="#00aeef"
        filter="url(#cyanGlow)"
        stroke="#ffffff"
        strokeWidth="1"
      />

      {/* Nucleotide node B (Orange) */}
      <circle
        cx={rung.s2.x}
        cy={rung.s2.y}
        r="3.5"
        fill="#f58634"
        filter="url(#orangeGlow)"
        stroke="#ffffff"
        strokeWidth="1"
      />

      {/* Central hydrogen bond nexus node */}
      <circle
        cx={rung.center.x}
        cy={rung.center.y}
        r="1.8"
        fill="#94a3b8"
        opacity="0.85"
      />
    </motion.g>
  );
}

export default function DnaScrollBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end 30%'],
  });

  // Smooth out drawing animation with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate DNA geometry matching the user's crossing X trajectories
  const { helix1A, helix1B, helix2A, helix2B, rungs1, rungs2 } = useMemo(() => {
    // Trajectory 1: Top-Left to Bottom-Right (as drawn by user)
    const P0 = { x: 50, y: 20 };
    const P1 = { x: 440, y: 240 };
    const P2 = { x: 1000, y: 640 };
    const P3 = { x: 1390, y: 880 };

    // Trajectory 2: Top-Right to Bottom-Left (as drawn by user)
    const Q0 = { x: 1390, y: 20 };
    const Q1 = { x: 1000, y: 240 };
    const Q2 = { x: 440, y: 640 };
    const Q3 = { x: 50, y: 880 };

    const N_POINTS = 64;
    const N_RUNGS = 26;
    const AMPLITUDE = 26; // Width of double helix ladder
    const NUM_TURNS = 4.2; // Number of helical twist cycles

    const pts1A: Point[] = [];
    const pts1B: Point[] = [];
    const pts2A: Point[] = [];
    const pts2B: Point[] = [];

    const rungsArr1: RungData[] = [];
    const rungsArr2: RungData[] = [];

    // Sample Helix 1 points
    for (let i = 0; i <= N_POINTS; i++) {
      const t = i / N_POINTS;
      const c = cubicBezier(P0, P1, P2, P3, t);
      const d = cubicBezierDerivative(P0, P1, P2, P3, t);
      const len = Math.hypot(d.x, d.y) || 1;
      const nx = -d.y / len;
      const ny = d.x / len;
      const phi = t * (NUM_TURNS * 2 * Math.PI);

      const s1 = { x: c.x + nx * AMPLITUDE * Math.sin(phi), y: c.y + ny * AMPLITUDE * Math.sin(phi) };
      const s2 = { x: c.x - nx * AMPLITUDE * Math.sin(phi), y: c.y - ny * AMPLITUDE * Math.sin(phi) };

      pts1A.push(s1);
      pts1B.push(s2);
    }

    // Sample Helix 2 points
    for (let i = 0; i <= N_POINTS; i++) {
      const t = i / N_POINTS;
      const c = cubicBezier(Q0, Q1, Q2, Q3, t);
      const d = cubicBezierDerivative(Q0, Q1, Q2, Q3, t);
      const len = Math.hypot(d.x, d.y) || 1;
      const nx = -d.y / len;
      const ny = d.x / len;
      // Inverted phase for dynamic visual contrast at crossover
      const phi = t * (NUM_TURNS * 2 * Math.PI) + Math.PI * 0.4;

      const s1 = { x: c.x + nx * AMPLITUDE * Math.sin(phi), y: c.y + ny * AMPLITUDE * Math.sin(phi) };
      const s2 = { x: c.x - nx * AMPLITUDE * Math.sin(phi), y: c.y - ny * AMPLITUDE * Math.sin(phi) };

      pts2A.push(s1);
      pts2B.push(s2);
    }

    // Generate Base-Pair Rungs for Helix 1
    for (let j = 1; j <= N_RUNGS; j++) {
      const t = j / (N_RUNGS + 1);
      const c = cubicBezier(P0, P1, P2, P3, t);
      const d = cubicBezierDerivative(P0, P1, P2, P3, t);
      const len = Math.hypot(d.x, d.y) || 1;
      const nx = -d.y / len;
      const ny = d.x / len;
      const phi = t * (NUM_TURNS * 2 * Math.PI);

      const s1 = { x: c.x + nx * AMPLITUDE * Math.sin(phi), y: c.y + ny * AMPLITUDE * Math.sin(phi) };
      const s2 = { x: c.x - nx * AMPLITUDE * Math.sin(phi), y: c.y - ny * AMPLITUDE * Math.sin(phi) };

      rungsArr1.push({
        id: `h1-${j}`,
        t,
        s1,
        s2,
        center: c,
        color1: '#00aeef',
        color2: '#f58634',
      });
    }

    // Generate Base-Pair Rungs for Helix 2
    for (let j = 1; j <= N_RUNGS; j++) {
      const t = j / (N_RUNGS + 1);
      const c = cubicBezier(Q0, Q1, Q2, Q3, t);
      const d = cubicBezierDerivative(Q0, Q1, Q2, Q3, t);
      const len = Math.hypot(d.x, d.y) || 1;
      const nx = -d.y / len;
      const ny = d.x / len;
      const phi = t * (NUM_TURNS * 2 * Math.PI) + Math.PI * 0.4;

      const s1 = { x: c.x + nx * AMPLITUDE * Math.sin(phi), y: c.y + ny * AMPLITUDE * Math.sin(phi) };
      const s2 = { x: c.x - nx * AMPLITUDE * Math.sin(phi), y: c.y - ny * AMPLITUDE * Math.sin(phi) };

      rungsArr2.push({
        id: `h2-${j}`,
        t,
        s1,
        s2,
        center: c,
        color1: '#00aeef',
        color2: '#f58634',
      });
    }

    return {
      helix1A: pointsToPath(pts1A),
      helix1B: pointsToPath(pts1B),
      helix2A: pointsToPath(pts2A),
      helix2B: pointsToPath(pts2B),
      rungs1: rungsArr1,
      rungs2: rungsArr2,
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-[0.42] transition-opacity duration-700"
      >
        <defs>
          {/* Luminous Glow Filters */}
          <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="orangeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients */}
          <linearGradient id="cyanStrandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00aeef" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00aeef" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="orangeStrandGradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f58634" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fb923c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f58634" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="rungGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00aeef" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f58634" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* 1. Base-pair Rungs for Helix 1 */}
        {rungs1.map((rung) => (
          <DnaRungItem key={rung.id} rung={rung} progress={smoothProgress} />
        ))}

        {/* 2. Base-pair Rungs for Helix 2 */}
        {rungs2.map((rung) => (
          <DnaRungItem key={rung.id} rung={rung} progress={smoothProgress} />
        ))}

        {/* 3. Helix 1 Strands (Top-Left to Bottom-Right) */}
        {/* Strand 1A: Cyan Primary Backbone */}
        <motion.path
          d={helix1A}
          fill="none"
          stroke="url(#cyanStrandGradient)"
          strokeWidth="2.4"
          strokeLinecap="round"
          filter="url(#cyanGlow)"
          style={{ pathLength: smoothProgress }}
        />

        {/* Strand 1B: Orange Complementary Backbone */}
        <motion.path
          d={helix1B}
          fill="none"
          stroke="url(#orangeStrandGradient)"
          strokeWidth="2.4"
          strokeLinecap="round"
          filter="url(#orangeGlow)"
          style={{ pathLength: smoothProgress }}
        />

        {/* 4. Helix 2 Strands (Top-Right to Bottom-Left) */}
        {/* Strand 2A: Cyan Primary Backbone */}
        <motion.path
          d={helix2A}
          fill="none"
          stroke="url(#cyanStrandGradient)"
          strokeWidth="2.4"
          strokeLinecap="round"
          filter="url(#cyanGlow)"
          style={{ pathLength: smoothProgress }}
        />

        {/* Strand 2B: Orange Complementary Backbone */}
        <motion.path
          d={helix2B}
          fill="none"
          stroke="url(#orangeStrandGradient)"
          strokeWidth="2.4"
          strokeLinecap="round"
          filter="url(#orangeGlow)"
          style={{ pathLength: smoothProgress }}
        />

        {/* 5. Central Nexus Halo at Intersection Crossover (x: 720, y: 440) */}
        <g transform="translate(720, 440)">
          <circle cx="0" cy="0" r="45" fill="#00aeef" opacity="0.04" />
          <circle cx="0" cy="0" r="24" fill="#f58634" opacity="0.06" />
          <circle cx="0" cy="0" r="8" fill="none" stroke="#00aeef" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
