'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Dna, ShieldCheck, Activity, Target, Layers } from 'lucide-react';

const MAB_STAGES = [
  {
    id: 1,
    title: 'IgG Architecture & Chain Pairing',
    subtitle: 'Two identical heavy chains (50 kDa) and two light chains (25 kDa) linked by interchain disulfide bonds.',
    badge: 'Structure: ~150 kDa',
    metric: 'Disulfide Pairing: 100%',
    subclass: 'IgG1 Canonical',
  },
  {
    id: 2,
    title: 'Fab Variable Antigen Binding',
    subtitle: 'Hypervariable CDR loops at VH and VL domains providing picomolar affinity target recognition.',
    badge: 'Affinity: KD < 10⁻¹⁰ M',
    metric: 'Epitope Specificity: High',
    subclass: 'Target Engagement',
  },
  {
    id: 3,
    title: 'Fc N-Glycan Micro-Heterogeneity',
    subtitle: 'Asn-297 complex biantennary glycans modulating FcγRIIIa effector binding and ADCC potency.',
    badge: 'Glycoforms: G0F / G1F / G2F',
    metric: 'Afucosylation: Tunable',
    subclass: 'Effector Tuning',
  },
  {
    id: 4,
    title: 'Subclass Engineering (IgG1 / IgG2 / IgG4)',
    subtitle: 'Hinge region customization to optimize half-life, complement activation (CDC), and eliminate Fab exchange.',
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
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center min-h-[260px] sm:min-h-[290px]">
        <svg viewBox="0 0 520 280" className="w-full h-full max-h-[300px]" fill="none">
          <defs>
            <linearGradient id="heavyChainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00aeef" />
              <stop offset="100%" stopColor="#0f2231" />
            </linearGradient>
            <linearGradient id="lightChainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f58634" />
              <stop offset="100%" stopColor="#ffb074" />
            </linearGradient>
            <linearGradient id="glycanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f58634" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00aeef" stopOpacity="0.8" />
            </linearGradient>
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

          {/* Incoming Target Antigens (Animated Docking Particles) */}
          <g>
            {/* Left Antigen Target */}
            <motion.g
              animate={
                activeStage === 2
                  ? { x: [0, 18, 0], y: [0, 18, 0], scale: [1, 1.1, 1] }
                  : { x: [0, -6, 0], y: [0, -6, 0] }
              }
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
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
                  ? { x: [0, -18, 0], y: [0, 18, 0], scale: [1, 1.1, 1] }
                  : { x: [0, 6, 0], y: [0, -6, 0] }
              }
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
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

          {/* Antibody Structure Container */}
          <motion.g
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* === LEFT FAB ARM === */}
            {/* Heavy Chain Left Fab (VH + CH1) */}
            <path
              d="M 245 130 L 160 70 L 135 52"
              stroke="#00aeef"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#mabGlow)"
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
            <path
              d="M 275 130 L 360 70 L 385 52"
              stroke="#00aeef"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#mabGlow)"
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

            {/* === HINGE REGION (With Inter-Heavy Disulfide Bridges) === */}
            <rect x="250" y="125" width="20" height="15" rx="4" fill="#0f2231" />
            <line x1="253" y1="129" x2="267" y2="129" stroke="#f58634" strokeWidth="2.5" />
            <line x1="253" y1="135" x2="267" y2="135" stroke="#f58634" strokeWidth="2.5" />

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

            {/* === N-GLYCAN CORE (CH2 Cavity) === */}
            <g>
              <motion.g
                animate={
                  activeStage === 3
                    ? { scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }
                    : { scale: 1, opacity: 0.85 }
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Left Glycan Core */}
                <circle cx="242" cy="180" r="5.5" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="232" cy="175" r="4" fill="#00aeef" stroke="#ffffff" strokeWidth="1" />
                <circle cx="232" cy="185" r="4" fill="#0f2231" stroke="#ffffff" strokeWidth="1" />
                <line x1="242" y1="180" x2="232" y2="175" stroke="#f58634" strokeWidth="1.5" />
                <line x1="242" y1="180" x2="232" y2="185" stroke="#f58634" strokeWidth="1.5" />

                {/* Right Glycan Core */}
                <circle cx="278" cy="180" r="5.5" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="288" cy="175" r="4" fill="#00aeef" stroke="#ffffff" strokeWidth="1" />
                <circle cx="288" cy="185" r="4" fill="#0f2231" stroke="#ffffff" strokeWidth="1" />
                <line x1="278" y1="180" x2="288" y2="175" stroke="#f58634" strokeWidth="1.5" />
                <line x1="278" y1="180" x2="288" y2="185" stroke="#f58634" strokeWidth="1.5" />
              </motion.g>

              {activeStage === 3 && (
                <text x="260" y="200" textAnchor="middle" fill="#f58634" fontSize="9" fontWeight="bold" letterSpacing="0.5">
                  Asn-297 Glycan
                </text>
              )}
            </g>
          </motion.g>

          {/* Domain Annotation Labels */}
          <g opacity="0.85">
            {/* Fab Label Left */}
            <rect x="50" y="80" width="60" height="20" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
            <text x="80" y="93.5" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Fab (VH/VL)</text>

            {/* Fab Label Right */}
            <rect x="410" y="80" width="60" height="20" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
            <text x="440" y="93.5" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Fab (VH/VL)</text>

            {/* Fc Label Bottom */}
            <rect x="225" y="255" width="70" height="20" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
            <text x="260" y="268.5" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Fc Domain</text>
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
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00aeef]">
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
            <ShieldCheck className="w-4 h-4 text-[#00aeef]" />
            <span className="text-xs font-bold text-neutral-800">{current.metric}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Interactive Stage Step Indicator Bar */}
      <div className="relative z-10 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {MAB_STAGES.map((s) => (
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
