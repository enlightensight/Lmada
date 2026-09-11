'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import {
  Dna,
  Microscope,
  ArrowRight,
  Activity,
  CheckCircle2,
  Layers,
  FlaskConical,
  ShieldCheck,
  Zap,
  Gauge,
  Droplets,
  Building2,
  FileCheck,
} from 'lucide-react';

/* --- CUSTOM SVG ICONS FOR ROADMAP NODES --- */
function BioreactorIcon({ className = "w-7 h-7 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="7" width="14" height="12" rx="4" />
      <path d="M12 2v5" />
      <path d="M9 2h6" />
      <path d="M12 7v7" />
      <path d="M9 14h6" />
      <path d="M2 10h3" />
      <path d="M19 14h3" />
      <path d="M7 19v3" />
      <path d="M17 19v3" />
    </svg>
  );
}

function ManufacturingVialIcon({ className = "w-7 h-7 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 20V9l4 3V9l4 3V6l5 4v10H2z" />
      <rect x="16" y="11" width="6" height="9" rx="1.5" />
      <path d="M17 9h4" />
      <path d="M17.5 11V9" />
      <path d="M20.5 11V9" />
    </svg>
  );
}

function ClinicalIcon({ className = "w-7 h-7 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="4" width="10" height="16" rx="2" />
      <path d="M7 2h4a1 1 0 0 1 1 1v1H6V3a1 1 0 0 1 1-1z" />
      <path d="M7 9h4" />
      <path d="M9 7v4" />
      <circle cx="17.5" cy="11.5" r="2.5" />
      <path d="M14.5 19a3.5 3.5 0 0 1 6 0" />
    </svg>
  );
}

/* --- CONTINUUM STAGES DATA --- */
const CONTINUUM_STAGES = [
  {
    id: 1,
    stepNum: '01',
    title: 'Cell Line Development',
    shortName: '1. Cell Line',
    position: 'top' as const,
    color: '#00aeef',
    secondaryColor: '#f58634',
    bgClass: 'bg-[#00aeef]',
    bubbleBg: 'bg-[#e7f5fd]',
    bubbleBorder: 'border-[#c4e5f7]',
    tag: 'Stage 01 • Molecular Engineering',
    headline: 'High-Producing CHO Cell Lines & Monoclonality Assurance',
    description:
      'Engineered host cell lines utilizing proprietary expression vectors and automated single-cell deposition to deliver robust, high-titer production clones with guaranteed genetic stability.',
    deliverables: [
      'CHO-K1 & CHO-S expression platforms',
      'Image-verified single-cell cloning (>99.9%)',
      '60+ generation stability & cGMP RCB/MCB banking',
    ],
    metric: 'Titer: 4.8 – 8.5 g/L',
    metricLabel: 'Fed-Batch Yield',
    link: '/services/cell-line',
    icon: Dna,
  },
  {
    id: 2,
    stepNum: '02',
    title: 'Upstream & Downstream Process Development',
    shortName: '2. Process Dev',
    position: 'bottom' as const,
    color: '#f58634',
    secondaryColor: '#00aeef',
    bgClass: 'bg-[#f58634]',
    bubbleBg: 'bg-[#fff4e8]',
    bubbleBorder: 'border-[#fedcb8]',
    tag: 'Stage 02 • Bioprocess Scale-Up',
    headline: 'Scalable Upstream Bioreactors & High-Recovery Downstream Purification',
    description:
      'Design of Experiments (DoE) driven media optimization, automated bioreactor parameter control, and multi-stage chromatography purification trains designed for seamless tech transfer.',
    deliverables: [
      'Single-use bioreactors from 3L benchtop to 2,000L',
      'Multi-column chromatography (Protein A, IEX, HIC)',
      'Viral clearance & Tangential Flow Filtration (TFF)',
    ],
    metric: 'Recovery: >88.5%',
    metricLabel: 'Purification Yield',
    link: '/services/process',
    icon: BioreactorIcon,
  },
  {
    id: 3,
    stepNum: '03',
    title: 'Analytical Characterization & Testing',
    shortName: '3. Analytical',
    position: 'top' as const,
    color: '#00aeef',
    secondaryColor: '#f58634',
    bgClass: 'bg-[#00aeef]',
    bubbleBg: 'bg-[#e7f5fd]',
    bubbleBorder: 'border-[#c4e5f7]',
    tag: 'Stage 03 • Quality & Assays',
    headline: 'Comprehensive Physicochemical, Structural & In Vitro Bioassays',
    description:
      'Orthogonal analytical suites providing high-resolution mass spectrometry, purity profiling, glycan mapping, and cGMP release testing to ensure product critical quality attributes (CQAs).',
    deliverables: [
      'SEC-HPLC, CEX, RP-HPLC & Capillary Electrophoresis',
      'Intact Mass & Peptide Mapping by LC-MS/MS',
      'Cell-based potency bioassays & SPR/BLI binding kinetics',
    ],
    metric: 'Purity: >98.5%',
    metricLabel: 'Monomer SEC-HPLC',
    link: '/services/analytical',
    icon: Microscope,
  },
  {
    id: 4,
    stepNum: '04',
    title: 'Drug Substance & Drug Product Manufacturing',
    shortName: '4. cGMP Mfg',
    position: 'bottom' as const,
    color: '#f58634',
    secondaryColor: '#00aeef',
    bgClass: 'bg-[#f58634]',
    bubbleBg: 'bg-[#fff4e8]',
    bubbleBorder: 'border-[#fedcb8]',
    tag: 'Stage 04 • Clinical Production',
    headline: 'cGMP Bulk Drug Substance & Automated Aseptic Fill-Finish',
    description:
      'State-of-the-art cleanroom suites equipped with single-use bioreactor trains and automated vial filling/stoppering systems supporting Phase I–III clinical supply and commercial readiness.',
    deliverables: [
      'Single-use 200L, 500L & 2,000L cGMP production lines',
      'Automated barrier isolator filling (liquid & lyophilized)',
      'Comprehensive in-process controls & QP batch release',
    ],
    metric: 'Capacity: 10,000+',
    metricLabel: 'Vials / cGMP Batch',
    link: '/manufacturing/drug-substance',
    icon: ManufacturingVialIcon,
  },
  {
    id: 5,
    stepNum: '05',
    title: 'Clinical Development & Supply',
    shortName: '5. Clinical Supply',
    position: 'top' as const,
    color: '#00aeef',
    secondaryColor: '#f58634',
    bgClass: 'bg-[#00aeef]',
    bubbleBg: 'bg-[#e7f5fd]',
    bubbleBorder: 'border-[#c4e5f7]',
    tag: 'Stage 05 • Regulatory & Global Supply',
    headline: 'End-to-End Regulatory Dossiers, Stability & Cold-Chain Logistics',
    description:
      'ICH-compliant stability programs, CMC technical dossier preparation for IND/CTA/BLA filings, and secure temperature-controlled global distribution for clinical trial sites.',
    deliverables: [
      'ICH real-time & accelerated stability programs',
      'CMC dossier writing & regulatory audit support',
      'Ultra-low -80°C & 2–8°C global cold chain tracking',
    ],
    metric: 'Compliance: 100%',
    metricLabel: 'IND/BLA Ready',
    link: '/contact',
    icon: ClinicalIcon,
  },
];

/* --- ANIMATED SVG ENGINE COMPONENTS FOR EACH STAGE --- */

function Stage1Animation() {
  return (
    <svg viewBox="0 0 460 230" className="w-full h-auto max-h-[280px] select-none" fill="none">
      <defs>
        <radialGradient id="cellGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00aeef" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00aeef" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0.05" />
        </radialGradient>
        <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00aeef" />
          <stop offset="50%" stopColor="#f58634" />
          <stop offset="100%" stopColor="#00aeef" />
        </linearGradient>
      </defs>

      {/* Cam Square Outer Viewfinder Frame & Corner Reticles */}
      <rect
        x="8"
        y="8"
        width="444"
        height="214"
        rx="2"
        stroke="#00aeef"
        strokeWidth="1"
        strokeOpacity="0.18"
        strokeDasharray="6 6"
        fill="none"
      />
      <path d="M 8 30 V 8 H 30" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85" />
      <path d="M 452 30 V 8 H 430" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85" />
      <path d="M 8 200 V 222 H 30" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85" />
      <path d="M 452 200 V 222 H 430" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85" />

      {/* Telemetry Header Labels (Pushed to top perimeter corners, clear of central circle) */}
      <text x="16" y="21" fill="#00aeef" fontSize="9" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.8">
        OPTICAL CYTOMETER // CLONE MATRIX
      </text>
      <text x="444" y="21" textAnchor="end" fill="#0f2231" fontSize="9" fontWeight="700" fontFamily="monospace">
        WELL: [A04-H8]
      </text>

      {/* Concentric Radar / Reticle Target Rings (Centered at x=230, y=112) */}
      <circle cx="230" cy="112" r="74" fill="url(#cellGlow)" stroke="#00aeef" strokeWidth="1.2" strokeOpacity="0.22" />
      <motion.circle
        cx="230"
        cy="112"
        r="60"
        stroke="#00aeef"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        strokeOpacity="0.38"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        style={{ transformOrigin: '230px 112px' }}
      />
      <circle cx="230" cy="112" r="46" stroke="#00aeef" strokeWidth="1" strokeOpacity="0.25" />

      {/* Precision Axis Crosshairs & Scale Ticks */}
      <line x1="230" y1="30" x2="230" y2="44" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="230" y1="180" x2="230" y2="194" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="148" y1="112" x2="162" y2="112" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="298" y1="112" x2="312" y2="112" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.55" />

      {/* High-Performance Clonal Host Cell Membrane */}
      <motion.g
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        style={{ transformOrigin: '230px 112px' }}
      >
        <circle cx="230" cy="112" r="34" fill="#f0f9ff" stroke="#00aeef" strokeWidth="2.4" />
        <circle cx="230" cy="112" r="24" fill="url(#nucleusGlow)" stroke="#00aeef" strokeWidth="1.4" strokeDasharray="4 2" />
        <circle cx="230" cy="112" r="11" fill="#00aeef" fillOpacity="0.2" />
      </motion.g>

      {/* Dynamic DNA Base-Pair Oscillators */}
      <g transform="translate(196, 82)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.g
            key={i}
            animate={{ y: [0, -3.5, 0], opacity: [0.75, 1, 0.75] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.18, ease: 'easeInOut' }}
          >
            <circle cx={i * 13.5} cy={Math.sin(i * 0.95) * 18 + 30} r="3.5" fill="#00aeef" />
            <circle cx={i * 13.5} cy={-Math.sin(i * 0.95) * 18 + 30} r="3.5" fill="#f58634" />
            <line
              x1={i * 13.5}
              y1={Math.sin(i * 0.95) * 18 + 30}
              x2={i * 13.5}
              y2={-Math.sin(i * 0.95) * 18 + 30}
              stroke="#0f2231"
              strokeWidth="1.5"
              strokeOpacity="0.3"
            />
          </motion.g>
        ))}
      </g>

      {/* Gene Delivery Vector Orbiting Particles */}
      <motion.circle
        cx="165"
        cy="85"
        r="4.5"
        fill="#f58634"
        animate={{ cx: [160, 215], cy: [75, 102], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeIn' }}
      />
      <motion.circle
        cx="290"
        cy="140"
        r="4.5"
        fill="#f58634"
        animate={{ cx: [298, 245], cy: [150, 122], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.7, delay: 0.9, ease: 'easeIn' }}
      />

      {/* Left Specs Footer (Pushed to bottom-left corner perimeter) */}
      <g transform="translate(16, 186)">
        <text x="0" y="11" fill="#64748b" fontSize="9" fontFamily="monospace" fontWeight="600">
          TITER TARGET: 4.8 - 8.5 g/L
        </text>
        <text x="0" y="25" fill="#0f2231" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">
          CHO-K1 GS Knockout Platform
        </text>
      </g>

      {/* Right Verified Monoclonality Stamp Badge (Pushed to bottom-right corner perimeter) */}
      <g transform="translate(298, 186)">
        <motion.g
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          style={{ transformOrigin: '72px 13px' }}
        >
          <rect x="0" y="0" width="144" height="26" rx="13" fill="#0f2231" stroke="#00aeef" strokeWidth="1.5" />
          <circle cx="15" cy="13" r="7.5" fill="#00aeef" />
          <path d="M 11.5 13 L 14 15.5 L 18.5 10.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="28" y="16.5" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="sans-serif">
            Verified Monoclonal
          </text>
        </motion.g>
      </g>
    </svg>
  );
}

function Stage2Animation() {
  return (
    <svg viewBox="0 0 460 240" className="w-full h-auto max-h-[280px] select-none" fill="none">
      <defs>
        <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="resinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00aeef" />
          <stop offset="50%" stopColor="#f58634" />
          <stop offset="100%" stopColor="#00aeef" />
        </linearGradient>
      </defs>

      {/* Upstream Single-Use Bioreactor (Left Side, x=45 to 135) */}
      <g transform="translate(50, 16)">
        {/* Top Motor Drive */}
        <rect x="28" y="0" width="22" height="15" rx="3" fill="#00aeef" />
        <circle cx="39" cy="7" r="2.5" fill="#ffffff" />
        <rect x="14" y="15" width="50" height="9" rx="3" fill="#0f2231" />

        {/* Vessel Shell */}
        <path
          d="M 16 24 H 62 V 104 C 62 116 52 126 39 126 C 26 126 16 116 16 104 Z"
          fill="#f8fcff"
          stroke="#00aeef"
          strokeWidth="2.5"
        />

        {/* Dynamic Bubbling Liquid */}
        <motion.path
          d="M 18 48 Q 28 44 39 48 T 60 48 V 104 C 60 114 51 123 39 123 C 27 123 18 114 18 104 Z"
          fill="url(#liquidGrad)"
          animate={{
            d: [
              "M 18 48 Q 28 44 39 48 T 60 48 V 104 C 60 114 51 123 39 123 C 27 123 18 114 18 104 Z",
              "M 18 45 Q 28 50 39 45 T 60 45 V 104 C 60 114 51 123 39 123 C 27 123 18 114 18 104 Z",
              "M 18 48 Q 28 44 39 48 T 60 48 V 104 C 60 114 51 123 39 123 C 27 123 18 114 18 104 Z",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        />

        {/* Agitator Impeller Shaft & Blades */}
        <line x1="39" y1="24" x2="39" y2="104" stroke="#0f2231" strokeWidth="2.5" />
        <motion.g
          animate={{ scaleX: [1, -1, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          style={{ transformOrigin: '39px 90px' }}
        >
          <path d="M 24 90 Q 39 86 54 90" stroke="#f58634" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 27 70 Q 39 66 51 70" stroke="#f58634" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* Rising Aeration Sparging Microbubbles */}
        {[
          { cx: 27, delay: 0 },
          { cx: 48, delay: 0.4 },
          { cx: 34, delay: 0.9 },
          { cx: 44, delay: 1.4 },
        ].map((b, i) => (
          <motion.circle
            key={i}
            cx={b.cx}
            cy="110"
            r="2.5"
            fill="#ffffff"
            animate={{ cy: [110, 50], opacity: [0.2, 0.95, 0] }}
            transition={{ repeat: Infinity, duration: 1.7, delay: b.delay, ease: 'easeOut' }}
          />
        ))}

        {/* Vessel Label */}
        <text x="39" y="144" textAnchor="middle" fill="#0f2231" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
          BIOREACTOR (500L)
        </text>
      </g>

      {/* Connecting Flow Pipeline with In-line Sensor */}
      <g>
        <path d="M 112 80 H 226" stroke="#00aeef" strokeWidth="3" strokeDasharray="5 3" />
        <motion.circle
          cx="112"
          cy="80"
          r="4.5"
          fill="#f58634"
          animate={{ cx: [112, 226] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
        />
        {/* Inline Flow Direction Arrow */}
        <polygon points="224,75 234,80 224,85" fill="#00aeef" />

        {/* Inline PAT Raman Sensor Node */}
        <g transform="translate(154, 55)">
          <rect x="0" y="0" width="34" height="18" rx="4" fill="#0f2231" />
          <text x="17" y="12.5" textAnchor="middle" fill="#00aeef" fontSize="8" fontWeight="700" fontFamily="monospace">
            PAT
          </text>
          <line x1="17" y1="18" x2="17" y2="25" stroke="#0f2231" strokeWidth="1.5" />
        </g>
      </g>

      {/* Downstream Continuous Chromatography Column (Center-Right, x=235 to 295) */}
      <g transform="translate(235, 12)">
        {/* Column Inlets & Flanges */}
        <rect x="18" y="8" width="34" height="10" rx="2" fill="#0f2231" />
        <rect x="18" y="112" width="34" height="10" rx="2" fill="#0f2231" />

        {/* Glass Column Shell */}
        <rect x="22" y="18" width="26" height="94" rx="4" fill="#ffffff" stroke="#00aeef" strokeWidth="2.5" />

        {/* Resin Packed Bed with Flow Waves */}
        <rect x="25" y="34" width="20" height="62" fill="url(#resinGrad)" opacity="0.9" rx="2" />

        {/* Purified Elution Droplets */}
        <motion.circle
          cx="35"
          cy="122"
          r="3"
          fill="#00aeef"
          animate={{ cy: [122, 140], opacity: [1, 0], scale: [1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.3, ease: 'easeIn' }}
        />
        <motion.circle
          cx="35"
          cy="122"
          r="3"
          fill="#f58634"
          animate={{ cy: [122, 140], opacity: [1, 0], scale: [1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.3, delay: 0.65, ease: 'easeIn' }}
        />

        {/* Collection Receiver Flask */}
        <path d="M 27 142 L 18 160 H 52 L 43 142 Z" fill="#e0f4fd" stroke="#00aeef" strokeWidth="1.8" />
        <rect x="31" y="136" width="8" height="6" fill="#00aeef" />

        {/* Column Label */}
        <text x="35" y="172" textAnchor="middle" fill="#0f2231" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
          DSP COLUMN
        </text>
      </g>

      {/* Floating Modern Process Telemetry Card (Right Side, x=315 to 435) */}
      <g transform="translate(315, 38)">
        <rect x="0" y="0" width="122" height="74" rx="8" fill="#ffffff" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.5" />
        <rect x="0" y="0" width="122" height="20" rx="8" fill="#0f2231" />
        <text x="10" y="14" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.6">
          DSP TELEMETRY
        </text>

        <text x="10" y="35" fill="#64748b" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">
          PURITY YIELD
        </text>
        <text x="10" y="48" fill="#00aeef" fontSize="12" fontWeight="800" fontFamily="sans-serif">
          &gt; 88.5%
        </text>

        <text x="10" y="64" fill="#f58634" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">
          DO: 40% ± 2% | pH 7.15
        </text>
      </g>

      {/* Non-overlapping Bottom Telemetry Chips (Positioned below into bottom area) */}
      <g transform="translate(45, 204)">
        <rect x="0" y="0" width="168" height="26" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="14" cy="13" r="4" fill="#00aeef" />
        <text x="25" y="17" fill="#0f2231" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          Single-Use Bioreactors (500L)
        </text>
      </g>

      <g transform="translate(225, 204)">
        <rect x="0" y="0" width="188" height="26" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="14" cy="13" r="4" fill="#f58634" />
        <text x="25" y="17" fill="#0f2231" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          Continuous Chromatography
        </text>
      </g>
    </svg>
  );
}

function Stage3Animation() {
  return (
    <svg viewBox="0 0 460 230" className="w-full h-auto max-h-[280px] select-none" fill="none">
      <defs>
        <linearGradient id="specGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00aeef" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="70%" stopColor="#f58634" />
          <stop offset="100%" stopColor="#00aeef" />
        </linearGradient>
        <linearGradient id="peakFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00aeef" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* High-Tech Chromatography Chassis Frame */}
      <rect x="25" y="14" width="410" height="202" rx="12" fill="#071624" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.5" />

      {/* Instrument Display Screen */}
      <rect x="36" y="24" width="388" height="136" rx="8" fill="#0a1c2d" />

      {/* Screen Header Bar (Placed cleanly at top without center text overlap) */}
      <g transform="translate(48, 30)">
        <text x="0" y="8" fill="#00aeef" fontSize="9" fontWeight="700" fontFamily="monospace" letterSpacing="0.8">
          SEC-HPLC // UV 280nm
        </text>
        <circle cx="340" cy="5" r="3" fill="#10b981" />
        <text x="348" y="8" fill="#10b981" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">
          ONLINE
        </text>
      </g>

      {/* Fine Background Coordinate Grid Lines */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`v-${i}`}
          x1={56 + i * 50}
          y1="46"
          x2={56 + i * 50}
          y2="150"
          stroke="#00aeef"
          strokeWidth="1"
          strokeOpacity="0.12"
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`h-${i}`}
          x1="46"
          y1={56 + i * 28}
          x2="414"
          y2={56 + i * 28}
          stroke="#00aeef"
          strokeWidth="1"
          strokeOpacity="0.12"
        />
      ))}

      {/* Curved Area Fill exactly matching Monomer Peak trace */}
      <path
        d="M 180 144 Q 192 144 200 110 L 210 66 Q 218 110 226 144 Z"
        fill="url(#peakFill)"
      />

      {/* SEC-HPLC Analytical Peak Waveform Trace */}
      <motion.path
        d="M 46 144 L 105 144 Q 120 144 130 132 L 140 118 Q 148 108 155 125 L 165 144 L 180 144 Q 192 144 200 110 L 210 66 Q 218 110 226 144 L 245 144 Q 255 144 265 128 L 275 110 Q 282 98 290 120 L 300 144 L 414 144"
        fill="none"
        stroke="url(#specGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
      />

      {/* Vertical Laser Scanline Sweep */}
      <motion.g
        animate={{ x: [46, 410, 46] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'linear' }}
      >
        <line x1="0" y1="46" x2="0" y2="150" stroke="#f58634" strokeWidth="1.8" strokeDasharray="3 2" />
        <circle cx="0" cy="46" r="2.5" fill="#f58634" />
      </motion.g>

      {/* Monomer Peak Annotation Tag (Positioned safely below header with pointer) */}
      <g transform="translate(162, 42)">
        <rect x="0" y="0" width="96" height="19" rx="4" fill="#00aeef" />
        <text x="48" y="13" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
          Monomer: 98.7%
        </text>
        {/* Pointer down to peak */}
        <line x1="48" y1="19" x2="48" y2="24" stroke="#00aeef" strokeWidth="1.5" />
      </g>

      {/* Bottom Telemetry Status Bar (Safe inside chassis, no right-edge overflow) */}
      <g transform="translate(46, 172)">
        <circle cx="6" cy="12" r="4" fill="#00aeef" />
        <text x="16" y="15.5" fill="#e0f2fe" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          SEC-HPLC Purity &gt; 98.5%
        </text>

        <circle cx="205" cy="12" r="4" fill="#f58634" />
        <text x="216" y="15.5" fill="#e0f2fe" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          HCP &lt; 10 ppm | QC Release
        </text>
      </g>
    </svg>
  );
}

function Stage4Animation() {
  return (
    <svg viewBox="0 0 460 230" className="w-full h-auto max-h-[280px] select-none" fill="none">
      <defs>
        <linearGradient id="vialLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#00aeef" />
        </linearGradient>
        {/* ClipPath ensures filling fluid CANNOT protrude outside vial or below conveyor */}
        <clipPath id="vialCavityClip">
          <rect x="3" y="16" width="26" height="38" rx="2" />
        </clipPath>
      </defs>

      {/* Grade A Cleanroom Enclosure Frame */}
      <rect x="25" y="14" width="410" height="202" rx="12" fill="#ffffff" stroke="#f58634" strokeWidth="2" strokeOpacity="0.85" />

      {/* HEPA Filter Air Distribution Ceiling Plenum */}
      <rect x="35" y="24" width="390" height="14" rx="3" fill="#0f2231" />

      {/* Laminar Airflow Streamers */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.line
          key={i}
          x1={52 + i * 44}
          y1="40"
          x2={52 + i * 44}
          y2="74"
          stroke="#00aeef"
          strokeWidth="1.8"
          strokeDasharray="4 4"
          animate={{ y1: [40, 48, 40], y2: [74, 82, 74], opacity: [0.25, 0.75, 0.25] }}
          transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.16 }}
        />
      ))}

      {/* Conveyor Belt Track */}
      <rect x="42" y="126" width="376" height="18" rx="4" fill="#0f2231" />
      <motion.line
        x1="42"
        y1="135"
        x2="418"
        y2="135"
        stroke="#f58634"
        strokeWidth="2"
        strokeDasharray="10 6"
        animate={{ strokeDashoffset: [0, -32] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
      />

      {/* Moving Sterile Glass Vials */}
      {[
        { x: 74, filled: true, stoppered: true, label: 'Capped' },
        { x: 156, filling: true, label: 'Filling' },
        { x: 238, filled: true, stoppered: true, label: 'Stoppered' },
        { x: 320, filled: true, crimped: true, label: 'Inspection' },
      ].map((v, i) => (
        <g key={i} transform={`translate(${v.x}, 72)`}>
          {/* Glass Vial Body (Bottom edge at 14+40 = 54, rests on conveyor y=126) */}
          <rect x="0" y="14" width="32" height="40" rx="4" fill="#f0f9ff" stroke="#00aeef" strokeWidth="2" />
          {/* Vial Neck & Stopper */}
          <rect x="8" y="5" width="16" height="9" rx="1" fill="#0f2231" />
          <rect x="4" y="0" width="24" height="5" rx="2" fill={v.crimped ? "#f58634" : "#64748b"} />

          {/* Liquid Level */}
          {v.filled && (
            <rect x="3" y="26" width="26" height="26" rx="2" fill="url(#vialLiquid)" opacity="0.92" />
          )}

          {/* Filling Liquid: Strictly grounded at vial floor (y=52) filling upwards */}
          {v.filling && (
            <g clipPath="url(#vialCavityClip)">
              {/* Rising Liquid Column (Floor is locked at y=52: y + height = 52) */}
              <motion.rect
                x="3"
                rx="2"
                width="26"
                fill="url(#vialLiquid)"
                opacity="0.95"
                animate={{
                  y: [50, 26, 26, 50],
                  height: [2, 26, 26, 2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  times: [0, 0.65, 0.85, 1],
                  ease: ['easeOut', 'linear', 'easeInOut'],
                }}
              />
              {/* Surface Meniscus Line */}
              <motion.line
                x1="4"
                x2="28"
                stroke="#bae6fd"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  y1: [50, 26, 26, 50],
                  y2: [50, 26, 26, 50],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  times: [0, 0.65, 0.85, 1],
                  ease: ['easeOut', 'linear', 'easeInOut'],
                }}
              />
            </g>
          )}
        </g>
      ))}

      {/* Automated Filling Dispenser Needle Above Vial 2 */}
      <g transform="translate(167, 36)">
        <rect x="0" y="0" width="10" height="26" rx="2" fill="#0f2231" />
        <line x1="5" y1="26" x2="5" y2="50" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />

        {/* Liquid Droplets Dispensing into Vial */}
        <motion.circle
          cx="5"
          r="2.2"
          fill="#00aeef"
          animate={{ cy: [50, 78], opacity: [1, 0.9, 0], scale: [1, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 0.7, ease: 'easeIn' }}
        />
        <motion.circle
          cx="5"
          r="1.8"
          fill="#00aeef"
          animate={{ cy: [50, 78], opacity: [1, 0.9, 0], scale: [1, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 0.7, delay: 0.35, ease: 'easeIn' }}
        />
      </g>

      {/* Stopper Station Header Above Vial 3 */}
      <g transform="translate(244, 38)">
        <rect x="0" y="0" width="20" height="12" rx="2" fill="#0f2231" />
        <line x1="10" y1="12" x2="10" y2="30" stroke="#f58634" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Safely Positioned Bottom Badges */}
      <g transform="translate(46, 164)">
        <rect x="0" y="0" width="140" height="26" rx="6" fill="#f58634" />
        <text x="12" y="17" fill="#ffffff" fontSize="10.5" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.4">
          GRADE A / ISO 5 cGMP
        </text>
      </g>

      <g transform="translate(202, 164)">
        <rect x="0" y="0" width="202" height="26" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="14" cy="13" r="4.5" fill="#00aeef" />
        <text x="26" y="17" fill="#0f2231" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">
          Automated Aseptic Stoppering
        </text>
      </g>
    </svg>
  );
}

function Stage5Animation() {
  return (
    <svg viewBox="0 0 460 230" className="w-full h-auto max-h-[280px] select-none" fill="none">
      <defs>
        <radialGradient id="globeOceanGrad" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#f0f9ff" />
          <stop offset="60%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </radialGradient>
        <radialGradient id="globeAtmosphere" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#00aeef" stopOpacity="0" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0.32" />
        </radialGradient>
        <radialGradient id="globeOuterAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00aeef" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0" />
        </radialGradient>
        <clipPath id="globeSphereClip">
          <circle cx="230" cy="96" r="74" />
        </clipPath>
      </defs>

      {/* Outer Atmosphere Glow Halo */}
      <circle cx="230" cy="96" r="88" fill="url(#globeOuterAura)" />
      <circle cx="230" cy="96" r="82" stroke="#00aeef" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.25" fill="none" />

      {/* Tilted Orbital Satellite Ring 1 (tilted -24°, matching reference) */}
      <ellipse
        cx="230"
        cy="96"
        rx="102"
        ry="36"
        transform="rotate(-24 230 96)"
        stroke="#00aeef"
        strokeWidth="1.2"
        strokeDasharray="4 6"
        strokeOpacity="0.35"
        fill="none"
      />

      {/* Tilted Orbital Satellite Ring 2 (tilted 32°) */}
      <ellipse
        cx="230"
        cy="96"
        rx="108"
        ry="42"
        transform="rotate(32 230 96)"
        stroke="#00aeef"
        strokeWidth="0.8"
        strokeDasharray="3 7"
        strokeOpacity="0.2"
        fill="none"
      />

      {/* Orbiting Satellite Beacon */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
        style={{ transformOrigin: '230px 96px' }}
      >
        <circle cx="334" cy="96" r="3.5" fill="#f58634" />
        <circle cx="334" cy="96" r="6.5" stroke="#f58634" strokeWidth="1" strokeOpacity="0.5" fill="none" />
      </motion.g>

      {/* ================= 3D DIGITAL WIREFRAME GLOBE ================= */}
      <g clipPath="url(#globeSphereClip)">
        {/* Ocean Sphere Base */}
        <circle cx="230" cy="96" r="74" fill="url(#globeOceanGrad)" />

        {/* Latitude Curvature Curves (Spherical Depth) */}
        <ellipse cx="230" cy="48" rx="52" ry="10" stroke="#00aeef" strokeWidth="0.7" strokeOpacity="0.16" strokeDasharray="3 3" fill="none" />
        <ellipse cx="230" cy="66" rx="66" ry="14" stroke="#00aeef" strokeWidth="0.8" strokeOpacity="0.22" fill="none" />
        <ellipse cx="230" cy="84" rx="72" ry="18" stroke="#00aeef" strokeWidth="0.85" strokeOpacity="0.25" fill="none" />
        <ellipse cx="230" cy="96" rx="74" ry="20" stroke="#00aeef" strokeWidth="1.1" strokeOpacity="0.35" fill="none" />
        <ellipse cx="230" cy="108" rx="72" ry="18" stroke="#00aeef" strokeWidth="0.85" strokeOpacity="0.25" fill="none" />
        <ellipse cx="230" cy="126" rx="66" ry="14" stroke="#00aeef" strokeWidth="0.8" strokeOpacity="0.22" fill="none" />
        <ellipse cx="230" cy="144" rx="52" ry="10" stroke="#00aeef" strokeWidth="0.7" strokeOpacity="0.16" strokeDasharray="3 3" fill="none" />

        {/* Longitude Meridian Curves */}
        <line x1="230" y1="22" x2="230" y2="170" stroke="#00aeef" strokeWidth="1" strokeOpacity="0.32" />
        <ellipse cx="230" cy="96" rx="18" ry="74" stroke="#00aeef" strokeWidth="0.8" strokeOpacity="0.22" fill="none" />
        <ellipse cx="230" cy="96" rx="36" ry="74" stroke="#00aeef" strokeWidth="0.85" strokeOpacity="0.24" fill="none" />
        <ellipse cx="230" cy="96" rx="54" ry="74" stroke="#00aeef" strokeWidth="0.85" strokeOpacity="0.24" fill="none" />
        <ellipse cx="230" cy="96" rx="68" ry="74" stroke="#00aeef" strokeWidth="0.75" strokeOpacity="0.18" fill="none" />

        {/* Technical Coordinate Intersections (Digital Grid Nodes) */}
        {[
          [230, 48], [230, 66], [230, 84], [230, 96], [230, 108], [230, 126], [230, 144],
          [212, 66], [248, 66], [194, 84], [266, 84], [176, 96], [284, 96],
          [194, 108], [266, 108], [212, 126], [248, 126]
        ].map(([x, y], i) => (
          <circle key={`node-${i}`} cx={x} cy={y} r="1.2" fill="#00aeef" fillOpacity="0.4" />
        ))}

        {/* Atmosphere Vignette Overlay */}
        <circle cx="230" cy="96" r="74" fill="url(#globeAtmosphere)" />
      </g>

      {/* Spherical Rim Border with Outer Glow */}
      <circle cx="230" cy="96" r="74" stroke="#00aeef" strokeWidth="1.8" strokeOpacity="0.6" fill="none" />

      {/* ================= SUPPLY CHAIN FLIGHT TRAJECTORY ARCS ================= */}
      {/* 1. North America -> Europe Flight Arc (Orange Great-Circle) */}
      <motion.path
        d="M 182,68 Q 213,32 244,62"
        stroke="#f58634"
        strokeWidth="2.2"
        strokeDasharray="5 4"
        animate={{ strokeDashoffset: [0, -18] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
      />
      {/* Flying Cargo Packet NA -> EU */}
      <motion.circle
        r="3"
        fill="#f58634"
        animate={{
          cx: [182, 213, 244],
          cy: [68, 32, 62],
          scale: [0.8, 1.3, 0.8],
        }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      />

      {/* 2. Europe -> Asia-Pacific Flight Arc (Orange Great-Circle) */}
      <motion.path
        d="M 244,62 Q 270,70 286,98"
        stroke="#f58634"
        strokeWidth="2"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
      />
      {/* Flying Cargo Packet EU -> Asia */}
      <motion.circle
        r="2.8"
        fill="#f58634"
        animate={{
          cx: [244, 270, 286],
          cy: [62, 70, 98],
          scale: [0.8, 1.25, 0.8],
        }}
        transition={{ repeat: Infinity, duration: 2.6, delay: 0.8, ease: 'easeInOut' }}
      />

      {/* 3. North America -> Gateway Transit Arc (Cyan Great-Circle) */}
      <motion.path
        d="M 182,68 Q 206,94 236,104"
        stroke="#00aeef"
        strokeWidth="1.8"
        strokeDasharray="4 3"
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
      />
      {/* 4. Gateway Transit -> Europe Arc (Cyan) */}
      <motion.path
        d="M 236,104 Q 244,84 244,62"
        stroke="#00aeef"
        strokeWidth="1.8"
        strokeDasharray="4 3"
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
      />
      {/* 5. Gateway Transit -> Asia-Pacific Arc (Cyan) */}
      <motion.path
        d="M 236,104 Q 262,110 286,98"
        stroke="#00aeef"
        strokeWidth="1.8"
        strokeDasharray="4 3"
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
      />

      {/* ================= GEOGRAPHIC PINPOINT LOCATION MARKERS ================= */}
      {/* 1. North America Pinpoint (US East Coast Bio-Corridor) */}
      <g>
        <motion.circle
          cx="182"
          cy="68"
          r="8"
          stroke="#00aeef"
          strokeWidth="1.5"
          animate={{ scale: [0.7, 1.8], opacity: [0.85, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
        />
        <circle cx="182" cy="68" r="6" fill="#00aeef" fillOpacity="0.25" />
        <circle cx="182" cy="68" r="4.5" fill="#00aeef" stroke="#ffffff" strokeWidth="1.6" />
      </g>

      {/* 2. Europe Pinpoint (London/Basel/Frankfurt Pharma Hub) */}
      <g>
        <motion.circle
          cx="244"
          cy="62"
          r="8"
          stroke="#00aeef"
          strokeWidth="1.5"
          animate={{ scale: [0.7, 1.8], opacity: [0.85, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: 'easeOut' }}
        />
        <circle cx="244" cy="62" r="6" fill="#00aeef" fillOpacity="0.25" />
        <circle cx="244" cy="62" r="4.5" fill="#00aeef" stroke="#ffffff" strokeWidth="1.6" />
      </g>

      {/* 3. Middle East / Central Gateway Pinpoint (Matching Reference Node) */}
      <g>
        <motion.circle
          cx="236"
          cy="104"
          r="7"
          stroke="#00aeef"
          strokeWidth="1.5"
          animate={{ scale: [0.7, 1.8], opacity: [0.85, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, delay: 0.9, ease: 'easeOut' }}
        />
        <circle cx="236" cy="104" r="5.5" fill="#00aeef" fillOpacity="0.25" />
        <circle cx="236" cy="104" r="4" fill="#00aeef" stroke="#ffffff" strokeWidth="1.5" />
      </g>

      {/* 4. Asia-Pacific Pinpoint */}
      <g>
        <motion.circle
          cx="286"
          cy="98"
          r="7"
          stroke="#f58634"
          strokeWidth="1.5"
          animate={{ scale: [0.7, 1.8], opacity: [0.85, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1.2, ease: 'easeOut' }}
        />
        <circle cx="286" cy="98" r="5.5" fill="#f58634" fillOpacity="0.25" />
        <circle cx="286" cy="98" r="4" fill="#f58634" stroke="#ffffff" strokeWidth="1.5" />
      </g>

      {/* ================= FLOATING HUB CARDS (MATCHING REFERENCE IMAGE 2) ================= */}
      {/* 1. North America Floating Card */}
      <g>
        {/* Delicate Connecting Pointer Line */}
        <line x1="146" y1="67" x2="182" y2="68" stroke="#00aeef" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.7" />
        <g transform="translate(34, 54)">
          <rect
            x="0"
            y="0"
            width="112"
            height="26"
            rx="6"
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="1.5"
          />
          <circle cx="14" cy="13" r="4.5" fill="#f58634" />
          <text x="25" y="16.5" fill="#0f2231" fontSize="10" fontWeight="700" fontFamily="sans-serif">
            North America
          </text>
        </g>
      </g>

      {/* 2. Europe Floating Card */}
      <g>
        {/* Delicate Connecting Pointer Line */}
        <line x1="244" y1="62" x2="340" y2="52" stroke="#00aeef" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.7" />
        <g transform="translate(340, 39)">
          <rect
            x="0"
            y="0"
            width="80"
            height="26"
            rx="6"
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="1.5"
          />
          <circle cx="14" cy="13" r="4.5" fill="#f58634" />
          <text x="25" y="16.5" fill="#0f2231" fontSize="10" fontWeight="700" fontFamily="sans-serif">
            Europe
          </text>
        </g>
      </g>

      {/* 3. Asia-Pacific Floating Card */}
      <g>
        {/* Delicate Connecting Pointer Line */}
        <line x1="286" y1="98" x2="335" y2="115" stroke="#f58634" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.7" />
        <g transform="translate(335, 102)">
          <rect
            x="0"
            y="0"
            width="98"
            height="26"
            rx="6"
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="1.5"
          />
          <circle cx="14" cy="13" r="4.5" fill="#f58634" />
          <text x="25" y="16.5" fill="#0f2231" fontSize="10" fontWeight="700" fontFamily="sans-serif">
            Asia-Pacific
          </text>
        </g>
      </g>

      {/* ================= BOTTOM CAPABILITY BADGES ================= */}
      <g transform="translate(46, 186)">
        <rect x="0" y="0" width="155" height="26" rx="13" fill="#ffffff" stroke="#00aeef" strokeWidth="1.5" />
        <circle cx="14" cy="13" r="4.5" fill="#00aeef" />
        <text x="26" y="17" fill="#0f2231" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          -80°C Cryo Monitored
        </text>
      </g>

      <g transform="translate(225, 186)">
        <rect x="0" y="0" width="185" height="26" rx="13" fill="#ffffff" stroke="#f58634" strokeWidth="1.5" />
        <circle cx="14" cy="13" r="4.5" fill="#f58634" />
        <text x="26" y="17" fill="#0f2231" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          QP Release &amp; GDP Audited
        </text>
      </g>
    </svg>
  );
}

const ANIMATION_COMPONENTS = [
  Stage1Animation,
  Stage2Animation,
  Stage3Animation,
  Stage4Animation,
  Stage5Animation,
];

export default function IntegratedTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageId, setActiveStageId] = useState(1);
  const [isLocked, setIsLocked] = useState(false);

  const isLockedRef = useRef(false);
  const activeStageRef = useRef(1);
  const isAnimatingRef = useRef(false);
  const unlockCooldownRef = useRef(false);

  type PagePosition = 'above' | 'locked' | 'below';
  const positionRef = useRef<PagePosition>('above');

  // Sync ref with state
  useEffect(() => {
    activeStageRef.current = activeStageId;
  }, [activeStageId]);

  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  // Determine initial position relative to timeline on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    const navHeight = window.innerWidth >= 1024 ? 80 : 64;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.top < navHeight - 60) {
      positionRef.current = 'below';
    } else if (rect.top > navHeight + 60) {
      positionRef.current = 'above';
    } else {
      positionRef.current = 'above';
    }
  }, []);

  // Helper for navbar height & target scroll offset (exact document coordinate)
  const getTargetScrollY = () => {
    if (!containerRef.current || typeof window === 'undefined') return 0;
    const navHeight = window.innerWidth >= 1024 ? 80 : 64;

    // Use stable accumulated offsetTop to get the exact document top of the timeline
    let el: HTMLElement | null = containerRef.current;
    let docTop = 0;
    while (el) {
      docTop += el.offsetTop;
      el = el.offsetParent as HTMLElement | null;
    }
    return Math.max(0, docTop - navHeight);
  };

  const lockScroll = (stage: number) => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    const targetScrollY = getTargetScrollY();

    window.scrollTo({ top: targetScrollY, behavior: 'instant' });

    // Freeze body position completely so browser kinetic inertia / fast scrolling CANNOT scroll the page down
    document.body.style.position = 'fixed';
    document.body.style.top = `-${targetScrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'scroll'; // Preserves scrollbar track so zero horizontal layout shift

    isLockedRef.current = true;
    setIsLocked(true);
    positionRef.current = 'locked';
    activeStageRef.current = stage;
    setActiveStageId(stage);

    // Cooldown prevents trailing momentum from the entry scroll from advancing stages
    isAnimatingRef.current = true;
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 450);
  };

  const unlockScroll = () => {
    if (typeof window === 'undefined') return;
    const targetScrollY = getTargetScrollY();

    // Release body freeze
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflowY = '';

    // Instantly restore the exact window scroll offset
    window.scrollTo({ top: targetScrollY, behavior: 'instant' });

    isLockedRef.current = false;
    setIsLocked(false);
  };

  // Scroll listener to detect entering the section and locking into place
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleScroll = () => {
      if (unlockCooldownRef.current) return;
      if (isLockedRef.current) return;
      if (!containerRef.current) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const targetScrollY = getTargetScrollY();

      // Entering from ABOVE (Hero section): ANY downward scroll reaching flush position locks at Stage 1
      if (positionRef.current === 'above') {
        if (scrollingDown && currentScrollY >= targetScrollY - 25) {
          lockScroll(1);
          return;
        }
      }
      // Entering from BELOW (Services, Modalities, Articles, FAQs): lock at Stage 5 when scrolling UP
      else if (positionRef.current === 'below') {
        if (!scrollingDown && currentScrollY <= targetScrollY + 25) {
          lockScroll(5);
          return;
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (typeof window !== 'undefined') {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
      }
    };
  }, []);

  // Window Resize Listener to maintain exact flush alignment
  useEffect(() => {
    const handleResize = () => {
      if (isLockedRef.current && containerRef.current) {
        const target = getTargetScrollY();
        document.body.style.top = `-${target}px`;
        window.scrollTo({ top: target, behavior: 'instant' });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Window-wide Non-Passive Capture Wheel Interception (Rock-solid zero jiggle, zero fighting)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 1. When locked in stages 1..5:
      if (isLockedRef.current) {
        // Prevent native browser scroll 100% while locked (capture phase stops any child scroll)
        e.preventDefault();
        e.stopPropagation();

        // Filter out micro-jitter (finger resting tremors)
        if (Math.abs(e.deltaY) < 15) return;

        // Honor transition cooldown
        if (isAnimatingRef.current) return;

        const scrollingDown = e.deltaY > 0;
        const currentStage = activeStageRef.current;
        const targetScrollY = getTargetScrollY();

        if (scrollingDown) {
          if (currentStage < 5) {
            isAnimatingRef.current = true;
            const nextStage = currentStage + 1;
            activeStageRef.current = nextStage;
            setActiveStageId(nextStage);
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 450);
          } else {
            // Deliberate scroll down on Stage 5 -> Unlock and smoothly scroll to next section
            isAnimatingRef.current = true;
            unlockScroll();
            positionRef.current = 'below';
            unlockCooldownRef.current = true;

            const nextSection = document.getElementById('an-integrated-partner');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: targetScrollY + window.innerHeight, behavior: 'smooth' });
            }

            setTimeout(() => {
              isAnimatingRef.current = false;
              unlockCooldownRef.current = false;
            }, 1200);
          }
        } else {
          // Scrolling UP
          if (currentStage > 1) {
            isAnimatingRef.current = true;
            const prevStage = currentStage - 1;
            activeStageRef.current = prevStage;
            setActiveStageId(prevStage);
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 450);
          } else {
            // Deliberate scroll up on Stage 1 -> Unlock and smoothly scroll to Hero
            isAnimatingRef.current = true;
            unlockScroll();
            positionRef.current = 'above';
            unlockCooldownRef.current = true;

            window.scrollTo({ top: 0, behavior: 'smooth' });

            setTimeout(() => {
              isAnimatingRef.current = false;
              unlockCooldownRef.current = false;
            }, 1200);
          }
        }
        return;
      }

      // 2. When NOT locked: intercept fast scroll BEFORE the browser overshoots the timeline
      if (unlockCooldownRef.current) return;

      const scrollingDown = e.deltaY > 0;
      const targetScrollY = getTargetScrollY();
      const currentScrollY = window.scrollY;

      // Scrolling DOWN on HeroSection: intercept and lock at Stage 1 before it can scroll ahead
      if (positionRef.current === 'above' && scrollingDown) {
        if (currentScrollY + e.deltaY >= targetScrollY - 20) {
          e.preventDefault();
          e.stopPropagation();
          lockScroll(1);
          return;
        }
      }

      // Scrolling UP from below: intercept and lock at Stage 5 before it can overshoot to Hero
      if (positionRef.current === 'below' && !scrollingDown) {
        if (currentScrollY + e.deltaY <= targetScrollY + 20) {
          e.preventDefault();
          e.stopPropagation();
          lockScroll(5);
          return;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, []);

  // Keyboard navigation support when locked
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLockedRef.current) return;
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        if (isAnimatingRef.current) return;
        const currentStage = activeStageRef.current;
        if (currentStage < 5) {
          isAnimatingRef.current = true;
          const next = currentStage + 1;
          activeStageRef.current = next;
          setActiveStageId(next);
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 450);
        } else {
          isAnimatingRef.current = true;
          unlockScroll();
          positionRef.current = 'below';
          unlockCooldownRef.current = true;
          const nextSection = document.getElementById('an-integrated-partner');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
          setTimeout(() => {
            isAnimatingRef.current = false;
            unlockCooldownRef.current = false;
          }, 1200);
        }
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        if (isAnimatingRef.current) return;
        const currentStage = activeStageRef.current;
        if (currentStage > 1) {
          isAnimatingRef.current = true;
          const prev = currentStage - 1;
          activeStageRef.current = prev;
          setActiveStageId(prev);
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 450);
        } else {
          isAnimatingRef.current = true;
          unlockScroll();
          positionRef.current = 'above';
          unlockCooldownRef.current = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            isAnimatingRef.current = false;
            unlockCooldownRef.current = false;
          }, 1200);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Touch Swipe Support for Tablets / Mobile Devices
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY; // > 0 means swipe UP (scrolling DOWN)

      if (Math.abs(deltaY) < 30) return;

      if (!isLockedRef.current) {
        if (unlockCooldownRef.current) return;
        const scrollingDown = deltaY > 0;
        const currentScrollY = window.scrollY;
        const targetScrollY = getTargetScrollY();

        if (positionRef.current === 'above' && scrollingDown) {
          if (currentScrollY + deltaY >= targetScrollY - 20) {
            e.preventDefault();
            lockScroll(1);
            return;
          }
        } else if (positionRef.current === 'below' && !scrollingDown) {
          if (currentScrollY + deltaY <= targetScrollY + 20) {
            e.preventDefault();
            lockScroll(5);
            return;
          }
        }
        return;
      }

      if (isAnimatingRef.current) return;

      e.preventDefault();

      const scrollingDown = deltaY > 0;
      const currentStage = activeStageRef.current;
      const targetScrollY = getTargetScrollY();

      if (scrollingDown) {
        if (currentStage < 5) {
          isAnimatingRef.current = true;
          const next = currentStage + 1;
          activeStageRef.current = next;
          setActiveStageId(next);
          touchStartY = touchEndY;
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 450);
        } else {
          isAnimatingRef.current = true;
          unlockScroll();
          positionRef.current = 'below';
          unlockCooldownRef.current = true;
          const nextSection = document.getElementById('an-integrated-partner');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: targetScrollY + window.innerHeight, behavior: 'smooth' });
          }
          setTimeout(() => {
            isAnimatingRef.current = false;
            unlockCooldownRef.current = false;
          }, 1200);
        }
      } else {
        if (currentStage > 1) {
          isAnimatingRef.current = true;
          const prev = currentStage - 1;
          activeStageRef.current = prev;
          setActiveStageId(prev);
          touchStartY = touchEndY;
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 450);
        } else {
          isAnimatingRef.current = true;
          unlockScroll();
          positionRef.current = 'above';
          unlockCooldownRef.current = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            isAnimatingRef.current = false;
            unlockCooldownRef.current = false;
          }, 1200);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
    };
  }, []);

  const handleJumpToStage = (id: number) => {
    activeStageRef.current = id;
    setActiveStageId(id);
    positionRef.current = 'locked';
    lockScroll(id);
  };

  const handlePrev = () => {
    const prevId = activeStageId <= 1 ? 5 : activeStageId - 1;
    handleJumpToStage(prevId);
  };

  const handleNext = () => {
    const nextId = activeStageId >= 5 ? 1 : activeStageId + 1;
    handleJumpToStage(nextId);
  };

  const currentStage = CONTINUUM_STAGES[activeStageId - 1];
  const ActiveVisual = ANIMATION_COMPONENTS[activeStageId - 1];

  return (
    <div
      ref={containerRef}
      id="integrated-timeline-container"
      className="scroll-mt-16 lg:scroll-mt-20 relative min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-80px)] w-full flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 md:py-16 bg-white border-y border-neutral-100 overflow-hidden select-none"
    >
        
        {/* Background Molecule Pattern Grid */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#00aeef_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        <div className="relative w-full max-w-[1700px] mx-auto flex flex-col justify-center">
          
          {/* Section Header */}
          <div className="text-center mb-5 sm:mb-6 md:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
              Integrated Biologics Development, Manufacturing and Clinical Support
            </h2>
            <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-3xl mx-auto mt-3 sm:mt-4">
              From cell line to clinic, we provide a seamless, integrated continuum—accelerating your biologics from discovery to patients.
            </p>
          </div>

          {/* ================= CLEAN MINIMALIST HORIZONTAL TIMELINE TRACK ================= */}
          <div className="relative max-w-5xl mx-auto mb-6 sm:mb-8 w-full px-1 sm:px-4">
            
            {/* The Connecting Line Track */}
            <div className="relative flex items-center">
              {/* Thin Base Grey Track Line */}
              <div className="absolute left-[10%] right-[10%] top-[22px] sm:top-[32px] -translate-y-1/2 h-[1.5px] bg-slate-200/90 z-0" />

              {/* Active Cyan Progress Line extending precisely to the active step */}
              <motion.div
                className="absolute left-[10%] top-[22px] sm:top-[32px] -translate-y-1/2 h-[2px] bg-[#00aeef] z-0 pointer-events-none"
                initial={false}
                animate={{
                  width: `${((activeStageId - 1) / 4) * 80}%`,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />

              {/* 5 Circular Stage Node Buttons */}
              <div className="relative z-10 w-full grid grid-cols-5 gap-1 sm:gap-2">
                {CONTINUUM_STAGES.map((step) => {
                  const IconComponent = step.icon;
                  const isActive = activeStageId === step.id;
                  const isPassed = activeStageId > step.id;

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => handleJumpToStage(step.id)}
                        className="group relative flex items-center justify-center cursor-pointer outline-none h-11 sm:h-16"
                        title={step.title}
                      >
                        {isActive ? (
                          /* Active Stage: Multi-layer Glowing Halo + Cyan Filled Circle */
                          <div className="relative flex items-center justify-center">
                            {/* Outer diffuse cyan aura ring */}
                            <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-[#00aeef]/12 border border-[#00aeef]/30 flex items-center justify-center shadow-[0_0_18px_rgba(0,174,239,0.28)] transition-all duration-300">
                              {/* Inner crisp white spacer ring */}
                              <div className="w-8.5 h-8.5 sm:w-12 sm:h-12 rounded-full bg-white p-[2px] sm:p-[2.5px] shadow-sm flex items-center justify-center">
                                {/* Solid vibrant cyan core */}
                                <div className="w-full h-full rounded-full bg-[#00aeef] flex items-center justify-center text-white shadow-xs">
                                  <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : isPassed ? (
                          /* Passed Stage: Clean White Circle with Cyan Border & Icon */
                          <div className="w-8.5 h-8.5 sm:w-13 sm:h-13 rounded-full bg-white border border-[#00aeef]/60 flex items-center justify-center shadow-xs transition-all duration-300 group-hover:border-[#00aeef] group-hover:scale-105">
                            <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#00aeef] stroke-[2]" />
                          </div>
                        ) : (
                          /* Inactive Stage: Clean Pure White Circle with Subtle Grey Border & Muted Icon */
                          <div className="w-8.5 h-8.5 sm:w-13 sm:h-13 rounded-full bg-white border border-slate-200/90 flex items-center justify-center shadow-xs transition-all duration-300 group-hover:border-[#00aeef]/50 group-hover:text-[#00aeef] group-hover:scale-105 group-hover:shadow-sm">
                            <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-400 group-hover:text-[#00aeef] transition-colors stroke-[1.8]" />
                          </div>
                        )}
                      </button>

                      {/* Clean Step Number and Title Labels with fluid responsive typography */}
                      <button
                        type="button"
                        onClick={() => handleJumpToStage(step.id)}
                        className="text-center transition-colors cursor-pointer mt-1 sm:mt-1.5 w-full px-0 sm:px-0.5"
                      >
                        <span
                          className={`block text-[10px] sm:text-xs font-bold tracking-wider mb-0.5 transition-colors ${
                            isActive ? 'text-[#00aeef]' : 'text-slate-400'
                          }`}
                        >
                          {step.stepNum}
                        </span>
                        <span
                          className={`text-[9px] min-[360px]:text-[10px] sm:text-xs md:text-[13px] leading-tight block w-full text-center transition-colors break-normal font-medium tracking-tight sm:tracking-normal ${
                            isActive
                              ? 'text-neutral-900 font-bold'
                              : 'text-slate-500 hover:text-neutral-800'
                          }`}
                        >
                          {step.id === 4 ? (
                            <>
                              <span className="sm:hidden whitespace-nowrap">Manufacture</span>
                              <span className="hidden sm:inline">cGMP Mfg</span>
                            </>
                          ) : (
                            step.shortName.replace(/^\d+\.\s*/, '')
                          )}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= FEATURED ACTIVE STAGE INTERACTIVE ANIMATION SHOWCASE ================= */}
          <div className="w-full mx-auto">
            <div className="bg-neutral-50/95 rounded-[20px] border border-neutral-200/90 p-4 sm:p-6 lg:p-7 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
                
                {/* Left Column: Live Animated Process Engine */}
                <div className="lg:col-span-6 bg-white rounded-[16px] border border-neutral-200/90 p-4 sm:p-5 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[290px] sm:min-h-[320px] lg:min-h-[340px]">
                  <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full animate-pulse"
                        style={{ backgroundColor: currentStage.color }}
                      />
                      <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-neutral-900">
                        Live Simulation: {currentStage.shortName}
                      </span>
                    </div>
                    <span
                      className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border shadow-xs"
                      style={{
                        backgroundColor: `${currentStage.color}15`,
                        borderColor: `${currentStage.color}30`,
                        color: currentStage.color,
                      }}
                    >
                      {currentStage.metric}
                    </span>
                  </div>

                  {/* Animated Dynamic SVG Simulation */}
                  <div className="w-full flex items-center justify-center py-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStage.id}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="w-full flex justify-center items-center"
                      >
                        <ActiveVisual />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Column: Stage Description & Key Deliverables */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                        style={{
                          backgroundColor: `${currentStage.color}15`,
                          color: currentStage.color,
                        }}
                      >
                        {currentStage.tag}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-[22px] font-bold text-neutral-900 leading-snug mb-2">
                      {currentStage.headline}
                    </h3>

                    <p className="text-xs sm:text-[14px] md:text-[15px] text-neutral-600 leading-relaxed mb-3.5">
                      {currentStage.description}
                    </p>

                    {/* 3 Key Deliverables */}
                    <div className="space-y-1.5 mb-4">
                      {currentStage.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4.5 h-4.5 shrink-0 mt-0.5"
                            style={{ color: currentStage.color }}
                          />
                          <span className="text-xs sm:text-sm font-medium text-neutral-800 leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button & Step Guide */}
                  <div className="pt-2.5 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Link
                      href={currentStage.link}
                      onClick={() => unlockScroll()}
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-[9px] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md active:scale-95 transition-all w-full sm:w-auto"
                      style={{ backgroundColor: currentStage.color }}
                    >
                      <span>Explore {currentStage.shortName}</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>

                    {/* Stepper Navigation Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handlePrev}
                          aria-label="Previous Stage"
                          className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer text-sm"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          aria-label="Next Stage"
                          className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer text-sm"
                        >
                          ›
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                        <div className="w-14 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#00aeef] rounded-full transition-all duration-300"
                            style={{ width: `${(activeStageId / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs">Stage {activeStageId} of 5</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
    </div>
  );
}

