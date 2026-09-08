'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Sparkles, CheckCircle2, FlaskConical, Target, Activity } from 'lucide-react';

const STAGES = [
  {
    id: 1,
    title: 'Transfection & Gene Delivery',
    subtitle: 'High-efficiency vector delivery into CHO host cell line',
    tag: 'Stage 01',
    metric: 'Transfection Efficiency: >94%',
  },
  {
    id: 2,
    title: 'Single-Cell Deposition & Imaging',
    subtitle: 'Verified single-cell isolation with monoclonality proof',
    tag: 'Stage 02',
    metric: 'Monoclonality Proof: >99.9%',
  },
  {
    id: 3,
    title: 'High-Titer Clone Selection',
    subtitle: 'Screening top producers for robust growth and critical quality attributes',
    tag: 'Stage 03',
    metric: 'Titer Yield: 4.8 - 8.5 g/L',
  },
  {
    id: 4,
    title: 'Research & Master Cell Bank',
    subtitle: 'Cryopreservation and genetic stability testing across 60+ generations',
    tag: 'Stage 04',
    metric: 'Stability: 60+ Generations',
  },
];

export default function CellLineHeroAnimation() {
  const [activeStage, setActiveStage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative w-full aspect-[4/3] min-h-[380px] bg-white rounded-[14px] border border-neutral-200/90 shadow-lg overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Micro Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0f2231_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Top Header & Live Telemetry Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00aeef] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800">
            Cell Line Engineering Platform
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/20 text-[#00aeef] text-[10px] font-semibold tracking-wide">
          <Sparkles className="w-3 h-3 text-[#f58634]" />
          <span>CHO-K1 / CHO-S</span>
        </div>
      </div>

      {/* Center Animated Microscopic Stage */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center">
        <svg viewBox="0 0 420 220" className="w-full h-full max-h-[190px]" fill="none">
          <defs>
            {/* Radial Glow Gradient */}
            <radialGradient id="dishGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00aeef" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00aeef" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00aeef" />
              <stop offset="100%" stopColor="#f58634" />
            </linearGradient>
          </defs>

          {/* Microscopic Field Rim (Petri Dish / Flow Chamber) */}
          <circle cx="210" cy="110" r="96" fill="url(#dishGlow)" stroke="#00aeef" strokeWidth="2" strokeDasharray="6 3" opacity="0.6" />
          <circle cx="210" cy="110" r="82" fill="#f8fcff" stroke="#00aeef" strokeWidth="1.5" />

          {/* Optical Reticle Crosshairs */}
          <line x1="210" y1="20" x2="210" y2="44" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="210" y1="176" x2="210" y2="200" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="120" y1="110" x2="144" y2="110" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="276" y1="110" x2="300" y2="110" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* STAGE 1: DNA Vector Plasmid & Delivery */}
          {activeStage === 1 && (
            <g>
              {/* DNA Double Helix Strands */}
              <motion.path
                d="M 60 70 Q 80 50 100 70 T 140 70 T 180 70"
                stroke="url(#dnaGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                animate={{ pathOffset: [0, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              />
              <motion.path
                d="M 60 70 Q 80 90 100 70 T 140 70 T 180 70"
                stroke="#00aeef"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{ pathOffset: [1, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              />

              {/* Transfection Particles Moving into Host Cell */}
              {[
                { cx: 130, cy: 95, delay: 0.1 },
                { cx: 155, cy: 80, delay: 0.3 },
                { cx: 145, cy: 125, delay: 0.5 },
                { cx: 170, cy: 110, delay: 0.7 },
              ].map((dot, idx) => (
                <motion.circle
                  key={idx}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="3.5"
                  fill="#f58634"
                  animate={{
                    cx: [dot.cx, dot.cx + 40, dot.cx],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.3, 0.8],
                  }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: dot.delay }}
                />
              ))}

              {/* Host Cell Nucleus Receiving Genetic Construct */}
              <motion.circle
                cx="210"
                cy="110"
                r="38"
                fill="#e0f2fe"
                stroke="#00aeef"
                strokeWidth="3"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              <circle cx="210" cy="110" r="18" fill="#00aeef" fillOpacity="0.85" />
              <motion.circle
                cx="210"
                cy="110"
                r="7"
                fill="#f58634"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              />
            </g>
          )}

          {/* STAGE 2: Single-Cell Deposition & Isolation */}
          {activeStage === 2 && (
            <g>
              {/* 96-Well Microplate Grid Overlay */}
              {[150, 190, 230, 270].map((x, i) =>
                [60, 100, 140].map((y, j) => (
                  <circle
                    key={`${i}-${j}`}
                    cx={x}
                    cy={y}
                    r="15"
                    stroke="#00aeef"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    fill={x === 230 && y === 100 ? '#e0f2fe' : '#ffffff'}
                  />
                ))
              )}

              {/* Isolated Monoclonal Cell in Target Well */}
              <motion.circle
                cx="230"
                cy="100"
                r="11"
                fill="#00aeef"
                stroke="#0099d0"
                strokeWidth="2.5"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
              <circle cx="230" cy="100" r="5" fill="#0f2231" />
              <motion.circle
                cx="230"
                cy="100"
                r="17"
                stroke="#f58634"
                strokeWidth="2"
                strokeDasharray="4 2"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                fill="none"
              />

              {/* Target Crosshair */}
              <motion.g animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <line x1="210" y1="100" x2="220" y2="100" stroke="#f58634" strokeWidth="2" />
                <line x1="240" y1="100" x2="250" y2="100" stroke="#f58634" strokeWidth="2" />
                <line x1="230" y1="80" x2="230" y2="90" stroke="#f58634" strokeWidth="2" />
                <line x1="230" y1="110" x2="230" y2="120" stroke="#f58634" strokeWidth="2" />
              </motion.g>
            </g>
          )}

          {/* STAGE 3: High-Titer Clonal Outgrowth */}
          {activeStage === 3 && (
            <g>
              {/* Central Robust Colony */}
              <motion.circle
                cx="210"
                cy="110"
                r="18"
                fill="#00aeef"
                stroke="#0099d0"
                strokeWidth="2"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              />
              <circle cx="210" cy="110" r="8" fill="#0f2231" />

              {/* Surrounding Dividing Cells (High-Titer Expression) */}
              {[
                { cx: 185, cy: 92, r: 12, fill: '#00aeef', delay: 0 },
                { cx: 235, cy: 95, r: 13, fill: '#00aeef', delay: 0.2 },
                { cx: 190, cy: 130, r: 12, fill: '#00aeef', delay: 0.4 },
                { cx: 232, cy: 128, r: 13, fill: '#00aeef', delay: 0.6 },
                { cx: 210, cy: 75, r: 11, fill: '#f58634', delay: 0.3 }, // High producer marker
                { cx: 210, cy: 145, r: 11, fill: '#f58634', delay: 0.5 }, // High producer marker
              ].map((cell, idx) => (
                <motion.g
                  key={idx}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ repeat: Infinity, duration: 2, delay: cell.delay }}
                >
                  <circle cx={cell.cx} cy={cell.cy} r={cell.r} fill={cell.fill} stroke="#0f2231" strokeWidth="1.5" />
                  <circle cx={cell.cx} cy={cell.cy} r={cell.r * 0.4} fill="#ffffff" />
                </motion.g>
              ))}

              {/* Secreted Monoclonal Antibody Molecules (Pulsing Orbit) */}
              {[
                { cx: 160, cy: 70 },
                { cx: 260, cy: 75 },
                { cx: 160, cy: 150 },
                { cx: 260, cy: 145 },
              ].map((dot, idx) => (
                <motion.path
                  key={idx}
                  d={`M ${dot.cx} ${dot.cy} l 4 6 l 4 -6 M ${dot.cx + 4} ${dot.cy + 6} v 6`}
                  stroke="#f58634"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ y: [-2, 2, -2], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.2 }}
                />
              ))}
            </g>
          )}

          {/* STAGE 4: Research Cell Bank & Cryopreservation */}
          {activeStage === 4 && (
            <g>
              {/* Cryovial 1 */}
              <g transform="translate(160, 60)">
                <rect x="10" y="0" width="24" height="10" rx="2" fill="#f58634" />
                <rect x="14" y="10" width="16" height="60" rx="3" fill="#e0f2fe" stroke="#00aeef" strokeWidth="2" />
                <rect x="16" y="25" width="12" height="42" rx="2" fill="#00aeef" fillOpacity="0.75" />
                <line x1="22" y1="35" x2="28" y2="35" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="22" y1="45" x2="28" y2="45" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="22" y1="55" x2="28" y2="55" stroke="#ffffff" strokeWidth="1.5" />
              </g>

              {/* Cryovial 2 (Primary Master Bank) */}
              <g transform="translate(210, 50)">
                <rect x="10" y="0" width="28" height="12" rx="2" fill="#00aeef" />
                <rect x="14" y="12" width="20" height="72" rx="4" fill="#f8fcff" stroke="#00aeef" strokeWidth="2.5" />
                <rect x="16.5" y="28" width="15" height="52" rx="2" fill="#00aeef" fillOpacity="0.85" />
                {/* Cryo Frost / Cold Particle Effect */}
                <motion.circle
                  cx="24"
                  cy="45"
                  r="2"
                  fill="#ffffff"
                  animate={{ y: [-2, -6, -2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <motion.circle
                  cx="26"
                  cy="60"
                  r="2.5"
                  fill="#ffffff"
                  animate={{ y: [-2, -8, -2] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
                />
              </g>

              {/* Stability Verification Checkmark Badge */}
              <motion.g
                transform="translate(270, 110)"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <circle cx="16" cy="16" r="16" fill="#f58634" />
                <path d="M 10 16 L 14 20 L 22 11" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>
            </g>
          )}
        </svg>
      </div>

      {/* Active Stage Description & Real-Time Performance Metric */}
      <div className="relative z-10 bg-neutral-50/90 rounded-[10px] p-3 border border-neutral-200/70 mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold text-[#f58634] tracking-wider">
            {STAGES[activeStage - 1].tag}
          </span>
          <span className="text-[11px] font-bold text-[#00aeef]">
            {STAGES[activeStage - 1].metric}
          </span>
        </div>
        <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-tight">
          {STAGES[activeStage - 1].title}
        </h4>
        <p className="text-[11px] text-neutral-600 leading-normal mt-0.5">
          {STAGES[activeStage - 1].subtitle}
        </p>
      </div>

      {/* Interactive 4-Step Progress Navigation Dots */}
      <div className="relative z-10 grid grid-cols-4 gap-1.5 pt-1 border-t border-neutral-100">
        {STAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={`py-1.5 px-1 rounded-[6px] text-center transition-all cursor-pointer ${
              activeStage === s.id
                ? 'bg-[#00aeef] text-white font-semibold shadow-xs'
                : 'bg-neutral-100/70 hover:bg-neutral-200/70 text-neutral-600 text-[10px]'
            }`}
          >
            <span className="text-[10px] tracking-tight truncate block">
              {s.id}. {s.title.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
