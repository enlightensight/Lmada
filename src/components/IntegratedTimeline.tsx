'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import {
  Dna,
  Microscope,
  Sparkles,
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
    <svg viewBox="0 0 460 260" className="w-full h-full max-h-[250px]" fill="none">
      <defs>
        <radialGradient id="cellGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00aeef" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00aeef" />
          <stop offset="50%" stopColor="#f58634" />
          <stop offset="100%" stopColor="#00aeef" />
        </linearGradient>
      </defs>

      {/* Outer Petri dish / Reticle field */}
      <circle cx="230" cy="130" r="115" fill="url(#cellGlow)" stroke="#00aeef" strokeWidth="2.5" strokeDasharray="8 4" opacity="0.6" />
      <circle cx="230" cy="130" r="100" fill="#f8fcff" stroke="#00aeef" strokeWidth="2" />

      {/* Target Reticle Crosshairs */}
      <line x1="230" y1="18" x2="230" y2="45" stroke="#00aeef" strokeWidth="2" strokeOpacity="0.5" />
      <line x1="230" y1="215" x2="230" y2="242" stroke="#00aeef" strokeWidth="2" strokeOpacity="0.5" />
      <line x1="118" y1="130" x2="145" y2="130" stroke="#00aeef" strokeWidth="2" strokeOpacity="0.5" />
      <line x1="315" y1="130" x2="342" y2="130" stroke="#00aeef" strokeWidth="2" strokeOpacity="0.5" />

      {/* High-Performance Clonal Cell in Center */}
      <motion.g
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <circle cx="230" cy="130" r="48" fill="#e0f4fd" stroke="#00aeef" strokeWidth="3" />
        <circle cx="230" cy="130" r="34" fill="#00aeef" fillOpacity="0.15" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx="230" cy="130" r="16" fill="#00aeef" fillOpacity="0.3" />
      </motion.g>

      {/* Rotating DNA Double Helix strands */}
      <g transform="translate(190, 85)">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.g
            key={i}
            animate={{ y: [0, -4, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
          >
            <circle cx={i * 13} cy={Math.sin(i * 0.9) * 22 + 45} r="4" fill="#00aeef" />
            <circle cx={i * 13} cy={-Math.sin(i * 0.9) * 22 + 45} r="4" fill="#f58634" />
            <line
              x1={i * 13}
              y1={Math.sin(i * 0.9) * 22 + 45}
              x2={i * 13}
              y2={-Math.sin(i * 0.9) * 22 + 45}
              stroke="#0f2231"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
          </motion.g>
        ))}
      </g>

      {/* Gene Delivery Vector Particles */}
      <motion.circle
        cx="160"
        cy="90"
        r="6"
        fill="#f58634"
        animate={{ cx: [150, 215], cy: [75, 115], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeIn' }}
      />
      <motion.circle
        cx="295"
        cy="170"
        r="6"
        fill="#f58634"
        animate={{ cx: [305, 245], cy: [180, 145], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.8, delay: 0.8, ease: 'easeIn' }}
      />

      {/* Verified Monoclonality Stamp Badge */}
      <motion.g
        transform="translate(305, 135)"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <circle cx="20" cy="20" r="22" fill="#00aeef" />
        <path d="M 12 20 L 18 26 L 28 14" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

function Stage2Animation() {
  return (
    <svg viewBox="0 0 460 260" className="w-full h-full max-h-[250px]" fill="none">
      <defs>
        <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="resinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00aeef" />
          <stop offset="50%" stopColor="#f58634" />
          <stop offset="100%" stopColor="#00aeef" />
        </linearGradient>
      </defs>

      {/* UPSTREAM BIOREACTOR (Left Side) */}
      <g transform="translate(60, 25)">
        {/* Motor Top */}
        <rect x="36" y="0" width="22" height="16" rx="3" fill="#00aeef" />
        <rect x="18" y="16" width="58" height="10" rx="3" fill="#0f2231" />

        {/* Bioreactor Vessel Shell */}
        <path
          d="M 20 26 H 74 V 135 C 74 150 63 162 47 162 C 31 162 20 150 20 135 Z"
          fill="#f8fcff"
          stroke="#00aeef"
          strokeWidth="3"
        />

        {/* Dynamic Bubbling Liquid */}
        <motion.path
          d="M 22 55 Q 35 50 47 55 T 72 55 V 135 C 72 148 62 159 47 159 C 32 159 22 148 22 135 Z"
          fill="url(#liquidGrad)"
          animate={{
            d: [
              "M 22 55 Q 35 50 47 55 T 72 55 V 135 C 72 148 62 159 47 159 C 32 159 22 148 22 135 Z",
              "M 22 52 Q 35 57 47 52 T 72 52 V 135 C 72 148 62 159 47 159 C 32 159 22 148 22 135 Z",
              "M 22 55 Q 35 50 47 55 T 72 55 V 135 C 72 148 62 159 47 159 C 32 159 22 148 22 135 Z",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />

        {/* Agitator Impeller Shaft & Blades */}
        <line x1="47" y1="26" x2="47" y2="135" stroke="#0f2231" strokeWidth="3" />
        <motion.g
          animate={{ scaleX: [1, -1, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          style={{ transformOrigin: '47px 115px' }}
        >
          <path d="M 28 115 Q 47 110 66 115" stroke="#f58634" strokeWidth="4" strokeLinecap="round" />
          <path d="M 32 90 Q 47 85 62 90" stroke="#f58634" strokeWidth="3.5" strokeLinecap="round" />
        </motion.g>

        {/* Rising Aeration Bubbles */}
        {[
          { cx: 34, delay: 0 },
          { cx: 58, delay: 0.5 },
          { cx: 42, delay: 1.0 },
          { cx: 52, delay: 1.5 },
        ].map((b, i) => (
          <motion.circle
            key={i}
            cx={b.cx}
            cy="140"
            r="3"
            fill="#ffffff"
            animate={{ cy: [140, 58], opacity: [0.2, 0.9, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, delay: b.delay, ease: 'easeOut' }}
          />
        ))}
      </g>

      {/* CONNECTING TRANSFER PIPELINE */}
      <g>
        <path d="M 134 110 H 220" stroke="#00aeef" strokeWidth="4" strokeDasharray="6 4" />
        <motion.circle
          cx="134"
          cy="110"
          r="5"
          fill="#f58634"
          animate={{ cx: [134, 220] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
        />
        {/* Flow Direction Arrow */}
        <polygon points="220,105 230,110 220,115" fill="#00aeef" />
      </g>

      {/* DOWNSTREAM CHROMATOGRAPHY PURIFICATION COLUMN (Right Side) */}
      <g transform="translate(235, 25)">
        {/* Column Inlets & Flanges */}
        <rect x="25" y="10" width="40" height="12" rx="2" fill="#0f2231" />
        <rect x="25" y="158" width="40" height="12" rx="2" fill="#0f2231" />

        {/* Column Cylinder */}
        <rect x="30" y="22" width="30" height="136" rx="4" fill="#ffffff" stroke="#00aeef" strokeWidth="3" />

        {/* Resin Packed Bed with Flow Waves */}
        <rect x="33" y="45" width="24" height="90" fill="url(#resinGrad)" opacity="0.85" rx="2" />

        {/* Purified Elution Droplets Exiting Bottom */}
        <motion.circle
          cx="45"
          cy="175"
          r="4.5"
          fill="#00aeef"
          animate={{ cy: [175, 205], opacity: [1, 0], scale: [1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeIn' }}
        />
        <motion.circle
          cx="45"
          cy="175"
          r="4.5"
          fill="#f58634"
          animate={{ cy: [175, 205], opacity: [1, 0], scale: [1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.4, delay: 0.7, ease: 'easeIn' }}
        />

        {/* Collection Erlenmeyer Flask */}
        <path d="M 35 210 L 25 235 H 65 L 55 210 Z" fill="#e0f4fd" stroke="#00aeef" strokeWidth="2" />
        <rect x="41" y="202" width="8" height="8" fill="#00aeef" />
      </g>

      {/* High Recovery Yield Badge */}
      <motion.g
        transform="translate(340, 110)"
        animate={{ y: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        <rect x="0" y="0" width="105" height="42" rx="8" fill="#ffffff" stroke="#f58634" strokeWidth="2" />
        <text x="12" y="18" fill="#f58634" fontSize="10" fontWeight="bold" fontFamily="sans-serif">DO CONTROL</text>
        <text x="12" y="32" fill="#0f2231" fontSize="11" fontWeight="bold" fontFamily="sans-serif">40.0% ± 2%</text>
      </motion.g>
    </svg>
  );
}

function Stage3Animation() {
  return (
    <svg viewBox="0 0 460 260" className="w-full h-full max-h-[250px]" fill="none">
      <defs>
        <linearGradient id="specGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00aeef" />
          <stop offset="60%" stopColor="#f58634" />
          <stop offset="100%" stopColor="#00aeef" />
        </linearGradient>
      </defs>

      {/* Chromatography Screen Chassis */}
      <rect x="40" y="25" width="380" height="210" rx="12" fill="#ffffff" stroke="#00aeef" strokeWidth="2.5" />
      <rect x="52" y="37" width="356" height="145" rx="8" fill="#0a1926" />

      {/* Grid Lines on Spectrum Display */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`v-${i}`}
          x1={70 + i * 50}
          y1="45"
          x2={70 + i * 50}
          y2="175"
          stroke="#00aeef"
          strokeWidth="1"
          strokeOpacity="0.15"
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`h-${i}`}
          x1="60"
          y1={55 + i * 35}
          x2="395"
          y2={55 + i * 35}
          stroke="#00aeef"
          strokeWidth="1"
          strokeOpacity="0.15"
        />
      ))}

      {/* SEC-HPLC Analytical Peak Wave Trace */}
      <motion.path
        d="M 60 160 L 130 160 Q 150 160 165 145 L 185 85 Q 195 52 205 85 L 225 145 Q 235 160 250 160 L 270 160 Q 280 160 290 135 L 305 110 Q 312 95 320 110 L 335 145 Q 345 160 360 160 L 395 160"
        fill="none"
        stroke="url(#specGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      />

      {/* Dynamic Laser Scanning Vertical Line */}
      <motion.line
        x1="60"
        y1="45"
        x2="60"
        y2="175"
        stroke="#f58634"
        strokeWidth="2.5"
        strokeDasharray="4 2"
        animate={{ x1: [60, 395, 60], x2: [60, 395, 60] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
      />

      {/* Monomer Peak Callout */}
      <g transform="translate(160, 38)">
        <rect x="0" y="0" width="85" height="22" rx="4" fill="#00aeef" />
        <text x="8" y="15" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          Main Peak: 98.7%
        </text>
      </g>

      {/* Bottom Telemetry Bar */}
      <g transform="translate(60, 195)">
        <circle cx="10" cy="18" r="6" fill="#00aeef" />
        <text x="24" y="22" fill="#0f2231" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
          SEC-HPLC / Mass Spec Verified
        </text>

        <circle cx="230" cy="18" r="6" fill="#f58634" />
        <text x="244" y="22" fill="#0f2231" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
          HCP &lt; 10 ppm
        </text>
      </g>
    </svg>
  );
}

function Stage4Animation() {
  return (
    <svg viewBox="0 0 460 260" className="w-full h-full max-h-[250px]" fill="none">
      <defs>
        <linearGradient id="vialLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#00aeef" />
        </linearGradient>
      </defs>

      {/* Cleanroom Wall Frame */}
      <rect x="30" y="25" width="400" height="210" rx="12" fill="#ffffff" stroke="#f58634" strokeWidth="2.5" />

      {/* HEPA Filter Laminar Airflow Streamers */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.line
          key={i}
          x1={60 + i * 45}
          y1="35"
          x2={60 + i * 45}
          y2="75"
          stroke="#00aeef"
          strokeWidth="2"
          strokeDasharray="4 4"
          animate={{ y1: [35, 45, 35], y2: [75, 85, 75], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
        />
      ))}

      {/* Conveyor Belt Track */}
      <rect x="50" y="165" width="360" height="20" rx="4" fill="#0f2231" />
      <line x1="50" y1="175" x2="410" y2="175" stroke="#f58634" strokeWidth="2" strokeDasharray="12 6" />

      {/* Moving Sterile Glass Vials */}
      {[
        { x: 90, filled: true },
        { x: 165, filled: true },
        { x: 240, filling: true },
        { x: 315, filled: false },
      ].map((v, i) => (
        <g key={i} transform={`translate(${v.x}, 105)`}>
          {/* Glass Vial Body */}
          <rect x="0" y="15" width="34" height="48" rx="4" fill="#f0f9ff" stroke="#00aeef" strokeWidth="2" />
          {/* Vial Neck & Stopper */}
          <rect x="8" y="5" width="18" height="10" rx="1" fill="#0f2231" />
          <rect x="4" y="0" width="26" height="5" rx="2" fill="#f58634" />

          {/* Liquid Level */}
          {v.filled && (
            <rect x="3" y="32" width="28" height="28" rx="2" fill="url(#vialLiquid)" opacity="0.9" />
          )}

          {v.filling && (
            <motion.rect
              x="3"
              y="32"
              width="28"
              rx="2"
              fill="url(#vialLiquid)"
              initial={{ height: 5, y: 55 }}
              animate={{ height: [5, 28, 5], y: [55, 32, 55] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />
          )}
        </g>
      ))}

      {/* Automated Filling Needle Dispenser */}
      <g transform="translate(247, 45)">
        <rect x="4" y="0" width="12" height="35" rx="2" fill="#0f2231" />
        <line x1="10" y1="35" x2="10" y2="65" stroke="#00aeef" strokeWidth="3" strokeLinecap="round" />

        {/* Liquid Droplet Dispensing into Vial */}
        <motion.circle
          cx="10"
          cy="68"
          r="3.5"
          fill="#00aeef"
          animate={{ cy: [68, 95], opacity: [1, 0], scale: [1, 0.5] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'easeIn' }}
        />
      </g>

      {/* cGMP ISO 5 Cleanroom Class Badge */}
      <g transform="translate(60, 198)">
        <rect x="0" y="0" width="130" height="24" rx="4" fill="#f58634" />
        <text x="12" y="16" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
          GRADE A / ISO 5 cGMP
        </text>
      </g>

      <g transform="translate(260, 198)">
        <text x="0" y="16" fill="#0f2231" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
          High-Speed Aseptic Stoppering
        </text>
      </g>
    </svg>
  );
}

function Stage5Animation() {
  return (
    <svg viewBox="0 0 460 260" className="w-full h-full max-h-[250px]" fill="none">
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00aeef" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00aeef" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Global Distribution Map Ring */}
      <circle cx="230" cy="130" r="105" fill="url(#globeGlow)" stroke="#00aeef" strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="230" cy="130" r="80" stroke="#00aeef" strokeWidth="1.5" strokeOpacity="0.4" />

      {/* Latitude / Longitude Arcs */}
      <ellipse cx="230" cy="130" rx="80" ry="35" stroke="#00aeef" strokeWidth="1" strokeOpacity="0.35" />
      <ellipse cx="230" cy="130" rx="35" ry="80" stroke="#00aeef" strokeWidth="1" strokeOpacity="0.35" />

      {/* Central Certified Release Shield */}
      <motion.g
        transform="translate(195, 80)"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        <path
          d="M 35 0 L 70 15 V 55 C 70 80 35 100 35 100 C 35 100 0 80 0 55 V 15 Z"
          fill="#00aeef"
          stroke="#ffffff"
          strokeWidth="3"
        />
        {/* Glowing Checkmark */}
        <path
          d="M 22 48 L 32 58 L 50 36"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Global Clinical Site Trajectory Arcs */}
      {[
        { x: 90, y: 80, label: 'North America' },
        { x: 370, y: 75, label: 'Europe' },
        { x: 360, y: 190, label: 'Asia-Pacific' },
      ].map((site, i) => (
        <g key={i}>
          {/* Arc to Center */}
          <motion.path
            d={`M 230 130 Q ${(230 + site.x) / 2} ${site.y - 20} ${site.x} ${site.y}`}
            stroke="#f58634"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -16] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />

          {/* Pulse Pin */}
          <circle cx={site.x} cy={site.y} r="8" fill="#f58634" fillOpacity="0.3" />
          <circle cx={site.x} cy={site.y} r="4.5" fill="#f58634" />
          <text x={site.x - 25} y={site.y + 18} fill="#0f2231" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
            {site.label}
          </text>
        </g>
      ))}

      {/* Cold Chain Status Floating Pill */}
      <g transform="translate(60, 195)">
        <rect x="0" y="0" width="135" height="26" rx="6" fill="#ffffff" stroke="#00aeef" strokeWidth="1.5" />
        <circle cx="14" cy="13" r="5" fill="#00aeef" />
        <text x="26" y="17" fill="#0f2231" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
          -80°C Cryo Monitored
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
      className="scroll-mt-16 lg:scroll-mt-20 relative min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-80px)] w-full flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10 bg-white border-y border-neutral-100 overflow-hidden select-none"
    >
        
        {/* Background Molecule Pattern Grid */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#00aeef_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        <div className="relative w-full max-w-[1600px] mx-auto flex flex-col justify-center">
          
          {/* Section Header */}
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-semibold tracking-tight text-neutral-900 leading-tight max-w-4xl mx-auto">
              Integrated biologics development, manufacturing and clinical support
            </h2>
            <p className="text-xs sm:text-sm md:text-[14px] text-neutral-600 leading-relaxed max-w-3xl mx-auto mt-1">
              An end-to-end continuum connecting cell line engineering, process scale-up, analytical rigor, and cGMP supply to accelerate clinical milestones.
            </p>
          </div>

          {/* ================= CLEAN HORIZONTAL TIMELINE TRACK ================= */}
          <div className="relative max-w-5xl mx-auto mb-3 sm:mb-4 w-full">
            
            {/* The Road Track with Live Fill */}
            <div className="relative py-2 flex items-center">
              {/* Background Track Strip */}
              <div className="absolute left-[8%] right-[8%] sm:left-[10%] sm:right-[10%] h-4 sm:h-5 bg-neutral-100 rounded-full border border-neutral-200 overflow-hidden flex items-center z-0 shadow-inner">
                {/* White dashed highway centerline */}
                <div className="w-full border-t-2 border-dashed border-neutral-300 scale-y-110" />

                {/* Animated Progress Fill Gradient */}
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#00aeef] via-[#f58634] to-[#00aeef] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((activeStageId - 1) / 4) * 100}%` }}
                />
              </div>

              {/* 5 Circular Stage Node Buttons */}
              <div className="relative z-10 w-full grid grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
                {CONTINUUM_STAGES.map((step) => {
                  const IconComponent = step.icon;
                  const isActive = activeStageId === step.id;
                  const isPassed = activeStageId > step.id;

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => handleJumpToStage(step.id)}
                        className="group relative flex items-center justify-center cursor-pointer outline-none mb-1.5"
                        title={step.title}
                      >
                        {/* Active Expanding Pulse Waves */}
                        {isActive && (
                          <>
                            <motion.div
                              className="absolute -inset-2.5 sm:-inset-3 rounded-full opacity-40 pointer-events-none"
                              style={{ backgroundColor: step.color }}
                              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            />
                            <motion.div
                              className="absolute -inset-1 sm:-inset-1.5 rounded-full ring-2 pointer-events-none"
                              style={{ borderColor: step.color }}
                              animate={{ scale: [1, 1.15, 1] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                          </>
                        )}

                        {/* Main Node Button */}
                        <div
                          className={`w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-3 sm:border-4 border-white shadow-md transition-all duration-300 flex items-center justify-center relative z-10 ${
                            isActive
                              ? `${step.bgClass} scale-110 shadow-xl ring-4 ring-neutral-900/10`
                              : isPassed
                              ? `${step.bgClass} opacity-95`
                              : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'
                          }`}
                        >
                          <IconComponent
                            className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300 group-hover:scale-110 ${
                              isActive || isPassed ? 'text-white' : 'text-neutral-600'
                            }`}
                          />
                        </div>
                      </button>

                      {/* Clean Under-Node Label */}
                      <button
                        type="button"
                        onClick={() => handleJumpToStage(step.id)}
                        className={`text-center transition-colors cursor-pointer hidden sm:block ${
                          isActive
                            ? 'text-neutral-900 font-bold'
                            : 'text-neutral-500 hover:text-neutral-800 font-medium'
                        }`}
                      >
                        <span
                          className={`block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-0.5 ${
                            isActive ? 'text-[#00aeef]' : 'text-neutral-400'
                          }`}
                        >
                          {step.stepNum}
                        </span>
                        <span className="text-xs sm:text-[12px] leading-tight block truncate max-w-[100px] lg:max-w-[130px]">
                          {step.shortName.replace(/^\d+\.\s*/, '')}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= FEATURED ACTIVE STAGE INTERACTIVE ANIMATION SHOWCASE ================= */}
          <div className="max-w-5xl mx-auto w-full">
            <div className="bg-neutral-50/95 rounded-[16px] border border-neutral-200/90 p-3.5 sm:p-5 lg:p-5 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-7 items-center">
                
                {/* Left Column: Live Animated Process Engine */}
                <div className="lg:col-span-6 bg-white rounded-[14px] border border-neutral-200/90 p-3 sm:p-3.5 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[210px] sm:min-h-[235px]">
                  <div className="w-full flex items-center justify-between pb-1.5 mb-1 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full animate-pulse"
                        style={{ backgroundColor: currentStage.color }}
                      />
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                        Live Simulation: {currentStage.shortName}
                      </span>
                    </div>
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-xs"
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
                  <div className="w-full flex items-center justify-center my-0.5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStage.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-full flex justify-center"
                      >
                        <ActiveVisual />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Column: Stage Description & Key Deliverables */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${currentStage.color}15`,
                          color: currentStage.color,
                        }}
                      >
                        {currentStage.tag}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 leading-snug mb-1.5">
                      {currentStage.headline}
                    </h3>

                    <p className="text-xs sm:text-[13px] md:text-sm text-neutral-600 leading-relaxed mb-3">
                      {currentStage.description}
                    </p>

                    {/* 3 Key Deliverables */}
                    <div className="space-y-1 mb-3.5">
                      {currentStage.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: currentStage.color }}
                          />
                          <span className="text-xs sm:text-[13px] font-medium text-neutral-800 leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button & Step Guide */}
                  <div className="pt-2 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <Link
                      href={currentStage.link}
                      onClick={() => unlockScroll()}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-[8px] text-white font-semibold text-xs uppercase tracking-wider shadow-sm hover:shadow-md active:scale-95 transition-all w-full sm:w-auto"
                      style={{ backgroundColor: currentStage.color }}
                    >
                      <span>Explore {currentStage.shortName}</span>
                      <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Link>

                    {/* Stepper Navigation Controls */}
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handlePrev}
                          aria-label="Previous Stage"
                          className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer text-xs"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          aria-label="Next Stage"
                          className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer text-xs"
                        >
                          ›
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                        <div className="w-12 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#00aeef] rounded-full transition-all duration-300"
                            style={{ width: `${(activeStageId / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-[11px]">Stage {activeStageId} of 5</span>
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

