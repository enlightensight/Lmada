'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitMerge, ShieldCheck, Target, Zap, CheckCircle2, Activity } from 'lucide-react';

const BISPECIFIC_STAGES = [
  {
    id: 1,
    tabLabel: 'Knobs-into-Holes (KiH)',
    fullTitle: 'Knobs-into-Holes Heterodimerization Engineering',
    subtitle: 'Engineered CH3 steric mutations (T366W Knob / T366S-L368A-Y407V Hole) driving >98% correct heavy chain pairing and eliminating homodimers.',
    badge: 'Heterodimer Purity: >98.5%',
    metric: 'Mispairing: <0.5%',
    tag: 'Structural Engineering',
  },
  {
    id: 2,
    tabLabel: 'Dual-Target Asymmetric',
    fullTitle: 'Asymmetric Dual Antigen Engagement (TAA + CD3)',
    subtitle: 'Arm 1 binds tumor-associated antigen (TAA) while Arm 2 targets CD3ε on cytotoxic effector T-cells with balanced affinities.',
    badge: 'Bivalent Dual-Specific',
    metric: 'Affinity Balance: Tuned',
    tag: 'Target Cross-Linking',
  },
  {
    id: 3,
    tabLabel: 'T-Cell Killer Synapse',
    fullTitle: 'Immunological Synapse Induction & Directed Lysis',
    subtitle: 'Close physical juxtaposition of killer T-cell with tumor target cell, triggering directed perforin/granzyme cytotoxic payload release.',
    badge: 'T-Cell Activation: High',
    metric: 'Lysis Potency: EC50 < 10 pM',
    tag: 'Mechanism of Action',
  },
  {
    id: 4,
    tabLabel: 'Downstream DSP Purity',
    fullTitle: 'Downstream Homodimer Separation & SEC Purity',
    subtitle: 'Orthogonal hydrophobic interaction chromatography (HIC) and CIEX resolving trace residual homodimers to undetectable levels.',
    badge: 'Homodimer: Undetectable',
    metric: 'SEC Purity: >99.0%',
    tag: 'Impurity Control',
  },
];

export default function BispecificModalityAnimation() {
  const [activeStage, setActiveStage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = BISPECIFIC_STAGES.find((s) => s.id === activeStage) ?? BISPECIFIC_STAGES[0];

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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f58634] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f58634]" />
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
            Bispecific Antibody Engineering Platform
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#f58634]/10 border border-[#f58634]/25 text-[#f58634] text-xs font-bold tracking-wide flex items-center gap-1.5">
            <GitMerge className="w-3.5 h-3.5 text-[#00aeef]" />
            {current.tag}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/25 text-[#00aeef] text-xs font-bold tracking-wide hidden sm:inline-block">
            {current.badge}
          </span>
        </div>
      </div>

      {/* Center SVG Visualization: Asymmetric Bispecific Antibody */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center min-h-[260px] sm:min-h-[290px]">
        <svg viewBox="0 0 520 280" className="w-full h-full max-h-[300px]" fill="none">
          <defs>
            <radialGradient id="bispecificGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00aeef" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f58634" stopOpacity="0" />
            </radialGradient>
            <filter id="dualGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Aura */}
          <circle cx="260" cy="140" r="130" fill="url(#bispecificGlow)" />

          {/* ======================================================== */}
          {/* TARGET CELLS (TUMOR TARGET & KILLER T-CELL)              */}
          {/* ======================================================== */}
          {/* Left Cell: Tumor Target (Orange) */}
          <g>
            <rect x="25" y="20" width="105" height="60" rx="10" fill="#f58634" fillOpacity="0.1" stroke="#f58634" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx="77" cy="45" r="14" fill="#f58634" />
            <text x="77" y="49" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">TAA</text>
            <text x="77" y="70" textAnchor="middle" fill="#f58634" fontSize="8.5" fontWeight="bold">Tumor Cell</text>

            {/* Left Binding Ray */}
            <motion.line
              x1="130" y1="50" x2="165" y2="70"
              stroke="#f58634" strokeWidth="2.5" strokeDasharray="4 2"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
          </g>

          {/* Right Cell: Effector T-Cell (Blue) */}
          <g>
            <rect x="390" y="20" width="105" height="60" rx="10" fill="#00aeef" fillOpacity="0.1" stroke="#00aeef" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx="442" cy="45" r="14" fill="#00aeef" />
            <text x="442" y="49" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">CD3</text>
            <text x="442" y="70" textAnchor="middle" fill="#00aeef" fontSize="8.5" fontWeight="bold">T-Cell Killer</text>

            {/* Right Binding Ray */}
            <motion.line
              x1="390" y1="50" x2="355" y2="70"
              stroke="#00aeef" strokeWidth="2.5" strokeDasharray="4 2"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
          </g>

          {/* ======================================================== */}
          {/* STAGE 3: IMMUNOLOGICAL SYNAPSE LYTIC PARTICLE RELEASE    */}
          {/* ======================================================== */}
          {activeStage === 3 && (
            <g>
              <line
                x1="135" y1="50" x2="385" y2="50"
                stroke="#0f2231" strokeWidth="1.5" strokeDasharray="3 3"
                opacity="0.3"
              />
              {/* Cytotoxic Granzyme/Perforin Lytic Particles flowing from T-cell to tumor cell */}
              {[0, 0.35, 0.7].map((delay, idx) => (
                <motion.circle
                  key={idx}
                  r="5"
                  fill="#00aeef"
                  animate={{
                    cx: [385, 135],
                    cy: [50, 50],
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.3, 0.8],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, delay, ease: 'easeInOut' }}
                />
              ))}
              {/* Lysis confirmation tag */}
              <g transform="translate(205, 38)">
                <rect x="0" y="0" width="110" height="18" rx="4" fill="#0f2231" fillOpacity="0.85" />
                <text x="55" y="12" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">
                  Directed Perforin Lysis
                </text>
              </g>
            </g>
          )}

          {/* ======================================================== */}
          {/* MAIN ASYMMETRIC BISPECIFIC ANTIBODY STRUCTURE            */}
          {/* ======================================================== */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* === LEFT FAB ARM (Tumor Specific - Orange) === */}
            <motion.path
              d="M 245 130 L 175 75 L 155 58"
              stroke="#f58634"
              strokeWidth={activeStage === 2 ? 16 : 14}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#dualGlow)"
              animate={activeStage === 2 ? { strokeWidth: [13, 16, 13] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <path
              d="M 205 125 L 150 82 L 130 65"
              stroke="#f58634"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
            {/* Disulfide */}
            <line x1="175" y1="102" x2="165" y2="95" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="170" cy="98.5" r="3" fill="#ffffff" />

            {/* CDR 1 Binding Pocket */}
            <circle cx="150" cy="54" r="7" fill="#f58634" stroke="#ffffff" strokeWidth="2" />
            <circle cx="126" cy="62" r="6" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />

            {/* === RIGHT FAB ARM (CD3 Specific - Blue) === */}
            <motion.path
              d="M 275 130 L 345 75 L 365 58"
              stroke="#00aeef"
              strokeWidth={activeStage === 2 ? 16 : 14}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#dualGlow)"
              animate={activeStage === 2 ? { strokeWidth: [13, 16, 13] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <path
              d="M 315 125 L 370 82 L 390 65"
              stroke="#00aeef"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
            {/* Disulfide */}
            <line x1="345" y1="102" x2="355" y2="95" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="350" cy="98.5" r="3" fill="#ffffff" />

            {/* CDR 2 Binding Pocket */}
            <circle cx="370" cy="54" r="7" fill="#00aeef" stroke="#ffffff" strokeWidth="2" />
            <circle cx="394" cy="62" r="6" fill="#00aeef" stroke="#ffffff" strokeWidth="1.5" />

            {/* === HINGE & INTERCHAIN DISULFIDES === */}
            <rect x="250" y="125" width="20" height="15" rx="4" fill="#0f2231" />
            <line x1="253" y1="129" x2="267" y2="129" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="253" y1="135" x2="267" y2="135" stroke="#ffffff" strokeWidth="2.5" />

            {/* ======================================================== */}
            {/* === ASYMMETRIC FC WITH KNOBS-INTO-HOLES (KiH Focus)      */}
            {/* ======================================================== */}
            {/* Left Heavy Chain (Knob Chain - T366W - Orange) */}
            <path
              d="M 252 140 L 252 190 C 252 205 258 215 258 225 L 244 250"
              stroke="#f58634"
              strokeWidth="13"
              strokeLinecap="round"
            />
            {/* Knob Protrusion (T366W) */}
            <motion.circle
              cx="260" cy="205" r="7"
              fill="#f58634" stroke="#ffffff" strokeWidth="1.5"
              animate={activeStage === 1 ? { scale: [1, 1.35, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Right Heavy Chain (Hole Chain - T366S/L368A/Y407V - Blue) */}
            <path
              d="M 268 140 L 268 190 C 268 205 264 215 264 225 L 276 250"
              stroke="#00aeef"
              strokeWidth="13"
              strokeLinecap="round"
            />
            {/* Hole Cavity (Complementary Pocket) */}
            <circle cx="260" cy="205" r="8" stroke="#00aeef" strokeWidth="2" fill="none" strokeDasharray="3 2" />

            {/* Stage 1: KiH Heterodimer Lock Magnetic Pulse */}
            {activeStage === 1 && (
              <motion.circle
                cx="260" cy="205" r="18"
                fill="none" stroke="#f58634" strokeWidth="2" strokeDasharray="4 2"
                animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.7, 0.1, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            )}

            {/* Disulfide Bridge in Fc */}
            <line x1="248" y1="235" x2="272" y2="235" stroke="#0f2231" strokeWidth="2" />
          </motion.g>

          {/* ======================================================== */}
          {/* STAGE 4: DOWNSTREAM HOMODIMER RESOLUTION SEC MINI GRAPH  */}
          {/* ======================================================== */}
          {activeStage === 4 && (
            <g transform="translate(185, 170)">
              <rect x="0" y="0" width="150" height="75" rx="6" fill="#ffffff" stroke="#00aeef" strokeWidth="1.5" filter="url(#dualGlow)" />
              <text x="75" y="14" textAnchor="middle" fill="#0f2231" fontSize="8" fontWeight="bold">SEC-HPLC Heterodimer Peak</text>
              <line x1="12" y1="62" x2="138" y2="62" stroke="#0f2231" strokeWidth="1.2" />
              {/* Monomer / Heterodimer single pure peak */}
              <motion.path
                d="M 20 62 Q 55 62 75 22 Q 95 62 130 62"
                fill="#00aeef" fillOpacity="0.2"
                stroke="#00aeef" strokeWidth="2"
                animate={{ d: [
                  "M 20 62 Q 55 62 75 22 Q 95 62 130 62",
                  "M 20 62 Q 55 62 75 19 Q 95 62 130 62",
                  "M 20 62 Q 55 62 75 22 Q 95 62 130 62",
                ] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text x="75" y="32" textAnchor="middle" fill="#00aeef" fontSize="7.5" fontWeight="bold">Purity &gt;99.0%</text>
            </g>
          )}


          {/* ======================================================== */}
          {/* CALLOUT LABELS (NON-OVERLAPPING)                         */}
          {/* ======================================================== */}
          <g>
            {/* Arm 1 Label */}
            <g transform="translate(85, 110)">
              <rect x="0" y="0" width="90" height="20" rx="5" fill="#ffffff" stroke="#f58634" strokeWidth="1" />
              <text x="45" y="13.5" textAnchor="middle" fill="#0f2231" fontSize="8.5" fontWeight="bold">Arm 1: Anti-TAA</text>
            </g>

            {/* Arm 2 Label */}
            <g transform="translate(345, 110)">
              <rect x="0" y="0" width="90" height="20" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
              <text x="45" y="13.5" textAnchor="middle" fill="#0f2231" fontSize="8.5" fontWeight="bold">Arm 2: Anti-CD3</text>
            </g>

            {/* Knob-into-Hole Lock Label (Hidden if stage 4 SEC graph is open, otherwise visible) */}
            {activeStage !== 4 && (
              <g transform="translate(205, 255)">
                <rect x="0" y="0" width="110" height="20" rx="5" fill="#ffffff" stroke="#0f2231" strokeWidth="1" />
                <text x="55" y="13.5" textAnchor="middle" fill="#0f2231" fontSize="8.5" fontWeight="bold">Knobs-into-Holes (KiH)</text>
              </g>
            )}
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
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f58634]">
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
            <ShieldCheck className="w-4 h-4 text-[#f58634]" />
            <span className="text-xs font-bold text-neutral-800">{current.metric}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Interactive 4-Stage Progress Navigation Buttons */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-2 border-t border-neutral-100">
        {BISPECIFIC_STAGES.map((s) => (
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

