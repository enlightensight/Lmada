'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Syringe, ShieldCheck, Zap, Activity, CheckCircle2, Target } from 'lucide-react';

const ADC_STAGES = [
  {
    id: 1,
    stepNum: '01',
    shortTitle: 'Site-Specific Conjugation',
    title: 'Site-Specific Linker Conjugation',
    subtitle: 'Engineered cysteine or enzymatic tag coupling achieving controlled stoichiometry without compromising antibody affinity.',
    badge: 'Conjugation: >98%',
    metric: 'DAR Distribution: Narrow',
    tag: 'Linker Chemistry',
  },
  {
    id: 2,
    stepNum: '02',
    shortTitle: 'DAR 4 Stoichiometry',
    title: 'Drug-to-Antibody Ratio (DAR 4)',
    subtitle: 'Characterized DAR profile (mean DAR: 3.8 - 4.2) balancing maximal antitumor cytotoxicity with systemic circulation tolerability.',
    badge: 'Target DAR: 4.0 ± 0.2',
    metric: 'Unconjugated mAb: <1.5%',
    tag: 'DAR Control',
  },
  {
    id: 3,
    stepNum: '03',
    shortTitle: 'Plasma Linker Stability',
    title: 'Plasma Stability & Linker Integrity',
    subtitle: 'Cleavable valine-citrulline or non-cleavable thioether linkers preventing premature payload shedding in systemic circulation.',
    badge: 'Plasma Half-Life: Robust',
    metric: 'Free Payload: <0.05%',
    tag: 'Circulation Stability',
  },
  {
    id: 4,
    stepNum: '04',
    shortTitle: 'Receptor Endocytosis',
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
      className="relative w-full min-h-[480px] md:min-h-[520px] bg-gradient-to-b from-white via-slate-50/50 to-neutral-100/60 p-5 sm:p-7 flex flex-col justify-between select-none overflow-hidden rounded-[16px] border border-neutral-200/90 shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Micro-grid background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0f2231_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Top Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/80 pb-3.5">
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

      {/* Center SVG Visualization: ADC Structure with Process-Accurate Stage Highlights */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center min-h-[260px] sm:min-h-[290px]">
        <svg viewBox="0 0 520 280" className="w-full h-full max-h-[300px]" fill="none">
          <defs>
            <radialGradient id="adcAuraGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f58634" stopOpacity="0.14" />
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
            <filter id="cyanHighlight" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Aura */}
          <circle cx="260" cy="140" r="130" fill="url(#adcAuraGlow)" />

          {/* ================= STAGE 3: PLASMA CIRCULATION FLOW FIELD ================= */}
          {activeStage === 3 && (
            <g opacity="0.75">
              {[60, 120, 180, 240].map((y, idx) => (
                <motion.line
                  key={idx}
                  x1="10"
                  y1={y}
                  x2="510"
                  y2={y}
                  stroke="#00aeef"
                  strokeWidth="1.2"
                  strokeDasharray="12 8"
                  animate={{ strokeDashoffset: [0, -40] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: idx * 0.2 }}
                  opacity="0.3"
                />
              ))}
              {/* Protective Circulation Sheath */}
              <ellipse cx="260" cy="140" rx="200" ry="110" fill="none" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
              <rect x="180" y="248" width="160" height="22" rx="6" fill="#ffffff" stroke="#00aeef" strokeWidth="1.2" />
              <text x="260" y="262.5" textAnchor="middle" fill="#00aeef" fontSize="9" fontWeight="bold">
                ✓ 0.0% Free Payload Shedding in Plasma
              </text>
            </g>
          )}

          {/* ================= STAGE 4: TUMOR MEMBRANE & ENDOSOMAL CLEAVAGE ZONE ================= */}
          {activeStage === 4 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tumor Cell Membrane Boundary */}
              <path
                d="M 20 250 Q 260 215 500 250"
                stroke="#0f2231"
                strokeWidth="3"
                strokeDasharray="6 3"
                opacity="0.5"
              />
              {/* Tumor Receptors docking to antibody */}
              <circle cx="244" cy="235" r="5" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="276" cy="235" r="5" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />
              <text x="260" y="270" textAnchor="middle" fill="#0f2231" fontSize="10" fontWeight="bold">
                Tumor Cell Membrane (Endosomal Cleavage Zone)
              </text>
            </motion.g>
          )}

          {/* ================= MAIN ANTIBODY CHASSIS ================= */}
          <motion.g
            animate={{ y: activeStage === 4 ? [0, 8, 0] : [0, -4, 0] }}
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
              opacity="0.85"
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
              opacity="0.85"
            />
            {/* Disulfide */}
            <line x1="355" y1="102" x2="365" y2="95" stroke="#ffffff" strokeWidth="2.5" />

            {/* === HINGE REGION === */}
            <rect x="250" y="125" width="20" height="15" rx="4" fill="#0f2231" />

            {/* === FC STEM === */}
            <path
              d="M 252 140 L 252 205 C 252 225 244 240 244 245"
              stroke="#00aeef"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 268 140 L 268 205 C 268 225 276 240 276 245"
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
                stroke={activeStage === 3 ? '#00aeef' : '#0f2231'}
                strokeWidth={activeStage === 1 ? '3.5' : '2.5'}
                strokeDasharray={activeStage === 1 ? 'none' : '3 2'}
                animate={activeStage === 1 ? { stroke: ['#00aeef', '#f58634', '#00aeef'] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {/* Conjugation Anchor Site */}
              <circle cx="180" cy="85" r={activeStage === 1 ? 6 : 4} fill={activeStage === 1 ? '#00aeef' : '#0f2231'} />
              {activeStage === 1 && (
                <motion.circle
                  cx="180" cy="85" r="12" fill="none" stroke="#00aeef" strokeWidth="1.5"
                  animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}

              {/* Cytotoxic Payload Warhead */}
              <motion.g
                animate={
                  activeStage === 4
                    ? { y: [0, 45, 95], opacity: [1, 1, 0] }
                    : activeStage === 2
                    ? { scale: [1, 1.25, 1] }
                    : { scale: [1, 1.08, 1] }
                }
                transition={{ duration: activeStage === 4 ? 2 : 1.8, repeat: Infinity }}
              >
                <polygon
                  points="135,110 145,120 135,130 125,120"
                  fill="url(#payloadGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#payloadGlow)"
                />
                <circle cx="135" cy="120" r="3" fill="#ffffff" />
                {/* DAR Counter Badge (Stage 2) */}
                {activeStage === 2 && (
                  <g transform="translate(100, 110)">
                    <rect x="0" y="0" width="22" height="14" rx="4" fill="#f58634" />
                    <text x="11" y="10" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">#1</text>
                  </g>
                )}
              </motion.g>
            </g>

            {/* Payload 2: Right Fab Hinge Conjugate */}
            <g>
              {/* Chemical Linker Arm */}
              <motion.line
                x1="340" y1="85" x2="385" y2="120"
                stroke={activeStage === 3 ? '#00aeef' : '#0f2231'}
                strokeWidth={activeStage === 1 ? '3.5' : '2.5'}
                strokeDasharray={activeStage === 1 ? 'none' : '3 2'}
                animate={activeStage === 1 ? { stroke: ['#00aeef', '#f58634', '#00aeef'] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              {/* Conjugation Anchor Site */}
              <circle cx="340" cy="85" r={activeStage === 1 ? 6 : 4} fill={activeStage === 1 ? '#00aeef' : '#0f2231'} />
              {activeStage === 1 && (
                <motion.circle
                  cx="340" cy="85" r="12" fill="none" stroke="#00aeef" strokeWidth="1.5"
                  animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                />
              )}

              {/* Cytotoxic Payload Warhead */}
              <motion.g
                animate={
                  activeStage === 4
                    ? { y: [0, 45, 95], opacity: [1, 1, 0] }
                    : activeStage === 2
                    ? { scale: [1, 1.25, 1] }
                    : { scale: [1, 1.08, 1] }
                }
                transition={{ duration: activeStage === 4 ? 2 : 1.8, repeat: Infinity, delay: 0.2 }}
              >
                <polygon
                  points="385,110 395,120 385,130 375,120"
                  fill="url(#payloadGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#payloadGlow)"
                />
                <circle cx="385" cy="120" r="3" fill="#ffffff" />
                {/* DAR Counter Badge (Stage 2) */}
                {activeStage === 2 && (
                  <g transform="translate(398, 110)">
                    <rect x="0" y="0" width="22" height="14" rx="4" fill="#f58634" />
                    <text x="11" y="10" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">#2</text>
                  </g>
                )}
              </motion.g>
            </g>

            {/* Payload 3: Left CH2 Stem Conjugate */}
            <g>
              {/* Chemical Linker Arm */}
              <motion.line
                x1="245" y1="180" x2="195" y2="190"
                stroke={activeStage === 3 ? '#00aeef' : '#0f2231'}
                strokeWidth={activeStage === 1 ? '3.5' : '2.5'}
                strokeDasharray={activeStage === 1 ? 'none' : '3 2'}
                animate={activeStage === 1 ? { stroke: ['#00aeef', '#f58634', '#00aeef'] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
              <circle cx="245" cy="180" r={activeStage === 1 ? 6 : 4} fill={activeStage === 1 ? '#00aeef' : '#0f2231'} />
              {activeStage === 1 && (
                <motion.circle
                  cx="245" cy="180" r="12" fill="none" stroke="#00aeef" strokeWidth="1.5"
                  animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                />
              )}

              {/* Cytotoxic Payload Warhead */}
              <motion.g
                animate={
                  activeStage === 4
                    ? { y: [0, 40, 80], opacity: [1, 1, 0] }
                    : activeStage === 2
                    ? { scale: [1, 1.25, 1] }
                    : { scale: [1, 1.08, 1] }
                }
                transition={{ duration: activeStage === 4 ? 2 : 1.8, repeat: Infinity, delay: 0.4 }}
              >
                <polygon
                  points="195,180 205,190 195,200 185,190"
                  fill="url(#payloadGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#payloadGlow)"
                />
                <circle cx="195" cy="190" r="3" fill="#ffffff" />
                {/* DAR Counter Badge (Stage 2) */}
                {activeStage === 2 && (
                  <g transform="translate(160, 180)">
                    <rect x="0" y="0" width="22" height="14" rx="4" fill="#f58634" />
                    <text x="11" y="10" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">#3</text>
                  </g>
                )}
              </motion.g>
            </g>

            {/* Payload 4: Right CH2 Stem Conjugate */}
            <g>
              {/* Chemical Linker Arm */}
              <motion.line
                x1="275" y1="180" x2="325" y2="190"
                stroke={activeStage === 3 ? '#00aeef' : '#0f2231'}
                strokeWidth={activeStage === 1 ? '3.5' : '2.5'}
                strokeDasharray={activeStage === 1 ? 'none' : '3 2'}
                animate={activeStage === 1 ? { stroke: ['#00aeef', '#f58634', '#00aeef'] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />
              <circle cx="275" cy="180" r={activeStage === 1 ? 6 : 4} fill={activeStage === 1 ? '#00aeef' : '#0f2231'} />
              {activeStage === 1 && (
                <motion.circle
                  cx="275" cy="180" r="12" fill="none" stroke="#00aeef" strokeWidth="1.5"
                  animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                />
              )}

              {/* Cytotoxic Payload Warhead */}
              <motion.g
                animate={
                  activeStage === 4
                    ? { y: [0, 40, 80], opacity: [1, 1, 0] }
                    : activeStage === 2
                    ? { scale: [1, 1.25, 1] }
                    : { scale: [1, 1.08, 1] }
                }
                transition={{ duration: activeStage === 4 ? 2 : 1.8, repeat: Infinity, delay: 0.6 }}
              >
                <polygon
                  points="325,180 335,190 325,200 315,190"
                  fill="url(#payloadGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#payloadGlow)"
                />
                <circle cx="325" cy="190" r="3" fill="#ffffff" />
                {/* DAR Counter Badge (Stage 2) */}
                {activeStage === 2 && (
                  <g transform="translate(338, 180)">
                    <rect x="0" y="0" width="22" height="14" rx="4" fill="#f58634" />
                    <text x="11" y="10" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">#4</text>
                  </g>
                )}
              </motion.g>
            </g>
          </motion.g>

          {/* ================= CLEAN ANNOTATIONS (ZERO OVERLAPS) ================= */}
          <g opacity="0.95">
            {/* Top Antibody Vehicle Label */}
            <rect x="200" y="24" width="120" height="22" rx="6" fill="#ffffff" stroke="#00aeef" strokeWidth="1.2" filter="url(#payloadGlow)" />
            <text x="260" y="38" textAnchor="middle" fill="#0f2231" fontSize="9.5" fontWeight="bold">Targeting mAb Vehicle</text>

            {/* Left Cleavable Linker Label (Positioned Safely to Left of Payload 1) */}
            <g transform="translate(18, 145)">
              <rect x="0" y="0" width="118" height="22" rx="6" fill="#ffffff" stroke="#0f2231" strokeWidth="1.2" />
              <text x="59" y="14" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Cleavable Linker (Val-Cit)</text>
              <line x1="118" y1="11" x2="135" y2="120" stroke="#0f2231" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
            </g>

            {/* Right Cytotoxic Warhead Label (Positioned Safely to Right of Payload 2) */}
            <g transform="translate(382, 145)">
              <rect x="0" y="0" width="124" height="22" rx="6" fill="#ffffff" stroke="#f58634" strokeWidth="1.2" />
              <text x="62" y="14" textAnchor="middle" fill="#f58634" fontSize="9" fontWeight="bold">Cytotoxic Warhead (DAR 4)</text>
              <line x1="0" y1="11" x2="-2" y2="120" stroke="#f58634" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
            </g>
          </g>
        </svg>
      </div>

      {/* Stage Narrative Callout Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 bg-white/95 rounded-[12px] p-4 sm:p-5 border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 mb-2"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00aeef]">
                Stage {current.stepNum}
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

      {/* Interactive 4-Stage Step Indicator Bar (Fixed Layout with Full Descriptive Names) */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-2 border-t border-neutral-100">
        {ADC_STAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={`px-3 py-2.5 rounded-[10px] text-left transition-all duration-200 border cursor-pointer flex items-center justify-between gap-2 ${
              activeStage === s.id
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-2 ring-neutral-900/20'
                : 'bg-white/90 hover:bg-neutral-100 text-neutral-700 border-neutral-200/90 shadow-xs'
            }`}
          >
            <div className="min-w-0 flex-1">
              <span className={`block text-[10px] font-bold uppercase tracking-wider ${activeStage === s.id ? 'text-[#f58634]' : 'text-neutral-400'}`}>
                Stage {s.stepNum}
              </span>
              <span className="text-xs sm:text-[13px] font-semibold block leading-tight truncate">
                {s.shortTitle}
              </span>
            </div>
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
