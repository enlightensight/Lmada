'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Dna, ShieldCheck, Activity, Target, Layers, CheckCircle2 } from 'lucide-react';

const MAB_STAGES = [
  {
    id: 1,
    tabLabel: 'Canonical IgG Chassis',
    fullTitle: 'IgG Architecture & Heavy/Light Chain Pairing',
    subtitle: 'Two identical heavy chains (50 kDa) and two light chains (25 kDa) linked by interchain disulfide bonds forming ~150 kDa heterotetramer.',
    badge: 'Structure: ~150 kDa',
    metric: 'Disulfide Pairing: 100%',
    subclass: 'IgG1 Canonical',
  },
  {
    id: 2,
    tabLabel: 'Fab Antigen Binding',
    fullTitle: 'Fab Variable Antigen Binding & Picomolar Affinity',
    subtitle: 'Hypervariable CDR loops at VH and VL domains providing picomolar affinity target recognition and high epitope specificity.',
    badge: 'Affinity: KD < 10⁻¹⁰ M',
    metric: 'Epitope Specificity: High',
    subclass: 'Target Engagement',
  },
  {
    id: 3,
    tabLabel: 'Fc Glycan & ADCC',
    fullTitle: 'Fc N-Glycan Micro-Heterogeneity & Effector Tuning',
    subtitle: 'Asn-297 complex biantennary glycans modulating FcγRIIIa effector binding, complement activation (CDC), and ADCC potency.',
    badge: 'Glycoforms: G0F / G1F / G2F',
    metric: 'Afucosylation: Tunable',
    subclass: 'Effector Tuning',
  },
  {
    id: 4,
    tabLabel: 'Subclass & Hinge',
    fullTitle: 'Subclass Engineering & Hinge Stabilization',
    subtitle: 'Hinge region customization (S228P mutation in IgG4) to prevent Fab-arm exchange and optimize circulating serum half-life.',
    badge: 'S228P Stabilized',
    metric: 'Purity by SEC-HPLC: >99.2%',
    subclass: 'Subclass Flexibility',
  },
];

export default function MAbModalityAnimation() {
  const [activeStage, setActiveStage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = MAB_STAGES.find((s) => s.id === activeStage) ?? MAB_STAGES[0];

  return (
    <div
      className="relative w-full min-h-[490px] md:min-h-[520px] bg-gradient-to-b from-white via-slate-50/50 to-neutral-100/60 p-5 sm:p-8 flex flex-col justify-between select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Micro-grid background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0f2231_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Top Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/80 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00aeef] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00aeef]" />
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
            Monoclonal Antibody Engineering Platform
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/25 text-[#00aeef] text-xs font-bold tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#f58634]" />
            {current.subclass}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#f58634]/10 border border-[#f58634]/25 text-[#f58634] text-xs font-bold tracking-wide hidden sm:inline-block">
            {current.badge}
          </span>
        </div>
      </div>

      {/* Center SVG Visualization: Y-Shaped Monoclonal Antibody */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center min-h-[260px] sm:min-h-[290px]">
        <svg viewBox="0 0 520 280" className="w-full h-full max-h-[300px]" fill="none">
          <defs>
            <radialGradient id="targetFieldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00aeef" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#00aeef" stopOpacity="0" />
            </radialGradient>
            <filter id="mabGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Ambient Radial Glow */}
          <circle cx="260" cy="140" r="130" fill="url(#targetFieldGlow)" />

          {/* ======================================================== */}
          {/* STAGE 2: INCOMING TARGET ANTIGENS & DOCKING RAYS         */}
          {/* ======================================================== */}
          <g>
            {/* Left Antigen Target */}
            <motion.g
              animate={
                activeStage === 2
                  ? { x: [0, 18, 0], y: [0, 18, 0], scale: [1, 1.12, 1] }
                  : { x: [0, -4, 0], y: [0, -4, 0] }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx="110" cy="35" r="18" fill="#f58634" fillOpacity="0.15" stroke="#f58634" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="110" cy="35" r="9" fill="#f58634" />
              <text x="110" y="39" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Ag</text>
              {activeStage === 2 && (
                <motion.line
                  x1="110" y1="44" x2="145" y2="70"
                  stroke="#f58634" strokeWidth="2.5" strokeDasharray="4 3"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </motion.g>

            {/* Right Antigen Target */}
            <motion.g
              animate={
                activeStage === 2
                  ? { x: [0, -18, 0], y: [0, 18, 0], scale: [1, 1.12, 1] }
                  : { x: [0, 4, 0], y: [0, -4, 0] }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            >
              <circle cx="410" cy="35" r="18" fill="#f58634" fillOpacity="0.15" stroke="#f58634" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="410" cy="35" r="9" fill="#f58634" />
              <text x="410" y="39" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Ag</text>
              {activeStage === 2 && (
                <motion.line
                  x1="410" y1="44" x2="375" y2="70"
                  stroke="#f58634" strokeWidth="2.5" strokeDasharray="4 3"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </motion.g>
          </g>

          {/* ======================================================== */}
          {/* MAIN ANTIBODY STRUCTURE CONTAINER                        */}
          {/* ======================================================== */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* === LEFT FAB ARM === */}
            {/* Heavy Chain Left Fab (VH + CH1) */}
            <motion.path
              d="M 245 130 L 160 70 L 135 52"
              stroke="#00aeef"
              strokeWidth={activeStage === 1 ? 16 : 14}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#mabGlow)"
              animate={activeStage === 1 ? { strokeWidth: [13, 16, 13] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Light Chain Left Fab (VL + CL) */}
            <path
              d="M 195 125 L 140 85 L 115 68"
              stroke="#f58634"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Interchain Disulfide Bond (Left Fab) */}
            <motion.line
              x1="165" y1="102" x2="155" y2="95"
              stroke="#ffffff" strokeWidth="3"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <circle cx="160" cy="98.5" r="3" fill="#f58634" />

            {/* Left CDR Binding Pocket Accent */}
            <circle cx="130" cy="48" r="7" fill="#00aeef" stroke="#ffffff" strokeWidth="2" />
            <circle cx="110" cy="64" r="6" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />

            {/* === RIGHT FAB ARM === */}
            {/* Heavy Chain Right Fab (VH + CH1) */}
            <motion.path
              d="M 275 130 L 360 70 L 385 52"
              stroke="#00aeef"
              strokeWidth={activeStage === 1 ? 16 : 14}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#mabGlow)"
              animate={activeStage === 1 ? { strokeWidth: [13, 16, 13] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            {/* Light Chain Right Fab (VL + CL) */}
            <path
              d="M 325 125 L 380 85 L 405 68"
              stroke="#f58634"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Interchain Disulfide Bond (Right Fab) */}
            <motion.line
              x1="355" y1="102" x2="365" y2="95"
              stroke="#ffffff" strokeWidth="3"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <circle cx="360" cy="98.5" r="3" fill="#f58634" />

            {/* Right CDR Binding Pocket Accent */}
            <circle cx="390" cy="48" r="7" fill="#00aeef" stroke="#ffffff" strokeWidth="2" />
            <circle cx="410" cy="64" r="6" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />

            {/* ======================================================== */}
            {/* === HINGE REGION (Stage 4 Subclass Focus)                */}
            {/* ======================================================== */}
            <g>
              <rect x="249" y="124" width="22" height="16" rx="4" fill="#0f2231" />
              <line x1="253" y1="129" x2="267" y2="129" stroke="#f58634" strokeWidth="2.5" />
              <line x1="253" y1="135" x2="267" y2="135" stroke="#f58634" strokeWidth="2.5" />

              {/* Stage 4 S228P Mutation Highlight Ring */}
              {activeStage === 4 && (
                <motion.circle
                  cx="260" cy="132" r="16"
                  fill="#f58634" fillOpacity="0.2"
                  stroke="#f58634" strokeWidth="1.8" strokeDasharray="3 2"
                  animate={{ scale: [0.9, 1.4, 0.9], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
            </g>

            {/* === FC STEM REGION (CH2 + CH3 DOMAINS) === */}
            {/* Left Heavy Chain Fc */}
            <path
              d="M 252 140 L 252 195 C 252 225 242 245 242 250"
              stroke="#00aeef"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Right Heavy Chain Fc */}
            <path
              d="M 268 140 L 268 195 C 268 225 278 245 278 250"
              stroke="#00aeef"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Disulfide Bond between CH3 */}
            <line x1="252" y1="230" x2="268" y2="230" stroke="#f58634" strokeWidth="2.5" />

            {/* ======================================================== */}
            {/* === N-GLYCAN CORE (Stage 3 Fc Effector Focus)            */}
            {/* ======================================================== */}
            <g>
              <motion.g
                animate={
                  activeStage === 3
                    ? { scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }
                    : { scale: 1, opacity: 0.85 }
                }
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                {/* Left Glycan Core */}
                <circle cx="242" cy="180" r="5.5" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="230" cy="174" r="4" fill="#00aeef" stroke="#ffffff" strokeWidth="1" />
                <circle cx="230" cy="186" r="4" fill="#0f2231" stroke="#ffffff" strokeWidth="1" />
                <line x1="242" y1="180" x2="230" y2="174" stroke="#f58634" strokeWidth="1.5" />
                <line x1="242" y1="180" x2="230" y2="186" stroke="#f58634" strokeWidth="1.5" />

                {/* Right Glycan Core */}
                <circle cx="278" cy="180" r="5.5" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="290" cy="174" r="4" fill="#00aeef" stroke="#ffffff" strokeWidth="1" />
                <circle cx="290" cy="186" r="4" fill="#0f2231" stroke="#ffffff" strokeWidth="1" />
                <line x1="278" y1="180" x2="290" y2="174" stroke="#f58634" strokeWidth="1.5" />
                <line x1="278" y1="180" x2="290" y2="186" stroke="#f58634" strokeWidth="1.5" />
              </motion.g>

              {/* Stage 3 Effector Signal Waves */}
              {activeStage === 3 && (
                <g>
                  <text x="260" y="206" textAnchor="middle" fill="#f58634" fontSize="9" fontWeight="bold">
                    Asn-297 Glycan
                  </text>
                  <motion.circle
                    cx="260" cy="180" r="28"
                    fill="none" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="4 3"
                    animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 0.1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </g>
              )}
            </g>
          </motion.g>

          {/* ======================================================== */}
          {/* DOMAIN ANNOTATION LABELS (NON-OVERLAPPING)               */}
          {/* ======================================================== */}
          <g>
            {/* Fab Label Left */}
            <g transform="translate(45, 80)">
              <rect x="0" y="0" width="70" height="20" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
              <text x="35" y="13.5" textAnchor="middle" fill="#0f2231" fontSize="8.5" fontWeight="bold">Fab (VH/VL)</text>
              <line x1="70" y1="10" x2="95" y2="10" stroke="#00aeef" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* Fab Label Right */}
            <g transform="translate(405, 80)">
              <line x1="0" y1="10" x2="-25" y2="10" stroke="#00aeef" strokeWidth="1" strokeDasharray="2 2" />
              <rect x="0" y="0" width="70" height="20" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
              <text x="35" y="13.5" textAnchor="middle" fill="#0f2231" fontSize="8.5" fontWeight="bold">Fab (VH/VL)</text>
            </g>

            {/* Fc Domain Label Bottom */}
            <g transform="translate(222, 255)">
              <rect x="0" y="0" width="76" height="20" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
              <text x="38" y="13.5" textAnchor="middle" fill="#0f2231" fontSize="8.5" fontWeight="bold">Fc Domain</text>
            </g>
          </g>
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
          className="relative z-10 bg-white/95 rounded-[12px] p-4 sm:p-5 border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00aeef]">
                Stage 0{current.id}
              </span>
              <span className="text-neutral-300">•</span>
              <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                {current.fullTitle}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
              {current.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-neutral-50 px-3.5 py-2 rounded-[8px] border border-neutral-200/80">
            <ShieldCheck className="w-4 h-4 text-[#00aeef]" />
            <span className="text-xs font-bold text-neutral-800">{current.metric}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Interactive 4-Stage Progress Navigation Buttons */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-2 border-t border-neutral-100">
        {MAB_STAGES.map((s) => (
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
                Stage 0{s.id}
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

