'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Dna, ShieldCheck, Activity, Layers, Repeat } from 'lucide-react';

const PROTEIN_STAGES = [
  {
    id: 1,
    title: 'Inclusion Body Solubilization & Redox Refolding',
    subtitle: 'High-density E. coli & mammalian biomass refolded using controlled redox buffers (GSH/GSSG) achieving >90% bioactive yield.',
    badge: 'Refolding Yield: >92%',
    metric: 'Native Conformation: >99%',
    tag: 'Protein Refolding',
  },
  {
    id: 2,
    title: 'Secondary Structure Folding (Alpha/Beta)',
    subtitle: 'Hydrogen-bonded alpha-helices and anti-parallel pleated beta-sheets stabilizing catalytic and receptor-binding domains.',
    badge: 'CD Spectroscopy: Conforming',
    metric: 'Secondary Ratio: 42% α / 38% β',
    tag: 'Structural Integrity',
  },
  {
    id: 3,
    title: 'Solid-Phase Peptide Synthesis (SPPS)',
    subtitle: 'Fmoc/tBu stepwise amino acid coupling with high-efficiency deprotection and microwave-assisted peptide elongation.',
    badge: 'Coupling Efficiency: >99.5%',
    metric: 'Purity by RP-HPLC: >98.5%',
    tag: 'Peptide Synthesis',
  },
  {
    id: 4,
    title: 'Intramolecular Disulfide Bridge Engineering',
    subtitle: 'Regioselective orthogonal protection guaranteeing correct cysteine pairing and preventing misfolded multimeric aggregates.',
    badge: 'Disulfide Fidelity: 100%',
    metric: 'Bioactivity (EC50): Validated',
    tag: 'Conformational Stability',
  },
];

export default function ProteinPeptideModalityAnimation() {
  const [activeStage, setActiveStage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = PROTEIN_STAGES.find((s) => s.id === activeStage) ?? PROTEIN_STAGES[0];

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
            Recombinant Protein & Peptide Platform
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/25 text-[#00aeef] text-xs font-bold tracking-wide flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#f58634]" />
            {current.tag}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#f58634]/10 border border-[#f58634]/25 text-[#f58634] text-xs font-bold tracking-wide hidden sm:inline-block">
            {current.badge}
          </span>
        </div>
      </div>

      {/* Center SVG Visualization: Protein Alpha-Helix & Beta-Sheet Ribbon + Synthetic Peptide Assembly */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center min-h-[260px] sm:min-h-[290px]">
        <svg viewBox="0 0 520 280" className="w-full h-full max-h-[300px]" fill="none">
          <defs>
            <radialGradient id="proteinAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00aeef" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#f58634" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="helixGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00aeef" />
              <stop offset="50%" stopColor="#0f2231" />
              <stop offset="100%" stopColor="#00aeef" />
            </linearGradient>
            <linearGradient id="sheetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f58634" />
              <stop offset="100%" stopColor="#ffb074" />
            </linearGradient>
            <filter id="glow3D" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ambient Glow */}
          <circle cx="260" cy="140" r="130" fill="url(#proteinAura)" />

          {/* Background Molecular Field Coordinate Ring */}
          <circle cx="260" cy="140" r="115" stroke="#0f2231" strokeOpacity="0.1" strokeWidth="1.5" strokeDasharray="8 6" />

          {/* MAIN 3D PROTEIN & PEPTIDE STRUCTURE MODEL */}
          <motion.g
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* === 1. ALPHA-HELIX SPIRAL RIBBON (Left Section - Blue) === */}
            <g filter="url(#glow3D)">
              {/* Back coils */}
              <path
                d="M 80 80 Q 95 65 110 80 Q 125 95 140 80 Q 155 65 170 80 Q 185 95 200 80"
                stroke="#0f2231"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* Front illuminated coils */}
              <path
                d="M 80 80 Q 95 105 110 80 Q 125 55 140 80 Q 155 105 170 80 Q 185 55 200 80"
                stroke="#00aeef"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Hydrogen Bond bridges inside helix */}
              <line x1="95" y1="88" x2="110" y2="80" stroke="#f58634" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="125" y1="72" x2="140" y2="80" stroke="#f58634" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="155" y1="88" x2="170" y2="80" stroke="#f58634" strokeWidth="2" strokeDasharray="3 2" />
            </g>

            {/* Connecting Flexible Loop */}
            <path
              d="M 200 80 C 230 70, 240 110, 260 115"
              stroke="#0f2231"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* === 2. ANTI-PARALLEL BETA-SHEET PLEATED STRANDS (Right Section - Orange) === */}
            <g filter="url(#glow3D)">
              {/* Top Strand */}
              <path
                d="M 260 115 L 340 100 L 420 85 L 450 80"
                stroke="#f58634"
                strokeWidth="14"
                strokeLinecap="square"
              />
              {/* Strand Arrowhead */}
              <polygon points="450,70 475,80 450,90" fill="#f58634" />

              {/* Hairpin Turn */}
              <path
                d="M 470 95 C 495 115, 495 145, 470 165"
                stroke="#0f2231"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Bottom Anti-Parallel Strand */}
              <path
                d="M 465 175 L 390 190 L 310 205 L 260 215"
                stroke="#f58634"
                strokeWidth="14"
                strokeLinecap="square"
              />
              {/* Strand Arrowhead pointing left */}
              <polygon points="265,205 240,215 265,225" fill="#f58634" />

              {/* Interstrand Hydrogen Bond ladders */}
              <line x1="330" y1="102" x2="330" y2="200" stroke="#00aeef" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="370" y1="95" x2="370" y2="194" stroke="#00aeef" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="410" y1="88" x2="410" y2="187" stroke="#00aeef" strokeWidth="2" strokeDasharray="3 3" />
            </g>

            {/* === 3. DISULFIDE BRIDGE LOCK (Stage 4) === */}
            <g>
              <motion.g
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                {/* Disulfide Cys-1 to Cys-2 bond line */}
                <line x1="160" y1="80" x2="260" y2="150" stroke="#f58634" strokeWidth="3" />
                <circle cx="160" cy="80" r="5" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="260" cy="150" r="5" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />
                <text x="215" y="110" textAnchor="middle" fill="#f58634" fontSize="9" fontWeight="bold">S - S Bridge</text>
              </motion.g>
            </g>

            {/* === 4. SYNTHETIC PEPTIDE CHAIN ELONGATION FLOW (Stage 3) === */}
            <g>
              {/* Amino Acid Residue Beads */}
              {[
                { x: 100, y: 220, label: 'Ala', color: '#00aeef' },
                { x: 140, y: 215, label: 'Arg', color: '#f58634' },
                { x: 180, y: 225, label: 'Cys', color: '#0f2231' },
                { x: 220, y: 210, label: 'Leu', color: '#00aeef' },
              ].map((res, i) => (
                <g key={i}>
                  <motion.line
                    x1={res.x - 20} y1={220} x2={res.x} y2={res.y}
                    stroke="#0f2231" strokeWidth="2"
                  />
                  <motion.circle
                    cx={res.x} cy={res.y} r="14"
                    fill={res.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    animate={
                      activeStage === 3
                        ? { scale: [1, 1.15, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                  <text x={res.x} y={res.y + 3.5} textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                    {res.label}
                  </text>
                </g>
              ))}

              {activeStage === 3 && (
                <motion.line
                  x1="234" y1="210" x2="270" y2="210"
                  stroke="#00aeef" strokeWidth="3" strokeDasharray="3 2"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </g>
          </motion.g>

          {/* Structural Annotations */}
          <g opacity="0.9">
            {/* Alpha Helix Label */}
            <rect x="75" y="35" width="95" height="20" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
            <text x="122.5" y="48.5" textAnchor="middle" fill="#00aeef" fontSize="9" fontWeight="bold">α-Helix Spiral</text>

            {/* Beta Sheet Label */}
            <rect x="330" y="45" width="115" height="20" rx="5" fill="#ffffff" stroke="#f58634" strokeWidth="1" />
            <text x="387.5" y="58.5" textAnchor="middle" fill="#f58634" fontSize="9" fontWeight="bold">Pleated β-Sheet Ribbon</text>

            {/* Synthetic Peptide Assembly Label */}
            <rect x="70" y="250" width="155" height="20" rx="5" fill="#ffffff" stroke="#0f2231" strokeWidth="1" />
            <text x="147.5" y="263.5" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Synthetic Peptide Backbone [-CO-NH-]</text>
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
        {PROTEIN_STAGES.map((s) => (
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
