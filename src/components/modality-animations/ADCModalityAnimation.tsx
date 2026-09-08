'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Syringe, ShieldCheck, Zap, Activity, Atom } from 'lucide-react';

const ADC_STAGES = [
  {
    id: 1,
    title: 'Site-Specific Linker Conjugation',
    subtitle: 'Engineered cysteine or enzymatic tag coupling achieving controlled stoichiometry without compromising antibody affinity.',
    badge: 'Conjugation: >98%',
    metric: 'DAR Distribution: Narrow',
    tag: 'Linker Chemistry',
  },
  {
    id: 2,
    title: 'Drug-to-Antibody Ratio (DAR 4)',
    subtitle: 'Characterized DAR profile (mean DAR: 3.8 - 4.2) balancing maximal antitumor cytotoxicity with systemic circulation tolerability.',
    badge: 'Target DAR: 4.0 ± 0.2',
    metric: 'Unconjugated mAb: <1.5%',
    tag: 'DAR Control',
  },
  {
    id: 3,
    title: 'Plasma Stability & Linker Integrity',
    subtitle: 'Cleavable valine-citrulline or non-cleavable thioether linkers preventing premature payload shedding in systemic circulation.',
    badge: 'Plasma Half-Life: Robust',
    metric: 'Free Payload: <0.05%',
    tag: 'Circulation Stability',
  },
  {
    id: 4,
    title: 'Receptor Endocytosis & Payload Release',
    subtitle: 'Antigen-mediated internalization into tumor lysosomes triggering enzymatic cleavage and intracellular payload activation.',
    badge: 'Cytotoxicity: Sub-Nanomolar',
    metric: 'Bystander Killing: Verified',
    tag: 'Targeted Delivery',
  },
];

export default function ADCModalityAnimation() {
  const [activeStage, setActiveStage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = ADC_STAGES.find((s) => s.id === activeStage) ?? ADC_STAGES[0];

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
            Antibody-Drug Conjugate (ADC) Platform
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/25 text-[#00aeef] text-xs font-bold tracking-wide flex items-center gap-1.5">
            <Syringe className="w-3.5 h-3.5 text-[#f58634]" />
            {current.tag}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#f58634]/10 border border-[#f58634]/25 text-[#f58634] text-xs font-bold tracking-wide hidden sm:inline-block">
            {current.badge}
          </span>
        </div>
      </div>

      {/* Center SVG Visualization: ADC Structure with Payloads */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center min-h-[260px] sm:min-h-[290px]">
        <svg viewBox="0 0 520 280" className="w-full h-full max-h-[300px]" fill="none">
          <defs>
            <radialGradient id="adcAuraGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f58634" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#00aeef" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="payloadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f58634" />
              <stop offset="100%" stopColor="#d9731f" />
            </linearGradient>
            <filter id="payloadGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Aura */}
          <circle cx="260" cy="140" r="130" fill="url(#adcAuraGlow)" />

          {/* Internalization / Tumor Cell Membrane (Stage 4) */}
          {activeStage === 4 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Cell membrane curved barrier */}
              <path
                d="M 20 260 Q 260 220 500 260"
                stroke="#0f2231"
                strokeWidth="3"
                strokeDasharray="6 3"
                opacity="0.4"
              />
              <text x="260" y="275" textAnchor="middle" fill="#0f2231" fontSize="10" fontWeight="bold">
                Tumor Cell Membrane (Endosomal Cleavage Zone)
              </text>
            </motion.g>
          )}

          {/* Main Antibody Chassis */}
          <motion.g
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* === LEFT FAB ARM === */}
            <path
              d="M 245 130 L 160 70 L 135 52"
              stroke="#00aeef"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 195 125 L 140 85 L 115 68"
              stroke="#00aeef"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
            {/* Disulfide */}
            <line x1="165" y1="102" x2="155" y2="95" stroke="#ffffff" strokeWidth="2.5" />

            {/* === RIGHT FAB ARM === */}
            <path
              d="M 275 130 L 360 70 L 385 52"
              stroke="#00aeef"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 325 125 L 380 85 L 405 68"
              stroke="#00aeef"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
            {/* Disulfide */}
            <line x1="355" y1="102" x2="365" y2="95" stroke="#ffffff" strokeWidth="2.5" />

            {/* === HINGE REGION === */}
            <rect x="250" y="125" width="20" height="15" rx="4" fill="#0f2231" />

            {/* === FC STEM === */}
            <path
              d="M 252 140 L 252 210 C 252 230 244 245 244 250"
              stroke="#00aeef"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 268 140 L 268 210 C 268 230 276 245 276 250"
              stroke="#00aeef"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* ==================================================== */}
            {/* 4 SITE-SPECIFIC DRUG CONJUGATES (DAR 4 CONFIGURATION) */}
            {/* ==================================================== */}

            {/* Payload 1: Left Fab Hinge Conjugate */}
            <g>
              {/* Chemical Linker Arm */}
              <motion.line
                x1="180" y1="85" x2="135" y2="120"
                stroke="#0f2231" strokeWidth="2.5" strokeDasharray="3 2"
              />
              <circle cx="180" cy="85" r="4" fill="#0f2231" />
              {/* Cytotoxic Payload Warhead */}
              <motion.g
                animate={
                  activeStage === 4
                    ? { y: [0, 45, 90], opacity: [1, 1, 0] }
                    : { scale: [1, 1.15, 1] }
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                <polygon
                  points="135,110 145,120 135,130 125,120"
                  fill="url(#payloadGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#payloadGlow)"
                />
                <circle cx="135" cy="120" r="3" fill="#ffffff" />
              </motion.g>
            </g>

            {/* Payload 2: Right Fab Hinge Conjugate */}
            <g>
              {/* Chemical Linker Arm */}
              <motion.line
                x1="340" y1="85" x2="385" y2="120"
                stroke="#0f2231" strokeWidth="2.5" strokeDasharray="3 2"
              />
              <circle cx="340" cy="85" r="4" fill="#0f2231" />
              {/* Cytotoxic Payload Warhead */}
              <motion.g
                animate={
                  activeStage === 4
                    ? { y: [0, 45, 90], opacity: [1, 1, 0] }
                    : { scale: [1, 1.15, 1] }
                }
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              >
                <polygon
                  points="385,110 395,120 385,130 375,120"
                  fill="url(#payloadGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#payloadGlow)"
                />
                <circle cx="385" cy="120" r="3" fill="#ffffff" />
              </motion.g>
            </g>

            {/* Payload 3: Left CH2 Stem Conjugate */}
            <g>
              {/* Chemical Linker Arm */}
              <motion.line
                x1="245" y1="180" x2="195" y2="190"
                stroke="#0f2231" strokeWidth="2.5" strokeDasharray="3 2"
              />
              <circle cx="245" cy="180" r="4" fill="#0f2231" />
              {/* Cytotoxic Payload Warhead */}
              <motion.g
                animate={
                  activeStage === 4
                    ? { y: [0, 35, 70], opacity: [1, 1, 0] }
                    : { scale: [1, 1.15, 1] }
                }
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              >
                <polygon
                  points="195,180 205,190 195,200 185,190"
                  fill="url(#payloadGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#payloadGlow)"
                />
                <circle cx="195" cy="190" r="3" fill="#ffffff" />
              </motion.g>
            </g>

            {/* Payload 4: Right CH2 Stem Conjugate */}
            <g>
              {/* Chemical Linker Arm */}
              <motion.line
                x1="275" y1="180" x2="325" y2="190"
                stroke="#0f2231" strokeWidth="2.5" strokeDasharray="3 2"
              />
              <circle cx="275" cy="180" r="4" fill="#0f2231" />
              {/* Cytotoxic Payload Warhead */}
              <motion.g
                animate={
                  activeStage === 4
                    ? { y: [0, 35, 70], opacity: [1, 1, 0] }
                    : { scale: [1, 1.15, 1] }
                }
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                <polygon
                  points="325,180 335,190 325,200 315,190"
                  fill="url(#payloadGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#payloadGlow)"
                />
                <circle cx="325" cy="190" r="3" fill="#ffffff" />
              </motion.g>
            </g>
          </motion.g>

          {/* Annotations */}
          <g opacity="0.9">
            {/* Antibody Vehicle Label */}
            <rect x="200" y="30" width="120" height="20" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
            <text x="260" y="43.5" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Targeting mAb Vehicle</text>

            {/* Val-Cit Linker Label */}
            <rect x="55" y="145" width="105" height="20" rx="5" fill="#ffffff" stroke="#0f2231" strokeWidth="1" />
            <text x="107.5" y="158.5" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Cleavable Linker (Val-Cit)</text>

            {/* Payload Label */}
            <rect x="360" y="145" width="115" height="20" rx="5" fill="#ffffff" stroke="#f58634" strokeWidth="1" />
            <text x="417.5" y="158.5" textAnchor="middle" fill="#f58634" fontSize="9" fontWeight="bold">Cytotoxic Warhead (DAR 4)</text>
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
        {ADC_STAGES.map((s) => (
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
