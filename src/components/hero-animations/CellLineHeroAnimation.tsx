'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Dna, CheckCircle2, FlaskConical, Target, ShieldCheck } from 'lucide-react';

const STAGES = [
  {
    id: 1,
    title: 'Transfection & Gene Delivery',
    subtitle: 'High-efficiency plasmid vector delivery into CHO host cell lines',
    tag: 'Stage 01',
    metric: 'Transfection Efficiency: >94%',
    shortName: '1. Transfection',
  },
  {
    id: 2,
    title: 'Single-Cell Deposition & Imaging',
    subtitle: 'Verified single-cell isolation with monoclonality proof for regulatory filings',
    tag: 'Stage 02',
    metric: 'Monoclonality: >99.9%',
    shortName: '2. Single-Cell',
  },
  {
    id: 3,
    title: 'High-Titer Clone Selection',
    subtitle: 'Screening top clonal producers for robust cell growth and target quality attributes',
    tag: 'Stage 03',
    metric: 'Titer Yield: 4.8 - 8.5 g/L',
    shortName: '3. Clone Selection',
  },
  {
    id: 4,
    title: 'Master Cell Bank Cryopreservation',
    subtitle: 'Establishment of cGMP Master Cell Bank with 60+ generations genetic stability',
    tag: 'Stage 04',
    metric: 'Stability: 60+ Generations',
    shortName: '4. Cell Banking',
  },
];

export default function CellLineHeroAnimation() {
  const [activeStage, setActiveStage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative w-full min-h-[460px] lg:min-h-[500px] bg-white rounded-[16px] border border-neutral-200/90 shadow-xl overflow-hidden flex flex-col justify-between p-5 sm:p-7 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Micro Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#0f2231_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Top Header & Live Telemetry Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-[#00aeef] animate-pulse" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
            Cell Line Engineering Platform
          </span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/25 text-[#00aeef] text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#f58634]" />
          <span>CHO-K1 / CHO-S Expression</span>
        </div>
      </div>

      {/* Center Animated Microscopic Stage (Scaled Up & Prominent) */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center min-h-[220px]">
        <svg viewBox="0 0 440 240" className="w-full h-full max-h-[230px]" fill="none">
          <defs>
            <radialGradient id="dishGlowLarge" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00aeef" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00aeef" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="dnaGradLarge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00aeef" />
              <stop offset="100%" stopColor="#f58634" />
            </linearGradient>
          </defs>

          {/* Microscopic Field Rim */}
          <circle cx="220" cy="120" r="108" fill="url(#dishGlowLarge)" stroke="#00aeef" strokeWidth="2.5" strokeDasharray="8 4" opacity="0.7" />
          <circle cx="220" cy="120" r="94" fill="#f8fcff" stroke="#00aeef" strokeWidth="2" />

          {/* Optical Reticle Crosshairs */}
          <line x1="220" y1="14" x2="220" y2="42" stroke="#00aeef" strokeWidth="2" strokeOpacity="0.5" />
          <line x1="220" y1="198" x2="220" y2="226" stroke="#00aeef" strokeWidth="2" strokeOpacity="0.5" />
          <line x1="114" y1="120" x2="142" y2="120" stroke="#00aeef" strokeWidth="2" strokeOpacity="0.5" />
          <line x1="298" y1="120" x2="326" y2="120" stroke="#00aeef" strokeWidth="2" strokeOpacity="0.5" />

          {/* STAGE 1: DNA Vector Plasmid & Delivery */}
          {activeStage === 1 && (
            <g>
              {/* DNA Double Helix Strands */}
              <motion.path
                d="M 50 80 Q 75 55 100 80 T 150 80 T 200 80"
                stroke="url(#dnaGradLarge)"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
                animate={{ pathOffset: [0, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
              />
              <motion.path
                d="M 50 80 Q 75 105 100 80 T 150 80 T 200 80"
                stroke="#00aeef"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                animate={{ pathOffset: [1, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
              />

              {/* Transfection Particles Moving into Host Cell */}
              {[
                { cx: 135, cy: 105, delay: 0.1 },
                { cx: 165, cy: 88, delay: 0.3 },
                { cx: 150, cy: 138, delay: 0.5 },
                { cx: 180, cy: 120, delay: 0.7 },
              ].map((dot, idx) => (
                <motion.circle
                  key={idx}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="4.5"
                  fill="#f58634"
                  animate={{
                    cx: [dot.cx, dot.cx + 45, dot.cx],
                    opacity: [0.4, 1, 0.4],
                    scale: [0.9, 1.4, 0.9],
                  }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: dot.delay }}
                />
              ))}

              {/* Host Cell Nucleus Receiving Genetic Construct */}
              <motion.circle
                cx="220"
                cy="120"
                r="45"
                fill="#e0f2fe"
                stroke="#00aeef"
                strokeWidth="3.5"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              <circle cx="220" cy="120" r="22" fill="#00aeef" fillOpacity="0.9" />
              <motion.circle
                cx="220"
                cy="120"
                r="9"
                fill="#f58634"
                animate={{ scale: [1, 1.45, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              />
            </g>
          )}

          {/* STAGE 2: Single-Cell Deposition & Isolation */}
          {activeStage === 2 && (
            <g>
              {/* 96-Well Microplate Grid Overlay */}
              {[150, 195, 245, 290].map((x, i) =>
                [65, 120, 175].map((y, j) => (
                  <circle
                    key={`${i}-${j}`}
                    cx={x}
                    cy={y}
                    r="18"
                    stroke="#00aeef"
                    strokeWidth="1.5"
                    strokeOpacity="0.35"
                    fill={x === 245 && y === 120 ? '#e0f2fe' : '#ffffff'}
                  />
                ))
              )}

              {/* Isolated Monoclonal Cell in Target Well */}
              <motion.circle
                cx="245"
                cy="120"
                r="14"
                fill="#00aeef"
                stroke="#0099d0"
                strokeWidth="3"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
              <circle cx="245" cy="120" r="6.5" fill="#0f2231" />
              <motion.circle
                cx="245"
                cy="120"
                r="22"
                stroke="#f58634"
                strokeWidth="2.5"
                strokeDasharray="5 3"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                fill="none"
              />

              {/* Target Crosshair */}
              <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <line x1="220" y1="120" x2="233" y2="120" stroke="#f58634" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="257" y1="120" x2="270" y2="120" stroke="#f58634" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="245" y1="95" x2="245" y2="108" stroke="#f58634" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="245" y1="132" x2="245" y2="145" stroke="#f58634" strokeWidth="2.5" strokeLinecap="round" />
              </motion.g>
            </g>
          )}

          {/* STAGE 3: High-Titer Clonal Outgrowth */}
          {activeStage === 3 && (
            <g>
              {/* Central Robust Colony */}
              <motion.circle
                cx="220"
                cy="120"
                r="22"
                fill="#00aeef"
                stroke="#0099d0"
                strokeWidth="2.5"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              />
              <circle cx="220" cy="120" r="10" fill="#0f2231" />

              {/* Surrounding Dividing Cells (High-Titer Expression) */}
              {[
                { cx: 190, cy: 98, r: 15, fill: '#00aeef', delay: 0 },
                { cx: 250, cy: 102, r: 16, fill: '#00aeef', delay: 0.2 },
                { cx: 195, cy: 144, r: 15, fill: '#00aeef', delay: 0.4 },
                { cx: 248, cy: 142, r: 16, fill: '#00aeef', delay: 0.6 },
                { cx: 220, cy: 78, r: 14, fill: '#f58634', delay: 0.3 }, // High producer marker
                { cx: 220, cy: 162, r: 14, fill: '#f58634', delay: 0.5 }, // High producer marker
              ].map((cell, idx) => (
                <motion.g
                  key={idx}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ repeat: Infinity, duration: 2, delay: cell.delay }}
                >
                  <circle cx={cell.cx} cy={cell.cy} r={cell.r} fill={cell.fill} stroke="#0f2231" strokeWidth="2" />
                  <circle cx={cell.cx} cy={cell.cy} r={cell.r * 0.42} fill="#ffffff" />
                </motion.g>
              ))}

              {/* Secreted Monoclonal Antibody Molecules */}
              {[
                { cx: 160, cy: 75 },
                { cx: 280, cy: 80 },
                { cx: 160, cy: 165 },
                { cx: 280, cy: 160 },
              ].map((dot, idx) => (
                <motion.path
                  key={idx}
                  d={`M ${dot.cx} ${dot.cy} l 5 7 l 5 -7 M ${dot.cx + 5} ${dot.cy + 7} v 7`}
                  stroke="#f58634"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ y: [-3, 3, -3], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.2 }}
                />
              ))}
            </g>
          )}

          {/* STAGE 4: Research & Master Cell Bank */}
          {activeStage === 4 && (
            <g>
              {/* Cryovial 1 */}
              <g transform="translate(160, 60)">
                <rect x="10" y="0" width="28" height="12" rx="2" fill="#f58634" />
                <rect x="14" y="12" width="20" height="70" rx="4" fill="#e0f2fe" stroke="#00aeef" strokeWidth="2.5" />
                <rect x="16.5" y="30" width="15" height="50" rx="2" fill="#00aeef" fillOpacity="0.75" />
                <line x1="22" y1="42" x2="30" y2="42" stroke="#ffffff" strokeWidth="2" />
                <line x1="22" y1="54" x2="30" y2="54" stroke="#ffffff" strokeWidth="2" />
                <line x1="22" y1="66" x2="30" y2="66" stroke="#ffffff" strokeWidth="2" />
              </g>

              {/* Cryovial 2 (Primary Master Bank) */}
              <g transform="translate(220, 48)">
                <rect x="10" y="0" width="34" height="15" rx="3" fill="#00aeef" />
                <rect x="14" y="15" width="26" height="85" rx="5" fill="#f8fcff" stroke="#00aeef" strokeWidth="3" />
                <rect x="17" y="35" width="20" height="62" rx="3" fill="#00aeef" fillOpacity="0.88" />
                {/* Cryo Frost Particles */}
                <motion.circle
                  cx="27"
                  cy="55"
                  r="2.5"
                  fill="#ffffff"
                  animate={{ y: [-2, -8, -2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <motion.circle
                  cx="30"
                  cy="75"
                  r="3"
                  fill="#ffffff"
                  animate={{ y: [-2, -10, -2] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
                />
              </g>

              {/* Stability Verification Checkmark Badge */}
              <motion.g
                transform="translate(295, 115)"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <circle cx="20" cy="20" r="20" fill="#f58634" />
                <path d="M 12 20 L 18 26 L 28 14" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>
            </g>
          )}
        </svg>
      </div>

      {/* ACTIVE STAGE DESCRIPTION & PERFORMANCE METRIC (BIG & HIGH-VISIBILITY) */}
      <div className="relative z-10 bg-neutral-50/95 rounded-[12px] p-4 sm:p-5 border border-neutral-200/90 shadow-sm mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
          <span className="text-xs sm:text-sm font-bold uppercase text-[#f58634] tracking-wider">
            {STAGES[activeStage - 1].tag}
          </span>
          <span className="inline-flex items-center text-xs sm:text-sm font-bold text-[#00aeef] bg-white px-3 py-1 rounded-full border border-[#00aeef]/30 shadow-xs">
            {STAGES[activeStage - 1].metric}
          </span>
        </div>
        <h4 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 leading-snug">
          {STAGES[activeStage - 1].title}
        </h4>
        <p className="text-xs sm:text-sm md:text-base text-neutral-700 leading-relaxed mt-1">
          {STAGES[activeStage - 1].subtitle}
        </p>
      </div>

      {/* INTERACTIVE 4-STEP PROGRESS NAVIGATION BUTTONS (BIG & READABLE) */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-100">
        {STAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={`py-2.5 px-3 rounded-[10px] text-center transition-all duration-200 cursor-pointer text-xs sm:text-sm font-bold ${
              activeStage === s.id
                ? 'bg-[#00aeef] text-white shadow-md ring-2 ring-[#00aeef]/40'
                : 'bg-neutral-100/90 hover:bg-neutral-200 text-neutral-800 border border-neutral-200/80'
            }`}
          >
            <span className="truncate block">
              {s.shortName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
