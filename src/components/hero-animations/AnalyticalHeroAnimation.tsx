'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, Search, ShieldCheck, Scale, LineChart, FileCheck, CheckCircle2 } from 'lucide-react';

const ANALYTICAL_STAGES = [
  {
    id: 1,
    tabLabel: 'SEC-UPLC Purity',
    fullTitle: 'SEC-UPLC Purity & Aggregation Species Quantification',
    subtitle: 'High-resolution size-exclusion chromatography resolving monomer purity and high-molecular-weight (HMW) aggregates down to 0.1%.',
    tag: 'Stage 01',
    metric: 'Purity (SEC): 99.4%',
  },
  {
    id: 2,
    tabLabel: 'LC-MS/MS Intact Mass',
    fullTitle: 'LC-MS/MS Intact Mass & High-Coverage Peptide Mapping',
    subtitle: 'High-resolution QTOF mass spectrometry confirming primary sequence fidelity, glycosylation micro-heterogeneity, and deamidation sites.',
    tag: 'Stage 02',
    metric: 'Mass Error: < 3.5 ppm',
  },
  {
    id: 3,
    tabLabel: 'Cell Potency Bioassay',
    fullTitle: 'Cell-Based Potency & Functional Mechanism of Action Bioassays',
    subtitle: 'Reporter gene, target-engagement, and ligand-binding bioassays demonstrating biological activity against international reference standards.',
    tag: 'Stage 03',
    metric: 'Relative Potency: 104%',
  },
  {
    id: 4,
    tabLabel: 'ICH Q2(R1) Validation',
    fullTitle: 'ICH Q2(R1) Full Method Validation & cGMP QC Release',
    subtitle: 'Complete analytical method validation across linearity, precision, accuracy, and robustness supporting IND/BLA dossier filings and batch release.',
    tag: 'Stage 04',
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
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = ANALYTICAL_STAGES[activeStage - 1];

  return (
    <div
      className="relative w-full min-h-[490px] md:min-h-[520px] bg-white rounded-[16px] border border-neutral-200/90 shadow-xl overflow-hidden flex flex-col justify-between p-5 sm:p-7 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Micro Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#0f2231_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Top Header & Live Telemetry Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00aeef] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00aeef]" />
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
            Orthogonal Analytical Architecture
          </span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/25 text-[#00aeef] text-xs font-bold tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5 text-[#f58634]" />
          <span>ICH Q2(R1) Validated</span>
        </div>
      </div>

      {/* Center Animated High-Res Analytical Stage */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center min-h-[240px]">
        <svg viewBox="0 0 440 240" className="w-full h-full max-h-[250px]" fill="none">
          <defs>
            <linearGradient id="chromPeakGradLarge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00aeef" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="impurityPeakGradLarge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f58634" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* MAIN UPLC/HPLC CHROMATOGRAM DISPLAY FRAME */}
          <rect x="20" y="15" width="400" height="195" rx="8" fill="#f8fcff" stroke="#00aeef" strokeWidth="2.5" />
          
          {/* Internal Grid Lines */}
          {[55, 95, 135, 175].map((y, idx) => (
            <line key={`h-${idx}`} x1="30" y1={y} x2="410" y2={y} stroke="#e0f2fe" strokeWidth="1.2" strokeDasharray="4 4" />
          ))}
          {[75, 135, 195, 255, 315, 375].map((x, idx) => (
            <line key={`v-${idx}`} x1={x} y1="25" x2={x} y2="190" stroke="#e0f2fe" strokeWidth="1.2" strokeDasharray="4 4" />
          ))}

          {/* Coordinate Axes */}
          <line x1="45" y1="25" x2="45" y2="190" stroke="#00aeef" strokeWidth="2.5" />
          <line x1="45" y1="190" x2="410" y2="190" stroke="#00aeef" strokeWidth="2.5" />

          {/* Axis Labels */}
          <text x="32" y="24" fill="#0f2231" fontSize="9" fontWeight="bold" fontFamily="monospace">mAU</text>
          <text x="370" y="202" fill="#0f2231" fontSize="9" fontWeight="bold" fontFamily="monospace">Time (min)</text>

          {/* ======================================================== */}
          {/* STAGE 1: SEC-HPLC MONOMER PEAK & IMPURITIES             */}
          {/* ======================================================== */}
          {activeStage === 1 && (
            <g>
              {/* Baseline curve with small HMW Aggregate Peak (Orange) */}
              <motion.path
                d="M 45 190 L 95 190 Q 115 190 125 160 Q 130 145 135 160 Q 145 190 170 190"
                fill="url(#impurityPeakGradLarge)"
                stroke="#f58634"
                strokeWidth="2.5"
              />
              {/* HMW Protected Pill Badge */}
              <g transform="translate(125, 130)">
                <rect x="-30" y="-8" width="60" height="15" rx="3" fill="#ffffff" fillOpacity="0.95" stroke="#fedcb8" strokeWidth="1" />
                <text x="0" y="3" textAnchor="middle" fill="#f58634" fontSize="8" fontWeight="bold">
                  HMW 0.4%
                </text>
              </g>

              {/* Main Target Monomer Peak (Vibrant Blue, 99.4% Purity) */}
              <motion.path
                d="M 170 190 Q 200 190 220 62 Q 230 40 240 62 Q 260 190 295 190"
                fill="url(#chromPeakGradLarge)"
                stroke="#00aeef"
                strokeWidth="3.5"
                animate={{
                  d: [
                    "M 170 190 Q 200 190 220 62 Q 230 40 240 62 Q 260 190 295 190",
                    "M 170 190 Q 200 190 220 58 Q 230 36 240 58 Q 260 190 295 190",
                    "M 170 190 Q 200 190 220 62 Q 230 40 240 62 Q 260 190 295 190",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              />
              {/* Monomer Label Protected Pill Tag - Zero Border Overlap */}
              <g transform="translate(230, 24)">
                <rect x="-75" y="-8" width="150" height="16" rx="4" fill="#ffffff" fillOpacity="0.96" stroke="#00aeef" strokeWidth="1" />
                <circle cx="-65" cy="0" r="2.5" fill="#00aeef" />
                <text x="4" y="3" textAnchor="middle" fill="#00aeef" fontSize="8.5" fontWeight="bold" letterSpacing="0.2">
                  Monomer 99.4% (RT 8.42m)
                </text>
              </g>

              {/* Small LMW Fragment Peak (Orange) */}
              <motion.path
                d="M 295 190 Q 315 190 325 172 Q 330 160 335 172 Q 345 190 395 190"
                fill="url(#impurityPeakGradLarge)"
                stroke="#f58634"
                strokeWidth="2.5"
              />
              {/* LMW Protected Pill Badge */}
              <g transform="translate(340, 146)">
                <rect x="-28" y="-8" width="56" height="15" rx="3" fill="#ffffff" fillOpacity="0.95" stroke="#fedcb8" strokeWidth="1" />
                <text x="0" y="3" textAnchor="middle" fill="#f58634" fontSize="8" fontWeight="bold">
                  LMW 0.2%
                </text>
              </g>

              {/* Scanning Retention Time Indicator Line */}
              <motion.line
                x1="45"
                y1="34"
                x2="45"
                y2="190"
                stroke="#f58634"
                strokeWidth="1.8"
                strokeDasharray="4 2"
                animate={{ x1: [45, 400, 45], x2: [45, 400, 45] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
              />
            </g>
          )}

          {/* ======================================================== */}
          {/* STAGE 2: LC-MS/MS MASS SPECTRUM & PEPTIDE FINGERPRINT    */}
          {/* ======================================================== */}
          {activeStage === 2 && (
            <g>
              {/* Intact Mass Header Protected Pill Banner */}
              <g transform="translate(50, 20)">
                <rect x="0" y="0" width="184" height="17" rx="4" fill="#ffffff" fillOpacity="0.95" stroke="#00aeef" strokeWidth="1" />
                <circle cx="8" cy="8.5" r="2.5" fill="#00aeef" />
                <text x="16" y="12" fill="#00aeef" fontSize="7.8" fontWeight="bold">
                  Intact Mass: 148,254.2 Da (Δ 1.8 ppm)
                </text>
              </g>

              {/* Mass Spectrum Vertical Spectral Lines */}
              {[
                { x: 80, h: 45, col: '#00aeef', label: 'b₂' },
                { x: 115, h: 72, col: '#f58634', label: 'y₃' },
                { x: 155, h: 98, col: '#00aeef', label: 'b₅' },
                { x: 195, h: 60, col: '#f58634', label: 'y₆' },
                { x: 240, h: 122, col: '#00aeef', label: 'Parent mAb [M+12H]¹²⁺' },
                { x: 285, h: 88, col: '#f58634', label: 'y₈' },
                { x: 325, h: 65, col: '#00aeef', label: 'b₉' },
                { x: 365, h: 40, col: '#f58634', label: 'y₁₁' },
              ].map((peak, idx) => (
                <g key={idx}>
                  <motion.line
                    x1={peak.x}
                    y1={190}
                    x2={peak.x}
                    y2={190 - peak.h}
                    stroke={peak.col}
                    strokeWidth={idx === 4 ? "4" : "2.8"}
                    strokeLinecap="round"
                    animate={{ y2: [190 - peak.h + 4, 190 - peak.h - 4, 190 - peak.h + 4] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: idx * 0.15 }}
                  />
                  <circle cx={peak.x} cy={190 - peak.h} r="3.5" fill={peak.col} />
                  {idx === 4 ? (
                    <g transform="translate(240, 50)">
                      <rect x="-62" y="-9" width="124" height="17" rx="4" fill="#ffffff" fillOpacity="0.96" stroke="#00aeef" strokeWidth="1" />
                      <circle cx="-52" cy="-0.5" r="2.5" fill="#00aeef" />
                      <text x="3" y="3" textAnchor="middle" fill="#00aeef" fontSize="7.8" fontWeight="bold">
                        {peak.label}
                      </text>
                    </g>
                  ) : (
                    <text
                      x={peak.x}
                      y={190 - peak.h - 6}
                      textAnchor="middle"
                      fill={peak.col}
                      fontSize="8"
                      fontWeight="bold"
                    >
                      {peak.label}
                    </text>
                  )}
                </g>
              ))}
            </g>
          )}

          {/* ======================================================== */}
          {/* STAGE 3: POTENCY & SIGMOIDAL BIOASSAY DOSE-RESPONSE      */}
          {/* ======================================================== */}
          {activeStage === 3 && (
            <g>
              {/* Reference Standard Sigmoidal Curve (Blue) */}
              <motion.path
                d="M 55 178 C 145 178 190 145 225 100 C 260 55 300 48 400 48"
                stroke="#00aeef"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Sample Batch Sigmoidal Curve (Orange) */}
              <motion.path
                d="M 55 182 C 145 182 190 148 225 103 C 260 58 300 51 400 51"
                stroke="#f58634"
                strokeWidth="2.8"
                strokeDasharray="6 3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Clean Legend Container in Upper Left (Safe Unobstructed Area) */}
              <g transform="translate(52, 22)">
                <rect x="0" y="0" width="215" height="38" rx="5" fill="#ffffff" fillOpacity="0.96" stroke="#00aeef" strokeWidth="1" />
                <line x1="12" y1="12" x2="26" y2="12" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="19" cy="12" r="2.5" fill="#00aeef" />
                <text x="32" y="15" fill="#00aeef" fontSize="8" fontWeight="bold">
                  Reference Standard (EC₅₀ = 1.18 nM)
                </text>
                
                <line x1="12" y1="26" x2="26" y2="26" stroke="#f58634" strokeWidth="2" strokeDasharray="4 2" strokeLinecap="round" />
                <circle cx="19" cy="26" r="2.5" fill="#f58634" />
                <text x="32" y="29" fill="#f58634" fontSize="8" fontWeight="bold">
                  Batch Sample (Relative Potency = 104%)
                </text>
              </g>

              {/* Data points along curve */}
              {[
                { x: 90, y: 178 },
                { x: 155, y: 168 },
                { x: 200, y: 130 },
                { x: 225, y: 100 },
                { x: 255, y: 70 },
                { x: 300, y: 48 },
                { x: 360, y: 45 },
              ].map((pt, idx) => (
                <motion.circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r="4.5"
                  fill="#00aeef"
                  stroke="#ffffff"
                  strokeWidth="2"
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6, delay: idx * 0.12 }}
                />
              ))}
            </g>
          )}

          {/* ======================================================== */}
          {/* STAGE 4: ICH Q2(R1) VALIDATION & RELEASE CHECKLIST       */}
          {/* ======================================================== */}
          {activeStage === 4 && (
            <g transform="translate(60, 35)">
              {/* Validation Grid Matrix */}
              <rect x="0" y="0" width="320" height="145" rx="8" fill="#ffffff" stroke="#00aeef" strokeWidth="2" />
              <text x="160" y="24" textAnchor="middle" fill="#0f2231" fontSize="11" fontWeight="bold">
                ICH Q2(R1) Method Validation & cGMP Release
              </text>
              <line x1="15" y1="34" x2="305" y2="34" stroke="#e0f2fe" strokeWidth="1.5" />

              {/* Validation Parameters */}
              {[
                { name: 'Linearity & Range', val: 'R² = 0.9998 (50% - 150%)', status: 'PASS' },
                { name: 'Repeatability Precision', val: 'RSD = 0.42% (n=6 preps)', status: 'PASS' },
                { name: 'Accuracy & Spike Recovery', val: '100.2% ± 0.8% mean recovery', status: 'PASS' },
                { name: 'Robustness (pH / Temp)', val: 'Δ RT < 0.05 min across variations', status: 'PASS' },
              ].map((param, i) => (
                <g key={i} transform={`translate(20, ${50 + i * 22})`}>
                  <circle cx="6" cy="4" r="5" fill="#22c55e" />
                  <path d="M 4 4 L 5.5 6 L 8.5 2.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="18" y="7" fill="#0f2231" fontSize="8.5" fontWeight="bold">
                    {param.name}:
                  </text>
                  <text x="135" y="7" fill="#64748b" fontSize="8">
                    {param.val}
                  </text>
                  <rect x="250" y="-3" width="32" height="14" rx="3" fill="#22c55e" fillOpacity="0.15" />
                  <text x="266" y="7" textAnchor="middle" fill="#16a34a" fontSize="7.5" fontWeight="bold">
                    {param.status}
                  </text>
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* Stage Narrative Callout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 bg-neutral-50/95 rounded-[12px] p-4 sm:p-5 border border-neutral-200/90 shadow-sm mb-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
            <span className="text-xs sm:text-sm font-bold uppercase text-[#f58634] tracking-wider">
              {current.tag}
            </span>
            <span className="inline-flex items-center text-xs sm:text-sm font-bold text-[#00aeef] bg-white px-3 py-1 rounded-full border border-[#00aeef]/30 shadow-xs">
              {current.metric}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
            {current.fullTitle}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-1">
            {current.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Interactive 4-Stage Progress Navigation Buttons */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-2 border-t border-neutral-100">
        {ANALYTICAL_STAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={`px-3 py-2.5 rounded-[10px] text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
              activeStage === s.id
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-2 ring-neutral-900/20'
                : 'bg-white/90 hover:bg-neutral-100 text-neutral-700 border-neutral-200/90'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-0.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${activeStage === s.id ? 'text-[#f58634]' : 'text-neutral-400'}`}>
                {s.tag}
              </span>
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  activeStage === s.id ? 'bg-[#f58634]' : 'bg-neutral-300'
                }`}
              />
            </div>
            <span className="text-xs sm:text-[13px] font-semibold leading-tight truncate w-full">
              {s.tabLabel}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

