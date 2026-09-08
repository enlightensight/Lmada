'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, GitMerge, ShieldCheck, Target, Zap, CheckCircle2 } from 'lucide-react';

const BISPECIFIC_STAGES = [
  {
    id: 1,
    title: 'Knobs-into-Holes Heterodimerization',
    subtitle: 'Engineered CH3 steric mutations (T366W Knob / T366S-L368A-Y407V Hole) driving >98% correct heavy chain pairing.',
    badge: 'Heterodimer Purity: >98.5%',
    metric: 'Mispairing: <0.5%',
    tag: 'Structural Engineering',
  },
  {
    id: 2,
    title: 'Asymmetric Dual Antigen Engagement',
    subtitle: 'Arm 1 binds tumor-associated antigen (TAA) while Arm 2 targets CD3 on effector cytotoxic T-cells.',
    badge: 'Bivalent Dual-Specific',
    metric: 'Affinity Balance: Tuned',
    tag: 'Target Cross-Linking',
  },
  {
    id: 3,
    title: 'Immunological Synapse Induction',
    subtitle: 'Close physical juxtaposition of immune killer cell with tumor target, triggering directed perforin/granzyme release.',
    badge: 'T-Cell Activation: High',
    metric: 'Lysis Potency: EC50 < 10 pM',
    tag: 'Mechanism of Action',
  },
  {
    id: 4,
    title: 'Downstream Homodimer Purification',
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
      className="relative w-full min-h-[460px] md:min-h-[500px] bg-gradient-to-b from-white via-slate-50/50 to-neutral-100/60 p-5 sm:p-8 flex flex-col justify-between select-none overflow-hidden"
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
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center min-h-[260px] sm:min-h-[290px]">
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

          {/* Left Cell: Tumor Target (Orange) */}
          <g>
            <rect x="25" y="20" width="105" height="60" rx="10" fill="#f58634" fillOpacity="0.1" stroke="#f58634" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx="77" cy="45" r="14" fill="#f58634" />
            <text x="77" y="49" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">TAA</text>
            <text x="77" y="70" textAnchor="middle" fill="#f58634" fontSize="9" fontWeight="bold">Tumor Cell</text>

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
            <text x="442" y="70" textAnchor="middle" fill="#00aeef" fontSize="9" fontWeight="bold">T-Cell Killer</text>

            {/* Right Binding Ray */}
            <motion.line
              x1="390" y1="50" x2="355" y2="70"
              stroke="#00aeef" strokeWidth="2.5" strokeDasharray="4 2"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
          </g>

          {/* Synapse bridge particle pulses (Stage 3) */}
          {activeStage === 3 && (
            <g>
              <motion.line
                x1="135" y1="50" x2="385" y2="50"
                stroke="#0f2231" strokeWidth="1.5" strokeDasharray="3 3"
                opacity="0.3"
              />
              <motion.circle
                cx="200" cy="50" r="5" fill="#f58634"
                animate={{ cx: [140, 380], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="300" cy="50" r="5" fill="#00aeef"
                animate={{ cx: [380, 140], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              />
            </g>
          )}

          {/* Main Asymmetric Bispecific Antibody Structure */}
          <motion.g
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* === LEFT FAB ARM (Tumor Specific - Orange) === */}
            <path
              d="M 245 130 L 175 75 L 155 58"
              stroke="#f58634"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#dualGlow)"
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
            <path
              d="M 275 130 L 345 75 L 365 58"
              stroke="#00aeef"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#dualGlow)"
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

            {/* === ASYMMETRIC FC WITH KNOBS-INTO-HOLES (KiH) === */}
            {/* Left Heavy Chain (Knob Chain - T366W) */}
            <path
              d="M 252 140 L 252 190 C 252 205 258 215 258 225 L 244 250"
              stroke="#f58634"
              strokeWidth="13"
              strokeLinecap="round"
            />
            {/* Knob Protrusion (T366W) */}
            <circle cx="260" cy="205" r="7" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />

            {/* Right Heavy Chain (Hole Chain - T366S/L368A/Y407V) */}
            <path
              d="M 268 140 L 268 190 C 268 205 264 215 264 225 L 276 250"
              stroke="#00aeef"
              strokeWidth="13"
              strokeLinecap="round"
            />
            {/* Hole Cavity (Complementary Pocket) */}
            <circle cx="260" cy="205" r="8" stroke="#00aeef" strokeWidth="2" fill="none" strokeDasharray="3 2" />

            {/* Disulfide Bridge in Fc */}
            <line x1="248" y1="235" x2="272" y2="235" stroke="#0f2231" strokeWidth="2" />
          </motion.g>

          {/* Callout Labels */}
          <g opacity="0.9">
            {/* Arm 1 Label */}
            <rect x="90" y="110" width="85" height="20" rx="5" fill="#ffffff" stroke="#f58634" strokeWidth="1" />
            <text x="132" y="123.5" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Arm 1: Anti-TAA</text>

            {/* Arm 2 Label */}
            <rect x="345" y="110" width="85" height="20" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
            <text x="387" y="123.5" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Arm 2: Anti-CD3</text>

            {/* Knob-into-Hole Lock Label */}
            <rect x="210" y="255" width="100" height="20" rx="5" fill="#ffffff" stroke="#0f2231" strokeWidth="1" />
            <text x="260" y="268.5" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Knobs-into-Holes (KiH)</text>
          </g>
        </svg>
      </div>

      {/* Stage Narrative Callout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 bg-white/95 rounded-[12px] p-4 sm:p-5 border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f58634]">
                Stage 0{current.id}
              </span>
              <span className="text-neutral-300">•</span>
              <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                {current.title}
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

      {/* Interactive Stage Step Indicator Bar */}
      <div className="relative z-10 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {BISPECIFIC_STAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={`px-3 py-2 sm:py-2.5 rounded-[8px] text-xs font-semibold tracking-wide transition-all text-left flex items-center justify-between border cursor-pointer ${
              activeStage === s.id
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-white/80 text-neutral-700 border-neutral-200/80 hover:border-neutral-400'
            }`}
          >
            <span className="truncate">0{s.id}. {s.title.split(' ')[0]}</span>
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                activeStage === s.id ? 'bg-[#f58634]' : 'bg-neutral-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
