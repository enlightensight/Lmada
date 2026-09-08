'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Microscope, Search, ShieldCheck, Scale, LineChart, FileCheck } from 'lucide-react';

const ANALYTICAL_STAGES = [
  {
    id: 1,
    title: 'SEC-UPLC Purity & Aggregation Analysis',
    subtitle: 'High-resolution size-exclusion chromatography resolving monomer purity and high-molecular-weight species',
    tag: 'Chromatography',
    metric: 'Purity (SEC): 99.4%',
  },
  {
    id: 2,
    title: 'LC-MS/MS Intact Mass & Peptide Mapping',
    subtitle: 'High-resolution QTOF mass spectrometry confirming primary sequence identity and post-translational modifications',
    tag: 'Mass Spectrometry',
    metric: 'Mass Error: < 3.5 ppm',
  },
  {
    id: 3,
    title: 'Cell-Based Potency & Functional Bioassays',
    subtitle: 'Reporter gene and ligand-binding assays demonstrating biological activity and mechanism of action',
    tag: 'Functional Bioassay',
    metric: 'Relative Potency: 104%',
  },
  {
    id: 4,
    title: 'ICH Q2(R1) Method Validation & QC Release',
    subtitle: 'Full analytical method validation under ICH guidelines supporting IND/BLA dossier filings and cGMP release',
    tag: 'Quality Standard',
    metric: 'Compliance: ICH Q2 / 21 CFR',
  },
];

export default function AnalyticalHeroAnimation() {
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
            Orthogonal Analytical Architecture
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/20 text-[#00aeef] text-[10px] font-semibold tracking-wide">
          <ShieldCheck className="w-3 h-3 text-[#f58634]" />
          <span>ICH Q2(R1) Validated</span>
        </div>
      </div>

      {/* Center Animated High-Res Analytical Stage */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center">
        <svg viewBox="0 0 420 220" className="w-full h-full max-h-[190px]" fill="none">
          <defs>
            <linearGradient id="chromPeakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00aeef" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="impurityPeakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f58634" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* MAIN UPLC/HPLC CHROMATOGRAM DISPLAY FRAME */}
          <rect x="25" y="15" width="370" height="180" rx="6" fill="#f8fcff" stroke="#00aeef" strokeWidth="2" />
          
          {/* Internal Grid Lines */}
          {[55, 95, 135, 175].map((y, idx) => (
            <line key={`h-${idx}`} x1="35" y1={y} x2="385" y2={y} stroke="#e0f2fe" strokeWidth="1" strokeDasharray="3 3" />
          ))}
          {[75, 135, 195, 255, 315, 375].map((x, idx) => (
            <line key={`v-${idx}`} x1={x} y1="25" x2={x} y2="175" stroke="#e0f2fe" strokeWidth="1" strokeDasharray="3 3" />
          ))}

          {/* Coordinate Axes */}
          <line x1="45" y1="25" x2="45" y2="175" stroke="#00aeef" strokeWidth="2" />
          <line x1="45" y1="175" x2="385" y2="175" stroke="#00aeef" strokeWidth="2" />

          {/* Axis Labels */}
          <text x="35" y="24" fill="#0f2231" fontSize="7" fontWeight="bold" fontFamily="monospace">mAU</text>
          <text x="365" y="186" fill="#0f2231" fontSize="7" fontWeight="bold" fontFamily="monospace">Time (min)</text>

          {/* STAGE 1: SEC-HPLC Monomer Peak & Impurities */}
          {(activeStage === 1 || activeStage === 4) && (
            <g>
              {/* Baseline curve with small HMW Aggregate Peak (Orange) */}
              <motion.path
                d="M 45 175 L 90 175 Q 110 175 120 150 Q 125 135 130 150 Q 140 175 160 175"
                fill="url(#impurityPeakGrad)"
                stroke="#f58634"
                strokeWidth="2"
              />
              <text x="110" y="128" fill="#f58634" fontSize="7" fontWeight="bold">HMW 0.4%</text>

              {/* Main Target Monomer Peak (Vibrant Blue, 99.4% Purity) */}
              <motion.path
                d="M 160 175 Q 190 175 210 50 Q 220 30 230 50 Q 250 175 280 175"
                fill="url(#chromPeakGrad)"
                stroke="#00aeef"
                strokeWidth="3"
                animate={{
                  d: [
                    "M 160 175 Q 190 175 210 50 Q 220 30 230 50 Q 250 175 280 175",
                    "M 160 175 Q 190 175 210 46 Q 220 26 230 46 Q 250 175 280 175",
                    "M 160 175 Q 190 175 210 50 Q 220 30 230 50 Q 250 175 280 175",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              />
              <text x="195" y="24" fill="#00aeef" fontSize="9" fontWeight="bold">Monomer 99.4% (RT 8.42m)</text>

              {/* Small LMW Fragment Peak (Orange) */}
              <motion.path
                d="M 280 175 Q 300 175 310 160 Q 315 150 320 160 Q 330 175 380 175"
                fill="url(#impurityPeakGrad)"
                stroke="#f58634"
                strokeWidth="2"
              />
              <text x="300" y="142" fill="#f58634" fontSize="7" fontWeight="bold">LMW 0.2%</text>

              {/* Scanning Retention Time Indicator Line */}
              <motion.line
                x1="45"
                y1="30"
                x2="45"
                y2="175"
                stroke="#f58634"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                animate={{ x1: [45, 375, 45], x2: [45, 375, 45] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
              />
            </g>
          )}

          {/* STAGE 2: LC-MS/MS Mass Spectrum & Peptide Fingerprint */}
          {activeStage === 2 && (
            <g>
              {/* Mass Spectrum Vertical Spectral Lines */}
              {[
                { x: 80, h: 40, col: '#00aeef', label: 'b₂' },
                { x: 110, h: 70, col: '#f58634', label: 'y₃' },
                { x: 145, h: 110, col: '#00aeef', label: 'b₅' },
                { x: 180, h: 55, col: '#f58634', label: 'y₆' },
                { x: 220, h: 145, col: '#00aeef', label: 'Parent mAb [M+12H]¹²⁺' },
                { x: 265, h: 90, col: '#f58634', label: 'y₈' },
                { x: 300, h: 60, col: '#00aeef', label: 'b₉' },
                { x: 340, h: 35, col: '#f58634', label: 'y₁₁' },
              ].map((peak, idx) => (
                <g key={idx}>
                  <motion.line
                    x1={peak.x}
                    y1={175}
                    x2={peak.x}
                    y2={175 - peak.h}
                    stroke={peak.col}
                    strokeWidth={idx === 4 ? "4" : "2.5"}
                    strokeLinecap="round"
                    animate={{ y2: [175 - peak.h + 5, 175 - peak.h - 5, 175 - peak.h + 5] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: idx * 0.15 }}
                  />
                  <circle cx={peak.x} cy={175 - peak.h} r="3.5" fill={peak.col} />
                  <text
                    x={peak.x - (idx === 4 ? 40 : 10)}
                    y={175 - peak.h - 6}
                    fill={peak.col}
                    fontSize={idx === 4 ? "8" : "7"}
                    fontWeight="bold"
                  >
                    {peak.label}
                  </text>
                </g>
              ))}

              {/* High-accuracy envelope */}
              <text x="55" y="40" fill="#00aeef" fontSize="9" fontWeight="bold">Intact Mass Verification: 148,254.2 Da (Δ 1.8 ppm)</text>
            </g>
          )}

          {/* STAGE 3: Potency & Sigmoidal Bioassay Dose-Response Curve */}
          {activeStage === 3 && (
            <g>
              {/* Reference Standard Sigmoidal Curve (Blue) */}
              <motion.path
                d="M 55 165 C 140 165 180 135 210 95 C 240 55 280 45 375 45"
                stroke="#00aeef"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
              <text x="250" y="38" fill="#00aeef" fontSize="8" fontWeight="bold">Reference Standard (EC₅₀ = 1.18 nM)</text>

              {/* Sample Batch Sigmoidal Curve (Orange) */}
              <motion.path
                d="M 55 168 C 140 168 180 138 210 98 C 240 58 280 48 375 48"
                stroke="#f58634"
                strokeWidth="2.5"
                strokeDasharray="5 3"
                fill="none"
                strokeLinecap="round"
              />
              <text x="250" y="60" fill="#f58634" fontSize="8" fontWeight="bold">Batch Sample (Relative Potency = 104%)</text>

              {/* Data points along curve */}
              {[
                { x: 90, y: 165 },
                { x: 150, y: 155 },
                { x: 190, y: 120 },
                { x: 210, y: 95 },
                { x: 235, y: 68 },
                { x: 275, y: 48 },
                { x: 335, y: 45 },
              ].map((pt, idx) => (
                <motion.circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r="4"
                  fill="#00aeef"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6, delay: idx * 0.12 }}
                />
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* Active Stage Description & Real-Time Performance Metric */}
      <div className="relative z-10 bg-neutral-50/90 rounded-[10px] p-3 border border-neutral-200/70 mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold text-[#f58634] tracking-wider">
            {ANALYTICAL_STAGES[activeStage - 1].tag}
          </span>
          <span className="text-[11px] font-bold text-[#00aeef]">
            {ANALYTICAL_STAGES[activeStage - 1].metric}
          </span>
        </div>
        <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-tight">
          {ANALYTICAL_STAGES[activeStage - 1].title}
        </h4>
        <p className="text-[11px] text-neutral-600 leading-normal mt-0.5">
          {ANALYTICAL_STAGES[activeStage - 1].subtitle}
        </p>
      </div>

      {/* Interactive 4-Step Progress Navigation Dots */}
      <div className="relative z-10 grid grid-cols-4 gap-1.5 pt-1 border-t border-neutral-100">
        {ANALYTICAL_STAGES.map((s) => (
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
