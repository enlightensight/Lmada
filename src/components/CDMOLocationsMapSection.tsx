'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Building2, Microscope, Factory, Globe, CheckCircle2, ExternalLink } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface LocationInfo {
  id: 'india' | 'uk';
  city: string;
  country: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  bullets: string[];
  href: string;
  // Map positioning in percentage (relative to world-map.svg viewBox)
  xPercent: number;
  yPercent: number;
  stats: { label: string; value: string }[];
  accentColor: string;
}

const CDMO_LOCATIONS: LocationInfo[] = [
  {
    id: 'india',
    city: 'Ahmedabad',
    country: 'India',
    title: 'Ahmedabad, India',
    badge: 'Primary Biomanufacturing Campus',
    tagline: 'India HQ & cGMP Biomanufacturing',
    description: 'Integrated development with Process and Analytical Sciences capabilities, combined with cGMP manufacturing for both drug substance and drug product.',
    bullets: [
      'Integrated development with Process and Analytical Sciences capabilities, combined with cGMP manufacturing for both drug substance and drug product.',
      '2x 200L single-use bioreactor suites for clinical drug substance.',
      'Robotic barrier isolator filling line (10,000 units/batch in vials, PFS, cartridges).',
      'Unified quality and compliance framework aligned with US FDA & EMA expectations.'
    ],
    href: '/facility&location/India',
    xPercent: 66.8,
    yPercent: 45.8,
    stats: [
      { label: 'Campus Size', value: '27,000 sqft' },
      { label: 'Bioreactors', value: '2x 200L' },
      { label: 'Fill-Finish', value: '10k units/batch' }
    ],
    accentColor: '#f58634'
  },
  {
    id: 'uk',
    city: 'London',
    country: 'UK',
    title: 'London, UK',
    badge: 'European Innovation Centre',
    tagline: 'European Innovation & Analytics Hub',
    description: 'Biologics development capabilities that will support process and analytical development for drug substance followed by process characterisation studies.',
    bullets: [
      'Biologics development capabilities that will support process and analytical development for drug substance followed by process characterisation studies.',
      'High-throughput clone screening and cell line optimization.',
      'Orthogonal physicochemical characterization and intact mass spectrometry (LC-MS).',
      'Direct technology transfer and recipe scale-up to Ahmedabad GMP suites.'
    ],
    href: '/facility&location/UK',
    xPercent: 46.8,
    yPercent: 17.3,
    stats: [
      { label: 'Focus', value: 'Process Dev' },
      { label: 'Mass Spec', value: 'LC-MS' },
      { label: 'Programs', value: 'Process Characterisation' }
    ],
    accentColor: '#00aeef'
  }
];

interface CDMOLocationsMapSectionProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string | null;
}

export default function CDMOLocationsMapSection({
  id = 'our-cdmo-locations',
  className = '',
  title = 'Our CDMO Locations',
  subtitle = `Lambda CDMO operates across Ahmedabad, India, and London, UK, bringing together complementary capabilities in biologics development, analytical sciences, process development, and GMP manufacturing.

Our facilities support with a strong focus, different aspects of biologics development, with Ahmedabad providing an integrated development and GMP manufacturing platform and London providing specialized biologics development and analytical capabilities for drug substance process development and process characterisation.`
}: CDMOLocationsMapSectionProps = {}) {
  const [activeLocationId, setActiveLocationId] = useState<'india' | 'uk' | null>('india');

  return (
    <section id={id} className={`scroll-mt-20 lg:scroll-mt-24 relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-white border-b border-neutral-100 overflow-hidden select-none ${className}`}>
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00aeef_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1700px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
              {title}
            </h2>
            {subtitle && (
              <div className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-3xl mx-auto mt-4 space-y-3">
                {subtitle.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </Reveal>
        </div>

        {/* Full-Width Interactive Map Viewport */}
        <div className="w-full max-w-[1500px] mx-auto flex flex-col">
          <Reveal delay={0.1}>
            <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] border border-slate-200/90 shadow-xl overflow-hidden flex flex-col">
              
              {/* Map Ambient Glows */}
              <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Control Bar with Quick Toggle Pills */}
              <div className="relative z-20 flex items-center justify-between p-3 sm:p-4 border-b border-slate-200/90 bg-white/85 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-700">
                    Locations
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setActiveLocationId('india')}
                    onMouseEnter={() => setActiveLocationId('india')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeLocationId === 'india'
                        ? 'bg-brand-orange text-black shadow-xs'
                        : 'text-slate-600 hover:text-neutral-900 hover:bg-white/60'
                    }`}
                  >
                    Ahmedabad, India
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLocationId('uk')}
                    onMouseEnter={() => setActiveLocationId('uk')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeLocationId === 'uk'
                        ? 'bg-brand-blue text-white shadow-xs'
                        : 'text-slate-600 hover:text-neutral-900 hover:bg-white/60'
                    }`}
                  >
                    London, UK
                  </button>
                </div>
              </div>

              {/* Map Graphic Viewport Container - Full size width and height */}
              <div className="relative w-full overflow-hidden pt-2 pb-6 sm:pb-10">
                
                {/* REAL World Map SVG */}
                <div className="relative w-full aspect-[1010/440] max-w-[1300px] mx-auto select-none scale-[1.08] sm:scale-[1.12] origin-center">
                  <img
                    src="/images/world-map.svg?v=2"
                    alt="World Map - Lambda CDMO Locations"
                    className="w-full h-full object-contain filter contrast-110 brightness-95 opacity-85"
                  />

                  {/* Geodesic Connection Arc SVG between London (46.8%, 17.3%) and Ahmedabad (66.8%, 45.8%) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <defs>
                      <linearGradient id="arcGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00aeef" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#6366f1" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#f58634" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    
                    {/* Base Flight Path Curve (curved upwards over Europe/Middle East) */}
                    <path
                      d="M 46.8% 17.3% Q 56% 8%, 66.8% 45.8%"
                      fill="none"
                      stroke="url(#arcGradientLight)"
                      strokeWidth="2.4"
                      strokeDasharray="5,4"
                      className="animate-pulse"
                    />

                    {/* Moving Light Particle Pulse along the flight path */}
                    <circle r="4" fill="#00aeef" filter="drop-shadow(0 0 5px #00aeef)">
                      <animateMotion
                        path="M 46.8% 17.3% Q 56% 8%, 66.8% 45.8%"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>

                  {/* LOCATION 1: London, UK Pin & Beacon */}
                  <div
                    style={{ left: '46.8%', top: '17.3%' }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    {/* Pulsing Radar Ring */}
                    <div className="absolute -inset-3 rounded-full bg-brand-blue/20 animate-ping pointer-events-none" />
                    <div className="absolute -inset-5 rounded-full border border-brand-blue/30 animate-pulse pointer-events-none" />
                    
                    {/* Interactive Pin Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setActiveLocationId('uk')}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 ${
                        activeLocationId === 'uk'
                          ? 'bg-brand-blue text-white scale-125 ring-4 ring-brand-blue/30'
                          : 'bg-white border-2 border-brand-blue text-brand-blue hover:scale-110'
                      }`}
                      title="London, UK"
                    >
                      <Microscope className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    {/* Fixed Label Pill */}
                    <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 border border-brand-blue/40 text-[11px] font-bold text-brand-blue px-2.5 py-0.5 rounded-full shadow-sm pointer-events-none">
                      London, UK
                    </div>

                    {/* POPUP MODAL ANIMATION FOR LONDON */}
                    <AnimatePresence>
                      {activeLocationId === 'uk' && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.94 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className="absolute z-50 left-1/2 -translate-x-[75%] sm:-translate-x-[50%] top-10 w-72 sm:w-80 bg-white/95 backdrop-blur-xl border border-brand-blue/40 rounded-xl p-3.5 shadow-2xl text-left"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <h4 className="text-sm font-bold text-neutral-900">
                              London, UK
                            </h4>
                            <span className="text-[10px] font-semibold text-brand-blue bg-brand-blue/10 px-1.5 py-0.5 rounded border border-brand-blue/20">UK</span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed mb-3">
                            Biologics development capabilities that will support process and analytical development for drug substance followed by process characterisation studies.
                          </p>

                          <Link
                            href="/facility&location/UK"
                            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold transition-all shadow-sm"
                          >
                            <span>Explore London Centre</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* LOCATION 2: Ahmedabad, India Pin & Beacon */}
                  <div
                    style={{ left: '66.8%', top: '45.8%' }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    {/* Pulsing Radar Ring */}
                    <div className="absolute -inset-3 rounded-full bg-brand-orange/20 animate-ping pointer-events-none" />
                    <div className="absolute -inset-5 rounded-full border border-brand-orange/30 animate-pulse pointer-events-none" />
                    
                    {/* Interactive Pin Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setActiveLocationId('india')}
                      onMouseEnter={() => setActiveLocationId('india')}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 ${
                        activeLocationId === 'india'
                          ? 'bg-brand-orange text-black scale-125 ring-4 ring-brand-orange/30'
                          : 'bg-white border-2 border-brand-orange text-brand-orange hover:scale-110'
                      }`}
                      title="Ahmedabad, India"
                    >
                      <Factory className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    {/* Fixed Label Pill */}
                    <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 border border-brand-orange/40 text-[11px] font-bold text-brand-orange px-2.5 py-0.5 rounded-full shadow-sm pointer-events-none">
                      Ahmedabad, India
                    </div>

                    {/* POPUP MODAL ANIMATION FOR AHMEDABAD */}
                    <AnimatePresence>
                      {activeLocationId === 'india' && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.94 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className="absolute z-50 left-1/2 -translate-x-[50%] sm:-translate-x-[35%] top-10 w-72 sm:w-80 bg-white/95 backdrop-blur-xl border border-brand-orange/40 rounded-xl p-3.5 shadow-2xl text-left"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <h4 className="text-sm font-bold text-neutral-900">
                              Ahmedabad, India
                            </h4>
                            <span className="text-[10px] font-semibold text-brand-orange bg-brand-orange/10 px-1.5 py-0.5 rounded border border-brand-orange/20">India</span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed mb-3">
                            Integrated development with Process and Analytical Sciences capabilities, combined with cGMP manufacturing for both drug substance and drug product.
                          </p>

                          <Link
                            href="/facility&location/India"
                            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-black text-xs font-semibold transition-all shadow-sm"
                          >
                            <span>Explore Ahmedabad Facility</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
