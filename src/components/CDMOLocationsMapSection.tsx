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
    description: 'Integrated development, analytical and GMP manufacturing capabilities.',
    bullets: [
      'Integrated development, analytical and GMP manufacturing capabilities.',
      '2x 200L single-use bioreactor suites for clinical drug substance.',
      'Robotic barrier isolator filling line (10,000 units/batch in vials, PFS, cartridges).',
      'Unified quality and compliance framework aligned with US FDA & EMA expectations.'
    ],
    href: '/facility&location/India',
    xPercent: 66.8,
    yPercent: 41.5,
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
    description: 'Biologics development capabilities focused on upstream and downstream process development, analytical development, biosimilar development and process characterization.',
    bullets: [
      'Biologics development capabilities focused on upstream and downstream process development, analytical development, biosimilar development and process characterization.',
      'High-throughput clone screening and cell line optimization.',
      'Orthogonal physicochemical characterization and intact mass spectrometry (LC-MS).',
      'Direct technology transfer and recipe scale-up to Ahmedabad GMP suites.'
    ],
    href: '/facility&location/UK',
    xPercent: 47.3,
    yPercent: 13.0,
    stats: [
      { label: 'Focus', value: 'Process Dev' },
      { label: 'Mass Spec', value: 'LC-MS' },
      { label: 'Programs', value: 'Biosimilars' }
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
  subtitle = 'Lambda CDMO operates across Ahmedabad, India, and London, UK, bringing together complementary capabilities in biologics development, analytical sciences, process development, and GMP manufacturing.'
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
              <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-3xl mx-auto mt-4">
                {subtitle}
              </p>
            )}
          </Reveal>
        </div>

        {/* Responsive Layout: Information Cards (Left / Vertical Tabs) & Real Interactive Map */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* Left Column: Location Cards (Vertical Tabs on Desktop & Tablet) */}
          <div className="xl:col-span-5 flex flex-col gap-4">
            {CDMO_LOCATIONS.map((loc, idx) => {
              const isActive = activeLocationId === loc.id;
              const isIndia = loc.id === 'india';
              return (
                <Reveal key={loc.id} delay={idx * 0.1}>
                  <div
                    onClick={() => setActiveLocationId(loc.id)}
                    onMouseEnter={() => setActiveLocationId(loc.id)}
                    className={`cursor-pointer rounded-2xl overflow-hidden p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between relative group ${
                      isActive
                        ? isIndia
                          ? 'bg-white text-neutral-900 border-brand-orange/70 shadow-xl ring-2 ring-brand-orange/20'
                          : 'bg-white text-neutral-900 border-brand-blue/70 shadow-xl ring-2 ring-brand-blue/20'
                        : 'bg-neutral-50/80 hover:bg-white text-neutral-900 border-neutral-200/90 shadow-xs hover:shadow-md hover:border-neutral-300'
                    }`}
                  >
                    {/* Top accent indicator on active - cleanly clipped inside rounded card */}
                    <div
                      className={`absolute top-0 inset-x-0 h-1.5 rounded-t-2xl pointer-events-none transition-all duration-300 ${
                        isActive
                          ? isIndia ? 'bg-brand-orange opacity-100' : 'bg-brand-blue opacity-100'
                          : 'bg-transparent opacity-0'
                      }`}
                    />

                    <div>
                      {/* Top Header Location & Sub-indicator */}
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          <MapPin
                            className={`w-3.5 h-3.5 ${
                              isActive
                                ? isIndia ? 'text-brand-orange animate-bounce' : 'text-brand-blue animate-bounce'
                                : 'text-slate-400'
                            }`}
                          />
                          <span
                            className={
                              isActive
                                ? isIndia ? 'text-brand-orange font-bold' : 'text-brand-blue font-bold'
                                : 'text-slate-600'
                            }
                          >
                            {loc.country}
                          </span>
                        </div>
                        <span className={`text-[11px] font-medium ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                          {loc.id === 'india' ? 'India HQ' : 'European Hub'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 transition-colors ${
                          isActive
                            ? 'text-neutral-900'
                            : 'text-neutral-900 group-hover:text-brand-blue'
                        }`}
                      >
                        {loc.title}
                      </h3>

                      {/* Primary Requirement Bullet Text */}
                      <p className="text-[14px] sm:text-[15px] font-normal leading-relaxed mb-3.5 text-slate-600">
                        {loc.description}
                      </p>

                      {/* Quick Highlight Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {loc.stats.map((stat, sIdx) => (
                          <span
                            key={sIdx}
                            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                              isActive
                                ? isIndia
                                  ? 'bg-orange-50/80 text-neutral-800 border-orange-200'
                                  : 'bg-sky-50/80 text-neutral-800 border-sky-200'
                                : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                            }`}
                          >
                            <strong className={isActive ? (isIndia ? 'text-brand-orange' : 'text-brand-blue') : 'text-neutral-900'}>{stat.label}:</strong> {stat.value}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Action Link */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between mt-auto">
                      <span className="text-xs text-slate-500 font-medium">
                        {loc.id === 'india' ? 'Primary Biomanufacturing' : 'Innovation & Analytics'}
                      </span>

                      <Link
                        href={loc.href}
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                          isActive
                            ? isIndia
                              ? 'bg-brand-orange hover:bg-brand-orange-hover text-black'
                              : 'bg-brand-blue hover:bg-brand-blue-hover text-white'
                            : 'bg-neutral-100 hover:bg-brand-blue hover:text-white text-neutral-700'
                        }`}
                      >
                        <span>Explore Facility</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Right Column: Real Vector Map with Animated Popups (Light Theme) */}
          <div className="xl:col-span-7 flex flex-col">
            <Reveal delay={0.15}>
              <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] border border-slate-200/90 shadow-xl overflow-hidden flex flex-col">
                
                {/* Map Ambient Glows */}
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Control Bar with Quick Toggle Pills */}
                <div className="relative z-20 flex items-center justify-between p-3 sm:p-3.5 border-b border-slate-200/90 bg-white/85 backdrop-blur-md">
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
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
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
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        activeLocationId === 'uk'
                          ? 'bg-brand-blue text-white shadow-xs'
                          : 'text-slate-600 hover:text-neutral-900 hover:bg-white/60'
                      }`}
                    >
                      London, UK
                    </button>
                  </div>
                </div>

                {/* Map Graphic Viewport Container */}
                <div className="relative w-full pt-1 pb-10 sm:pb-12 px-2 sm:px-4">
                  
                  {/* REAL World Map SVG */}
                  <div className="relative w-full aspect-[1010/399.6] max-w-[950px] mx-auto select-none">
                    {/* Real SVG Map Layer with Crisp Light Contrast */}
                    <img
                      src="/images/world-map.svg"
                      alt="World Map - Lambda CDMO Locations"
                      className="w-full h-full object-contain filter contrast-110 brightness-95 opacity-85"
                    />

                    {/* Geodesic Connection Arc SVG between London (47.3%, 13.0%) and Ahmedabad (66.8%, 41.5%) */}
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
                        d="M 47.3% 13.0% Q 55% 5%, 66.8% 41.5%"
                        fill="none"
                        stroke="url(#arcGradientLight)"
                        strokeWidth="2.4"
                        strokeDasharray="5,4"
                        className="animate-pulse"
                      />

                      {/* Moving Light Particle Pulse along the flight path */}
                      <circle r="4" fill="#00aeef" filter="drop-shadow(0 0 5px #00aeef)">
                        <animateMotion
                          path="M 47.3% 13.0% Q 55% 5%, 66.8% 41.5%"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>

                    {/* LOCATION 1: London, UK Pin & Beacon */}
                    <div
                      style={{ left: '47.3%', top: '13.0%' }}
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
                        title="London, UK - European Innovation Centre"
                      >
                        <Microscope className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      {/* Fixed Label Pill */}
                      <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 border border-brand-blue/40 text-[11px] font-bold text-brand-blue px-2.5 py-0.5 rounded-full shadow-sm pointer-events-none">
                        London, UK
                      </div>

                      {/* POPUP MODAL ANIMATION FOR LONDON - Hidden on mobile & tablet views (< xl) */}
                      <AnimatePresence>
                        {activeLocationId === 'uk' && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.94 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="hidden xl:block absolute z-50 left-1/2 -translate-x-[80%] top-10 w-80 bg-white/95 backdrop-blur-xl border border-brand-blue/40 rounded-xl p-3.5 shadow-2xl text-left"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                                <span>London, UK</span>
                                <span className="text-[11px] font-normal text-slate-500">• Innovation Hub</span>
                              </h4>
                              <span className="text-[10px] font-semibold text-brand-blue bg-brand-blue/10 px-1.5 py-0.5 rounded border border-brand-blue/20">UK</span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                              Biologics development capabilities focused on upstream and downstream process development, analytical development, biosimilar development and process characterization.
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
                      style={{ left: '66.8%', top: '41.5%' }}
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
                        title="Ahmedabad, India - Primary Biomanufacturing Campus"
                      >
                        <Factory className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      {/* Fixed Label Pill */}
                      <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 border border-brand-orange/40 text-[11px] font-bold text-brand-orange px-2.5 py-0.5 rounded-full shadow-sm pointer-events-none">
                        Ahmedabad, India
                      </div>

                      {/* POPUP MODAL ANIMATION FOR AHMEDABAD - Hidden on mobile & tablet views (< xl) */}
                      <AnimatePresence>
                        {activeLocationId === 'india' && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.94 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="hidden xl:block absolute z-50 left-1/2 -translate-x-[35%] top-10 w-80 bg-white/95 backdrop-blur-xl border border-brand-orange/40 rounded-xl p-3.5 shadow-2xl text-left"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                                <span>Ahmedabad, India</span>
                                <span className="text-[11px] font-normal text-slate-500">• GMP Campus</span>
                              </h4>
                              <span className="text-[10px] font-semibold text-brand-orange bg-brand-orange/10 px-1.5 py-0.5 rounded border border-brand-orange/20">India</span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                              Integrated development, analytical and GMP manufacturing capabilities.
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

                {/* Bottom Status / Legend Bar */}
                <div className="relative z-20 px-4 py-3 bg-white/90 border-t border-slate-200/90 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-orange shrink-0" />
                      <span className="font-medium text-slate-700">Ahmedabad: Development, Analytics & GMP Manufacturing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-blue shrink-0" />
                      <span className="font-medium text-slate-700">London: Development & Characterization</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Click pins or cards to inspect facility details
                  </span>
                </div>

              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
