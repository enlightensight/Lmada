'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Dna, ShieldCheck, Activity, Layers, Repeat, CheckCircle2 } from 'lucide-react';

const PROTEIN_STAGES = [
  {
    id: 1,
    tabLabel: 'Inclusion Refolding',
    fullTitle: 'Inclusion Body Solubilization & Redox Refolding',
    subtitle: 'High-density E. coli & mammalian biomass refolded using controlled redox buffers (GSH/GSSG) achieving >90% bioactive yield.',
    badge: 'Refolding Yield: >92%',
    metric: 'Native Conformation: >99%',
    tag: 'Redox Refolding',
  },
  {
    id: 2,
    tabLabel: 'Secondary Structure',
    fullTitle: 'Secondary Structure Folding (Alpha/Beta)',
    subtitle: 'Hydrogen-bonded alpha-helices and anti-parallel pleated beta-sheets stabilizing catalytic and receptor-binding domains.',
    badge: 'CD Spectroscopy: Conforming',
    metric: 'Secondary Ratio: 42% α / 38% β',
    tag: 'Structural Integrity',
  },
  {
    id: 3,
    tabLabel: 'Solid-Phase SPPS',
    fullTitle: 'Solid-Phase Peptide Synthesis (SPPS)',
    subtitle: 'Fmoc/tBu stepwise amino acid coupling with high-efficiency deprotection and microwave-assisted peptide elongation.',
    badge: 'Coupling Efficiency: >99.5%',
    metric: 'Purity by RP-HPLC: >98.5%',
    tag: 'Peptide Synthesis',
  },
  {
    id: 4,
    tabLabel: 'Disulfide S-S Lock',
    fullTitle: 'Intramolecular Disulfide Bridge Engineering',
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

      {/* Center SVG Visualization */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center min-h-[260px] sm:min-h-[290px]">
        <svg viewBox="0 0 520 280" className="w-full h-full max-h-[300px]" fill="none">
          <defs>
            <radialGradient id="proteinAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00aeef" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#f58634" stopOpacity="0" />
            </radialGradient>
            <filter id="glow3D" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ambient Glow */}
          <circle cx="260" cy="140" r="130" fill="url(#proteinAura)" />

          {/* Coordinate Guide Ring */}
          <circle cx="260" cy="140" r="118" stroke="#0f2231" strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="8 6" />

          {/* ======================================================== */}
          {/* STAGE 1: INCLUSION BODY SOLUBILIZATION & REDOX REFOLDING */}
          {/* ======================================================== */}
          {activeStage === 1 && (
            <g>
              {/* Disordered insoluble aggregate reforming into ordered state */}
              <motion.g
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <circle cx="90" cy="130" r="32" fill="#0f2231" fillOpacity="0.06" stroke="#0f2231" strokeWidth="1.5" strokeDasharray="4 3" />
                <text x="90" y="133" textAnchor="middle" fill="#0f2231" fontSize="9" fontWeight="bold">Inclusion Body</text>
                <text x="90" y="145" textAnchor="middle" fill="#00aeef" fontSize="7.5" fontWeight="semibold">Chaotropic Solubilization</text>
              </motion.g>

              {/* Redox Buffer Waves (GSH / GSSG) */}
              {[
                { x: 135, y: 115, label: 'GSH', delay: 0 },
                { x: 160, y: 145, label: 'GSSG', delay: 0.3 },
                { x: 190, y: 120, label: 'GSH', delay: 0.6 },
              ].map((mol, idx) => (
                <motion.g
                  key={idx}
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ repeat: Infinity, duration: 2.2, delay: mol.delay }}
                >
                  <circle cx={mol.x} cy={mol.y} r="10" fill="#f58634" fillOpacity="0.15" stroke="#f58634" strokeWidth="1.5" />
                  <text x={mol.x} y={mol.y + 3} textAnchor="middle" fill="#f58634" fontSize="7.5" fontWeight="bold">{mol.label}</text>
                </motion.g>
              ))}

              {/* Directed Refolding Energy Funnel Arrow */}
              <motion.path
                d="M 125 130 C 160 130, 180 120, 220 100"
                stroke="#00aeef"
                strokeWidth="2.5"
                strokeDasharray="5 3"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              <polygon points="225,97 215,95 220,105" fill="#00aeef" />
            </g>
          )}

          {/* ======================================================== */}
          {/* MAIN 3D STRUCTURE: ALPHA HELIX + BETA SHEET              */}
          {/* ======================================================== */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* === 1. ALPHA-HELIX SPIRAL RIBBON (Left Section) === */}
            <g
              filter="url(#glow3D)"
              opacity={activeStage === 2 ? 1 : 0.75}
            >
              {/* Back coils */}
              <path
                d="M 80 80 Q 95 65 110 80 Q 125 95 140 80 Q 155 65 170 80 Q 185 95 200 80"
                stroke="#0f2231"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.45"
              />
              {/* Front illuminated coils */}
              <motion.path
                d="M 80 80 Q 95 105 110 80 Q 125 55 140 80 Q 155 105 170 80 Q 185 55 200 80"
                stroke="#00aeef"
                strokeWidth={activeStage === 2 ? 14 : 11}
                strokeLinecap="round"
                animate={activeStage === 2 ? { strokeWidth: [11, 14, 11] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
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

            {/* === 2. ANTI-PARALLEL BETA-SHEET STRANDS (Right Section) === */}
            <g
              filter="url(#glow3D)"
              opacity={activeStage === 2 ? 1 : 0.75}
            >
              {/* Top Strand */}
              <motion.path
                d="M 260 115 L 340 100 L 420 85 L 450 80"
                stroke="#f58634"
                strokeWidth={activeStage === 2 ? 15 : 12}
                strokeLinecap="square"
                animate={activeStage === 2 ? { strokeWidth: [12, 15, 12] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <polygon points="450,70 475,80 450,90" fill="#f58634" />

              {/* Hairpin Turn */}
              <path
                d="M 470 95 C 495 115, 495 145, 470 165"
                stroke="#0f2231"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Bottom Anti-Parallel Strand */}
              <motion.path
                d="M 465 175 L 390 190 L 310 205 L 260 215"
                stroke="#f58634"
                strokeWidth={activeStage === 2 ? 15 : 12}
                strokeLinecap="square"
                animate={activeStage === 2 ? { strokeWidth: [12, 15, 12] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <polygon points="265,205 240,215 265,225" fill="#f58634" />

              {/* Interstrand Hydrogen Bond ladders */}
              <line x1="330" y1="102" x2="330" y2="200" stroke="#00aeef" strokeWidth="2.5" strokeDasharray="3 3" />
              <line x1="370" y1="95" x2="370" y2="194" stroke="#00aeef" strokeWidth="2.5" strokeDasharray="3 3" />
              <line x1="410" y1="88" x2="410" y2="187" stroke="#00aeef" strokeWidth="2.5" strokeDasharray="3 3" />
            </g>

            {/* ======================================================== */}
            {/* === 3. DISULFIDE BRIDGE COVALENT LOCK (Stage 4 Focus)    */}
            {/* ======================================================== */}
            <g>
              {/* Disulfide Cys-1 to Cys-2 bond line */}
              <motion.line
                x1="160" y1="80" x2="260" y2="150"
                stroke="#f58634"
                strokeWidth={activeStage === 4 ? 4.5 : 3}
                animate={
                  activeStage === 4
                    ? { strokeWidth: [3, 5, 3], opacity: [0.7, 1, 0.7] }
                    : { opacity: 0.6 }
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <circle cx="160" cy="80" r="5.5" fill="#f58634" stroke="#ffffff" strokeWidth="2" />
              <circle cx="260" cy="150" r="5.5" fill="#f58634" stroke="#ffffff" strokeWidth="2" />

              {/* Stage 4 energetic pulse ring at Cys-Cys junction */}
              {activeStage === 4 && (
                <motion.circle
                  cx="210" cy="115" r="16"
                  fill="#f58634"
                  fillOpacity="0.2"
                  stroke="#f58634"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  animate={{ scale: [0.9, 1.4, 0.9], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              )}

              {/* CLEAN S-S BRIDGE CALLOUT (Positioned above bond with clear pointer to avoid overlap) */}
              <g transform="translate(195, 48)">
                <line x1="32" y1="18" x2="15" y2="60" stroke="#f58634" strokeWidth="1.5" strokeDasharray="3 2" />
                <rect x="0" y="0" width="76" height="18" rx="5" fill="#ffffff" stroke="#f58634" strokeWidth="1.2" />
                <text x="38" y="12.5" textAnchor="middle" fill="#f58634" fontSize="8.5" fontWeight="bold">
                  S - S Bridge
                </text>
              </g>
            </g>

            {/* ======================================================== */}
            {/* === 4. SYNTHETIC PEPTIDE RESIDUE BEADS (Stage 3 Focus)   */}
            {/* ======================================================== */}
            <g>
              {/* Amino Acid Residues */}
              {[
                { x: 95, y: 220, label: 'Ala', color: '#00aeef' },
                { x: 135, y: 216, label: 'Arg', color: '#f58634' },
                { x: 175, y: 224, label: 'Cys', color: '#0f2231' },
                { x: 215, y: 212, label: 'Leu', color: '#00aeef' },
                { x: 255, y: 220, label: 'Trp', color: '#f58634' },
              ].map((res, i) => (
                <g key={i}>
                  <motion.line
                    x1={res.x - 20} y1={220} x2={res.x} y2={res.y}
                    stroke="#0f2231" strokeWidth="2.5"
                  />
                  <motion.circle
                    cx={res.x} cy={res.y} r="13"
                    fill={res.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    animate={
                      activeStage === 3
                        ? { scale: [1, 1.2, 1], filter: 'drop-shadow(0 0 4px rgba(0,174,239,0.5))' }
                        : { scale: 1 }
                    }
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
                  />
                  <text x={res.x} y={res.y + 3.5} textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                    {res.label}
                  </text>
                </g>
              ))}

              {/* Elongation Arrow in Stage 3 */}
              {activeStage === 3 && (
                <motion.line
                  x1="268" y1="220" x2="305" y2="220"
                  stroke="#00aeef" strokeWidth="3" strokeDasharray="3 2"
                  animate={{ strokeDashoffset: [0, -18] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </g>
          </motion.g>

          {/* ======================================================== */}
          {/* LABELS & POINTERS (PREVENTING ANY OVERLAPS)              */}
          {/* ======================================================== */}
          <g>
            {/* Alpha Helix Label Top-Left */}
            <g transform="translate(65, 26)">
              <rect x="0" y="0" width="85" height="19" rx="5" fill="#ffffff" stroke="#00aeef" strokeWidth="1" />
              <text x="42.5" y="13" textAnchor="middle" fill="#00aeef" fontSize="8.5" fontWeight="bold">
                α-Helix Spiral
              </text>
              <line x1="42.5" y1="19" x2="42.5" y2="48" stroke="#00aeef" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* Beta Sheet Label Top-Right */}
            <g transform="translate(345, 26)">
              <rect x="0" y="0" width="115" height="19" rx="5" fill="#ffffff" stroke="#f58634" strokeWidth="1" />
              <text x="57.5" y="13" textAnchor="middle" fill="#f58634" fontSize="8.5" fontWeight="bold">
                Pleated β-Sheet Ribbon
              </text>
              <line x1="57.5" y1="19" x2="57.5" y2="60" stroke="#f58634" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* Synthetic Peptide Backbone Label (Safely placed at bottom with ample spacing) */}
            <g transform="translate(65, 252)">
              <rect x="0" y="0" width="180" height="20" rx="5" fill="#ffffff" stroke="#0f2231" strokeWidth="1" />
              <text x="90" y="13.5" textAnchor="middle" fill="#0f2231" fontSize="8.5" fontWeight="bold">
                Synthetic Peptide Backbone [-CO-NH-]
              </text>
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
        {PROTEIN_STAGES.map((s) => (
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

